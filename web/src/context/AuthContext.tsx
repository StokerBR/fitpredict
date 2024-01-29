'use client';
// React Imports
import {createContext, useEffect, useState, ReactNode} from 'react';

// Next Import
import {useRouter} from 'next/navigation';

// Axios Imports
import axios from 'axios';
import {Api} from '@/services/api/api';
import {LOGIN} from '@/services/endpoints/auth';
import {USER_GET, USER_REGISTER} from '@/services/endpoints/user';

// Types Imports
import {User} from '@/types/user';
import {Calculator} from '@/utils/calculator';
import {
  Tokens,
  LoginParams,
  ErrorCallback,
  RegisterParams,
  AuthContextValues,
} from '@/types/authContext';

const defaultProviderValues: AuthContextValues = {
  user: null,
  loading: true,
  calculator: null,
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
  const [user, setUser] = useState<User | null>(defaultProviderValues.user);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [calculator, setCalculator] = useState<Calculator | null>(null);
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
      setCalculator(new Calculator(user.height, user.weight));
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
    }
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

  const values: AuthContextValues = {
    user,
    setUser,
    loading,
    calculator,
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
