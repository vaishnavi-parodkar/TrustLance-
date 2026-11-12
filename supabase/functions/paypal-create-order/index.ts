// Supabase Edge Function: paypal-create-order
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(clientId: string, clientSecret: string) {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { projectId, milestoneId, amount, originalAmount, deductionAmount, currency = "USD" } = await req.json();

    const clientId = Deno.env.get("PAYPAL_CLIENT_ID") || "";
    const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET") || "";

    if (!clientId || !clientSecret) {
      // Return simulated order ID for sandbox / test mode
      const mockOrderId = `ORD-SANDBOX-${Date.now()}`;
      return new Response(JSON.stringify({ orderId: mockOrderId, isSimulated: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = await getPayPalAccessToken(clientId, clientSecret);

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `milestone_${milestoneId}`,
          description: `TRUSTLANCE Milestone Payment (Gross: $${originalAmount}, Deductions: $${deductionAmount || 0})`,
          amount: {
            currency_code: currency,
            value: Number(amount).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: currency,
                value: Number(amount).toFixed(2)
              }
            }
          },
          items: [
            {
              name: `Milestone Net Payment`,
              unit_amount: {
                currency_code: currency,
                value: Number(amount).toFixed(2)
              },
              quantity: "1",
              category: "DIGITAL_GOODS"
            }
          ],
          custom_id: JSON.stringify({ projectId, milestoneId })
        }
      ],
      application_context: {
        brand_name: "TRUSTLANCE",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING"
      }
    };

    const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const orderData = await orderRes.json();
    return new Response(JSON.stringify({ orderId: orderData.id, raw: orderData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
