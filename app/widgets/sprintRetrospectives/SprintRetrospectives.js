'use client';
import { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { History } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintRetrospectivesContext from './SprintRetrospectivesContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { singleItemScheme, scheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';

export default function SprintRetrospectives({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    setShowNewItem,
    selectedSprintRetrospectives,
    setSelectedSprintRetrospectives,
    isFiltered,
    sprintRetrospectiveInFocus,
    setSprintRetrospectiveInFocus,
    searchTerm,
    handleResetFiltered,
  } = useContext(SprintRetrospectivesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetSprintRetrospectiveInFocus = (item) => {
    handleSetItemInFocus(
      setSprintRetrospectiveInFocus,
      item,
      setLatestItemInFocus
    );
  };
  const collection = 'sprintRetrospectives';
  const widgetProps = {
    iconButton: <History />,
    tooltipTitle_newItem: 'Create new Sprint Retrospective',
    collection_context_title: 'Sprint Retrospectives',
    dialogTitle: 'Create new Sprint Retrospective',
    data: selectedSprintRetrospectives,
    selectedData: selectedSprintRetrospectives,
    setSelectedItem: setSelectedSprintRetrospectives,
    selector: {
      selector: 'sprintRetrospectiveSelector',
      selected: 'selectedSprintRetrospectives',
    },
    itemInFocus: sprintRetrospectiveInFocus,
    handleSetItemInFocus: handleSetSprintRetrospectiveInFocus,

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
    onClickNewItem: () => handleOpenNewItem(setShowNewItem, collection),
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
    onClick: () => setUiGridMapContext(collection),

    handleSelectWidgetContext: handleSelectWidgetContext,
    // handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      Sprint Retrospective SoloWidget
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
      Sprint Retrospective Tree
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        soloWidget={soloWidget}
        // singleItem={singleItem}
        // chip={chip}
        tree={tree}
        // flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
