import React, { useContext } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import {
  Grid4x4,
  Add,
  DeveloperBoard,
  Explore,
  BackupTable,
  Menu,
  DeveloperBoardOff,
  RotateLeft,
} from '@mui/icons-material';
import AppContext from '@/context/AppContext';
// import UIContext from '@/context/UIContext';

import NavBarWidgetList from './navBarWidgets/Index';
import { widgetListHome } from '../../pages/navBarWidgetList';
import Logout from '../../widgets/auth/Index';
import ThemeContext, { themeSettings } from '@/app/theme/ThemeContext';

export default function NavBar({ showDev, setShowDev }) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  // const { setShowPaneMenu, userRole } = useContext(UIContext);
  const handleClick = () => {
    setShowDev(!showDev);
  };
  return (
    <Box className="navBar" sx={{ ...styled.navBar, flexFlow: 'row nowrap' }}>
      {/* <ContextSelector /> */}
      {/* //* Widget ButtonBar */}
      {/* <Box sx={navBarButtonList}> */}
      <NavBarWidgetList
        data={
          appContext === 'home'
            ? widgetListHome
            : // : appContext === 'grid'
              // ? userRole === 'viewer'
              //   ? widgetListPublished
              //   : userRole === 'creator'
              //   ? widgetListCreator
              //   : userRole === 'researcher'
              //   ? widgetListResearcher
              widgetListHome
          // : null
        }
        navBarButtonList={styled.navBarButtonList}
      />{' '}
      {appContext}
      {/* </Box> */}
      {/* <IconButton
        sx={
          (styled?.iconButton,
          {
            // width: "2.5rem",
            // height: "2.5rem",
            color: playGround ? '#333433' : 'grey',
            backgroundColor: playGround ? 'white' : '#333433',
            '&:hover': {
              color: playGround ? '#333433' : '#ccc',
              backgroundColor: playGround ? 'grey' : '#444',
            },
          })
        }
        onClick={() => {
          setAppContext('spaces');
          return setShowPaneMenu((prevState) => !prevState);
        }}
      >
        <Menu />
      </IconButton> */}
      {/* <IconButton
        sx={
          (styled?.iconButton,
          {
            // width: "2.5rem",
            // height: "2.5rem",
            color: playGround ? "#333433" : "grey",
            backgroundColor: playGround ? "white" : "#333433",
            "&:hover": {
              color: playGround ? "#333433" : "#ccc",
              backgroundColor: playGround ? "grey" : "#444",
            },
          })
        }
        onClick={() => setAppContext("grid")}
      >
        <Grid4x4 />
      </IconButton>{" "} */}
      {/* <IconButton
        sx={styled?.iconButton}
        onClick={() => {
          // resetLayout(viewerGridMap);
          setAppContext("home");
          setTimeout(() => setAppContext("grid"), 30);
          return;
        }}
      >
        <RotateLeft />
      </IconButton>{" "} */}
      {appContext !== 'home' ? (
        <>
          <Box>{/* <SelectUserRole /> */}</Box>
          {/* <InFocusOverView
            contextToolBar="navBar"
            styled={styled}
          /> */}

          <IconButton
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
          </IconButton>
        </>
      ) : null}{' '}
      <Logout />
    </Box>
  );
}
