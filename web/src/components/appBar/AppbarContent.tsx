'use client';
// React Imports
import React, {ReactNode} from 'react';

// Next Import
import Link from 'next/link';
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

// Custom Components Imports
import UserDropdown from './UserDropdown';

const StyledLink = styled('a')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8),
}));

const AppBarContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <StyledLink href="/">
        <Image
          priority
          width={175}
          height={42}
          src={require('/public/logo_horizontal_white.png')}
          alt={'Logo Horizontal do FitPredict'}
        />
      </StyledLink>

      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
