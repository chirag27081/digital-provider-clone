-- Add admin flag to profiles if not exists
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

-- Allow admins to manage services
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;

CREATE POLICY "Admins can insert services"
ON public.services
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.is_admin = true
  )
);

CREATE POLICY "Admins can update services"
ON public.services
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.is_admin = true
  )
);

CREATE POLICY "Admins can delete services"
ON public.services
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.is_admin = true
  )
);
