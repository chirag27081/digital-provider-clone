import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Plus } from 'lucide-react';

interface AdminInvitationProps {
  onInvitationSent: () => void;
}

const AdminInvitation = ({ onInvitationSent }: AdminInvitationProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendInvitation = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('create_admin_invitation', {
        invitation_email: email.trim()
      });

      if (error) throw error;

      toast({
        title: "Invitation sent",
        description: `Admin invitation sent to ${email}`,
      });

      setEmail('');
      onInvitationSent();
    } catch (error: any) {
      toast({
        title: "Failed to send invitation",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/20 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Invite New Admin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="invite-email" className="text-gray-300">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="pl-10 bg-black/20 border-white/20 text-white"
            />
          </div>
        </div>
        <Button 
          onClick={handleSendInvitation}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Sending...' : 'Send Invitation'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminInvitation;