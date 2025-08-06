import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SMM Panel Provider API Integration
const SMM_PROVIDER_API_KEY = "01354b7097368dadd5cbc1fd1722ecc6";
const SMM_PROVIDER_URL = "https://api.smmraja.com/v2"; // Example SMM provider

interface SMMApiResponse {
  status: string;
  order?: number;
  message?: string;
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

    const { action, service_id, link, quantity, order_id } = await req.json();

    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Action is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let apiUrl = `${SMM_PROVIDER_URL}?key=${SMM_PROVIDER_API_KEY}&action=${action}`;
    
    switch (action) {
      case 'services':
        // Get all available services from SMM provider
        break;
        
      case 'add':
        if (!service_id || !link || !quantity) {
          return new Response(
            JSON.stringify({ error: 'service_id, link, and quantity are required for add action' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        apiUrl += `&service=${service_id}&link=${link}&quantity=${quantity}`;
        break;
        
      case 'status':
        if (!order_id) {
          return new Response(
            JSON.stringify({ error: 'order_id is required for status action' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        apiUrl += `&order=${order_id}`;
        break;
        
      case 'balance':
        // Get account balance
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Use: services, add, status, or balance' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    console.log('Making API call to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    if (!response.ok) {
      throw new Error(`SMM API request failed: ${response.status}`);
    }

    const data: SMMApiResponse = await response.json();
    
    console.log('SMM API Response:', data);

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in smm-provider function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to communicate with SMM provider', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});