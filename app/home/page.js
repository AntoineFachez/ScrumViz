'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Paper } from '@mui/material';

import ProductBackLogsContext from '../widgets/productBacklogs/ProductBackLogsContext';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import ProductsList from './ProductsList';
import TileNewItem from './TileNewItem';

import { singleItemScheme } from '../widgets/productBacklogs/dataScheme';
import { handleCloseNewItem } from '../widgets/actions';

import { useMode } from '../theme/ThemeContext';

export default function Home() {
  const { setAppContext, setUiGridMapContext } = useContext(AppContext);

  const {
    showNewItem,
    setShowNewItem,
    optionsVertMenu,
    displayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    productBackLogInFocus,
    setProductBackLogInFocus,
    handleSetProductBackLogInFocus,
    handleNewItem,
    scheme,
    handleSetExampleProduct,
  } = useContext(ProductBackLogsContext);
  const [theme, colorMode, palette, styled] = useMode();
  const collection = 'productBackLogs';
  const widgetProps = {
    collection: collection,
    tooltipTitle_clearFields: 'clear fields',
    handleSetItemInFocus: handleSetProductBackLogInFocus,
    data: selectedProductBackLogs,
    selectedData: selectedProductBackLogs,
    setSelectedItem: setSelectedProductBackLogs,
    itemInFocus: productBackLogInFocus,

    singleItemScheme: singleItemScheme,
    optionsVertMenu: optionsVertMenu,
    scheme: scheme,
    dialogTitle: 'Create new Product',
    handleSetExample: handleSetExampleProduct,

    openDialogueState: showNewItem,
    onCloseDialogue: () => handleCloseNewItem(setShowNewItem, collection),
    onClick: () => {
      setAppContext('scrumManager');
      setUiGridMapContext('userStories');
    },
    quickMenuButtonArray: [
      {
        tooltip_title: 'clear fields',
        onClickHandler: () => setProductBackLogInFocus({}),
        icon: <Close />,
      },
    ],
  };
  return (
    <>
      <Paper
        className="flexList"
        sx={{
          ...styled?.flexList,
          width: '100%',
          maxWidth: '48rem',
          height: '100%',
          maxHeight: '100%',
          overflow: 'scroll',
          '& .MuiPaper-root': {
            width: '18rem',
            height: '14rem',
          },
        }}
      >
        <TileNewItem styled={styled} />
        <ProductsList
          widgetProps={widgetProps}
          displayProductBackLogs={displayProductBackLogs}
          styled={styled}
        />
      </Paper>
    </>
  );
}
