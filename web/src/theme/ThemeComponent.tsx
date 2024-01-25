'use client';
// React Imports
import {ReactNode} from 'react';

// MUI Imports
import {deepmerge} from '@mui/utils';
import {ptBR} from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

// Theme Override Imports
import spacing from './spacing';
import palette from './palette';

interface Props {
  children: ReactNode;
}

const ThemeComponent = ({children}: Props) => {
  let theme = createTheme();
  const themeOverride = createTheme({palette: palette('light'), ...spacing});
  theme = deepmerge(theme, themeOverride);
  theme = responsiveFontSizes(theme);

  const aux = createTheme(
    deepmerge(
      createTheme({}, ptBR),
      createTheme(
        {},
        {
          components: {},
        }
      )
    )
  );

  theme = createTheme(deepmerge(aux, theme));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
