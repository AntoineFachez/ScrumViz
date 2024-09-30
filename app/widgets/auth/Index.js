'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import AppContext from '@/context/AppContext';
// import InFocusContext from '@/context/InFocusContext';
import UIContext from '@/context/UIContext';
import AuthContext from './AuthContext';

import LogIn from './signUplogIn/LogIn';
import LogOut from './signUplogIn/LogOut';
import SignUp from './signUplogIn/SignUp';

import { handleCreateNewUser } from './helper';
import ThemeContext, { themeSettings } from '@/app/theme/ThemeContext';

// import './log-in.css';

export default function Index({}) {
  const { palette, styled } = themeSettings('dark');
  const { users, user, setUser, userInFocus, setUserInFocus } =
    useContext(AuthContext);
  // const { coordsInFocus } = useContext(InFocusContext);

  const { userRole } = useContext(UIContext);
  const firebaseContext = 'users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [alert, setAlert] = useState(false);

  const switchToSignUp = () => {
    if (!showSignUp) {
      setAlert('');
      setShowSignUp(true);
    } else {
      setAlert('');
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
        <Box
          sx={{
            ...styled.card,
          }}
        >
          {showSignUp ? (
            <Button
              sx={styled.textButton}
              size="small"
              onClick={switchToSignUp}
            >
              already an account ?
            </Button>
          ) : (
            <Button
              sx={styled.textButton}
              size="small"
              onClick={switchToSignUp}
            >
              Sign Up ?
            </Button>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
            }}
          >
            {showSignUp ? (
              <>
                <SignUp
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  switchToSignUp={switchToSignUp}
                  setAlert={setAlert}
                  onSubmit={handleSubmit}
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
                  setAlert={setAlert}
                  users={users}
                  user={user}
                  setUser={setUser}
                  setUserInFocus={setUserInFocus}
                />
              </>
            )}
          </Box>
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
          />
        </>
      )}
    </>
  );
}
