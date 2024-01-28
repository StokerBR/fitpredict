'use client';
// React Imports
import {ElementType, Fragment} from 'react';

// Next Imports
import Link from 'next/link';
import {usePathname} from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import MuiListItem, {ListItemProps} from '@mui/material/ListItem';

// Icons Imports
import Circle from 'mdi-material-ui/Circle';

// Third Party Imports
import clsx from 'clsx';

// Types Imports
import {NavLink} from '@/types/system';

// Utils Import
import {hexToRGBA} from '@/utils/hex-to-rgba';

interface Props {
  item: NavLink;
  hasParent: boolean;
}

const ListItem = styled(MuiListItem)<
  ListItemProps & {component?: ElementType; target?: '_blank' | undefined}
>(({theme}) => ({
  width: 'auto',
  paddingTop: theme.spacing(2.25),
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(2.25),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.active, &.active:hover': {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
  },
  '&.active .MuiTypography-root, &.active .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const HorizontalNavLink = ({item, hasParent}: Props) => {
  const pathname = usePathname();

  const Wrapper = !hasParent ? List : Fragment;

  const isNavLinkActive = () => {
    if (pathname === item.path || pathname.startsWith(`${item.path}/`)) {
      return true;
    } else {
      return false;
    }
  };

  const IconTag = item.icon
    ? isNavLinkActive() && item.selectedIcon
      ? item.selectedIcon
      : item.icon
    : Circle;

  return (
    <Wrapper
      {...(!hasParent
        ? {
            component: 'div',
            sx: {py: 2.75},
          }
        : {})}
    >
      <Link href={`${item.path}`} passHref style={{textDecoration: 'none'}}>
        <ListItem
          disabled={item.disabled}
          className={clsx({active: isNavLinkActive()})}
          target={item.openInNewTab ? '_blank' : undefined}
          onClick={e => {
            if (item.path === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          sx={{
            ...(item.disabled ? {pointerEvents: 'none'} : {cursor: 'pointer'}),
            ...(!hasParent
              ? {
                  borderRadius: '8px',
                  '&.active, &.active:hover': {
                    backgroundColor: theme => theme.palette.primary.main,
                    '& .MuiTypography-root, & .MuiListItemIcon-root': {
                      color: 'common.white',
                    },
                  },
                }
              : {}),
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: hasParent ? 3 : 2.5,
                  color: 'text.primary',
                }}
              >
                <IconTag sx={IconTag === Circle ? {fontSize: '0.5rem'} : {}} />
              </ListItemIcon>
              <Typography noWrap>{item.title}</Typography>
            </Box>
            {item.badgeContent ? (
              <Chip
                size="small"
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  ml: 1.5,
                  '& .MuiChip-label': {
                    px: 2.5,
                    lineHeight: 1.385,
                    textTransform: 'capitalize',
                  },
                }}
              />
            ) : null}
          </Box>
        </ListItem>
      </Link>
    </Wrapper>
  );
};

export default HorizontalNavLink;
