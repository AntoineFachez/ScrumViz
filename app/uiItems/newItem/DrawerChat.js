'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';

import ChatInFocus from '../../widgets/chats/Index';

export default function DrawerChat() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        // paddingRight: '1rem',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          // paddingRight: '1rem',
          overflow: 'scroll',
        }}
      >
        <ChatInFocus startUpWidgetLayout="vertical" />{' '}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          flexFlow: 'column',
          // paddingRight: '1rem',
        }}
      >
        {' '}
        <ChatInFocus startUpWidgetLayout="inputField" />
      </Box>
    </Box>
  );
}
