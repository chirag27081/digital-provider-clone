import { Card, CardContent } from '@/components/ui/card';
import { Zap, Clock, MessageCircle, Bot, BarChart3, Shield, DollarSign, Headphones } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Super Fast & Reliable Services',
      description: 'We ensure instant delivery on most platforms – whether it\'s Instagram, Facebook, YouTube, or Telegram.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Headphones,
      title: '24x7 Customer Support',
      description: 'Stuck somewhere? Our real human support team is available on WhatsApp & Telegram 24/7 to help you out.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Get lowest market rates with top-quality services. Ideal for resellers who want to earn more with less spending.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Bot,
      title: 'Smart WhatsApp Auto-Reply',
      description: 'Activate our built-in WhatsApp Auto-Reply System and never miss a client message – even while you sleep.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Dashboard',
      description: 'Track your orders, analyze performance, and manage your business with our comprehensive dashboard.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Secure Payment Gateway',
      description: 'Multiple payment options with bank-level security. Your transactions are always safe and encrypted.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            🚀 <span className="text-primary">Why to Choose</span>{' '}
            <span className="text-accent">ultimatesmm.com</span> –{' '}
            <span className="text-gray-800">Your Trusted SMM Panel Partner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            In the world of digital marketing, speed, reliability, and trust matter. 
            That's why <strong>ultimatesmm.com</strong> is the go-to choice for thousands of resellers and marketers across India.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            🌟 <span className="text-primary">What Makes Us Stand Out?</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-0 shadow-card"
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-primary to-accent p-1 rounded-xl">
            <div className="bg-white px-8 py-4 rounded-lg">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🎯 Ready to Boost Your Social Media Presence?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;