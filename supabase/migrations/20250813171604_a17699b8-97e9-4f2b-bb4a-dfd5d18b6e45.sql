-- Fix security warnings and complete secure admin system

-- Fix search_path issue for functions that don't have it set
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create secure admin invitation function
CREATE OR REPLACE FUNCTION public.create_admin_invitation(
  invitation_email text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  invitation_token text;
  invitation_id uuid;
BEGIN
  -- Only existing admins can create invitations
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;

  -- Generate secure token
  invitation_token := encode(gen_random_bytes(32), 'base64');
  
  -- Create invitation
  INSERT INTO public.admin_invitations (
    email,
    token,
    expires_at,
    created_by
  ) VALUES (
    invitation_email,
    invitation_token,
    now() + interval '7 days',
    auth.uid()
  ) RETURNING id INTO invitation_id;
  
  -- Log the action
  PERFORM public.log_admin_action(
    'create_admin_invitation',
    'admin_invitation',
    invitation_id::text,
    jsonb_build_object('email', invitation_email)
  );
  
  RETURN invitation_id;
END;
$$;

-- Create function to accept admin invitation
CREATE OR REPLACE FUNCTION public.accept_admin_invitation(
  invitation_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  invitation_record record;
  current_user_id uuid;
BEGIN
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Get valid invitation
  SELECT * INTO invitation_record
  FROM public.admin_invitations
  WHERE token = invitation_token
    AND expires_at > now()
    AND used_at IS NULL;
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid or expired invitation token';
  END IF;
  
  -- Check if user email matches invitation
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = current_user_id 
      AND email = invitation_record.email
  ) THEN
    RAISE EXCEPTION 'Email mismatch: invitation not for this user';
  END IF;
  
  -- Grant admin privileges
  UPDATE public.profiles 
  SET 
    is_admin = true,
    admin_created_at = now()
  WHERE user_id = current_user_id;
  
  -- Mark invitation as used
  UPDATE public.admin_invitations 
  SET used_at = now() 
  WHERE id = invitation_record.id;
  
  -- Log the action
  PERFORM public.log_admin_action(
    'accept_admin_invitation',
    'profile',
    current_user_id::text,
    jsonb_build_object('invitation_id', invitation_record.id)
  );
  
  RETURN true;
END;
$$;