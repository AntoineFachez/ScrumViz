import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function QuickMenu({ widgetProps, styled }) {
  const { quickMenuButtonArray } = widgetProps;

  const quickMenu = quickMenuButtonArray.map((button, i) => (
    <>
      <Box sx={styled.spacesMenu}>
        <Tooltip title={button.tooltip_title} placement="top" arrow>
          <IconButton
            className="widget"
            sx={styled?.iconButton?.action}
            onClick={button.onClickHandler}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  ));
  return quickMenu;
}
