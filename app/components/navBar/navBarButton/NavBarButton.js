import { IconButton } from '@mui/material';
import React from 'react';

export default function NavBarButton({
  appContext,
  widgetContext,
  onClick,
  iconButton,
  styled,
}) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: appContext === widgetContext ? 'white' : 'grey',
        // backgroundColor: appContext === widgetContext ? "green" : "transparent",
      }}
    >
      {iconButton}
    </IconButton>
  );
}
