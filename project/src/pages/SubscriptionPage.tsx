import React from 'react';
import { PricingCard } from '../components/PricingCard';

const features = [
  { text: 'Mobile phone notifications' },
  { text: 'Calendar app integration' },
  { text: 'Custom reminder schedules' },
  { text: 'Progress tracking' },
  { text: 'Premium pose library' },
];

export function SubscriptionPage() {
  const handleSubscribe = () => {
    // Replace with your actual PayPal payment URL
    window.open('https://paypal.me/yourpaypallink/5.99', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Upgrade Your Practice</h1>
        <p className="text-gray-600">Get advanced features and mobile notifications</p>
      </div>
      
      <PricingCard 
        features={features}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}