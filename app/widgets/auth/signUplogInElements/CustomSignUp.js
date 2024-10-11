import { Button } from '@mui/material';
import React, { useState } from 'react';
import SignUpWithEmailPawword from './customSignUp/SignUpWithEmailPawword';
import LogIn from './customSignUp/LogIn';

export default function CustomSignUp({ widgetProps }) {
  const {
    showSignUp,
    setShowSignUp,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    users,
    user,
    setUser,
    setUserInFocus,
    setAlert,
    switchToSignUp,
    styled,
  } = widgetProps;

  return (
    <>
      {' '}
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
      </>
    </>
  );
}
