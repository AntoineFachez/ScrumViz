'use client';
import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppContext from '@/context/AppContext';
import AuthContext from '../../widgets/auth/AuthContext';
import NavBar from './NavBar';
import ThemeContext, { useMode } from '@/app/theme/ThemeContext';
import BreadCrumbs from './BreadCrumbs';

export default function Index({ navBarHeight }) {
  const { user } = useContext(AuthContext);
  const {
    showDev,
    setShowDev,
    appContext,
    setAppContext,
    rootKeys,
    welcome,
    setWelcome,
    switchDesktopSketch,
    setSwitchDesktopSketch,
    playGame,
    setPlayGame,
    switchDesktopPlayGround,
    setPlayGround,
  } = useContext(AppContext);
  const [theme, colorMode, palette, styled] = useMode();
  // const [isOn, setIsOn] = useState(false);

  return (
    <>
      {user && (
        <Box
          // sx={{ width: '100%', display: 'flex', flexFlow: 'column' }}
          className="widget"
          sx={{
            // ...styled?.navBar,
            zIndex: 100,
            position: 'absolute',
            width: '100%',
            top: '3rem',
            display: 'flex',
            flexFlow: 'column nowrap',
          }}
          square={true}
        >
          {' '}
          <BreadCrumbs />
          <NavBar
            showDev={showDev}
            setShowDev={setShowDev}
            navBarHeight={navBarHeight}
            appContext={appContext}
            setAppContext={setAppContext}
            welcome={welcome}
            setWelcome={setWelcome}
            switchDesktopSketch={switchDesktopSketch}
            setSwitchDesktopSketch={setSwitchDesktopSketch}
            playGame={playGame}
            setPlayGame={setPlayGame}
            switchDesktopPlayGround={switchDesktopPlayGround}
            setPlayGround={setPlayGround}
            styled={styled}
            colorMode={colorMode}
          />
        </Box>
      )}
    </>
  );
}
