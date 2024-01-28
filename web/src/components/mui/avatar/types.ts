// MUI Imports
import {AvatarProps} from '@mui/material/Avatar';

// Types Imports
import {ThemeColor} from '@/types/system';

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor;
  customcolor?: string;
  skin?: 'filled' | 'light' | 'light-static';
};
