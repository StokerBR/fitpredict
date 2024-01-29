'use client';
//React imports
import {useEffect, ReactNode, useState} from 'react';

// Next imports
import {useRouter, usePathname} from 'next/navigation';

//Hooks
import {useAuth} from '@/hooks/useAuth';

// Custom Components
import FallbackSpinner from '../spinner';

type Props = {
  children: ReactNode;
};

function AuthGuard({children}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {isInitialized, user, loading} = useAuth();
  const publicRoutes = ['/login', '/register', '/401', '/500'];

  useEffect(() => {
    if (isInitialized && !loading) {
      if (user) {
        if (
          pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/'
        ) {
          router.replace('/apps/dashboard');
        }
      } else {
        if (!publicRoutes.includes(pathname)) {
          router.replace('/login');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, loading, user]);

  if (
    isInitialized &&
    !loading &&
    ((user &&
      pathname !== '/login' &&
      pathname !== '/register' &&
      pathname !== '/') ||
      (!user && publicRoutes.includes(pathname)))
  ) {
    return <>{children}</>;
  } else {
    return <FallbackSpinner />;
  }
}

export default AuthGuard;
