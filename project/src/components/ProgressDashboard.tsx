import React from 'react';
import { Calendar, Clock, Award, Flame } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { yogaSessions } from '../data/sessions';

export function ProgressDashboard() {
  const { user } = useAuth();
  const { stats, recentSessions, loading } = useProgress(user?.id);

  if (loading) {
    return <div>Loading progress...</div>;
  }

  if (!stats) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">Complete your first session to see your progress!</p>
      </div>
    );
  }

  const statCards = [
    {
      icon: <Calendar className="h-8 w-8 text-teal-500" />,
      label: 'Total Sessions',
      value: stats.total_sessions
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-500" />,
      label: 'Total Minutes',
      value: stats.total_minutes
    },
    {
      icon: <Flame className="h-8 w-8 text-teal-500" />,
      label: 'Current Streak',
      value: stats.current_streak
    },
    {
      icon: <Award className="h-8 w-8 text-teal-500" />,
      label: 'Longest Streak',
      value: stats.longest_streak
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              {stat.icon}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {recentSessions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
          <div className="space-y-4">
            {recentSessions.map((session) => {
              const sessionDetails = yogaSessions.find(s => s.id === session.session_id);
              return (
                <div key={session.completed_at} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{sessionDetails?.title ?? session.session_id}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(session.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-teal-600">{session.duration} min</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}