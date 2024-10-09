'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Add, AddToQueue, BackupOutlined } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import BackLogsContext from './ProductBackLogsContext';
import InFocusContext from '@/context/InFocusContext';
import UIContext from '@/context/UIContext';
import ProductsContext from '../products/ProductsContext';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import SearchContext from '@/context/SearchContext';
import UserStoriesContext from '../userStories/UserStoriesContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '../../uiItems/WidgetMenu';
import StandInTable from '@/app/components/table/StandInTable';
import SingleItem from '@/app/uiItems/SingleItem';
import MultiItems from '@/app/uiItems/MultiItems';

import { singleItemScheme } from './dataScheme';
import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import { handleNewProductBackLog } from './functions/dbFunctions';

import { useMode } from '@/app/theme/ThemeContext';

export default function Products({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showBackLogItemMenu, setShowBackLogItemMenu } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    // selectedWidgetContext,
    // setSelectedWidgetContext,
    displayProductBackLogs,
    setDisplayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    productBackLogInFocus,
    setProductBackLogInFocus,
    isFiltered,
    handleResetFiltered,
    searchTerm,
    setSearchTerm,
  } = useContext(BackLogsContext);
  const { displayProducts, setProductInFocus } = useContext(ProductsContext);
  const {
    displayUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
  } = useContext(UserStoriesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'productBackLogs';
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  const widgetProps = {
    appContext: appContext,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    widget: widget,
    uiGridMapContext: uiGridMapContext,
    iconButton: <AddToQueue />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',
    tooltipTitle_newItem: 'Create new Product BackLog',
    onClickNewItem: () => handleNewProductBackLog(),
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

  const handleSetProductBackLogInFocus = (item) => {
    handleSetItemInFocus(setProductBackLogInFocus, item, setLatestItemInFocus);

    const foundUserStories = displayUserStories.filter((userStory) => {
      return item.productBackLog_items.some(
        (backLog_item) => backLog_item.userStory_id === userStory.id
      );
    });

    setSelectedUserStories(foundUserStories);

    const foundProducts = displayProducts.filter(
      (product) => product.id === item.productBackLog_id
    );
    setProductInFocus(foundProducts[0]);
  };

  const handleClickCustomArrayItem = (e) => {
    const found = displayUserStories.filter(
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
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={productBackLogInFocus}
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
        customArrayItemInFocus={userStoryInFocus}
        handleSetItemInFocus={handleSetProductBackLogInFocus}
        handleClickCustomArrayItem={handleClickCustomArrayItem}
        customElement={null}
        alertElement={null}
        data={selectedProductBackLogs}
        selectedData={selectedProductBackLogs}
        setSelectedItem={setSelectedProductBackLogs}
        selector={{
          selector: 'productBackLogsSelector',
          selected: 'selectedProductBackLog',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={productBackLogInFocus}
        styled={styled}
      />
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
