import AppContext from '@/context/AppContext';
import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Header from './Header';
import Body from './Body';
import Media from './Media';

const SingleItem = ({ widgetProps, styled }) => {
  const { itemContext, itemInFocus } = widgetProps;
  return (
    <Box className="widget" sx={styled?.widget}>
      {!itemInFocus ? (
        <Box
          sx={{
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
            <Header widgetProps={widgetProps} styled={styled} />

            <Body widgetProps={widgetProps} styled={styled} />
            <Media widgetProps={widgetProps} styled={styled} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleItem;
