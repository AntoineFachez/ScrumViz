import { Avatar, Box, Button, Chip, Paper, Typography } from '@mui/material';
import Draggable from '../components/dragDrop/Index';
import CardItem from '../components/card/Index';
import { stringAvatar } from '@/utils/colorHelpers';
import AccordionComponent from '../components/accordion/Accordion';
import { useEffect, useRef } from 'react';
import { useMode } from '../theme/ThemeContext';
import ChipComponent from '../components/chip/Chip';
import CustomSubList from './CustomSubList';

export default function MultiItems({
  widgetProps,
  uiContext,
  singleItemScheme,
  selectedWidgetContext,
  itemContext,
  setActiveSearchTerm,
  handleSetItemInFocus,
  handleClickCustomArrayItem,
  customElement,
  customArrayItemInFocus,
  alertElement,
  data,
  selectedData,
  setSelectedItem,
  selector,
  itemInFocus,
  styled,
}) {
  // console.log(customArrayItemInFocus);

  // const [theme, colorMode, palette, styled] = useMode();

  let array = [];
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
    if (itemInFocus) {
      const listItemRef = flexListRef.current.querySelector(
        `[data-slug="${itemInFocus.id}"]`
      );
      scrollToPiece(listItemRef);
    }
  }, [itemInFocus]);

  if (data?.length > 200) return;
  if (uiContext === selector?.selector) {
    array = data;
  } else if (uiContext === selector?.selected) {
    array = selectedData;
  }

  return (
    <>
      <Paper className="flexList" sx={styled?.flexList} ref={flexListRef}>
        {array.length < 1 ? (
          <>
            select an entity from {itemContext} or create new {`${itemContext}`}
          </>
        ) : (
          <>
            {array &&
              array?.map((item, i) => {
                const customElement = (
                  <>
                    <CustomSubList
                      singleItemScheme={singleItemScheme}
                      item={item}
                      customArrayItemInFocus={customArrayItemInFocus}
                      handleClickCustomArrayItem={handleClickCustomArrayItem}
                      styled={styled}
                    />
                  </>
                );
                return (
                  <Draggable
                    dataSlug={item.id}
                    context="draggable"
                    item={item}
                    key={i}
                    htmlItem={
                      <>
                        {selectedWidgetContext === 'card' ? (
                          <>
                            <CardItem
                              context="item"
                              dataSlug={item.id}
                              singleItemScheme={singleItemScheme}
                              item={item}
                              handleClick={handleSetItemInFocus}
                              itemContext={itemContext}
                              itemInFocus={itemInFocus}
                              customElement={customElement}
                              alertElement={alertElement}
                              styled={styled}
                            />
                          </>
                        ) : (
                          <>
                            <ChipComponent
                              item={item}
                              itemContext={itemContext}
                              singleItemScheme={singleItemScheme}
                              itemInFocus={itemInFocus}
                              handleSetItemInFocus={handleSetItemInFocus}
                              styled={styled}
                            />
                          </>
                        )}
                        {alertElement && alertElement(item)}
                      </>
                    }
                  />
                );
              })}
          </>
        )}
      </Paper>
    </>
  );
}
