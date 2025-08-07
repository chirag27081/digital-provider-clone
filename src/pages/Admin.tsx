import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Users, Package, ShoppingCart, LogOut, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  platform: string;
  category: string;
  description: string;
  price_per_1000: number;
  min_quantity: number;
  max_quantity: number;
  delivery_time: string;
  status: string;
  features: string[];
}

interface User {
  id: string;
  email: string;
  full_name: string;
  balance: number;
  status: string;
  total_orders: number;
  created_at: string;
}

interface Order {
  id: string;
  user_id: string;
  target_url: string;
  quantity: number;
  total_cost: number;
  status: string;
  created_at: string;
  profiles?: {
    email: string;
    full_name: string;
  } | null;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    platform: '',
    category: '',
    description: '',
    price_per_1000: '',
    min_quantity: '1',
    max_quantity: '10000',
    delivery_time: '',
    features: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'admin123'; // In production, use proper authentication

  useEffect(() => {
    // Check if user is logged in as admin
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
      toast({
        title: "Admin access granted",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Invalid admin password",
        variant: "destructive"
      });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch services
    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Fetch users
    const { data: usersData } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Fetch orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false });

    if (servicesData) setServices(servicesData);
    if (usersData) setUsers(usersData);
    if (ordersData) setOrders(ordersData as unknown as Order[]);
    
    setLoading(false);
  };

  const handleCreateService = async () => {
    const { error } = await supabase.from('services').insert({
      name: newService.name,
      platform: newService.platform,
      category: newService.category,
      description: newService.description,
      price_per_1000: parseFloat(newService.price_per_1000),
      min_quantity: parseInt(newService.min_quantity),
      max_quantity: parseInt(newService.max_quantity),
      delivery_time: newService.delivery_time,
      features: newService.features.split(',').map(f => f.trim()),
      status: 'active'
    });

    if (error) {
      toast({
        title: "Error creating service",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Service created successfully",
        description: "New service has been added to the catalog",
      });
      setNewService({
        name: '',
        platform: '',
        category: '',
        description: '',
        price_per_1000: '',
        min_quantity: '1',
        max_quantity: '10000',
        delivery_time: '',
        features: ''
      });
      fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <Button onClick={handleAdminLogin} className="w-full">
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">UltimateSMM Admin</h1>
          <Button onClick={handleLogout} variant="outline" className="text-white border-white/20">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-md">
            <TabsTrigger value="services" className="text-white data-[state=active]:bg-primary">
              <Package className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-primary">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-white data-[state=active]:bg-primary">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="add-service" className="text-white data-[state=active]:bg-primary">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Service
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Services Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Platform</TableHead>
                        <TableHead className="text-gray-300">Price/1000</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id} className="border-white/10">
                          <TableCell className="text-white">{service.name}</TableCell>
                          <TableCell className="text-gray-300">{service.platform}</TableCell>
                          <TableCell className="text-gray-300">₹{service.price_per_1000}</TableCell>
                          <TableCell>
                            <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                              {service.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Users Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Balance</TableHead>
                        <TableHead className="text-gray-300">Orders</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="border-white/10">
                          <TableCell className="text-white">{user.email}</TableCell>
                          <TableCell className="text-gray-300">{user.full_name || 'N/A'}</TableCell>
                          <TableCell className="text-gray-300">₹{user.balance}</TableCell>
                          <TableCell className="text-gray-300">{user.total_orders}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Orders Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Target URL</TableHead>
                        <TableHead className="text-gray-300">Quantity</TableHead>
                        <TableHead className="text-gray-300">Cost</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="border-white/10">
                          <TableCell className="text-white">
                            {(order.profiles as any)?.email || 'Unknown'}
                          </TableCell>
                          <TableCell className="text-gray-300 max-w-xs truncate">
                            {order.target_url}
                          </TableCell>
                          <TableCell className="text-gray-300">{order.quantity}</TableCell>
                          <TableCell className="text-gray-300">₹{order.total_cost}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-service">
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Add New Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Service Name</Label>
                    <Input
                      id="name"
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      placeholder="Instagram Followers"
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform" className="text-gray-300">Platform</Label>
                    <Input
                      id="platform"
                      value={newService.platform}
                      onChange={(e) => setNewService({...newService, platform: e.target.value})}
                      placeholder="Instagram"
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-gray-300">Category</Label>
                    <Input
                      id="category"
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                      placeholder="Followers"
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-gray-300">Price per 1000</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newService.price_per_1000}
                      onChange={(e) => setNewService({...newService, price_per_1000: e.target.value})}
                      placeholder="150"
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="min_quantity" className="text-gray-300">Min Quantity</Label>
                    <Input
                      id="min_quantity"
                      type="number"
                      value={newService.min_quantity}
                      onChange={(e) => setNewService({...newService, min_quantity: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max_quantity" className="text-gray-300">Max Quantity</Label>
                    <Input
                      id="max_quantity"
                      type="number"
                      value={newService.max_quantity}
                      onChange={(e) => setNewService({...newService, max_quantity: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery_time" className="text-gray-300">Delivery Time</Label>
                    <Input
                      id="delivery_time"
                      value={newService.delivery_time}
                      onChange={(e) => setNewService({...newService, delivery_time: e.target.value})}
                      placeholder="24-48 hours"
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    placeholder="High quality Instagram followers..."
                    className="bg-black/20 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="features" className="text-gray-300">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={newService.features}
                    onChange={(e) => setNewService({...newService, features: e.target.value})}
                    placeholder="High Quality, Real Users, No Drop"
                    className="bg-black/20 border-white/20 text-white"
                  />
                </div>
                <Button onClick={handleCreateService} className="w-full">
                  Create Service
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;