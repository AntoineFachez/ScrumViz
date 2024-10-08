'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AddToQueue, BackupOutlined, ShoppingBag } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import BackLogsContext from './ProductsContext';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
import ProductsContext from '../products/ProductsContext';
import ProductBackLogsContext from '../productBacklogs/ProductBackLogsContext';
import UserStoriesContext from '../userStories/UserStoriesContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '../../uiItems/WidgetMenu';
import StandInTable from '@/app/components/table/StandInTable';
import SingleItem from '@/app/uiItems/SingleItem';
import MultiItems from '@/app/uiItems/MultiItems';

import { singleItemScheme } from './dataScheme';
import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';

import { useMode } from '@/app/theme/ThemeContext';
import InFocusContext from '@/context/InFocusContext';

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
  const { setLatestSelectedItem } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
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
    displayUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
  } = useContext(UserStoriesContext);
  const { setProductBackLogInFocus } = useContext(ProductBackLogsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'products';

  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <ShoppingBag />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',

    onClick: () => {
      setUiGridMapContext(collection);
      return;
    },
  };
  const menuProps = {
    states: {
      showMenu: showProductsItemMenu,
      widgetProps: widgetProps,
    },
    functions: {
      handleShowMenu: setShowProductsItemMenu,
    },
  };

  // const handleSetProductInFocus = (product) => {
  //   setProductInFocus(product);
  //   const found = displayProducts.filter(
  //     (product) => product.id === backLog.id
  //   );
  //   setSelectedUserStories(found);
  // };
  // const handleSearchTermChange = (e) => {
  //   e.preventDefault();

  //   setSearchTerm(e.target.value);
  //   setActiveSearchTerm(e.target.value);
  // };
  // const handleClickCustomArrayItem = (e) => {
  //   const found = displayUserStories.filter(
  //     (story) => story.id === e.userStory_id
  //   )[0];
  //   setUserStoryInFocus(found);
  // };
  const handleSetProductInFocus = (product) => {
    handleSetItemInFocus(setProductInFocus, product, setLatestSelectedItem);
    // setProductInFocus(product);
    const found = displayUserStories.filter(
      (story) => story.productBacklog_id === product.id
    );
    setSelectedUserStories(found);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  const handleClickCustomArrayItem = (e) => {
    const found = displayUserStories.filter(
      (story) => story.id === e.userStory_id
    )[0];
    setUserStoryInFocus(found);
  };
  const menu = (
    <>
      <WidgetMenu
        widget={widget}
        widgetProps={widgetProps}
        menuProps={menuProps}
        setSelectedWidgetContext={setSelectedWidgetContext}
        handleSelectWidgetContext={handleSelectWidgetContext}
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
      />
    </>
  );
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
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={productInFocus}
      styled={styled}
    />
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

  const flexList = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      <MultiItems
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
        selectedWidgetContext={selectedWidgetContext}
        setActiveSearchTerm={setActiveSearchTerm}
        customArrayItemInFocus={productInFocus}
        handleSetItemInFocus={handleSetProductInFocus}
        handleClickCustomArrayItem={handleClickCustomArrayItem}
        customElement={null}
        alertElement={null}
        data={selectedProducts}
        selectedData={selectedProducts}
        setSelectedItem={setSelectedProducts}
        selector={{
          selector: 'productsSelector',
          selected: 'selectedProduct',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={productInFocus}
        styled={styled}
      />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        menu={menu}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        singleItem={singleItem}
        // chip={chip}
        tree={tree}
        flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
