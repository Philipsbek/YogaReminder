import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, Clock, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="h-8 w-8 text-teal-500" />,
    title: 'Mobile Notifications',
    description: 'Get reminders directly on your phone when it\'s time for yoga'
  },
  {
    icon: <Calendar className="h-8 w-8 text-teal-500" />,
    title: 'Calendar Integration',
    description: 'Sync your practice schedule with your calendar app'
  },
  {
    icon: <Clock className="h-8 w-8 text-teal-500" />,
    title: 'Custom Schedules',
    description: 'Set personalized reminder times that work for you'
  },
  {
    icon: <Bell className="h-8 w-8 text-teal-500" />,
    title: 'Smart Reminders',
    description: 'Get notified at the perfect time for your practice'
  }
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Transform Your Yoga Practice
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Never miss a session with our smart reminder system
          </p>
          <button
            onClick={() => navigate('/subscribe')}
            className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-lg font-medium"
          >
            Get Started for $5.99/month
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}