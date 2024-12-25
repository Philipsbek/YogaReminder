import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { YogaSession } from '../data/sessions';

interface SessionTimerProps {
  session: YogaSession;
  onComplete: () => void;
}

export function SessionTimer({ session, onComplete }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(session.duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(session.duration * 60);
  };

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{session.title}</h2>
      <div className="text-5xl font-light mb-6">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="p-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}