'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Add, ArrowBack, Close, Menu, WidthWide } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';

import ProductBackLogsContext from '../widgets/productBacklogs/ProductBackLogsContext';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import PromptsContext from '../widgets/prompts/PromptsContext';

import ChatInFocus from '../widgets/chats/Index';
import NewItem from '../uiItems/widgetItems/NewItem';
import QuickMenu from '../uiItems/widgetItems/QuickMenu';
import ProductsList from './ProductsList';
import TileNewItem from './TileNewItem';

import { singleItemScheme } from '../widgets/productBacklogs/dataScheme';
import { handleCloseNewItem } from '../widgets/actions';
import { handleNewProductBackLog } from '../widgets/productBacklogs/functions/dbFunctions';

import { useMode } from '../theme/ThemeContext';

export default function DrawerCreateNewItem() {
  const { setAppContext, setUiGridMapContext } = useContext(AppContext);
  const {
    orientationDrawer,
    setDrawerMenu,
    setDrawerFloorElement,
    handleToggleDrawer,
  } = useContext(UIContext);
  const {
    showNewItem,
    setShowNewItem,
    optionsVertMenu,
    displayProductBackLogs,
    setDisplayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    productBackLogInFocus,
    setProductBackLogInFocus,
    handleSetProductBackLogInFocus,
    handleNewItem,
    scheme,
    handleSetExampleProduct,
  } = useContext(ProductBackLogsContext);
  const { promptInFocus, setPromptInFocus, handleOnChangeAdoptPrompt } =
    useContext(PromptsContext);
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
    // handleSaveNewProduct: handleSaveNewProduct,
    quickMenuButtonArray: [
      {
        tooltip_title: 'clear fields',
        onClickHandler: () => setProductBackLogInFocus({}),
        icon: <Close />,
      },
    ],
  };
  const handleClickNewProduct = () => {
    // handleToggleDrawer('left', true);
    handleNewItem();
    console.log('clicked');
  };
  const [dataToStore, setDataToStore] = useState({});
  const [formData, setFormData] = useState({});

  const handleSaveNewProduct = (dataToStore) => {
    console.log('handleSaveNewProduct', dataToStore);
    // handleNewProductBackLog();
    handleNewProductBackLog(
      widgetProps,
      setProductBackLogInFocus,
      dataToStore,
      displayProductBackLogs,
      setDisplayProductBackLogs
    );
  };
  const drawerMenuProps = {
    quickMenuButtonArray: [
      {
        tooltip_title: 'Create new User Story',
        onClickHandler: handleToggleDrawer('right', false),
        icon: <Menu />,
      },
      {
        tooltip_title: 'Create new User Story',
        onClickHandler: () => handleGoBack(''),
        icon: <ArrowBack />,
      },
    ],
  };
  const newItem = (
    <>
      <NewItem
        widgetProps={widgetProps}
        dataToStore={dataToStore}
        setDataToStore={setDataToStore}
        formData={formData}
        setFormData={setFormData}
        handleOnChangeAdoptPrompt={handleOnChangeAdoptPrompt}
        handleSaveNewProduct={handleSaveNewProduct}
        styled={styled}
      />
    </>
  );

  const dialogCustomComponent = (
    <Box
      className="drawer-content-container"
      sx={{
        ...styled.widget,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row',
        // paddingRight: '1rem',
      }}
    >
      {' '}
      <Box
        className="newItem"
        sx={{
          // ...styled?.widget,
          width: '60ch',

          // width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          // paddingRight: '1rem',
        }}
      >
        <QuickMenu widgetProps={widgetProps} styled={styled} />

        {newItem}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          // paddingRight: '1rem',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexFlow: 'column',
            // paddingRight: '1rem',
            overflow: 'scroll',
          }}
        >
          <ChatInFocus startUpWidgetLayout="vertical" />{' '}
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexFlow: 'column',
            // paddingRight: '1rem',
          }}
        >
          {' '}
          <ChatInFocus startUpWidgetLayout="inputField" />
        </Box>
      </Box>
    </Box>
  );

  useEffect(() => {
    setDrawerMenu(
      <QuickMenu
        widgetProps={drawerMenuProps}
        styled={{
          ...styled,
          // spacesMenu: {
          ...styled.spacesMenu, // Spread the existing spacesMenu styles
          justifyContent: 'flex-start', // Override justifyContent
          // },
        }}
      />
    );
    setDrawerFloorElement(dialogCustomComponent);
    return () => {};
  }, [orientationDrawer, widgetProps.itemInFocus]);

  return (
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
      <TileNewItem styled={styled} handleToggleDrawer={handleToggleDrawer} />
      <ProductsList
        widgetProps={widgetProps}
        displayProductBackLogs={displayProductBackLogs}
        styled={styled}
      />
    </Paper>
  );
}
