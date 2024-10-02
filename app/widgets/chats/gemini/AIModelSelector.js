import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';

import { TextSnippet, Image, Close } from '@mui/icons-material';
export default function AIModelSelector({
  setShowGeminiCard,
  showGeminiCard,
  direction,
}) {
  return (
    <Box
      className="widget"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: direction,
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <>
        <IconButton
          sx={{
            width: '3rem',
            height: '3rem',
          }}
          onClick={() => setShowGeminiCard('text')}
        >
          <TextSnippet
            sx={{
              // width: "2rem",
              // height: "2rem",
              fontSize: '1.5rem',
              color: showGeminiCard === 'text' ? 'white' : 'grey',
              // margin: "2rem",
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            width: '3rem',
            height: '3rem',
          }}
          onClick={() => setShowGeminiCard('image')}
        >
          <Image
            sx={{
              // width: "2rem",
              // height: "2rem",
              fontSize: '1.5rem',
              color: showGeminiCard === 'image' ? 'white' : 'grey',
              // margin: "2rem",
            }}
          />
        </IconButton>
      </>
    </Box>
  );
}
