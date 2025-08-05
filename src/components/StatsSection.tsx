import { Card, CardContent } from '@/components/ui/card';
import { Package, ShoppingCart } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Package,
      number: '7571',
      label: 'Total services',
      color: 'text-blue-600'
    },
    {
      icon: ShoppingCart,
      number: '866695',
      label: 'Total orders',
      color: 'text-green-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-card hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-8">
                <div className={`mx-auto w-16 h-16 ${stat.color} bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;