'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

import AppContext from '@/context/AppContext';
import AuthContext from './widgets/auth/AuthContext';
import UIContext from '@/context/UIContext';

import NavBar from './components/navBar/Index';
import SignupLogin from './widgets/auth/Index';
import ScrumManagerPage from './scrumManager/page';
// import AgileCodingPage from './agileCoding/page';
import Home from './home/page';
import Profile from './profile/page';

import SketchWrapper from './p5/particleCircle/SketchWrapper';
import GreetingText from './components/greetingText/GreetingText';

import 'react-toastify/dist/ReactToastify.css';
import { useMode } from './theme/ThemeContext';
import TemporaryDrawer from './components/drawer/Index';
import { Menu, ViewSidebar } from '@mui/icons-material';
import DrawerCreateNewItem from './uiItems/newItem/DrawerCreateNewItem';

export default function BasePage({ session }) {
  const { user } = useContext(AuthContext);
  const { appContext } = useContext(AppContext);
  const { signInLoading } = useContext(AuthContext);
  const {
    showDialog,
    setShowDialog,
    handleToggleDrawer,
    drawerMenu,
    drawerFloorElement,
    handleGoBack,
  } = useContext(UIContext);
  const [theme, colorMode, palette, styled] = useMode();

  const uiElements = () => {
    switch (appContext) {
      // case 'agileCoding':
      //   return <AgileCodingPage />;
      case 'scrumManager':
        return <ScrumManagerPage />;
      case 'home':
        return <Home />;
      case 'profile':
        return <Profile />;

      default:
        return <Home />;
    }
  };

  const containerRef = useRef();
  const [proceedWelcome, setProceedWelcome] = useState(false);
  const welcome = (state) => {
    setProceedWelcome(true);
    setTimeout(() => {
      setProceedWelcome(false);
    }, 10000);
  };
  useEffect(() => {
    console.log(proceedWelcome);

    return () => {};
  }, [proceedWelcome]);

  return (
    <SessionProvider session={session}>
      <Box
        ref={containerRef}
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: styled?.navBar.height,
        }}
      >
        <ThemeProvider theme={theme}>
          {user ? (
            <>
              <>
                <NavBar /> {uiElements()}
              </>
            </>
          ) : (
            <>
              {' '}
              {proceedWelcome ? (
                <>
                  <GreetingText />
                </>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    maxHeight: '16rem',
                    display: 'flex',
                    flexFlow: 'row',
                  }}
                >
                  <SignupLogin welcome={welcome} />
                </Box>
              )}
            </>
          )}{' '}
          <TemporaryDrawer
            drawerMenu={drawerMenu}
            handleGoBack={handleGoBack}
            drawerFloorElement={drawerFloorElement}
            styled={styled}
          />
          <DrawerCreateNewItem />
        </ThemeProvider>{' '}
      </Box>
      <ToastContainer />
    </SessionProvider>
  );
}
