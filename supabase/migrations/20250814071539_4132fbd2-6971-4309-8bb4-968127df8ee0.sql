-- Fix security issue: Remove overly permissive profile visibility policy
-- and replace with secure policy that only allows users to view their own profiles

-- Drop the current insecure policy that allows everyone to view all profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);