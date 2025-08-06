import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Package, Calendar, MessageCircle, Eye } from 'lucide-react';

const HeroSection = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const stats = [
    { icon: Users, label: '25,000+ Users', value: '25,000+' },
    { icon: Package, label: '5,00,000+ Orders Delivered', value: '500,000+' },
    { icon: Calendar, label: 'Active Since 2021', value: '2021' },
    { icon: MessageCircle, label: '24x7 WhatsApp/Telegram Support', value: '24/7' },
  ];

  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Left Side - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Brand Message Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-card border-0">
              <CardContent className="p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gray-800">Main </span>
                  <span className="text-accent">SMM</span>
                  <span className="text-gray-800"> Service </span>
                  <span className="text-accent">Provider</span>
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  <span className="font-semibold">As AAPKAPROVIDER family</span>, we are the{' '}
                  <span className="font-semibold text-accent">direct provider of more than 50% of our services.</span>
                  <br />
                  We offer the cheapest smm panel services with the best support ever.
                  <br />
                  <span className="font-semibold">Join our family, let's grow together!</span>
                </p>
                <p className="text-sm text-gray-500">
                  Do not have an account?{' '}
                  <a href="#signup" className="text-accent font-semibold hover:underline">
                    Sign up
                  </a>{' '}
                  Now
                </p>
              </CardContent>
            </Card>

            {/* Main Headline */}
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                "India's <span className="text-yellow-300">Fastest</span> & Most{' '}
                <span className="text-yellow-300">Affordable</span> SMM Panel"
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                "Instant delivery of followers, likes, views & more — at unbeatable rates. Join 20,000+ happy users today!"
              </p>
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-glow"
              >
                [See Pricing]
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/90">
                  <stat.icon className="text-yellow-300 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center animate-slide-up">
            <Card className="w-full max-w-md bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm border-0 shadow-glow">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Username</label>
                      <Input
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="bg-white/90 border-0 focus:ring-2 focus:ring-white/50"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Password</label>
                      <Input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="bg-white/90 border-0 focus:ring-2 focus:ring-white/50"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginData.rememberMe}
                        onCheckedChange={(checked) => 
                          setLoginData({...loginData, rememberMe: checked as boolean})
                        }
                        className="bg-white/90"
                      />
                      <label htmlFor="remember" className="text-white text-sm">
                        Remember me
                      </label>
                    </div>
                    <a href="#forgot" className="text-blue-200 text-sm hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="button" 
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Sign In
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white text-gray-700 border-0 hover:bg-gray-50 py-3 rounded-xl"
                    onClick={() => window.location.href = '/auth'}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>

                  <p className="text-center text-white/80 text-sm">
                    Do not have an account?{' '}
                    <a href="/auth" className="text-blue-200 hover:underline font-medium">
                      Sign up
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;