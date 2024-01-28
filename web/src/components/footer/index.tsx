// React Imports
import {ReactNode} from 'react';

// MUI Imports
import Box from '@mui/material/Box';

//Custom Components Imports
import FooterContent from './FooterContent';

interface Props {
  footerContent?: (props?: any) => ReactNode;
}

const Footer = ({footerContent}: Props) => {
  return (
    <Box
      component="footer"
      className="layout-footer"
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        className="footer-content-container"
        sx={{
          py: 4,
          px: [4, 6],
          width: '100%',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          boxShadow: theme =>
            `0 -4px 8px -2px rgba(${
              theme.palette.mode === 'light'
                ? theme.palette.primary.light
                : '20, 21, 33'
            }, ${theme.palette.mode === 'light' ? 0.2 : 0.42})`,
        }}
      >
        <FooterContent />
      </Box>
    </Box>
  );
};

export default Footer;
