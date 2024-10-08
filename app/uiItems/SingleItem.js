import AppContext from '@/context/AppContext';
import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react';

const SingleItem = ({ itemContext, itemInFocus, styled, singleItemScheme }) => {
  const { setUiGridMapContext } = useContext(AppContext);
  return (
    <Box className="widget" sx={styled?.widget}>
      {!itemInFocus ? (
        <Box
          sx={{
            // ...styled?.centerFullAvailableSpace,
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            sx={{
              // ...styled.textBody,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
            }}
            // variant={{ ...styled.textBody, height: 'fit-content' }.variant}
          >
            select {itemContext}
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={styled?.article}>
            <Button onClick={() => setUiGridMapContext('prompts')}>
              <Typography
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
                variant="button"
              >
                Gemini
              </Typography>
            </Button>
            <Box className="singleItem header" sx={styled?.articleHeader}>
              <Box>
                <Typography
                  sx={styled.widgetTitle}
                  variant={styled.widgetTitle.variant}
                >
                  {itemInFocus[singleItemScheme.title] || 'N/A'}{' '}
                </Typography>
                {itemInFocus[singleItemScheme.subTitle] && (
                  <Box>
                    <Typography
                      sx={styled.widgetSubTitle}
                      variant={styled.widgetSubTitle.variant}
                    >
                      {itemInFocus[singleItemScheme.subTitle] || 'N/A'}{' '}
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
            <img
              style={{
                zIndex: 1,
                bottom: 0,
                position: 'absolute',
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              src={itemInFocus[singleItemScheme.img_uri]}
              alt=""
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleItem;
