import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API Documentation', href: '#api' },
    { name: 'Reseller Program', href: '#reseller' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' }
  ];

  const services = [
    { name: 'Instagram Services', href: '#instagram' },
    { name: 'YouTube Services', href: '#youtube' },
    { name: 'Facebook Services', href: '#facebook' },
    { name: 'TikTok Services', href: '#tiktok' },
    { name: 'Telegram Services', href: '#telegram' },
    { name: 'Twitter Services', href: '#twitter' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: MessageCircle, href: '#', label: 'Telegram', color: 'hover:text-cyan-500' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            📬 Stay Updated with Latest SMM Trends
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get exclusive tips, new service announcements, and special offers delivered to your inbox
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="bg-white/90 border-0 flex-1"
            />
            <Button className="bg-white text-primary hover:bg-gray-100 font-medium px-6">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  AAPKAPROVIDER
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  India's most trusted SMM panel providing high-quality social media marketing services 
                  since 2021. Join 25,000+ satisfied customers.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin size={18} className="text-primary flex-shrink-0" />
                  <span>Your City, Your State, Your Country</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone size={18} className="text-primary flex-shrink-0" />
                  <span>+1 234 567 8900</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <span>your.email@domain.com</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-700 ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <ExternalLink size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a 
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <ExternalLink size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">24/7 Support</h4>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Need help? Our support team is available 24/7 via WhatsApp and Telegram.
                </p>
                
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2">
                    <MessageCircle size={18} />
                    <span>WhatsApp Support</span>
                  </Button>
                  <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white flex items-center justify-center space-x-2">
                    <MessageCircle size={18} />
                    <span>Telegram Support</span>
                  </Button>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium text-white mb-2">⏱️ Response Time</h5>
                  <p className="text-sm text-gray-400">
                    Average response time: <span className="text-green-400 font-medium">2 minutes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 AapkaProvider. Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>in India. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-green-400 font-medium">🟢 All Systems Operational</span>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <a href="#terms" className="hover:text-white transition-colors">Terms</a>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;