// ** MUI Imports
import {AvatarProps} from '@mui/material/Avatar';

// ** Types
import {ThemeColor} from 'src/@core/layouts/types';

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor;
  customcolor?: string;
  skin?: 'filled' | 'light' | 'light-static';
};
