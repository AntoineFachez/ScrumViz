'use client';
import { useContext } from 'react';
import { Box } from '@mui/material';

import AppContext from '@/context/AppContext';
import AuthContext from './widgets/auth/AuthContext';

import SignupLogin from './widgets/auth/Index';
import ScrumManagerPage from './scrumManager/page';

import styles from './page.module.css';
import AgileCodingPage from './agileCoding/page';

export default function Home({}) {
  const { user } = useContext(AuthContext);
  const { appContext } = useContext(AppContext);
  // console.log(user);

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
      {user ? (
        uiElements()
      ) : (
        <Box>
          <SignupLogin />
        </Box>
      )}
    </>
  );
}
