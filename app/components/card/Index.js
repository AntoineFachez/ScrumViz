import React, { useRef } from 'react';
import CardItem from './CardItem';
import { Box, Button } from '@mui/material';

export default function Index({
  widgetProps,
  optionsVertMenu,
  dataSlug,
  item,
  handleClick,
  customElement,
  alertElement,
  styled,
}) {
  const listItemRef = useRef(null);

  return (
    <>
      <CardItem
        widgetProps={widgetProps}
        optionsVertMenu={optionsVertMenu}
        dataSlug={dataSlug}
        listItemRef={listItemRef}
        item={item}
        customElement={customElement}
        handleClick={handleClick}
        alertElement={alertElement}
        styled={styled}
      />
    </>
  );
}
