import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateOrderRequest {
  service_id: string;
  quantity: number;
  target_url: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user from JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { service_id, quantity, target_url }: CreateOrderRequest = await req.json();

    // Validate input
    if (!service_id || !quantity || !target_url) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: service_id, quantity, target_url' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get service details
    const { data: service, error: serviceError } = await supabaseClient
      .from('services')
      .select('*')
      .eq('id', service_id)
      .eq('status', 'active')
      .single();

    if (serviceError || !service) {
      return new Response(
        JSON.stringify({ error: 'Service not found or inactive' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate quantity
    if (quantity < service.min_quantity || quantity > service.max_quantity) {
      return new Response(
        JSON.stringify({ 
          error: `Quantity must be between ${service.min_quantity} and ${service.max_quantity}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate target URL using database function
    const { data: isValidUrl, error: urlError } = await supabaseClient
      .rpc('validate_url', { url: target_url });
    
    if (urlError || !isValidUrl) {
      return new Response(
        JSON.stringify({ error: 'Invalid target URL provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate total cost
    const total_cost = (quantity / 1000) * service.price_per_1000;

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'User profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has sufficient balance
    if (profile.balance < total_cost) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient balance', 
          required: total_cost, 
          available: profile.balance 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        service_id,
        quantity,
        target_url,
        total_cost,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update user balance and total orders
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        balance: profile.balance - total_cost,
        total_orders: (profile.total_orders || 0) + 1
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating user profile:', updateError);
      // Note: In production, you'd want to rollback the order creation here
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        order,
        message: 'Order created successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-order function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});