'use client';
import { useContext, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';

import AppContext from '@/context/AppContext';
import AuthContext from './widgets/auth/AuthContext';

import NavBar from './components/navBar/Index';
import SignupLogin from './widgets/auth/Index';
import ScrumManagerPage from './scrumManager/page';
import AgileCodingPage from './agileCoding/page';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMode } from './theme/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleDialogDemo from './components/dialog/Dialog';
import SimpleDialog from './components/dialog/Dialog';
import UIContext from '@/context/UIContext';
export default function Home({}) {
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

      default:
        return <SignupLogin />;
    }
  };
  const data = ['username@gmail.com', 'user02@gmail.com'];

  const [selectedValue, setSelectedValue] = useState(data[1]);

  const handleClickOpen = () => {
    setShowDialog(true);
  };

  return (
    <>
      {' '}
      <ThemeProvider theme={theme}>
        {user ? (
          <>
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
              <Box
                sx={
                  {
                    // width: '100vw',
                    // height: '100vh',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }
                }
              >
                <NavBar />
              </Box>
              {uiElements()} <ToastContainer />{' '}
            </Box>
          </>
        ) : (
          <Paper>
            {' '}
            {/* <NavBar /> */}
            <SignupLogin />
          </Paper>
        )}
      </ThemeProvider>
    </>
  );
}
