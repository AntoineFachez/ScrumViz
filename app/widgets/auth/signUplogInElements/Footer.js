import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function Footer({ widgetProps, show }) {
  const {
    showSignUp,
    switchToSignUp,
    handleLogIn,
    auth,
    email,
    password,
    setUser,
    setUserInFocus,
    setAlert,
    setError,
    error,
    styled,
  } = widgetProps;

  return (
    <Box sx={{ height: '2rem' }}>
      {show && (
        <>
          {' '}
          <Button
            sx={styled.menuButtonText.action}
            onClick={(e) =>
              handleLogIn(
                e,
                auth,
                email,
                password,
                setUser,
                setUserInFocus,
                setAlert,
                setError
              )
            }
            size="small"
          >
            Log In
          </Button>
          <Typography>{error?.code}</Typography>
        </>
      )}
    </Box>
  );
}
