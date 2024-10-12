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
          )}{' '}
        </>
      )}
    </Box>
  );
}
