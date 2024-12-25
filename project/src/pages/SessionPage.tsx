import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { yogaSessions } from '../data/sessions';
import { SessionTimer } from '../components/SessionTimer';
import { PoseCard } from '../components/PoseCard';
import { yogaPoses } from '../data/poses';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';

export function SessionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const { user } = useAuth();
  const { recordSession } = useProgress(user?.id);

  const session = yogaSessions.find(s => s.id === sessionId);
  
  if (!session) {
    return <div>Session not found</div>;
  }

  const sessionPoses = yogaPoses.filter(pose => 
    session.poses.includes(pose.name.toLowerCase().replace(/\s+/g, '-'))
  );

  const handleComplete = async () => {
    setIsCompleted(true);
    if (user?.id) {
      await recordSession(session.id, session.duration);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <SessionTimer session={session} onComplete={handleComplete} />
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Poses in this session:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessionPoses.map(pose => (
              <PoseCard key={pose.id} {...pose} />
            ))}
          </div>
        </div>

        {isCompleted && (
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Session Completed!
            </h3>
            <button
              onClick={() => navigate('/premium')}
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}