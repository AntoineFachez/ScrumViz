'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '../../uiItems/WidgetMenu';
import { AddToQueue, BackupOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import BackLogsContext from './ProductBackLogsContext';
import SingleItem from '@/app/uiItems/SingleItem';
import MultiItems from '@/app/uiItems/MultiItems';
import SearchContext from '@/context/SearchContext';
import { singleItemScheme } from './dataScheme';
import UserStoriesContext from '../userStories/UserStoriesContext';

import { handleSelectWidgetContext } from '../actions';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import ProductsContext from '../products/ProductsContext';

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
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
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

  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <AddToQueue />,
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
      showMenu: showBackLogItemMenu,
      widgetProps: widgetProps,
    },
    functions: {
      handleShowMenu: setShowBackLogItemMenu,
    },
  };
  const handleSetProductInFocus = (backLog) => {
    const foundProducts = displayProducts.filter(
      (product) => product.id === backLog.id
    );
    const foundUserStories = displayUserStories.filter(
      (story) => story.productBacklog_id === backLog.id
    );
    setProductBackLogInFocus(backLog);
    setProductInFocus(foundProducts);
    setSelectedUserStories(foundUserStories);
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
        handleSetItemInFocus={handleSetProductInFocus}
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
