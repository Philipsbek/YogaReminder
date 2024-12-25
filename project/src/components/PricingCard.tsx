import React from 'react';
import { Check } from 'lucide-react';

interface Feature {
  text: string;
}

interface PricingCardProps {
  features: Feature[];
  onSubscribe: () => void;
}

export function PricingCard({ features, onSubscribe }: PricingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium Plan</h2>
      <div className="flex items-baseline mb-8">
        <span className="text-5xl font-bold">$5.99</span>
        <span className="text-gray-500 ml-2">/month</span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="text-teal-500" size={20} />
            <span className="text-gray-600">{feature.text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSubscribe}
        className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Subscribe with PayPal
      </button>
    </div>
  );
}