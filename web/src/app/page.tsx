'use client';

// React Imports
import {useEffect} from 'react';

// Next Imports
import {useRouter} from 'next/navigation';

// Custom Components Imports
import FallbackSpinner from '@/components/spinner';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FallbackSpinner />;
};

export default Home;
