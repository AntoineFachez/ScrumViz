import { Send } from '@mui/icons-material';
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
    <Box sx={styled.signUpLogInCard.footer}>
      {show && (
        <>
          {' '}
          <Button
            endIcon={<Send sx={{ ...styled.menuButtonText.action }} />}
            sx={{ ...styled.menuButtonText.action, color: 'white' }}
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
