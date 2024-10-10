import { Box, Button } from '@mui/material';
import React from 'react';

export default function CustomSubList({
  item,
  customArrayItemInFocus,
  singleItemScheme,
  handleClickCustomArrayItem,
  styled,
}) {
  //   console.log(handleClickCustomArrayItem);

  return (
    <Box
      component="ul"
      sx={{
        ...styled?.widgetMenuButtonArray?.vert,
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {item[singleItemScheme.customArray] &&
        item[singleItemScheme.customArray]?.map((customItem, i) => {
          return (
            customItem && (
              <Button
                // sx={styled?.menuButtonText.action}
                sx={
                  customArrayItemInFocus?.[
                    singleItemScheme.itemInFocusIdKey
                  ] === customItem?.[singleItemScheme.filterArrayByIdKey]
                    ? styled?.menuButtonText?.selected
                    : styled?.menuButtonText?.action
                }
                key={i}
                onClick={() => handleClickCustomArrayItem(customItem)}
              >
                {customItem[singleItemScheme.customArrayKey]}
                {customItem[singleItemScheme.customArrayKey_2]}
              </Button>
            )
          );
        })}
    </Box>
  );
}
