// Type Imports
import {User} from './user';
import {DefaultApiError} from './system';
import {Calculator} from '@/utils/calculator';

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
  loading: boolean;
  user: User | null;
  logout: () => void;
  calculator: Calculator;
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
