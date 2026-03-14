import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();

    const channel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
        },
        () => {
          loadSubscription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

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

  const canCreateProject = async (): Promise<boolean> => {
    if (!subscription) return true;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (error) throw error;

      return (count || 0) < subscription.max_projects;
    } catch (error) {
      console.error('Error checking project limit:', error);
      return false;
    }
  };

  const hasFeature = (featureName: string): boolean => {
    if (!subscription) return false;
    return subscription.features.some(f =>
      f.toLowerCase().includes(featureName.toLowerCase())
    );
  };

  const isPro = subscription?.plan_id === 'pro' || subscription?.plan_id === 'studio';
  const isStudio = subscription?.plan_id === 'studio';
  const isFree = subscription?.plan_id === 'free';

  return {
    subscription,
    loading,
    canCreateProject,
    hasFeature,
    isPro,
    isStudio,
    isFree,
  };
}
