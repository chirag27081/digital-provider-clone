-- Create users profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  username TEXT UNIQUE,
  email TEXT,
  full_name TEXT,
  balance DECIMAL(10,2) DEFAULT 0.00,
  total_orders INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table  
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price_per_1000 DECIMAL(10,4) NOT NULL,
  min_quantity INTEGER DEFAULT 1,
  max_quantity INTEGER DEFAULT 1000000,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  features TEXT[],
  delivery_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  service_id UUID NOT NULL REFERENCES public.services(id),
  quantity INTEGER NOT NULL,
  target_url TEXT NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
  start_count INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for services (public read)
CREATE POLICY "Anyone can view active services" 
ON public.services FOR SELECT 
USING (status = 'active');

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Insert sample services
INSERT INTO public.services (name, platform, category, description, price_per_1000, min_quantity, max_quantity, features, delivery_time) VALUES
('Instagram Followers', 'Instagram', 'Followers', 'High-quality, real followers that engage with your content', 5.00, 100, 100000, ARRAY['Real Users', 'Instant Start', '30 Days Refill'], '0-1 hours'),
('YouTube Views', 'YouTube', 'Views', 'Boost your video views with real, engaged audience', 12.00, 1000, 1000000, ARRAY['Real Views', 'Fast Delivery', 'Retention Guaranteed'], '0-12 hours'),
('Facebook Page Likes', 'Facebook', 'Likes', 'Increase your page credibility with genuine likes', 20.00, 100, 50000, ARRAY['Active Users', 'Worldwide', 'Drop Protection'], '0-6 hours'),
('Telegram Members', 'Telegram', 'Members', 'Grow your Telegram channel with real members', 35.00, 100, 10000, ARRAY['Real Members', 'Mixed Gender', 'No Drop'], '0-24 hours'),
('Twitter Followers', 'Twitter', 'Followers', 'Build your Twitter presence with quality followers', 40.00, 100, 25000, ARRAY['HQ Profiles', 'Real Users', 'Stable'], '0-12 hours'),
('TikTok Views', 'TikTok', 'Views', 'Make your videos go viral with instant views', 8.00, 1000, 10000000, ARRAY['Super Fast', 'High Retention', 'Worldwide'], '0-1 hours'),
('Instagram Likes', 'Instagram', 'Likes', 'Get instant likes on your posts from real users', 3.00, 100, 100000, ARRAY['Instant Start', 'Real Users', 'Non Drop'], '0-30 minutes'),
('Instagram Shares', 'Instagram', 'Shares', 'Increase your reach with genuine story shares', 50.00, 100, 10000, ARRAY['Real Shares', 'Story Shares', 'Fast Start'], '0-6 hours'),
('Instagram Views', 'Instagram', 'Views', 'Boost your video and reel views instantly', 2.00, 1000, 10000000, ARRAY['Instant Views', 'High Retention', 'Cheap Rate'], '0-30 minutes');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();