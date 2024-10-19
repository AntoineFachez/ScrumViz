import React from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
export default function TileNewItem({ styled, handleToggleDrawer }) {
  return (
    <Box
      sx={{
        ...styled.card,
        width: '18rem',
        height: '14rem',
        position: 'relative',

        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '-1px 0 0 red, 0 1px 0 yellow, 1px 0 0 green, 0 -1px 0 blue',
      }}
    >
      <IconButton
        onClick={
          // () => {
          //   toggleDrawer("left", true);
          //   return toggleDrawer("left", true);
          // }
          handleToggleDrawer('right', true)
        }
        sx={styled?.iconButton?.action}
        // sx={
        //   selectedWidgetContext === 'drawer'
        //     ? styled?.iconButton?.active
        //     : styled?.iconButton?.inactive
        // }
      >
        <Add
          sx={{
            width: '3rem',
            height: '3rem',
          }}
        />
      </IconButton>

      <Typography
        sx={{
          ...styled.subTitle,

          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          transform: 'translate(0, 1rem)',
        }}
        variant={styled.subTitle.variant}
      >
        Create a Project
      </Typography>
    </Box>
  );
}
