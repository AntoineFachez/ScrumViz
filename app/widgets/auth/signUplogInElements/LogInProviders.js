import React from 'react';
import { Box, Button } from '@mui/material';
import { GitHub, Google } from '@mui/icons-material';

export default function LogInProviders({ widgetProps }) {
  const { handleSubmit, styled, session } = widgetProps;

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
  return (
    <Box
      component={'ul'}
      sx={{
        ...styled.card,
        ...styled.signUpLogInCard.body,
      }}
    >
      <Button
        startIcon={<Google sx={{ ...styled.menuButtonText.action }} />}
        sx={{ ...styled.menuButtonText.action, color: 'white' }}
        onClick={(e) => handleSubmit(e, 'google')}
      >
        Sign in with Google
      </Button>{' '}
      <Button
        startIcon={<GitHub sx={{ ...styled.menuButtonText.action }} />}
        sx={{ ...styled.menuButtonText.action, color: 'white' }}
        onClick={(e) => handleSubmit(e, 'github')}
      >
        Sign in with GitHub
      </Button>{' '}
    </Box>
  );
}
