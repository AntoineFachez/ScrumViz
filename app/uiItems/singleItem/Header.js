import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function Header({ itemInFocus, singleItemScheme, styled }) {
  return (
    <>
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
    </>
  );
}
