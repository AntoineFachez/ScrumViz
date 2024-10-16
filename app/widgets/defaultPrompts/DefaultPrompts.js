import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import DefaultPromptsContext from './DefaultPromptsContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
// import UserContext from '@/context/UserContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/widgetItems/WidgetMenu';
import NewItem from '@/app/uiItems/widgetItems/NewItem';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';

import SimpleDialog from '@/app/components/dialog/Dialog';

import { scheme, singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
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
  const {
    showDefaultPromptsMenu,
    setShowDefaultPromptsMenu,
    showDialog,
    setShowDialog,
    handleCloseDialog,
  } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    selectedWidgetContext,
    setSelectedWidgetContext,

    defaultPrompts,
    displayDefaultPrompts,
    setDisplayDefaultPrompts,
    selectedDefaultPrompts,
    setSelectedDefaultPrompts,
    promptTextInFocus,
    setPromptTextInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,

    handleNewDefaultPrompt,
    handleCloseNewItem,

    // handleSetDefaultPromptInFocus,
  } = useContext(DefaultPromptsContext);

  // const [selectedWidgetContext, setSelectedWidgetContext] =
  //   useState(startUpWidgetLayout);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSetDefaultPromptInFocus = (item) => {
    handleSetItemInFocus(setPromptTextInFocus, item, setLatestItemInFocus);
  };
  const collection = 'defaultPrompts';

  const widgetProps = {
    iconButton: <Chat />,
    tooltipTitle_newItem: 'Create new Default Prompt',
    collection_context_title: 'Default Prompts',
    dialogTitle: 'Create new Default Prompt',
    data: selectedDefaultPrompts,
    selectedData: selectedDefaultPrompts,
    selector: {
      selector: 'defaultPromptsSelector',
      selected: 'selectedPrompts',
    },
    itemInFocus: promptTextInFocus,
    handleSetItemInFocus: handleSetDefaultPromptInFocus,

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

  useEffect(() => {
    setSelectedWidgetContext(startUpWidgetLayout);
    if (!isLoading) setPromptTextInFocus('');
    return () => {};
  }, []);

  // const defaultPromptSelector = (
  //   <>
  //     <Box
  //       className="widget"
  //       sx={{
  //         ...styled.widget,
  //         // backgroundColor: '#555',
  //         flexFlow: 'column',
  //       }}
  //     >
  //       {/* <MultiItems
  //         widget={widget}
  //         uiContext={uiContext}
  //         singleItemScheme={singleItemScheme}
  //         selectedWidgetContext={selectedWidgetContext}
  //         setActiveSearchTerm={setActiveSearchTerm}
  //         customElement={null}
  //         alertElement={null}
  //         itemContext={widgetProps?.itemContext}
  //         itemInFocus={promptTextInFocus}
  //         styled={styled}
  //       />{' '} */}
  //       <MultiItems
  //         widgetProps={widgetProps}
  //         uiContext={uiContext}
  //         singleItemScheme={singleItemScheme}
  //         selectedWidgetContext={selectedWidgetContext}
  //         itemContext={widgetProps?.itemContext}
  //         setActiveSearchTerm={setActiveSearchTerm}
  //         handleSetItemInFocus={widgetProps?.handleSetItemInFocus}
  //         customElement={null}
  //         alertElement={null}
  //         data={widgetProps?.data}
  //         selectedData={widgetProps?.selectedData}
  //         setSelectedItem={widgetProps?.setSelectedItem}
  //         selector={widgetProps?.selector}
  //         itemInFocus={widgetProps?.itemInFocus}
  //         styled={styled}
  //       />
  //     </Box>
  //   </>
  // );
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
        uiContext={uiContext}
        widgetContext={selectedWidgetContext}
        // newItem={newItem}
        // flexList={defaultPromptSelector}
        multiItems={multiItems}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
