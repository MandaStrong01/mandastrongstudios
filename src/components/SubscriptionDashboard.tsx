import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CreditCard, Package, Calendar, AlertCircle } from 'lucide-react';

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

interface SubscriptionDetails {
  subscription_id: string;
  plan_id: string;
  plan_name: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  max_projects: number;
  max_storage_gb: number;
  features: string[];
}

export default function SubscriptionDashboard() {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    loadSubscriptionDetails();
    loadProjectCount();
  }, []);

  const loadSubscriptionDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_user_subscription', { user_uuid: user.id });

      if (error) throw error;

      if (data && data.length > 0) {
        setSubscription(data[0]);
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectCount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (error) throw error;
      setProjectCount(count || 0);
    } catch (error) {
      console.error('Error loading project count:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-500',
      canceled: 'bg-red-500',
      past_due: 'bg-yellow-500',
      trialing: 'bg-blue-500',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
          statusColors[status as keyof typeof statusColors] || 'bg-gray-500'
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading subscription...</div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">No subscription found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Subscription Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold">Current Plan</h2>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">
                {subscription.plan_name}
              </div>
              <div>{getStatusBadge(subscription.status)}</div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold">Billing Period</h2>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Renews on</div>
              <div className="text-lg font-semibold">
                {formatDate(subscription.current_period_end)}
              </div>
              {subscription.cancel_at_period_end && (
                <div className="flex items-center text-yellow-500 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Cancels at period end
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <div className="flex items-center mb-6">
            <CreditCard className="w-6 h-6 text-green-400 mr-3" />
            <h2 className="text-xl font-semibold">Usage</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Projects</span>
                <span className="font-semibold">
                  {projectCount} / {subscription.max_projects === 999999 ? '∞' : subscription.max_projects}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{
                    width: subscription.max_projects === 999999
                      ? '10%'
                      : `${Math.min((projectCount / subscription.max_projects) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Storage</span>
                <span className="font-semibold">
                  {subscription.max_storage_gb} GB
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Plan Features</h2>
          <ul className="space-y-3">
            {subscription.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {subscription.plan_id === 'free' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/?page=pricing'}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
