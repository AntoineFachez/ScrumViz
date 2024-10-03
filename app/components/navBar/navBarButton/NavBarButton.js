import { IconButton } from '@mui/material';
import React from 'react';

export default function NavBarButton({
  uiGridMapContext,
  widgetProps,
  dropWidgetName,
  onClick,
  iconButton,
  styled,
}) {
  console.log('uiGridMapContext', styled.navBarButton.active);

  return (
    <IconButton
      onClick={onClick}
      sx={
        uiGridMapContext === dropWidgetName
          ? styled.navBarButton.active
          : styled.navBarButton.inactive

        // color:
        //   uiGridMapContext === dropWidgetName
        //     ? styled.navBarButton.active
        //     : styled.navBarButton.inactive,
        // backgroundColor:
        //   uiGridMapContext === dropWidgetName ? 'green' : 'transparent',
      }
      // sx={styled.navBarButton}
    >
      {iconButton}
    </IconButton>
  );
}
