import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User as UserIcon, Wallet, ShoppingCart, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/auth';
        return;
      }
      
      setUser(session.user);
      
      // Fetch user profile
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(profileData);
      }
      
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "See you again soon!",
      });
      
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  UltimateSMM Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserIcon size={20} className="text-purple-600" />
                  <span className="text-gray-700">{profile?.full_name || user?.email}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Balance Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <Wallet size={20} />
                  <span>Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  ₹{profile?.balance?.toFixed(2) || '0.00'}
                </div>
                <p className="text-sm text-gray-600">Available balance</p>
              </CardContent>
            </Card>

            {/* Total Orders Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <ShoppingCart size={20} />
                  <span>Total Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {profile?.total_orders || 0}
                </div>
                <p className="text-sm text-gray-600">Orders placed</p>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-purple-600">
                  <Settings size={20} />
                  <span>Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={profile?.status === 'active' ? 'default' : 'destructive'}>
                  {profile?.status || 'Active'}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Current status</p>
              </CardContent>
            </Card>

            {/* User Info Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-pink-600">
                  <UserIcon size={20} />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-gray-800">
                  @{profile?.username || 'user'}
                </div>
                <p className="text-sm text-gray-600">{profile?.email}</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Available Services</CardTitle>
              <p className="text-gray-600">Choose from our premium SMM services</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Services will be displayed here</p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  onClick={() => navigate('/#services')}
                >
                  Browse Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;