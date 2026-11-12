// Supabase Edge Function: paypal-webhook
// Handles PayPal payment notifications (PAYMENT.CAPTURE.COMPLETED, etc.)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const event = await req.json();
    console.log("Received PayPal Webhook Event:", event.event_type);

    // In a live Supabase setup, verify the webhook signature with PayPal
    // and record the event into payment_events table
    return new Response(JSON.stringify({ received: true, event_type: event.event_type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
