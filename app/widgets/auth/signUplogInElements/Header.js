import { Undo } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';

export default function Header({ widgetProps, show }) {
  const { showSignUp, switchToSignUp, styled } = widgetProps;

  return (
    <Box sx={styled.signUpLogInCard.header}>
      {show && (
        <>
          {showSignUp ? (
            <Button
              startIcon={<Undo sx={{ ...styled.menuButtonText.action }} />}
              sx={{ ...styled.menuButtonText.action, color: 'white' }}
              size="small"
              onClick={switchToSignUp}
            >
              already an account ?
            </Button>
          ) : (
            <Button
              startIcon={<Undo sx={{ ...styled.menuButtonText.action }} />}
              sx={{ ...styled.menuButtonText.action, color: 'white' }}
              size="small"
              onClick={switchToSignUp}
            >
              Sign Up ?
            </Button>
          )}{' '}
        </>
      )}
    </Box>
  );
}
