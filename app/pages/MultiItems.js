import { Avatar, Box, Chip } from '@mui/material';
import Draggable from '../components/dragDrop/Index';
import CardItem from '../components/card/Index';
import { stringAvatar } from '@/utils/colorHelpers';
import AccordionComponent from '../components/accordion/Accordion';
import { useEffect, useRef } from 'react';

export default function MultiItems({
  selectedWidgetContext,
  uiContext,
  singleItemScheme,
  data,
  selectedData,
  selector,
  itemContext,
  itemInFocus,
  customElement,
  handleSetItemInFocus,
  alertElement,
  styled,
}) {
  let array = [];

  const scrollToPiece = (item, checkId) => {
    console.log(
      listItemRef.current.getAttribute('dataslug'),
      item.id === checkId
    );
    if (listItemRef.current) {
      const itemElement = listItemRef.current.querySelector(
        `[dataslug="${item.id}"]`
      );
      if (itemElement) {
        itemElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', // Adjust as needed
          inline: 'nearest', // Adjust as needed
        });
      }
    }
  };

  useEffect(() => {
    if (itemInFocus) {
      // scrollToPiece(itemInFocus);
    }
    const checkId = '873a5f7a-cd47-4102-ad73-84f51ef934ed';
    if (itemInFocus.id === checkId) {
      scrollToPiece(itemInFocus, checkId);
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
      <Box className="flexList" sx={styled?.flexList}>
        {array.length < 1 ? (
          <>select an entity section or create new {`${itemContext}`}</>
        ) : (
          <>
            {array?.map((item, i) => {
              return (
                <Draggable
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
                          <Chip
                            onClick={() => handleSetItemInFocus(item)}
                            multilines
                            avatar={
                              <Avatar
                                onClick={() => handleClick(item)}
                                sx={styled?.avatar}
                                aria-label={itemContext}
                                // src={item?.basics?.[`${itemContext}ImageUrl`]}
                                {...stringAvatar(
                                  item[singleItemScheme.title] || 'N/A'
                                )}
                              />
                            }
                            sx={
                              itemInFocus?.id === item.id
                                ? styled?.chip?.multilines?.selected
                                : styled?.chip?.multilines?.unselected
                            }
                            size={styled?.chip?.size}
                            variant="outlined"
                            label={item[singleItemScheme.title] || 'N/A'}
                          />
                          {alertElement && alertElement(item)}
                        </>
                      )}
                    </>
                  }
                />
              );
            })}
          </>
        )}
      </Box>
    </>
  );
}
