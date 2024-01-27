'use client';
// React Imports
import {ReactNode, useEffect} from 'react';

// Axios Imports
import axios from 'axios';
import {Api} from './api';

// Next Imports
import {useRouter, usePathname} from 'next/navigation';

type AxiosInterceptorProps = {
  children: ReactNode;
};

function AxiosInterceptor({children}: AxiosInterceptorProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const resInterceptor = response => {
      return response;
    };

    const errInterceptor = error => {
      if (error.response.status === 500) {
        router.push('/500');
      } else {
        throw error;
      }

      return Promise.reject();
    };

    const interceptor = Api.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => Api.interceptors.response.eject(interceptor);
  }, []);

  return children;
}

export default AxiosInterceptor;
