'use client';
import { Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppContext from '@/context/AppContext';
import AuthContext from '../../widgets/auth/AuthContext';
import NavBar from './NavBar';
import ThemeContext from '@/app/theme/ThemeContext';

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
  // const [isOn, setIsOn] = useState(false);

  return (
    <>
      {user && (
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
          // styled={styled}
        />
      )}
    </>
  );
}
