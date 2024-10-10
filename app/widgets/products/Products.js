'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AddToQueue, BackupOutlined, ShoppingBag } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
import ProductsContext from '../products/ProductsContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';

import { singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';
import UserStoriesContext from '../userStories/UserStoriesContext';

export default function Products({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showProductsItemMenu, setShowProductsItemMenu } =
    useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    // selectedWidgetContext,
    // setSelectedWidgetContext,
    displayProducts,
    setDisplayProducts,
    selectedProducts,
    setSelectedProducts,
    productInFocus,
    setProductInFocus,
    isFiltered,
    searchTerm,
    setSearchTerm,
    // handleSearchTermChange,
    handleResetFiltered,
  } = useContext(ProductsContext);
  const {
    // displayProducts,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
  } = useContext(UserStoriesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'products';
  const handleSetProductInFocus = (item) => {
    console.log('handleSetProductInFocus', item);

    handleSetItemInFocus(setProductInFocus, item, setLatestItemInFocus);

    // const found = displayUserStories.filter(
    //   (userStory) => userStory.id === backLog.id
    // );
    // setSelectedUserStories(found);
  };
  const widgetProps = {
    iconButton: <ShoppingBag />,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    itemContext: '',
    collection: collection,
    handleSetItemInFocus: handleSetProductInFocus,
    data: selectedProducts,
    selectedData: selectedProducts,
    setSelectedItem: setSelectedProducts,
    selector: {
      selector: 'productBackLogsSelector',
      selected: 'selectedProductBackLog',
    },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: productInFocus,
    orderedBy: '',

    onClick: () => {
      setUiGridMapContext(collection);
      return;
    },
    menuProps: {
      states: {
        showMenu: showWidgetUIMenu,
        // widgetProps: widgetProps,
      },
      functions: {
        handleShowMenu: setShowWidgetUIMenu,
      },
    },
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    handleSelectWidgetContext: handleSelectWidgetContext,
    searchTerm: searchTerm,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  const handleClickCustomArrayItem = (e) => {
    const found = displayProducts.filter(
      (story) => story.id === e.userStory_id
    )[0];
    setUserStoryInFocus(found);
  };

  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      BackLogItems New Item
    </Box>
  );
  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      BackLogItems SoloWidget
    </Box>
  );

  const tree = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      BackLogItems Tree
    </Box>
  );
  const table = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      <StandInTable />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        tree={tree}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
