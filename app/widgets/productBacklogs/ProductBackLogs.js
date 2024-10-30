'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Add, AddToQueue, BackupOutlined } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import BackLogsContext from './ProductBackLogsContext';
import InFocusContext from '@/context/InFocusContext';
import UIContext from '@/context/UIContext';
import ProductsContext from '../products/ProductsContext';
import SearchContext from '@/context/SearchContext';
import UserStoriesContext from '../userStories/UserStoriesContext';

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
import {} from './functions/dbFunctions';

import { useMode } from '@/app/theme/ThemeContext';
import NewItem from '@/app/uiItems/newItem/NewItem';
import SimpleDialog from '@/app/components/dialog/Dialog';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';
import EnvProductionIcon from '@/app/components/icons/EnvProductionIcon';

export default function Products({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const {
    showBackLogItemMenu,
    setShowBackLogItemMenu,
    showDialog,
    handleCloseDialog,
  } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    setShowNewItem,
    optionsVertMenu,
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
    handleSetProductBackLogInFocus,
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

  const handleClickCustomArrayItem = (e) => {
    const found = displayUserStories.filter(
      (story) => story.id === e.userStory_id
    )[0];
    setUserStoryInFocus(found);
  };
  const customSubTitleItem = <EnvProductionIcon />;
  const widgetProps = {
    iconButton: <AddToQueue />,
    tooltipTitle_newItem: 'Create new Product BackLog',
    collection_context_title: 'Product BackLogs',
    dialogTitle: 'Create new Product BackLog',
    handleSetItemInFocus: handleSetProductBackLogInFocus,
    data: selectedProductBackLogs,
    selectedData: selectedProductBackLogs,
    setSelectedItem: setSelectedProductBackLogs,
    selector: {
      selector: 'productBackLogsSelector',
      selected: 'selectedProductBackLog',
    },
    itemInFocus: productBackLogInFocus,
    customArrayItemInFocus: userStoryInFocus,

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
    optionsVertMenu: optionsVertMenu,
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    customSubTitleItem: customSubTitleItem,
    quickMenuButtonArray: [
      {
        tooltip_title: 'Create new Product BackLog',
        onClickHandler: () => handleOpenNewItem(setShowNewItem, collection),
        icon: <Add />,
      },
    ],

    openDialogueState: showNewItem,
    onCloseDialogue: () => handleCloseNewItem(setShowNewItem, collection),

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
    onClick: () => {
      setAppContext('scrumManager');
      setUiGridMapContext(collection);
    },

    handleSelectWidgetContext: handleSelectWidgetContext,
    handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
    styled: styled,
  };

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

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // newItem={newItem}
        soloWidget={soloWidget}
        // table={table}
        // singleItem={singleItem}
        // chip={chip}
        tree={tree}
        // multiItems={multiItems}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
