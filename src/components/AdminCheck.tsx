import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminCheckProps {
  onAdminVerified: () => void;
}

const AdminCheck = ({ onAdminVerified }: AdminCheckProps) => {
  const [inviteToken, setInviteToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // Check if user is already admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('user_id', session.user.id)
        .single();

      if (profile?.is_admin) {
        onAdminVerified();
        return;
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!inviteToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invitation token",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('accept_admin_invitation', {
        invitation_token: inviteToken.trim()
      });

      if (error) throw error;

      toast({
        title: "Admin access granted",
        description: "You now have administrator privileges",
      });

      onAdminVerified();
    } catch (error: any) {
      toast({
        title: "Invalid invitation",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/20 backdrop-blur-md border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-yellow-400" />
          </div>
          <CardTitle className="text-white">Admin Access Required</CardTitle>
          <div className="flex items-center justify-center gap-2 text-yellow-400 mt-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Secure Authentication</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-300 text-sm text-center">
            Enter your admin invitation token to access the admin panel.
          </div>
          
          <div>
            <Label htmlFor="token" className="text-gray-300">
              Invitation Token
            </Label>
            <Input
              id="token"
              type="text"
              value={inviteToken}
              onChange={(e) => setInviteToken(e.target.value)}
              placeholder="Enter invitation token"
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          
          <Button 
            onClick={handleAcceptInvitation} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Verifying...' : 'Access Admin Panel'}
          </Button>
          
          <div className="text-xs text-gray-400 text-center">
            Contact a system administrator to get an invitation token.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCheck;