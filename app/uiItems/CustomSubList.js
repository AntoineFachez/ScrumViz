import { Box, Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Draggable from '../components/dragDrop/Index';
import ChipComponent from '../components/chip/Chip';
import { themeSettings, useMode } from '../theme/ThemeContext';

export default function CustomSubList({ widgetProps }) {
  const [theme, colorMode, palette, styled] = useMode();
  const {
    singleItemScheme,
    customArrayItemInFocus,
    handleClickCustomArrayItem,
    itemInFocus,
  } = widgetProps;

  const flexListRef = useRef();
  const scrollToPiece = (listItemRef) => {
    if (listItemRef) {
      listItemRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Adjust as needed
        inline: 'nearest', // Adjust as needed
      });
    }
  };

  useEffect(() => {
    if (customArrayItemInFocus) {
      const listItemRef = flexListRef.current.querySelector(
        `[data-slug="${
          customArrayItemInFocus?.[singleItemScheme.itemInFocusIdKey]
        }"]`
      );
      scrollToPiece(listItemRef);
    }
  }, [customArrayItemInFocus]);

  return (
    <Box
      component="ul"
      ref={flexListRef}
      sx={{
        // ...styled?.flexList,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        // margin: '1rem',
        padding: '1rem',
        overflow: 'auto',
        borderRadius: '5px',
        backgroundColor: () => themeSettings(colorMode).neutral.dark,
      }}
    >
      {itemInFocus[singleItemScheme.customArray] &&
        itemInFocus[singleItemScheme.customArray]?.map((customItem, i) => {
          console.log(
            'customArrayItemInFocus',
            customArrayItemInFocus,
            customItem?.[singleItemScheme.filterArrayByIdKey]
          );
          return (
            customItem && (
              <Draggable
                keyToPass={uuidv4()}
                dataSlug={customItem.id}
                itemInFocus={widgetProps?.dropWidgetName}
                context="draggable"
                htmlItem={
                  <>
                    {/* <ChipComponent
                      //   key={i}
                      widgetProps={widgetProps}
                      itemInFocus={customItem}
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
                      data-slug={
                        customItem?.[singleItemScheme.filterArrayByIdKey]
                      }
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
