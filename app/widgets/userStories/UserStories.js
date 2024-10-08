'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import {
  Add,
  Assignment,
  StoreMallDirectoryOutlined,
} from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import TableComponent from '@/app/components/table/TableComponent';
import StandInTable from '@/app/components/table/StandInTable';
import MultiItems from '@/app/uiItems/MultiItems';
import UserStoriesContext, { UserStoriesProvider } from './UserStoriesContext';
import SearchContext from '@/context/SearchContext';
import SingleItem from '@/app/uiItems/SingleItem';
import SprintPlanningsContext from '../sprintPlannings/SprintPlanningsContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import { scheme, singleItemScheme } from './dataScheme';
import { handleSelectWidgetContext } from '../actions';
import NewItem from '@/app/uiItems/NewItem';
import { handleNewUserStory } from './functions/dbFunctions';

export default function UserStory({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showUserStoryMenu, setShowUserStoryMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    // selectedWidgetContext,
    // setSelectedWidgetContext,
    displayUserStories,
    setDisplayUserStories,
    selectedUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,
    handleSearchTermChange,
    // handleResetFiltered,
    handleSetUserStoryInFocus,
    // handleSelectWidgetContext,
  } = useContext(UserStoriesContext);
  const { handleFindSprintPlannings } = useContext(SprintPlanningsContext);
  const { handleFindSprintBackLogs } = useContext(SprintBackLogsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'userStories';
  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <Assignment />,
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
    states: { showMenu: showUserStoryMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowUserStoryMenu,
    },
  };

  useEffect(() => {
    if (userStoryInFocus) {
      handleFindSprintPlannings(userStoryInFocus);
      handleFindSprintBackLogs(userStoryInFocus);
    }

    return () => {};
  }, [userStoryInFocus]);

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

  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      UserStory SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={userStoryInFocus}
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
      UserStory Tree
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
        flexFlow: 'column',
      }}
    >
      {' '}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Create new default Prompt" placement="top" arrow>
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={() =>
              handleNewUserStory(
                widgetProps,
                userStoryInFocus,
                setUserStoryInFocus,
                displayUserStories,
                setDisplayUserStories
              )
            }
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
      <MultiItems
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
        selectedWidgetContext={selectedWidgetContext}
        itemContext={widgetProps?.itemContext}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetUserStoryInFocus}
        customElement={null}
        alertElement={null}
        data={selectedUserStories}
        selectedData={selectedUserStories}
        setSelectedItem={setSelectedUserStories}
        selector={{
          selector: 'userStorySelector',
          selected: 'selectedUserStories',
        }}
        itemInFocus={userStoryInFocus}
        styled={styled}
      />
    </Box>
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
          data={userStoryInFocus}
          scheme={scheme}
        />
      </Box>
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
