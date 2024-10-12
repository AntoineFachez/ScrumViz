import React from 'react';
import { Box, Button } from '@mui/material';

export default function LogInProviders({ widgetProps }) {
  const { handleSubmit, styled } = widgetProps;
  return (
    <Box
      component={'ul'}
      sx={{
        ...styled.card,
        ...styled.signUpLogInCard.body,
      }}
    >
      <Button
        sx={styled.menuButtonText.action}
        onClick={(e) => handleSubmit(e, 'google')}
      >
        Sign in with Google
      </Button>{' '}
      <Button
        sx={styled.menuButtonText.action}
        onClick={(e) => handleSubmit(e, 'github')}
      >
        Sign in with GitHub
      </Button>{' '}
    </Box>
  );
}
