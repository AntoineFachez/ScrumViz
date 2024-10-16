import React, { useContext } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { Home, DarkMode, LightMode, Settings, Info } from '@mui/icons-material';
import AppContext from '@/context/AppContext';

import NavBarWidgetList from './navBarWidgets/Index';
import Logout from '../../widgets/auth/Index';
import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';
import UIContext from '@/context/UIContext';
import InFocusOverView from '@/app/uiItems/navBar/InFocusOverView';
import Profile from '@/app/profile/page';

export default function NavBar({ showDev, setShowDev }) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);

  const {
    showWidgetMenus,
    setShowWidgetMenus,
    setShowPaneMenu,
    userRole,
    navBarWidgetList,
    toggleBG,
    setToggleBG,
  } = useContext(UIContext);
  const handleClick = () => {
    setShowDev(!showDev);
  };

  return (
    <Box
      className="navBar widget"
      sx={{
        ...styled?.navBar,
        flexFlow: 'row nowrap',
      }}
      square="true"
    >
      {' '}
      <Tooltip title={'home'} placement="bottom" arrow={true}>
        <IconButton
          onClick={() => {
            setAppContext('home');
            setUiGridMapContext('');
            // window.location.href = '/';
          }}
          sx={
            appContext === 'home'
              ? { ...styled.navBarButton.active }
              : { ...styled.navBarButton.inactive }
          }
        >
          <Home />
        </IconButton>{' '}
      </Tooltip>
      <NavBarWidgetList data={navBarWidgetList} styled={styled} />
      {appContext !== 'home' ? (
        <>
          {/* <Box>
            <SelectUserRole />
          </Box> */}
          <InFocusOverView contextToolBar="navBar" styled={styled} />

          {/* <IconButton
            sx={{
              width: '2.5rem',
              height: '2.5rem',
              color: showDev ? 'deeppink' : 'grey',
              '&:hover': {
                color: showDev ? 'grey' : '#ccc',
                backgroundColor: showDev ? 'grey' : '#444',
              },
            }}
            onClick={handleClick}
          >
            {showDev ? <DeveloperBoard /> : <DeveloperBoardOff />}
          </IconButton> */}
        </>
      ) : null}{' '}
      <Tooltip title={'show menues'} placement="bottom" arrow={true}>
        <IconButton
          onClick={() => setShowWidgetMenus((prev) => !prev)}
          sx={
            showWidgetMenus
              ? { ...styled.navBarButton.active }
              : { ...styled.navBarButton.inactive }
          }
        >
          <Settings />
        </IconButton>
      </Tooltip>
      <Tooltip title={'show handout'} placement="bottom" arrow={true}>
        <IconButton
          onClick={() => setToggleBG((prev) => !prev)}
          sx={
            toggleBG
              ? { ...styled.navBarButton.active }
              : { ...styled.navBarButton.inactive }
          }
        >
          <Info />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title={'dark mode'} placement="bottom" arrow={true}>
        <IconButton
          onClick={colorMode?.toggleColorMode}
          sx={styled.navBarButton.inactive}
        >
          {colorMode.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip> */}
      <Profile uiContext="navBar" />
      <Logout />
    </Box>
  );
}
