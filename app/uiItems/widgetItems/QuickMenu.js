import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

export default function QuickMenu({ widgetProps, styled }) {
  const { quickMenuButtonArray } = widgetProps;

  const quickMenu = quickMenuButtonArray.map((button, i) => (
    <Tooltip key={i} title={button.tooltip_title} placement="top" arrow>
      <IconButton
        className="widget"
        sx={styled?.iconButton?.action}
        onClick={button.onClickHandler}
      >
        {button.icon}
      </IconButton>
    </Tooltip>
  ));
  return <Box sx={styled.spacesMenu}>{quickMenu}</Box>;
}
