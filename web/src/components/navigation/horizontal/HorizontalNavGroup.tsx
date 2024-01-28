'use client';
// React Imports
import {SyntheticEvent, useState, useEffect, Fragment} from 'react';

// Next Imports
import {useRouter, usePathname} from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import {styled, useTheme} from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MuiListItem, {ListItemProps} from '@mui/material/ListItem';

// Third Party Imports
import clsx from 'clsx';
import {usePopper} from 'react-popper';

// Icons Imports
import Circle from 'mdi-material-ui/Circle';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import ChevronRight from 'mdi-material-ui/ChevronRight';

// Types Imports
import {NavGroup} from '@/types/system';

// Custom Components Imports
import HorizontalNavItems from './HorizontalNavItems';

// Utils Imports
import {hexToRGBA} from '@/utils/hex-to-rgba';
import {hasActiveChild} from '@/components/navigation/utils';

interface Props {
  item: NavGroup;
  hasParent?: boolean;
}

// ** Styled Components
const ListItem = styled(MuiListItem)<ListItemProps>(({theme}) => ({
  cursor: 'pointer',
  paddingTop: theme.spacing(2.25),
  paddingBottom: theme.spacing(2.25),
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

const NavigationMenu = styled(Paper)(({theme}) => ({
  width: 300,
  overflowY: 'auto',
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.background.paper,

  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 20,
    background: hexToRGBA(
      theme.palette.mode === 'light' ? '#BFBFD5' : '#57596C',
      0.6
    ),
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: 20,
    background: 'transparent',
  },
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0,
  },
  '& .menu-group.Mui-selected': {
    borderRadius: 0,
    backgroundColor: theme.palette.action.hover,
  },
}));

const HorizontalNavGroup = ({item, hasParent}: Props) => {
  const theme = useTheme();
  const currentURL = usePathname();

  const popperOffsetHorizontal = -16;
  const popperPlacement = 'bottom-start';
  const popperPlacementSubMenu = 'right-start';

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [popperElement, setPopperElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [referenceElement, setReferenceElement] = useState(null);

  const {styles, attributes, update} = usePopper(
    referenceElement,
    popperElement,
    {
      placement: hasParent ? popperPlacementSubMenu : popperPlacement,
      modifiers: [
        {
          enabled: true,
          name: 'offset',
          options: {
            offset: hasParent ? [-8, 15] : [popperOffsetHorizontal, 5],
          },
        },
      ],
    }
  );

  const handleGroupOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
    update ? update() : null;
  };

  const handleGroupClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleMenuToggleOnClick = (event: SyntheticEvent) => {
    if (anchorEl) {
      handleGroupClose();
    } else {
      handleGroupOpen(event);
    }
  };

  useEffect(() => {
    handleGroupClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentURL]);

  const IconTag = item.icon ? item.icon : Circle;
  const ToggleIcon = ChevronRight;

  const WrapperCondition = false;
  const MainWrapper = WrapperCondition ? ClickAwayListener : 'div';
  const ChildWrapper = WrapperCondition ? 'div' : Fragment;
  const AnimationWrapper = Fade;

  // @ts-ignore
  const childMenuGroupStyles = () => {
    if (attributes && attributes.popper) {
      if (attributes.popper['data-popper-placement'] === 'right-start') {
        return 'left';
      }
      if (attributes.popper['data-popper-placement'] === 'left-start') {
        return 'right';
      }
    }
  };

  return (
    // @ts-ignore
    <MainWrapper
      {...(WrapperCondition
        ? {onClickAway: handleGroupClose}
        : {onMouseLeave: handleGroupClose})}
    >
      <ChildWrapper>
        <List component="div" sx={{py: 2.75}}>
          <ListItem
            aria-haspopup="true"
            {...(WrapperCondition ? {} : {onMouseEnter: handleGroupOpen})}
            className={clsx('menu-group', {
              'Mui-selected': hasActiveChild(item, currentURL),
            })}
            sx={{
              ...(menuOpen
                ? {backgroundColor: theme.palette.action.hover}
                : {}),
              ...(!hasParent
                ? {
                    borderRadius: '8px',
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.main,
                      '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root':
                        {
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
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              ref={setReferenceElement}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  overflow: 'hidden',
                }}
              >
                <ListItemIcon
                  sx={{mr: hasParent ? 3 : 2.5, color: 'text.primary'}}
                >
                  <IconTag
                    sx={IconTag === Circle ? {fontSize: '0.5rem'} : {}}
                  />
                </ListItemIcon>
                <Typography noWrap>{item.title}</Typography>
              </Box>
              <Box sx={{ml: 1.5, display: 'flex', alignItems: 'center'}}>
                {item.badgeContent ? (
                  <Chip
                    size="small"
                    label={item.badgeContent}
                    color={item.badgeColor || 'primary'}
                    sx={{
                      mr: 0.75,
                      '& .MuiChip-label': {
                        px: 2.5,
                        lineHeight: 1.385,
                        textTransform: 'capitalize',
                      },
                    }}
                  />
                ) : null}
                {hasParent ? (
                  <ToggleIcon sx={{color: 'text.secondary'}} />
                ) : (
                  <ChevronDown sx={{color: 'text.secondary'}} />
                )}
              </Box>
            </Box>
          </ListItem>
          <AnimationWrapper in={menuOpen} timeout={{exit: 300, enter: 400}}>
            <Box
              style={styles.popper}
              ref={setPopperElement}
              {...attributes.popper}
              sx={{
                zIndex: theme.zIndex.appBar,
                display: menuOpen ? 'block' : 'none',
                pl: childMenuGroupStyles() === 'left' ? 1.25 : 0,
                pr: childMenuGroupStyles() === 'right' ? 1.25 : 0,
                ...(hasParent ? {position: 'fixed !important'} : {pt: 5.5}),
              }}
            >
              <NavigationMenu
                sx={{
                  ...(hasParent
                    ? {overflowX: 'visible', maxHeight: 'calc(100vh - 21rem)'}
                    : {maxHeight: 'calc(100vh - 13rem)'}),
                  boxShadow: theme.shadows[4],
                }}
              >
                <HorizontalNavItems
                  hasParent
                  horizontalNavItems={item.children}
                />
              </NavigationMenu>
            </Box>
          </AnimationWrapper>
        </List>
      </ChildWrapper>
    </MainWrapper>
  );
};

export default HorizontalNavGroup;
