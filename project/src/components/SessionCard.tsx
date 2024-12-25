import React from 'react';
import { Clock, Activity } from 'lucide-react';
import type { YogaSession } from '../data/sessions';

interface SessionCardProps {
  session: YogaSession;
  onStart: (sessionId: string) => void;
}

export function SessionCard({ session, onStart }: SessionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{session.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={16} />
            <span className="capitalize">{session.level}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{session.description}</p>
        <button
          onClick={() => onStart(session.id)}
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
        >
          Start Session
        </button>
      </div>
    </div>
  );
}