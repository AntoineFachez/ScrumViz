'use client';
import React, { useContext, useEffect, useState } from 'react';

import AppContext, { AppState } from '@/context/AppContext';
import AuthContext from './AuthContext';
import UIContext from '@/context/UIContext';

import LogOut from './signUplogInElements/customSignUp/LogOut';

import { handleCreateNewUser, handleLogIn } from './functions/helper';
import { signIn, useSession } from 'next-auth/react';

import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';
import CardTemplate from './CardCompiler';
import { auth } from '@/firebase/firebase';

export default function Index({ welcome }) {
  const { log, setLog, alert, setAlert } = useContext(AppContext);
  const { userRole } = useContext(UIContext);
  const session = useSession();
  const [theme, colorMode, palette, styled] = useMode();
  const [error, setError] = useState();
  const {
    showSignUp,
    setShowSignUp,
    signInLoading,
    setSignInLoading,
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

  const firebaseContext = 'users';

  const handleSubmit = async (e, method) => {
    welcome(true);
    setSignInLoading(true);
    e.preventDefault();
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
    if (method === '') {
      // welcome(true);
      () => onSubmit('emailPassword');
    } else if (method === 'logIn') {
      // welcome(true);
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
    handleLogIn,
    auth,
    error,
    setError,
    onSubmit,
    users,
    user,
    setUser,
    setUserInFocus,
    setAlert,
    switchToSignUp,
    session,
    styled,
  };
  useEffect(() => {
    setSignInLoading(false);
    return () => {};
  }, [session]);

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
