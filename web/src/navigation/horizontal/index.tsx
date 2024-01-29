// Type Imports
import {HorizontalNavItemsType} from '@/types/system';

// Icons Imports
import Home from 'mdi-material-ui/Home';
import Whatshot from '@mui/icons-material/Whatshot';
import HomeOutline from 'mdi-material-ui/HomeOutline';
import WhatshotOutlined from '@mui/icons-material/WhatshotOutlined';

function navigation(): HorizontalNavItemsType {
  return [
    // Dashboard
    {
      title: 'Dashboard',
      icon: HomeOutline,
      selectedIcon: Home,
      path: '/apps/dashboard',
    },
    //Metas
    {
      title: 'Metas',
      icon: WhatshotOutlined,
      selectedIcon: Whatshot,
      path: '/apps/goals',
    },
  ];
}

export default navigation;
