import { Avatar, Box, Button, Chip, Paper, Typography } from '@mui/material';
import Draggable from '../../components/dragDrop/Index';
import CardItem from '../../components/card/Index';
import { useEffect, useRef } from 'react';
import ChipComponent from '../../components/chip/Chip';
import CustomSubList from './CustomSubList';
import useScrollToItem from '@/hooks/useScrollToItem';

export default function MultiItems({ widgetProps, alertElement, styled }) {
  const {
    uiContext,
    itemContext,
    handleSetItemInFocus,
    data,
    selectedData,
    selector,
    itemInFocus,
    selectedWidgetContext,
  } = widgetProps;
  let array = [];
  const { flexListRef, scrollToItem } = useScrollToItem();

  useEffect(() => {
    scrollToItem(itemInFocus);
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
        {array?.length < 1 ? (
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
                      widgetProps={widgetProps}
                      item={item}
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
                              widgetProps={widgetProps}
                              dataSlug={item.id}
                              item={item}
                              handleClick={handleSetItemInFocus}
                              customElement={customElement}
                              alertElement={alertElement}
                              styled={styled}
                            />
                          </>
                        ) : (
                          <>
                            <ChipComponent
                              widgetProps={widgetProps}
                              item={item}
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
