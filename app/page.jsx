'use client';
import { useContext, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import AppContext from '@/context/AppContext';
import AuthContext from './widgets/auth/AuthContext';
import UIContext from '@/context/UIContext';

import NavBar from './components/navBar/Index';
import SignupLogin from './widgets/auth/Index';
import ScrumManagerPage from './scrumManager/page';
import AgileCodingPage from './agileCoding/page';
import Home from './home/page';

import 'react-toastify/dist/ReactToastify.css';
import { useMode } from './theme/ThemeContext';
import Profile from './profile/page';

export default function BasePage({}) {
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
  const data = ['username@gmail.com', 'user02@gmail.com'];

  const [selectedValue, setSelectedValue] = useState(data[1]);

  const handleClickOpen = () => {
    setShowDialog(true);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: styled?.navBar.height,
      }}
    >
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
            <SignupLogin />
          </>
        )}
        <ToastContainer />
      </ThemeProvider>{' '}
    </Box>
  );
}
