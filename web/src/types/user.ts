export enum Gender {
  M = 'M',
  F = 'F',
}

export interface User {
  id: string;
  email: string;
  name: string;
  gender: Gender;
  height: number;
  weight: number;
  lastSync: Date;
  totalSteps: number;
}
