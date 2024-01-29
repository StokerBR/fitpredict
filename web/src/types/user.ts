export enum Gender {
  M = 'M',
  F = 'F',
}

export interface User {
  id: number;
  email: string;
  name: string;
  gender: Gender;
  height: number;
  weight: number;
  lastSync: string;
  totalSteps: number;
}

export interface Stat {
  id: number;
  date: string;
  steps: number;
  userId: number;
  distance: number;
  calories: number;
  lastSync: string;
}
