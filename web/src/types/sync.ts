// Type Imports
import {Goal} from './goals';
import {Stat, User} from './user';

export interface Sync {
  user: User;
  goals: Goal[];
  stats: Stat[];
}

export type SyncParams = {
  newUser?: User;
  newGoals?: Goal[];
};
