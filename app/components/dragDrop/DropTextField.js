import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { TextField, Chip, Paper, ListItem } from '@mui/material';

export default function DropzoneTextField({ onItemsUpdated, styled }) {
  const [chipData, setChipData] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    onItemsUpdated(chipData);
  };

  const handleDrop = (data) => {
    try {
      const jsonData = JSON.parse(data);
      const newChipData = jsonData.map((item, index) => ({
        key: index,
        label: item.userStory_name,
      }));
      setChipData(newChipData);
      onItemsUpdated(newChipData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error, e.g., show a toast notification
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ handleDrop });

  return (
    <div {...getRootProps()}>
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
    </div>
  );
}
