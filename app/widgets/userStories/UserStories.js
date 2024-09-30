'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import { Assignment, StoreMallDirectoryOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import TableComponent from '@/app/components/table/TableComponent';
import StandInTable from '@/app/components/table/StandInTable';
import MultiItems from '@/app/pages/MultiItems';
import UserStoriesContext, { UserStoriesProvider } from './UserStoriesContext';
import SearchContext from '@/context/SearchContext';
import SingleItem from '@/app/pages/SingleItem';
import { singleItemScheme } from './dataScheme';
import SprintPlanningsContext from '../sprintPlannings/SprintPlanningsContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import WidgetMenu from '@/app/pages/WidgetMenu';

import { handleSelectWidgetContext } from '../actions';
import { widgetProps, menuProps } from '../actions';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';

export default function UserStory({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const {
    appContext,
    setAppContext,
    scrumManagerContext,
    setScrumManagerContext,
  } = useContext(AppContext);
  const { showUserStoryMenu, setShowUserStoryMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    selectedUserStories,
    setSelectedUserStories,
    isFiltered,
    userStoryInFocus,
    searchTerm,
    handleResetFiltered,
    handleSetUserStoryInFocus,
    handleSearchTermChange,
  } = useContext(UserStoriesContext);
  const { handleFindSprintPlannings } = useContext(SprintPlanningsContext);
  const { handleFindSprintBackLogs } = useContext(SprintBackLogsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'userStories';
  const widgetProps = {
    appContext: appContext,
    scrumManagerContext: scrumManagerContext,
    iconButton: <Assignment />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',

    onClick: () => {
      setScrumManagerContext(collection);
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
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      UserStory New Item
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
      }}
    >
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
