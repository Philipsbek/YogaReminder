import React, { useState, useEffect } from 'react';
import { Pause, Play, RefreshCw } from 'lucide-react';

interface YogaTimerProps {
  initialMinutes?: number;
  onComplete?: () => void;
}

export function YogaTimer({ initialMinutes = 5, onComplete }: YogaTimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialMinutes * 60);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="text-center">
      <div className="text-4xl font-light mb-4">
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </div>
    </div>
  );
}