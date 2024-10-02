import {
  AccountTree,
  CloseFullscreen,
  FilterList,
  Grain,
  GridView,
  OpenInFull,
  SearchOutlined,
  Summarize,
} from '@mui/icons-material';

export const buttonData = [
  { action: 'changeView', state: 'card', icon: <GridView /> },
  { action: 'changeView', state: 'chip', icon: <Grain /> },
  { action: 'changeView', state: 'singleItem', icon: <Summarize /> },
  { action: 'changeView', state: 'tree', icon: <AccountTree /> },
  { action: 'changeView', state: 'table', icon: <FilterList /> },
];
