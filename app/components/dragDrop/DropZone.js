import { Box } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone({
  dataTransfer,
  // setDataTransfer,
  handleDrop,
  droppedItemsArray,
  styled,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    // onDrop,
    accept: 'image/*',
  });
  const DropZoneContent = droppedItemsArray;
  return (
    <Box
      className="dropZone"
      {...getRootProps()}
      sx={styled?.dropZone}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const droppedData = e.dataTransfer.getData('text/plain');
        // handleDrop(JSON.parse(droppedData));
        handleDrop(droppedData);
        // handleDrop(dataTransfer);
        // setDataTransfer(droppedData);
      }}
    >
      {/* {() => <DropZoneContent />} */}
      {droppedItemsArray}
    </Box>
  );
}
