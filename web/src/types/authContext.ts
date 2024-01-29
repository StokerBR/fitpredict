// Type Imports
import {Goal} from './goals';
import {User, Stat} from './user';
import {DefaultApiError} from './system';

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = Omit<User, 'id' | 'totalSteps' | 'lastSync'> & {
  password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type ErrorCallback = (error: DefaultApiError | string) => void;

export type AuthContextValues = {
  goals: Goal[];
  stats: Stat[];
  loading: boolean;
  sync: () => void;
  user: User | null;
  logout: () => void;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setIsInitialized: (value: boolean) => void;
  login: (params: LoginParams, errorCallback?: ErrorCallback) => Promise<void>;
  register: (
    params: LoginParams,
    errorCallback?: ErrorCallback
  ) => Promise<void>;
};
