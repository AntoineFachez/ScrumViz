'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Add,
  AddToQueue,
  BackupOutlined,
  ShoppingBag,
} from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
import ProductsContext from '../products/ProductsContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';

import { scheme, singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';
import UserStoriesContext from '../userStories/UserStoriesContext';
import SimpleDialog from '@/app/components/dialog/Dialog';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';

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
    showNewItem,
    setShowNewItem,
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
    tooltipTitle_newItem: 'Create new Product',
    collection_context_title: 'Products',
    dialogTitle: 'Create new Digital Product',
    data: selectedProducts,
    selectedData: selectedProducts,
    setSelectedItem: setSelectedProducts,
    selector: {
      selector: 'productBackLogsSelector',
      selected: 'selectedProductBackLog',
    },
    itemInFocus: productInFocus,
    handleSetItemInFocus: handleSetProductInFocus,

    appContext: appContext,
    collection: collection,
    scheme: scheme,
    uiContext: uiContext,
    dropWidgetName: collection,
    uiGridMapContext: uiGridMapContext,
    setUiGridMapContext: setUiGridMapContext,
    widget: widget,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    quickMenuButtonArray: [
      {
        tooltip_title: 'Create new Product',
        onClickHandler: () => handleOpenNewItem(setShowNewItem, collection),
        icon: <Add />,
      },
    ],

    openDialogueState: showNewItem,

    searchTerm: searchTerm,
    setActiveSearchTerm: setActiveSearchTerm,
    singleItemScheme: singleItemScheme,
    orderedBy: '',
    menuProps: {
      states: {
        showMenu: showWidgetUIMenu,
      },
      functions: {
        handleShowMenu: setShowWidgetUIMenu,
      },
    },
    onClick: () => setUiGridMapContext(collection),

    handleSelectWidgetContext: handleSelectWidgetContext,
    // handleClickCustomArrayItem: handleClickCustomArrayItem,
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
      Products New Item
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
      Products SoloWidget
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
      Products Tree
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

  const multiItems = <MultiItems widgetProps={widgetProps} styled={styled} />;
  return (
    <>
      <SimpleDialog
        widgetProps={{
          ...widgetProps,
          dialogCustomComponent: multiItems,
        }}
      />
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        tree={tree}
        multiItems={multiItems}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
