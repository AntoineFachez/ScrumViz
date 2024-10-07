import { Tooltip } from '@mui/material';
import React from 'react';

export default function ToolTipComponent({
  i,
  title,
  placement,
  arrow,
  content,
}) {
  return (
    <Tooltip key={i} title={title} placement={placement} arrow={arrow}>
      {content}
    </Tooltip>
  );
}
