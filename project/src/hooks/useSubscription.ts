import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Subscription {
  is_active: boolean;
  subscription_end: string;
}

export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('is_active, subscription_end')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        setSubscription(data);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [userId]);

  const createSubscription = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from('user_subscriptions')
      .insert([{ user_id: userId }]);

    if (error) throw error;
  };

  return {
    subscription,
    loading,
    createSubscription,
  };
}