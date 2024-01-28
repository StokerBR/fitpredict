'use client';
// React Imports
import {ReactNode} from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AppBar from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';
import MuiToolbar, {ToolbarProps} from '@mui/material/Toolbar';

// Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp';

// Custom Components Imports
import Footer from '@/components/footer';
import navigation from '@/navigation/horizontal';
import ScrollToTop from '@/components/scroll-to-top';
import Navigation from '@/components/navigation/horizontal';
import AppBarContent from '@/components/appBar/AppbarContent';

const HorizontalLayoutWrapper = styled('div')({
  display: 'flex',
  overflow: 'clip',
  minHeight: '100vh',
  flexDirection: 'column',
});

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({theme}) => ({
  width: '100%',
  padding: `${theme.spacing(0, 6)} !important`,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const ContentWrapper = styled('main')(({theme}) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

type LayoutProps = {
  children: ReactNode;
};

const HorizontalLayout = ({children}: LayoutProps) => {
  return (
    <HorizontalLayoutWrapper className="layout-wrapper">
      <AppBar
        color="default"
        elevation={3}
        className="layout-navbar-and-nav-container"
        position={'static'}
        sx={{
          zIndex: 13,
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          backgroundColor: theme => theme.palette.background.paper,
          transition:
            'border-bottom 0.2s ease-in-out, backdrop-filter .25s ease-in-out, box-shadow .25s ease-in-out',
        }}
      >
        {/* Navbar / AppBar */}
        <Box
          className="layout-navbar"
          sx={{
            width: '100%',
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            backgroundColor: theme =>
              theme.palette.mode == 'light'
                ? theme.palette.primary.light
                : null,
          }}
        >
          <Toolbar
            className="navbar-content-container"
            sx={{
              mx: 'auto',
              minHeight: theme =>
                `${
                  (theme.mixins.toolbar.minHeight as number) - 1
                }px !important`,
            }}
          >
            <AppBarContent />
          </Toolbar>
        </Box>

        {/* Navigation Menu */}
        <Box className="layout-horizontal-nav" sx={{width: '100%'}}>
          <Toolbar
            className="horizontal-nav-content-container"
            sx={{
              mx: 'auto',
              minHeight: theme =>
                `${
                  (theme.mixins.toolbar.minHeight as number) - 0
                }px !important`,
            }}
          >
            <Navigation horizontalNavItems={navigation()} />
          </Toolbar>
        </Box>
      </AppBar>

      {/* Content */}
      <ContentWrapper className="layout-page-content">
        {children}
      </ContentWrapper>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop className="mui-fixed">
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <ArrowUp />
        </Fab>
      </ScrollToTop>
    </HorizontalLayoutWrapper>
  );
};

export default HorizontalLayout;
