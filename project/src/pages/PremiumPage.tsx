import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { ReminderSettings } from '../components/ReminderSettings';
import { SessionCard } from '../components/SessionCard';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { yogaSessions } from '../data/sessions';
import { Crown, Calendar, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PremiumPage() {
  const { user } = useAuth();
  const { subscription, loading } = useSubscription(user?.id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sessions' | 'reminders' | 'progress'>('sessions');

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const handleStartSession = (sessionId: string) => {
    navigate(`/session/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-teal-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Premium Dashboard</h1>
          <p className="text-gray-600">
            {subscription?.is_active 
              ? 'Your premium subscription is active'
              : 'Your subscription has expired'}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-4 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'sessions' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Yoga Sessions
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'progress' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Progress
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'reminders' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Reminders
            </button>
          </div>
        </div>

        {activeTab === 'sessions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yogaSessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onStart={handleStartSession}
              />
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard />
        )}

        {activeTab === 'reminders' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <ReminderSettings isPremium={subscription?.is_active ?? false} />
          </div>
        )}
      </div>
    </div>
  );
}