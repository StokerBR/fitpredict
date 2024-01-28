export type DefaultApiError = {
  statusCode: number;
  message: string;
};

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type NavLink = {
  icon?: any;
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  selectedIcon?: any;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  badgeColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
};

export type NavGroup = {
  icon?: any;
  title: string;
  action?: string;
  subject?: string;
  selectedIcon?: any;
  badgeContent?: string;
  children?: (NavGroup | NavLink)[];
  badgeColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
};

export type HorizontalNavItemsType = (NavLink | NavGroup)[];
