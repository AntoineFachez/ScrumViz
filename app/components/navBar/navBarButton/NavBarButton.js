import { IconButton } from '@mui/material';
import React from 'react';

export default function NavBarButton({ widgetProps, styled }) {
  const { uiGridMapContext, dropWidgetName, onClick, iconButton } = widgetProps;
  return (
    <IconButton
      className="navBarButton"
      onClick={onClick}
      sx={
        uiGridMapContext === dropWidgetName
          ? styled.navBarButton.active
          : styled.navBarButton.inactive
      }
    >
      {iconButton}
    </IconButton>
  );
}
