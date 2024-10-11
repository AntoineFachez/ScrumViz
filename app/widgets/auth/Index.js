'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';

import AppContext, { AppState } from '@/context/AppContext';
// import InFocusContext from '@/context/InFocusContext';
import AuthContext from './AuthContext';
import UIContext from '@/context/UIContext';

import LogIn from './signUplogInElements/customSignUp/LogIn';
import LogOut from './signUplogInElements/customSignUp/LogOut';
import SignUpWithEmailPawword from './signUplogInElements/customSignUp/SignUpWithEmailPawword';

import { notify } from '@/utils/utils';
import { handleCreateNewUser } from './functions/helper';
import { signIn } from 'next-auth/react';
import LogInProviders from './signUplogInElements/LogInProviders';
import CustomSignUp from './signUplogInElements/CustomSignUp';
// import './log-in.css';

import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';
import CardTemplate from './CardTemplate';

export default function Index({}) {
  const { alert, setAlert } = useContext(AppContext);
  const [theme, colorMode, palette, styled] = useMode();
  const {
    showSignUp,
    setShowSignUp,
    users,
    setUsers,
    user,
    setUser,
    userInFocus,
    setUserInFocus,
    // userLocation,
    // setUserLocation,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useContext(AuthContext);

  const { userRole } = useContext(UIContext);
  const firebaseContext = 'users';

  const handleSubmit = async (method) => {
    if (method === 'google') {
      signIn('google');
    } else if (method === 'emailPassword') {
      handleCreateNewUser(
        email,
        password,
        confirmPassword,
        userRole,
        // coordsInFocus,
        firebaseContext,
        setAlert
      );
    }
  };
  const onSubmit = (method) => {
    if (method) {
      () => onSubmit('emailPassword');
    } else {
      handleLogIn(
        e,
        auth,
        email,
        password,
        setUser,
        setUserInFocus,
        setAlert,
        setError
      );
    }
  };
  const switchToSignUp = () => {
    if (!showSignUp) {
      setAlert({ state: '', note: '' });
      setShowSignUp(true);
    } else {
      setAlert({ state: '', note: '' });
      setShowSignUp(false);
    }
  };
  const widgetProps = {
    showSignUp,
    setShowSignUp,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    onSubmit,
    users,
    user,
    setUser,
    setUserInFocus,
    setAlert,
    switchToSignUp,
    styled,
  };

  // const { coordsInFocus } = useContext(InFocusContext);

  return (
    <>
      {!user ? (
        <>
          <CardTemplate widgetProps={widgetProps} />{' '}
          <p className="signUp-logIn-message">{alert?.message}</p>
        </>
      ) : (
        <>
          <LogOut
            user={user}
            setUser={setUser}
            userInFocus={userInFocus}
            setUserInFocus={setUserInFocus}
            setAlert={setAlert}
            styled={styled}
          />
        </>
      )}
    </>
  );
}
