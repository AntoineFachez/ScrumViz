'use client';
import React, { useRef } from 'react';
import SketchWrapper from '../p5/SketchWrapper';
import { Box } from '@mui/material';
// import Profile from '../profile/page';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const containerRef = useRef();

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
      }}
    >
      <Box>Home</Box>
      <SketchWrapper containerRef={containerRef} />
    </Box>
  );
}
