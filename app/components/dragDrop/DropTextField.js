import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TextField, Chip, Paper, ListItem } from '@mui/material';

export default function DropzoneTextField({ onItemsUpdated, styled }) {
  const [chipData, setChipData] = useState([]);

  const [jsonData, setJsonData] = useState([]); // State to store jsonData

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    const updatedJsonData = jsonData.filter(
      (item, index) => index !== chipToDelete.key
    );
    setJsonData(updatedJsonData);

    onItemsUpdated(updatedJsonData); // Notify parent with updated jsonData
  };

  const handleDrop = (data) => {
    try {
      const newJsonData = JSON.parse(data);
      setJsonData(newJsonData); // Store jsonData in state
      const newChipData = newJsonData.map((item, index) => ({
        key: index,
        label: item.userStory_name,
      }));
      setChipData(newChipData);
      onItemsUpdated(newJsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error, e.g., show a toast notification
    }
  };

  // const [chipData, setChipData] = useState([]);

  // const [jsonData, setJsonData] = useState([]); // State to store jsonData

  // const handleDelete = (chipToDelete) => () => {
  //   // Update chipData
  //   const updatedChipData = chipData.filter(
  //     (chip) => chip.key !== chipToDelete.key
  //   );
  //   setChipData(updatedChipData);

  //   // Update jsonData
  //   const updatedJsonData = jsonData.filter(
  //     (item, index) => index !== chipToDelete.key
  //   );
  //   setJsonData(updatedJsonData);

  //   onItemsUpdated(updatedJsonData); // Notify parent with updated jsonData
  // };

  // const handleDrop = (acceptedFiles) => {
  //   //  acceptedFiles.forEach((file) => {
  //   //    const reader = new FileReader();
  //   //    reader.onload = () => {
  //   try {
  //     const newJsonData = JSON.parse(reader.result);
  //     setJsonData(newJsonData); // Store jsonData in state

  //     const newChipData = newJsonData.map((item, index) => ({
  //       key: index,
  //       label: item.userStory_name,
  //     }));
  //     setChipData(newChipData);
  //     onItemsUpdated(newJsonData); // Notify parent with jsonData
  //   } catch (error) {
  //     console.error('Error parsing JSON:', error);
  //     // Handle the error, e.g., show a toast notification
  //   }
  // };

  const { getRootProps, getInputProps } = useDropzone({ handleDrop });

  return (
    <div {...getRootProps()}>
      {!chipData.length > 0 ? (
        <TextField
          label="Drag and drop response here"
          fullWidth
          sx={styled.textFieldLarge}
          size={styled.textFieldLarge.size}
          variant={styled.textFieldLarge.variant}
          multiline
          rows={5}
          onChange={(e) => {
            e.preventDefault();
            handleDrop(e.target.value);
          }}
        />
      ) : (
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipData.map((data) => (
            <ListItem key={data.key}>
              <Chip label={data.label} onDelete={handleDelete(data)} />
            </ListItem>
          ))}
        </Paper>
      )}
    </div>
  );
}
