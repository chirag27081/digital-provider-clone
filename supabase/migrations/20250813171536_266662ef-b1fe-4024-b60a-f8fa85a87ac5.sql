-- Remove auto-admin escalation and create secure admin system

-- First, create a secure function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE profiles.user_id = is_admin.user_id 
      AND profiles.is_admin = true
  );
$$;

-- Add admin_created_at to track when admin access was granted
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS admin_created_at timestamp with time zone;

-- Add admin invitation system
CREATE TABLE IF NOT EXISTS public.admin_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  token text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL,
  used_at timestamp with time zone,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on admin invitations
ALTER TABLE public.admin_invitations ENABLE ROW LEVEL SECURITY;

-- Only existing admins can manage invitations
CREATE POLICY "Admins can manage invitations" 
ON public.admin_invitations 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Update services policies to use the secure function
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;

CREATE POLICY "Admins can delete services" 
ON public.services 
FOR DELETE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert services" 
ON public.services 
FOR INSERT 
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update services" 
ON public.services 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

-- Add input validation function for URLs
CREATE OR REPLACE FUNCTION public.validate_url(url text)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Basic URL validation
  IF url IS NULL OR length(url) < 8 THEN
    RETURN false;
  END IF;
  
  -- Check for valid URL pattern
  IF NOT url ~ '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/.*)?$' THEN
    RETURN false;
  END IF;
  
  -- Block localhost and private IPs
  IF url ~ '(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Add constraint to orders table for URL validation
ALTER TABLE public.orders 
ADD CONSTRAINT valid_target_url 
CHECK (public.validate_url(target_url));

-- Add audit log table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id uuid NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.admin_audit_log 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  action_name text,
  resource_type text,
  resource_id text DEFAULT NULL,
  details jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.admin_audit_log (
    admin_user_id,
    action,
    resource_type,
    resource_id,
    details
  ) VALUES (
    auth.uid(),
    action_name,
    resource_type,
    resource_id,
    details
  );
END;
$$;