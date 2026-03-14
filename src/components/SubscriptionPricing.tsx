import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  stripe_price_id_monthly: string | null;
  stripe_price_id_yearly: string | null;
  features: string[];
  max_projects: number;
  max_storage_gb: number;
}

interface SubscriptionPricingProps {
  onClose?: () => void;
}

export default function SubscriptionPricing({ onClose }: SubscriptionPricingProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_monthly', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: Plan) => {
    if (plan.id === 'free') {
      return;
    }

    setProcessingPlan(plan.id);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        alert('Please sign in to subscribe');
        return;
      }

      const priceId = billingPeriod === 'monthly'
        ? plan.stripe_price_id_monthly
        : plan.stripe_price_id_yearly;

      if (!priceId) {
        alert('Price ID not configured for this plan');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId,
            planId: plan.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setProcessingPlan(null);
    }
  };

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Unlock the full power of MandaStrong Studio
          </p>

          <div className="inline-flex items-center bg-gray-900 rounded-lg p-1 mb-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.id === 'pro'
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600 transform scale-105 shadow-2xl'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                  POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                <div className="text-5xl font-bold mb-2">
                  ${formatPrice(
                    billingPeriod === 'monthly' ? plan.price_monthly : plan.price_yearly
                  )}
                </div>
                <div className="text-gray-300">
                  {billingPeriod === 'monthly' ? 'per month' : 'per year'}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0 text-green-400 mt-0.5" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={processingPlan === plan.id || plan.id === 'free'}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.id === 'free'
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : plan.id === 'pro'
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {processingPlan === plan.id
                  ? 'Processing...'
                  : plan.id === 'free'
                  ? 'Current Plan'
                  : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {onClose && (
          <div className="text-center mt-12">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
