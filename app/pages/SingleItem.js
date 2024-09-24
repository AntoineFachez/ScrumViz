import { Box, Typography } from '@mui/material';
import React from 'react';

const SingleItem = ({ itemContext, itemInFocus, styled, singleItemScheme }) => {
  return (
    <Box className="widget" sx={styled?.widget}>
      {!itemInFocus ? (
        <Typography
          sx={{ ...styled.textBody, height: 'fit-content' }}
          variant={{ ...styled.textBody, height: 'fit-content' }.variant}
        >
          select {itemContext}
        </Typography>
      ) : (
        <>
          {/* Optional: Keep this for debugging if needed */}
          {/* {JSON.stringify(itemInFocus)} */}

          <Box sx={styled?.article}>
            <Box className="singleItem header" sx={styled?.articleHeader}>
              {/* ... other content in the header */}
              <Box>
                <Typography
                  sx={styled.widgetTitle}
                  variant={styled.widgetTitle.variant}
                >
                  {itemInFocus[singleItemScheme.title] || 'N/A'}{' '}
                  {/* Handle missing subTitle */}
                </Typography>
                {itemInFocus[singleItemScheme.subTitle] && (
                  <Box>
                    <Typography
                      sx={styled.widgetSubTitle}
                      variant={styled.widgetSubTitle.variant}
                    >
                      {itemInFocus[singleItemScheme.subTitle] || 'N/A'}{' '}
                      {/* Handle missing subTitle */}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                paddingRight: '2rem',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {' '}
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
              {/* Add more fields here as needed, using the same pattern */}
              {/* <Typography sx={{ ...styled.textBody, height: 'fit-content' }}>
                {singleItemScheme.id}:{' '}
                {itemInFocus[singleItemScheme.id] || 'N/A'}
              </Typography> */}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleItem;
