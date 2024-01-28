// React Imports
import React from 'react';

// Next Imports
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackSpinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Image src="/running.gif" alt="logo" width={40} height={40} priority />
      <CircularProgress disableShrink sx={{mt: 6}} />
    </Box>
  );
};

export default FallbackSpinner;
