import { Box, Paper } from '@mui/material';
import React from 'react';

export default function Draggable({
  listItemRef,
  dataSlug,
  keyToPass,
  item,
  htmlItem,
  width,
  // styled,
}) {
  const styled = {
    draggable: {
      // width: "100%",
      width: 'fit-content',
      // height: `${100}%`,
      // height: "100%",
      height: 'fit-content',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      cursor: 'grab',
      // backgroundColor: () => themeSettings(colorMode).neutral.dark,
      // overflow: "scroll",
    },
  };
  return (
    <Box
      ref={listItemRef}
      data-slug={dataSlug}
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
