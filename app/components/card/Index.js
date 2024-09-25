import React, { useRef } from 'react';
import CardItem from './CardItem';
import { Box, Button } from '@mui/material';

export default function Index({
  context,
  dataSlug,
  singleItemScheme,
  item,
  handleClick,
  itemContext,
  itemInFocus,
  customElement,
  alertElement,
  styled,
}) {
  const listItemRef = useRef(null);

  return (
    <>
      <CardItem
        dataSlug={dataSlug}
        listItemRef={listItemRef}
        context={context}
        singleItemScheme={singleItemScheme}
        item={item}
        itemContext={itemContext}
        itemInFocus={itemInFocus}
        customElement={customElement}
        alertElement={alertElement}
        handleClick={handleClick}
        styled={styled}
      />
    </>
  );
}
