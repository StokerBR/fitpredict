'use client';
// React Imports
import {createContext, useEffect, useState, ReactNode} from 'react';

// Next Import
import {useRouter} from 'next/navigation';

// Axios Imports
import axios from 'axios';
import {Api} from '@/services/api/api';
import {LOGIN} from '@/services/endpoints/auth';
import {SYNC} from '@/services/endpoints/sync';
import {USER_GET, USER_REGISTER} from '@/services/endpoints/user';

// Third party imports
import moment from 'moment';

// Types Imports
import {Sync} from '@/types/sync';
import {Goal} from '@/types/goals';
import {User, Stat} from '@/types/user';
import {
  Tokens,
  LoginParams,
  ErrorCallback,
  RegisterParams,
  AuthContextValues,
} from '@/types/authContext';

const defaultProviderValues: AuthContextValues = {
  user: null,
  stats: null,
  goals: null,
  loading: true,
  sync: () => null,
  setUser: () => null,
  isInitialized: false,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProviderValues);

type Props = {
  children: ReactNode;
};

function AuthProvider({children}: Props) {
  const [stats, setStats] = useState<Stat[] | null>(
    defaultProviderValues.stats
  );
  const [goals, setGoals] = useState<Goal[] | null>(
    defaultProviderValues.goals
  );
  const [user, setUser] = useState<User | null>(defaultProviderValues.user);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [loading, setLoading] = useState<boolean>(
    defaultProviderValues.loading
  );
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProviderValues.isInitialized
  );

  const router = useRouter();

  useEffect(() => {
    async function initAuth() {
      setIsInitialized(true);
      const storedToken = window.localStorage.getItem('accessToken')!;
      const storedRefreshToken = window.localStorage.getItem('refreshToken')!;
      const userData = window.localStorage.getItem('userData')!;
      if (storedToken && storedRefreshToken && userData) {
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
        setTokens({accessToken: storedToken, refreshToken: storedRefreshToken});
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    }
    initAuth().then();
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  function clearDataUserStorage() {
    setUser(null);
    setTokens(null);
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    delete Api.defaults.headers.common['Authorization'];
  }

  useEffect(() => {
    if (user?.id) {
      window.localStorage.setItem('userData', JSON.stringify(user));
      sync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function login(
    {email, password}: LoginParams,
    errorCallBack?: ErrorCallback
  ) {
    try {
      const responseLogin = await axios.post(LOGIN, {password, email});

      const accessToken = responseLogin.data.access_token;
      const refreshToken = responseLogin.data.refresh_token;

      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      Api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

      const responseUser = await Api.get<User>(USER_GET);
      setUser(responseUser.data);
    } catch (error) {
      if (errorCallBack) {
        errorCallBack(error);
      } else {
        throw error;
      }
    }
  }

  async function logout() {
    clearDataUserStorage();
    router.push('/login');
  }

  async function register(
    params: RegisterParams,
    errorCallBack?: ErrorCallback
  ) {
    try {
      await axios.post(USER_REGISTER, params);
    } catch (error) {
      if (errorCallBack) {
        errorCallBack(error);
      } else {
        throw error;
      }
    }
  }

  async function sync() {
    if (user?.id) {
      try {
        const params = {
          user: user,
          stats: stats || [],
          goals: goals || [],
        };
        const response = await Api.post<Sync>(SYNC, params);
        setStats(response.data.stats);
        setGoals(response.data.goals);
      } catch (error) {
        throw error;
      }
    }
  }

  const values: AuthContextValues = {
    user,
    stats,
    goals,
    sync,
    setUser,
    loading,
    setLoading,
    isInitialized,
    setIsInitialized,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthProvider};
