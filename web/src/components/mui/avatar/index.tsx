'use client';
// React Imports
import {forwardRef, Ref} from 'react';

// MUI Imports
import MuiAvatar from '@mui/material/Avatar';
import {lighten, useTheme} from '@mui/material/styles';

// Types
import {CustomAvatarProps} from './types';
import {ThemeColor} from '@/types/system';

// Hooks Imports
import useBgColor, {UseBgColorType} from '@/hooks/useBgColor';

// Utils Imports
import {hexToRGBA} from '../../../utils/hex-to-rgba';

const Avatar = forwardRef((props: CustomAvatarProps, ref: Ref<any>) => {
  // ** Props
  const {sx, src, skin, color, customcolor} = props;

  // ** Hook
  const theme = useTheme();
  const bgColors: UseBgColorType = useBgColor();

  const getAvatarStyles = (
    skin: 'filled' | 'light' | 'light-static' | undefined,
    skinColor: ThemeColor
  ) => {
    let avatarStyles;

    if (skin === 'light') {
      avatarStyles = {...bgColors[`${skinColor}Light`]};
    } else if (skin === 'light-static') {
      avatarStyles = {
        color: bgColors[`${skinColor}Light`].color,
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88),
      };
    } else {
      avatarStyles = {...bgColors[`${skinColor}Filled`]};
    }

    return avatarStyles;
  };
  Avatar.displayName = 'Avatar';

  const colors: UseBgColorType = {
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    error: getAvatarStyles(skin, 'error'),
    warning: getAvatarStyles(skin, 'warning'),
    info: getAvatarStyles(skin, 'info'),
  };
  const customColorFormat = (color: string) => {
    return {
      color: color,
      backgroundColor: hexToRGBA(color, 0.2),
    };
  };

  const colorsFormat = () => {
    if (!!customcolor) {
      return customColorFormat(customcolor);
    } else if (!!color) {
      return colors[color];
    } else {
      return null;
    }
  };

  return (
    <MuiAvatar
      ref={ref}
      {...props}
      sx={
        !src && skin && (color || customcolor)
          ? Object.assign(colorsFormat(), sx)
          : sx
      }
    />
  );
});

Avatar.defaultProps = {
  skin: 'filled',
  color: 'primary',
};

export default Avatar;
