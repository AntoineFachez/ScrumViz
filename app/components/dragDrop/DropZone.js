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
  // console.log(
  //   "droppedItemName",
  //   dataTransfer,
  //   // setDataTransfer,
  //   handleDrop,
  //   droppedItemsArray,
  //   // styled,
  // );
  const { getRootProps, getInputProps } = useDropzone({
    // onDrop,
    accept: 'image/*',
  });
  const DropZoneContent = droppedItemsArray;
  return (
    <Box
      className="dropZone"
      {...getRootProps()}
      // sx={dropzoneStyles}
      sx={styled?.dropZone}
      onDragEnter={(e) => {
        e.preventDefault();
        //    console.log("dropped", e.dataTransfer.getData("text/plain"));
      }}
      onDrop={(e) => {
        e.preventDefault();
        // console.log('dataTransfer', e.dataTransfer.getData('text/plain'));
        const droppedData = e.dataTransfer.getData('text/plain');
        //    console.log("dropped", JSON.parse(droppedData));
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
