import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CustomSubList from '../CustomSubList';

export default function Body({ widgetProps, styled }) {
  const { singleItemScheme, itemInFocus } = widgetProps;
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: '8rem',

          // overflowY: 'auto',
          // overflowX: 'auto',
        }}
      >
        <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
          Author: {itemInFocus[singleItemScheme.customField] || 'N/A'}
        </Typography>
        <br />
        {/* <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
          {singleItemScheme.description}:<br />
        </Typography> */}
        <Typography
          sx={{
            ...styled.textBody,
            height: 'fit-content',
            color: 'white',
          }}
        >
          &quot;{itemInFocus[singleItemScheme.description] || 'N/A'}&quot;
        </Typography>
      </Box>
      <CustomSubList widgetProps={widgetProps} styled={styled} />
    </>
  );
}
