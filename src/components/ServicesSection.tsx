import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instagram, Youtube, Facebook, MessageCircle, Twitter, TrendingUp, Users, Eye, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ServicesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const defaultServices = [
    {
      icon: Instagram,
      platform: 'Instagram',
      title: 'Instagram Followers',
      description: 'High-quality, real followers that engage with your content',
      price: '₹0.50',
      unit: '100 followers',
      features: ['Real Users', 'Instant Start', '30 Days Refill'],
      gradient: 'from-pink-500 to-purple-600',
      popular: true
    },
    {
      icon: Youtube,
      platform: 'YouTube',
      title: 'YouTube Views',
      description: 'Boost your video views with real, engaged audience',
      price: '₹1.20',
      unit: '1000 views',
      features: ['Real Views', 'Fast Delivery', 'Retention Guaranteed'],
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Facebook,
      platform: 'Facebook',
      title: 'Facebook Page Likes',
      description: 'Increase your page credibility with genuine likes',
      price: '₹2.00',
      unit: '1000 likes',
      features: ['Active Users', 'Worldwide', 'Drop Protection'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      platform: 'Telegram',
      title: 'Telegram Members',
      description: 'Grow your Telegram channel with real members',
      price: '₹3.50',
      unit: '1000 members',
      features: ['Real Members', 'Mixed Gender', 'No Drop'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Twitter,
      platform: 'Twitter',
      title: 'Twitter Followers',
      description: 'Build your Twitter presence with quality followers',
      price: '₹4.00',
      unit: '1000 followers',
      features: ['HQ Profiles', 'Real Users', 'Stable'],
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      icon: TrendingUp,
      platform: 'TikTok',
      title: 'TikTok Views',
      description: 'Make your videos go viral with instant views',
      price: '₹0.80',
      unit: '10000 views',
      features: ['Super Fast', 'High Retention', 'Worldwide'],
      gradient: 'from-black to-pink-500'
    },
    {
      icon: Heart,
      platform: 'Instagram',
      title: 'Instagram Likes',
      description: 'Get instant likes on your posts from real users',
      price: '₹0.30',
      unit: '1000 likes',
      features: ['Instant Start', 'Real Users', 'Non Drop'],
      gradient: 'from-pink-400 to-red-500'
    },
    {
      icon: Share2,
      platform: 'Instagram',
      title: 'Instagram Shares',
      description: 'Increase your reach with genuine story shares',
      price: '₹5.00',
      unit: '1000 shares',
      features: ['Real Shares', 'Story Shares', 'Fast Start'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Eye,
      platform: 'Instagram',
      title: 'Instagram Views',
      description: 'Boost your video and reel views instantly',
      price: '₹0.20',
      unit: '10000 views',
      features: ['Instant Views', 'High Retention', 'Cheap Rate'],
      gradient: 'from-orange-400 to-pink-500'
    }
  ];

  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      if (!error && data && isMounted) setDbServices(data);
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const getIcon = (platform: string) => {
    switch ((platform || '').toLowerCase()) {
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'facebook': return Facebook;
      case 'telegram': return MessageCircle;
      case 'twitter': return Twitter;
      case 'tiktok': return TrendingUp;
      default: return TrendingUp;
    }
  };

  const services = (dbServices.length ? dbServices.map((s: any) => ({
    icon: getIcon(s.platform),
    platform: s.platform,
    title: s.name,
    description: s.description || '',
    price: `₹${s.price_per_1000}`,
    unit: '1000 units',
    features: Array.isArray(s.features) ? s.features : [],
    gradient: 'from-primary to-accent',
    popular: s.status === 'active'
  })) : defaultServices);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            🎯 <span className="text-primary">Our Premium Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide range of social media marketing services. 
            All services come with instant start, high quality, and 24/7 support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentServices.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-0 shadow-card relative overflow-hidden"
            >
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 z-10">
                  🔥 Popular
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {service.platform}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-green-600">{service.price}</span>
                    <span className="text-sm text-gray-500">per {service.unit}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white border-0 font-medium`}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-primary" : ""}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </Button>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 text-lg rounded-xl shadow-glow">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;