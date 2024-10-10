import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CustomSubList from '../CustomSubList';

export default function Body({
  itemInFocus,
  customArrayItemInFocus,
  handleClickCustomArrayItem,
  singleItemScheme,
  styled,
}) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          paddingRight: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
                {singleItemScheme.title}:{' '}
                {itemInFocus[singleItemScheme.title] || 'N/A'}
              </Typography> */}
        <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
          {singleItemScheme.customField}:<br />
          {itemInFocus[singleItemScheme.customField] || 'N/A'}
        </Typography>
        <br />
        <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
          {singleItemScheme.description}:<br />
        </Typography>
        <Typography
          sx={{
            ...styled.textBody,
            height: 'fit-content',
            color: 'white',
          }}
        >
          {itemInFocus[singleItemScheme.description] || 'N/A'}
        </Typography>

        <CustomSubList
          singleItemScheme={singleItemScheme}
          item={itemInFocus}
          customArrayItemInFocus={customArrayItemInFocus}
          handleClickCustomArrayItem={handleClickCustomArrayItem}
          styled={styled}
        />
        {/* Add more fields here as needed, using the same pattern */}
        {/* <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
                {singleItemScheme.id}:{' '}
                {itemInFocus[singleItemScheme.id] || 'N/A'}
              </Typography> */}
      </Box>
    </>
  );
}
