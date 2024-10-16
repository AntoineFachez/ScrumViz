import { Box, Typography } from '@mui/material';
import React from 'react';

export default function GreetingText() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '40ch',
        height: 'fit-content',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        // padding: '0 5rem',
        gap: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          &apos;A computer can never <br />
          be held accountable <br />
          for a mistake,
        </Typography>
        <Typography
          variant="h5"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '1rem 0',
          }}
        >
          - therefore -
        </Typography>
        <Typography
          variant="h5"
          sx={{
            width: '100%',
            height: 'fit-content‚',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          a computer must never <br />
          be in charge <br />
          of a management decision.&apos;
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{
          width: '40ch',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        IBM, 1979
      </Typography>
    </Box>
  );
}
