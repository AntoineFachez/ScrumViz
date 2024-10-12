'use client';

import { useContext, useRef, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

import AppContext from '@/context/AppContext';
import AuthContext from './widgets/auth/AuthContext';
import UIContext from '@/context/UIContext';

import NavBar from './components/navBar/Index';
import SignupLogin from './widgets/auth/Index';
import ScrumManagerPage from './scrumManager/page';
import AgileCodingPage from './agileCoding/page';
import Home from './home/page';
import Profile from './profile/page';

import { useMode } from './theme/ThemeContext';

import 'react-toastify/dist/ReactToastify.css';
import SketchWrapper from './p5/SketchWrapper';

export default function BasePage({ session }) {
  const { user } = useContext(AuthContext);
  const { appContext } = useContext(AppContext);
  const { showDialog, setShowDialog } = useContext(UIContext);
  const [theme, colorMode, palette, styled] = useMode();

  const uiElements = () => {
    switch (appContext) {
      case 'agileCoding':
        return <AgileCodingPage />;
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
  // const data = ['username@gmail.com', 'user02@gmail.com'];

  // const [selectedValue, setSelectedValue] = useState(data[1]);

  const handleClickOpen = () => {
    setShowDialog(true);
  };
  const containerRef = useRef();
  return (
    <SessionProvider session={session}>
      <Box
        ref={containerRef}
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: styled?.navBar.height,
        }}
      >
        {' '}
        <ThemeProvider theme={theme}>
          {user ? (
            <>
              {/* <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
              }}
            > */}
              <NavBar />
              {/* </Box> */}
              {uiElements()}{' '}
            </>
          ) : (
            <>
              <Box
                sx={{
                  height: '100%',
                  maxHeight: '16rem',
                  display: 'flex',
                  flexFlow: 'row',
                  // justifyContent: 'flex-start',
                }}
              >
                {/* <SketchWrapper
                  containerRef={containerRef}
                  textToWrite="hello"
                /> */}
                <SignupLogin />
              </Box>
            </>
          )}
          <ToastContainer />
        </ThemeProvider>{' '}
      </Box>
    </SessionProvider>
  );
}
