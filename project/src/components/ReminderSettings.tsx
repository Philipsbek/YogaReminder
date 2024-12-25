import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { addToCalendar } from '../utils/calendar';

interface ReminderSettingsProps {
  isPremium: boolean;
}

export function ReminderSettings({ isPremium }: ReminderSettingsProps) {
  const [reminderTime, setReminderTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const handleAddToCalendar = () => {
    if (!isPremium) return;
    
    const startTime = new Date();
    startTime.setHours(parseInt(reminderTime.split(':')[0], 10));
    startTime.setMinutes(parseInt(reminderTime.split(':')[1], 10));
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    
    addToCalendar({
      title: 'Daily Yoga Practice',
      startTime,
      endTime,
      description: 'Time for your daily yoga practice!'
    });
  };
  
  if (!isPremium) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Upgrade to Premium to access custom reminder settings</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reminder Time
        </label>
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-gray-400" />
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repeat On
        </label>
        <div className="flex flex-wrap gap-2">
          {days.map(day => (
            <button
              key={day}
              onClick={() => {
                setSelectedDays(prev => 
                  prev.includes(day) 
                    ? prev.filter(d => d !== day)
                    : [...prev, day]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDays.includes(day)
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleAddToCalendar}
        className="flex items-center gap-2 w-full justify-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
      >
        <Calendar size={18} />
        Add to Calendar
      </button>
    </div>
  );
}