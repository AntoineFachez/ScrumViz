import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import DefaultPromptsContext from './DefaultPromptsContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
// import UserContext from '@/context/UserContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';
import NewItem from '@/app/uiItems/NewItem';
import MultiItems from '@/app/uiItems/MultiItems';

import SimpleDialog from '@/app/components/dialog/Dialog';

import { handleSelectWidgetContext } from '../actions';
import { scheme, singleItemScheme } from './dataScheme';

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
    handleSearchTermChange,

    handleNewDefaultPrompt,

    // handleSetDefaultPromptInFocus,
  } = useContext(DefaultPromptsContext);

  // const [selectedWidgetContext, setSelectedWidgetContext] =
  //   useState(startUpWidgetLayout);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const collection = 'defaultPrompts';
  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <Chat />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',
    dialogTitle: 'Create new default Prompt',

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
    searchTerm: searchTerm,
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    handleSelectWidgetContext: handleSelectWidgetContext,
    handleSearchTermChange: () =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  // const menuProps = {
  //   states: { showMenu: showDefaultPromptsMenu, widgetProps: widgetProps },
  //   functions: {
  //     handleShowMenu: setShowDefaultPromptsMenu,
  //   },
  // };
  const handleSetDefaultPromptInFocus = (item) => {
    handleSetItemInFocus(setPromptTextInFocus, item, setLatestItemInFocus);
  };
  useEffect(() => {
    setSelectedWidgetContext(startUpWidgetLayout);
    if (!isLoading) setPromptTextInFocus('');
    return () => {};
  }, []);
  const quickMenu = (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Tooltip title="Create new default Prompt" placement="top" arrow>
        <IconButton
          sx={styled?.iconButton?.action}
          onClick={() => handleNewDefaultPrompt()}
        >
          <Add />
        </IconButton>
      </Tooltip>
    </Box>
  );
  // const menu = (
  //   <>
  //     <WidgetMenu
  //       widget={widget}
  //       widgetProps={widgetProps}
  //       menuProps={menuProps}
  //       setSelectedWidgetContext={setSelectedWidgetContext}
  //       handleSelectWidgetContext={handleSelectWidgetContext}
  //       handleSearchTermChange={handleSearchTermChange}
  //       searchTerm={searchTerm}
  //     />
  //   </>
  // );

  const defaultPromptSelector = (
    <>
      <Box
        className="widget"
        sx={{
          ...styled.widget,
          // backgroundColor: '#555',
          flexFlow: 'column',
        }}
      >
        <MultiItems
          widget={widget}
          uiContext={uiContext}
          singleItemScheme={singleItemScheme}
          selectedWidgetContext={selectedWidgetContext}
          setActiveSearchTerm={setActiveSearchTerm}
          handleSetItemInFocus={handleSetDefaultPromptInFocus}
          customElement={null}
          alertElement={null}
          data={selectedDefaultPrompts}
          selectedData={selectedDefaultPrompts}
          // setSelectedItem={setDefaultPrompts}
          selector={{
            selector: 'defaultPromptsSelector',
            selected: 'selectedPrompts',
          }}
          itemContext={widgetProps?.itemContext}
          itemInFocus={promptTextInFocus}
          styled={styled}
        />
      </Box>
    </>
  );
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
      }}
    >
      {' '}
      <Box
        sx={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row' }}
        className="widget"
      >
        {/* <Box sx={{ width: '40%', maxWidth: '25ch' }}>
          {defaultPromptSelector}
        </Box> */}
        <NewItem
          component="form"
          sxStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eee',
            '& .MuiDialog-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiTextField-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiInputBase-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiInputBase-input': { m: 1, width: '100%', height: '100%' },
          }}
          autoComplete="off"
          size={'small'}
          id="outlined-multiline-static"
          label={collection}
          rows={14}
          data={promptTextInFocus}
          scheme={scheme}
        />
      </Box>
    </Box>
  );
  return (
    <>
      <SimpleDialog
        title={widgetProps.dialogTitle}
        component={
          <Box sx={{ display: 'flex', flexFlow: 'row' }} className="widget">
            <Box sx={{ width: '30%', maxWidth: '25ch' }}>
              {defaultPromptSelector}
            </Box>
            {newItem}
          </Box>
        }
        // data={newItem}
        onClose={handleCloseDialog}
        // selectedValue={selectedValue}
        open={showDialog}
      />

      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        uiContext={uiContext}
        widgetContext={selectedWidgetContext}
        quickMenu={quickMenu}
        // menu={menu}
        // newItem={newItem}
        flexList={defaultPromptSelector}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
