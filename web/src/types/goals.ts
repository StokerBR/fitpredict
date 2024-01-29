export interface Goal {
  id: number;
  userId: number;
  steps: number;
  distance: number;
  calories: number;
  lastSync: string;
  completedAt: string;
  stepsWalked: number;
}

export type GoalRegistration = Omit<
  Goal,
  'id' | 'lastSync' | 'completedAt' | 'stepsWalked'
>;
