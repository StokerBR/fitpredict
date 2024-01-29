// React Imports
import {ReactNode} from 'react';

// MUI Imports
import Fab from '@mui/material/Fab';
import {styled} from '@mui/material/styles';

// Type Imports
import {ThemeColor} from '@/types/system';

type FloatingButtonProps = {
  top?: number;
  bottom?: number;
  children: ReactNode;
  color?: ThemeColor | 'default';
  size?: 'small' | 'medium' | 'large';
};

function FloatingButton({
  children,
  size,
  color,
  top,
  bottom,
}: FloatingButtonProps) {
  const FloatingButtonStyled = styled('div')(({theme}) => ({
    zIndex: 11,
    position: 'fixed',
    right: theme.spacing(6),
    ...(!top && !bottom && {bottom: theme.spacing(25)}),
    ...(top && !bottom && {top: theme.spacing(top)}),
    ...(!top && bottom && {bottom: theme.spacing(bottom)}),
  }));
  return (
    <FloatingButtonStyled
      role="presentation"
      color={color || 'primary'}
      sx={{borderRadius: '50%'}}
      className={'mui-fixed-scroll-to-top'}
    >
      <Fab
        color="primary"
        size={size || 'small'}
        className={'rounded-xl'}
        aria-label="floating button"
      >
        {children}
      </Fab>
    </FloatingButtonStyled>
  );
}

export default FloatingButton;
