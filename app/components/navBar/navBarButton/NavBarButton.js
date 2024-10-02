import { IconButton } from '@mui/material';
import React from 'react';

export default function NavBarButton({
  scrumManagerContext,
  dropWidgetName,
  onClick,
  iconButton,
  styled,
}) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: scrumManagerContext === dropWidgetName ? 'white' : 'grey',
        // backgroundColor: appContext === widgetContext ? "green" : "transparent",
      }}
    >
      {iconButton}
    </IconButton>
  );
}
