import { Box, Button } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Draggable from '../components/dragDrop/Draggable';
import ChipComponent from '../components/chip/Chip';

export default function CustomSubList({ widgetProps, item, styled }) {
  const {
    singleItemScheme,
    customArrayItemInFocus,
    handleClickCustomArrayItem,
  } = widgetProps;

  return (
    <Box
      component="ul"
      sx={{
        ...styled?.widgetMenuButtonArray?.vert,
        width: '100%',
        height: '100%',
        // margin: '1rem',
        padding: '1rem',
        alignItems: 'center',
        gap: '1rem',
        overflow: 'auto',
      }}
    >
      {item[singleItemScheme.customArray] &&
        item[singleItemScheme.customArray]?.map((customItem, i) => {
          console.log(
            'customArrayItemInFocus',
            customArrayItemInFocus,
            customItem?.[singleItemScheme.filterArrayByIdKey]
          );
          return (
            customItem && (
              <Draggable
                keyToPass={uuidv4()}
                // item={uiContext}
                item={widgetProps?.dropWidgetName}
                context="draggable"
                htmlItem={
                  <>
                    {/* <ChipComponent
                      //   key={i}
                      widgetProps={widgetProps}
                      item={customItem}
                      styled={
                        customArrayItemInFocus?.[
                          singleItemScheme.itemInFocusIdKey
                        ] === customItem?.[singleItemScheme.filterArrayByIdKey]
                          ? styled?.menuButtonText?.selected
                          : styled?.menuButtonText?.action
                      }
                    /> */}
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
                  </>
                }
                styled={styled}
              />
            )
          );
        })}
    </Box>
  );
}
