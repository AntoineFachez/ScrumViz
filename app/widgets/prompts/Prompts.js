import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import PromptsContext from './PromptsContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { scheme, singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';

export default function DefaultPromptWidget({
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
    selectedWidgetContext,
    setSelectedWidgetContext,
    selectedPrompts,
    promptInFocus,
    setPromptInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    handleResetFiltered,
    handleCloseNewItem,
  } = useContext(PromptsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSetPromptInFocus = (item) => {
    handleSetItemInFocus(setPromptInFocus, item, setLatestItemInFocus);
  };
  const collection = 'prompts';

  const widgetProps = {
    iconButton: <Chat />,
    tooltipTitle_newItem: 'Create new Prompt',
    collection_context_title: ' Prompts',
    dialogTitle: 'Create new Prompt',
    data: selectedPrompts,
    selectedData: selectedPrompts,
    selector: {
      selector: 'promptsSelector',
      selected: 'selectedPrompts',
    },
    itemInFocus: promptInFocus,
    handleSetItemInFocus: handleSetPromptInFocus,

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
        tooltip_title: 'Create new Prompt',
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
    onClick: () => setUiGridMapContext(collection),
    handleSelectWidgetContext: handleSelectWidgetContext,
    // handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  useEffect(() => {
    setSelectedWidgetContext(startUpWidgetLayout);
    if (!isLoading) setPromptInFocus('');
    return () => {};
  }, []);

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        uiContext={uiContext}
        widgetContext={selectedWidgetContext}
        multiItems={multiItems}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
