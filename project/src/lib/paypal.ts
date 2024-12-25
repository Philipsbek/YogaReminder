import { supabase } from './supabase';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

export async function initializePayPal() {
  const script = document.createElement('script');
  script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true`;
  script.async = true;
  return new Promise((resolve) => {
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
}

export async function createSubscription(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert([
        {
          user_id: userId,
          is_active: true,
          subscription_start: new Date().toISOString(),
          subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}