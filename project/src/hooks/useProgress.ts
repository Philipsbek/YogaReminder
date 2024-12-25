import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UserStats {
  total_sessions: number;
  total_minutes: number;
  current_streak: number;
  longest_streak: number;
  last_session_date: string | null;
}

interface SessionProgress {
  session_id: string;
  completed_at: string;
  duration: number;
}

export function useProgress(userId: string | undefined) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentSessions, setRecentSessions] = useState<SessionProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      // Fetch user stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Fetch recent sessions
      const { data: sessionsData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (statsData) {
        setStats(statsData);
      }
      if (sessionsData) {
        setRecentSessions(sessionsData);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [userId]);

  const recordSession = async (sessionId: string, duration: number) => {
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];

    // Record the session completion
    await supabase
      .from('user_progress')
      .insert([{
        user_id: userId,
        session_id: sessionId,
        duration
      }]);

    // Update user stats
    const { data: currentStats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentStats) {
      const lastSessionDate = currentStats.last_session_date;
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().split('T')[0];

      const newStreak = lastSessionDate === yesterday ? currentStats.current_streak + 1 : 1;
      const newLongestStreak = Math.max(newStreak, currentStats.longest_streak);

      await supabase
        .from('user_stats')
        .update({
          total_sessions: currentStats.total_sessions + 1,
          total_minutes: currentStats.total_minutes + duration,
          current_streak: newStreak,
          longest_streak: newLongestStreak,
          last_session_date: today
        })
        .eq('user_id', userId);
    } else {
      // Create initial stats
      await supabase
        .from('user_stats')
        .insert([{
          user_id: userId,
          total_sessions: 1,
          total_minutes: duration,
          current_streak: 1,
          longest_streak: 1,
          last_session_date: today
        }]);
    }
  };

  return {
    stats,
    recentSessions,
    loading,
    recordSession
  };
}