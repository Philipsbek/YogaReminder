import { sendNotification } from '../utils/notifications';

export interface Reminder {
  id: string;
  userId: string;
  time: string;
  days: string[];
  enabled: boolean;
}

export async function scheduleReminder(reminder: Reminder) {
  const now = new Date();
  const [hours, minutes] = reminder.time.split(':');
  const scheduledTime = new Date();
  scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0);

  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilReminder = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    if (reminder.enabled) {
      sendNotification('Time for Yoga!', {
        body: 'Your scheduled yoga session is starting now.',
        icon: '/yoga-icon.png'
      });
    }
    scheduleReminder(reminder); // Reschedule for next occurrence
  }, timeUntilReminder);

  return scheduledTime;
}