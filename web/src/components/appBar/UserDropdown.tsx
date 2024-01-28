'use client';
// React Imports
import {useState, SyntheticEvent, Fragment} from 'react';

// Next Import
import {useRouter} from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// Icons Imports
import Logout from 'mdi-material-ui/Logout';
import Account from 'mdi-material-ui/Account';

// Context Imports
import {useAuth} from '@/hooks/useAuth';

// Custom Components Imports
import CustomAvatar from '@/components/mui/avatar';

// Utils Import
import {getInitials} from '@/utils/get-initials';

// Styled Components
const BadgeContentSpan = styled('span')(({theme}) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

function UserDropdown() {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const router = useRouter();
  const {logout, user} = useAuth();

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary',
    },
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ml: 2, cursor: 'pointer'}}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <CustomAvatar
          skin="filled"
          color={'primary'}
          sx={{width: 40, height: 40, fontSize: 16}}
        >
          {getInitials(user?.name ?? '')}
        </CustomAvatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, marginTop: 4}}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{pt: 2, pb: 3, px: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <CustomAvatar
                skin="filled"
                color={'primary'}
                sx={{width: '2.5rem', height: '2.5rem', fontSize: '1.1rem'}}
              >
                {getInitials(user?.name ?? '')}
              </CustomAvatar>
            </Badge>
            <Box
              sx={{
                display: 'flex',
                marginLeft: 3,
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{fontWeight: 600}}>{user?.name}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <MenuItem sx={{p: 0}} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Account sx={{marginRight: 2}} />
            Dados pessoais
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{py: 2}} onClick={handleLogout}>
          <Logout
            sx={{
              marginRight: 2,
              fontSize: '1.375rem',
              color: 'text.secondary',
            }}
          />
          Sair
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default UserDropdown;
