import { Box } from '@mui/material';
import React from 'react';

export default function Draggable({
  listItemRef,
  dataSlug,
  keyToPass,
  item,
  htmlItem,
  width,
  styled,
}) {
  return (
    <Box
      ref={listItemRef}
      dataSlug={dataSlug}
      className={`draggable ${item}`}
      key={keyToPass}
      draggable={true}
      onDragStart={(e) => {
        //    console.log("dragged e.dataTransfer", e.dataTransfer);
        e.dataTransfer.setData('text/plain', JSON.stringify(item)); // Serialize and store the item's data
      }}
      sx={styled?.draggable}
    >
      {htmlItem}
    </Box>
  );
}
