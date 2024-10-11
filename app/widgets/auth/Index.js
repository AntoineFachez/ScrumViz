'use client';
import React, { useContext, useEffect, useState } from 'react';

import AppContext, { AppState } from '@/context/AppContext';
import AuthContext from './AuthContext';
import UIContext from '@/context/UIContext';

import LogOut from './signUplogInElements/customSignUp/LogOut';

import { handleCreateNewUser } from './functions/helper';
import { signIn } from 'next-auth/react';

import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';
import CardTemplate from './CardTemplate';

export default function Index({}) {
  const { alert, setAlert } = useContext(AppContext);
  const [theme, colorMode, palette, styled] = useMode();
  const {
    showSignUp,
    setShowSignUp,
    users,
    user,
    setUser,
    userInFocus,
    setUserInFocus,
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
    } else if (method === 'github') {
      signIn('github');
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
