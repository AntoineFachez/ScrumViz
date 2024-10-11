import React from 'react';
import { Box, Button } from '@mui/material';

import { signIn } from 'next-auth/react';

export default function LogInProviders({ widgetProps }) {
  const { handleSubmit, styled } = widgetProps;
  return (
    <Box
      component={'ul'}
      sx={{
        ...styled.card,
        justifyContent: 'center',
        height: '100%',
        // flexFlow: 'column nowrap',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Button
        sx={styled.menuButtonText.action}
        onClick={() => handleSubmit('google')}
      >
        Sign in with Google
      </Button>{' '}
      <Button
        sx={styled.menuButtonText.action}
        onClick={() => handleSubmit('google')}
      >
        Sign in with GitHub
      </Button>{' '}
    </Box>
  );
}
