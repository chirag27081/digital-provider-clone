import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, TrendingUp, Zap, Shield, DollarSign, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Instagram Marketing in 2024",
      excerpt: "Learn the latest strategies to grow your Instagram presence organically and with SMM panels. Discover proven techniques that work.",
      author: "Digital Marketing Team",
      date: "Dec 15, 2024",
      category: "Instagram Tips",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop",
      tags: ["Instagram", "Marketing", "Growth"],
      icon: TrendingUp
    },
    {
      id: 2,
      title: "Why SMM Panels Are Essential for Modern Businesses",
      excerpt: "Understand how social media marketing panels can accelerate your business growth and provide competitive advantages in today's market.",
      author: "Business Strategy Team",
      date: "Dec 12, 2024",
      category: "Business Growth",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["SMM", "Business", "Strategy"],
      icon: Zap
    },
    {
      id: 3,
      title: "Security Best Practices for SMM Panel Users",
      excerpt: "Essential security tips to protect your accounts and ensure safe usage of social media marketing services.",
      author: "Security Team",
      date: "Dec 10, 2024",
      category: "Security",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      tags: ["Security", "Safety", "Best Practices"],
      icon: Shield
    },
    {
      id: 4,
      title: "Maximizing ROI with Affordable SMM Services",
      excerpt: "Learn how to get the best return on investment from your social media marketing budget with smart strategies and tools.",
      author: "ROI Specialists",
      date: "Dec 8, 2024",
      category: "ROI & Analytics",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      tags: ["ROI", "Analytics", "Budget"],
      icon: DollarSign
    },
    {
      id: 5,
      title: "YouTube Growth Hacks: From Zero to Viral",
      excerpt: "Discover proven methods to grow your YouTube channel rapidly using a combination of organic strategies and SMM tools.",
      author: "Content Creators",
      date: "Dec 5, 2024",
      category: "YouTube Tips",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
      tags: ["YouTube", "Viral", "Content"],
      icon: TrendingUp
    },
    {
      id: 6,
      title: "Building Trust: Customer Support in SMM Industry",
      excerpt: "Why 24/7 customer support is crucial in the SMM industry and how it impacts your business success and customer satisfaction.",
      author: "Support Team",
      date: "Dec 3, 2024",
      category: "Customer Service",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=250&fit=crop",
      tags: ["Support", "Trust", "Service"],
      icon: Clock
    },
    {
      id: 7,
      title: "TikTok Marketing: Trends and Strategies for 2024",
      excerpt: "Stay ahead of the curve with the latest TikTok marketing trends and learn how to leverage them for maximum engagement.",
      author: "Social Media Experts",
      date: "Dec 1, 2024",
      category: "TikTok Tips",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=250&fit=crop",
      tags: ["TikTok", "Trends", "Engagement"],
      icon: TrendingUp
    },
    {
      id: 8,
      title: "Facebook Marketing: Advanced Techniques",
      excerpt: "Master advanced Facebook marketing techniques that can significantly boost your brand's visibility and engagement rates.",
      author: "Marketing Specialists",
      date: "Nov 28, 2024",
      category: "Facebook Tips",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      tags: ["Facebook", "Advanced", "Techniques"],
      icon: Zap
    }
  ];

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            📚 <span className="text-primary">Knowledge Hub</span> & <span className="text-accent">Latest Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and strategies in social media marketing. 
            Learn from experts and grow your business with proven techniques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-0 shadow-card overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-white border-0">
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 p-2 rounded-lg">
                    <post.icon size={16} className="text-primary" />
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Read More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
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
            Visit Our Blog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;