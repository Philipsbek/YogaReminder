export interface YogaSession {
  id: string;
  title: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  poses: string[];
  description: string;
}

export const yogaSessions: YogaSession[] = [
  {
    id: 'morning-flow',
    title: 'Morning Flow',
    duration: 20,
    level: 'beginner',
    poses: ['mountain-pose', 'child-pose', 'downward-dog'],
    description: 'Start your day with this energizing morning sequence'
  },
  {
    id: 'evening-relax',
    title: 'Evening Relaxation',
    duration: 15,
    level: 'beginner',
    poses: ['child-pose', 'seated-forward-bend'],
    description: 'Wind down with this calming evening routine'
  },
  {
    id: 'strength-flow',
    title: 'Strength Building',
    duration: 30,
    level: 'intermediate',
    poses: ['warrior-1', 'warrior-2', 'chair-pose'],
    description: 'Build strength and stability with this dynamic sequence'
  }
];