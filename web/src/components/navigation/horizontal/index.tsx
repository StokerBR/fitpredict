// MUI Imports
import Box from '@mui/material/Box';

// Type Import
import {HorizontalNavItemsType} from '@/types/system';

// Utils
// import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// Menu Components
import HorizontalNavItems from './HorizontalNavItems';

interface Props {
  horizontalNavItems?: HorizontalNavItemsType;
}

const Navigation = (props: Props) => {
  return (
    <Box
      className="menu-content"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& > *': {
          '&:not(:last-child)': {mr: 2},
          maxWidth: 320,
        },
      }}
    >
      <HorizontalNavItems {...props} />
    </Box>
  );
};

export default Navigation;
