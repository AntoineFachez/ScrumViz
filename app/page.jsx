'use client';
import { useContext } from 'react';
import { Box, Paper } from '@mui/material';

import AppContext from '@/context/AppContext';
import AuthContext from './widgets/auth/AuthContext';

import NavBar from './components/navBar/Index';
import SignupLogin from './widgets/auth/Index';
import ScrumManagerPage from './scrumManager/page';
import AgileCodingPage from './agileCoding/page';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMode } from './theme/ThemeContext';
import { useEffect } from 'react';

export default function Home({}) {
  const { user } = useContext(AuthContext);
  const { appContext } = useContext(AppContext);
  const [theme, colorMode, palette, styled] = useMode();

  const uiElements = () => {
    switch (appContext) {
      case 'agileCoding':
        return <AgileCodingPage />;
      case 'scrumManager':
        return <ScrumManagerPage />;
      default:
        return <SignupLogin />;
    }
  };

  return (
    <>
      {' '}
      <ThemeProvider theme={theme}>
        {user ? (
          <>
            <NavBar />
            {uiElements()}
          </>
        ) : (
          <Paper>
            <SignupLogin />
          </Paper>
        )}
      </ThemeProvider>
    </>
  );
}
