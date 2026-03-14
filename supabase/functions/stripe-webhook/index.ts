import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, Stripe-Signature",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No signature found");
    }

    const body = await req.text();

    const event = JSON.parse(body);

    console.log("Stripe webhook event:", event.type);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const subscriptionId = subscription.id;
        const status = subscription.status;
        const currentPeriodStart = new Date(subscription.current_period_start * 1000);
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
        const cancelAtPeriodEnd = subscription.cancel_at_period_end;

        const priceId = subscription.items.data[0]?.price?.id;

        const { data: planData } = await supabase
          .from("subscription_plans")
          .select("id")
          .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
          .single();

        const planId = planData?.id || "free";

        const { data: existingSub } = await supabase
          .from("subscriptions")
          .select("id, user_id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (existingSub) {
          await supabase
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscriptionId,
              plan_id: planId,
              status,
              current_period_start: currentPeriodStart.toISOString(),
              current_period_end: currentPeriodEnd.toISOString(),
              cancel_at_period_end: cancelAtPeriodEnd,
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        await supabase
          .from("subscriptions")
          .update({
            plan_id: "free",
            status: "canceled",
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        await supabase
          .from("subscriptions")
          .update({
            status: "active",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        await supabase
          .from("subscriptions")
          .update({
            status: "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
