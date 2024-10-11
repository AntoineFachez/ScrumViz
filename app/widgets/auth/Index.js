'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

import AppContext, { AppState } from '@/context/AppContext';
// import InFocusContext from '@/context/InFocusContext';
import UIContext from '@/context/UIContext';
import AuthContext from './AuthContext';

import LogIn from './signUplogIn/LogIn';
import LogOut from './signUplogIn/LogOut';
import SignUpWithEmailPawword from './signUplogIn/SignUpWithEmailPawword';

import { handleCreateNewUser } from './helper';
import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';
import { notify } from '@/utils/utils';
// import './log-in.css';

export default function Index({}) {
  const { alert, setAlert } = useContext(AppContext);
  const { users, user, setUser, userInFocus, setUserInFocus } =
    useContext(AuthContext);

  const [theme, colorMode, palette, styled] = useMode();
  // const { coordsInFocus } = useContext(InFocusContext);

  const { userRole } = useContext(UIContext);
  const firebaseContext = 'users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const switchToSignUp = () => {
    if (!showSignUp) {
      setAlert({ state: '', note: '' });
      setShowSignUp(true);
    } else {
      setAlert({ state: '', note: '' });
      setShowSignUp(false);
    }
  };

  const handleSubmit = async () => {
    handleCreateNewUser(
      email,
      password,
      confirmPassword,
      userRole,
      // coordsInFocus,
      firebaseContext,
      setAlert
    );
  };

  return (
    <>
      {!user ? (
        <Box sx={styled.signUpLogInCard}>
          {' '}
          <button onClick={() => signIn('google')}>Sign in with Google</button>
          {showSignUp ? (
            <Button
              sx={styled.menuButtonText.action}
              size="small"
              onClick={switchToSignUp}
            >
              already an account ?
            </Button>
          ) : (
            <Button
              sx={styled.menuButtonText.action}
              size="small"
              onClick={switchToSignUp}
            >
              Sign Up ?
            </Button>
          )}
          <>
            {' '}
            {showSignUp ? (
              <>
                <SignUpWithEmailPawword
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  switchToSignUp={switchToSignUp}
                  onSubmit={handleSubmit}
                  setAlert={setAlert}
                />
              </>
            ) : (
              <>
                <LogIn
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  switchToSignUp={switchToSignUp}
                  users={users}
                  user={user}
                  setUser={setUser}
                  setUserInFocus={setUserInFocus}
                  setAlert={setAlert}
                />
              </>
            )}
          </>{' '}
          <p className="signUp-logIn-message">{alert?.message}</p>
        </Box>
      ) : (
        <>
          {' '}
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
