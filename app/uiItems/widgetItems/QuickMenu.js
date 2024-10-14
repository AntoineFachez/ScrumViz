import { Add } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';

export default function QuickMenu({ widgetProps, styled }) {
  const { tooltipTitle_newItem, onClickNewItem } = widgetProps;
  const quickMenu = (
    <Box
      className="widget-menu"
      sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
    >
      <Tooltip title={tooltipTitle_newItem} placement="top" arrow>
        <IconButton sx={styled?.iconButton?.action} onClick={onClickNewItem}>
          <Add />
        </IconButton>
      </Tooltip>
    </Box>
  );
  return quickMenu;
}
