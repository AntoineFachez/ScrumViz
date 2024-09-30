'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';

import { AddToQueue, BackupOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SingleItem from '@/app/pages/SingleItem';
import MultiItems from '@/app/pages/MultiItems';
import SearchContext from '@/context/SearchContext';
import { singleItemScheme } from './dataScheme';
import UserStoriesContext from '../userStories/UserStoriesContext';
import SprintBackLogsContext from './SprintBackLogsContext';
import WidgetMenu from '@/app/pages/WidgetMenu';

import { handleSelectWidgetContext } from '../actions';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';

export default function SprintBackLogs({
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
  const {
    homeUiSelected,
    setHomeUiSelected,
    showBackLogItemMenu,
    setShowBackLogItemMenu,
  } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    displaySprintBackLogs,
    setDisplaySprintBackLogs,
    selectedSprintBackLogs,
    setSelectedSprintBackLogs,
    sprintBackLogInFocus,
    setSprintBackLogInFocus,
    searchTerm,
    setSearchTerm,
  } = useContext(SprintBackLogsContext);
  const {
    displayUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
  } = useContext(UserStoriesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const collection = 'sprintBackLogs';
  const widgetProps = {
    appContext: appContext,
    scrumManagerContext: scrumManagerContext,
    iconButton: <AddToQueue />,
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
    states: {
      showMenu: showBackLogItemMenu,
      widgetProps: widgetProps,
    },
    functions: {
      handleShowMenu: setShowBackLogItemMenu,
    },
  };

  const handleSetBackLogInFocus = (sprintBackLog) => {
    setSprintBackLogInFocus(sprintBackLog);
    const foundUserStories = displayUserStories.filter(
      (story) => story.id === sprintBackLog.product_backlog_item_id
    )[0];
    setUserStoryInFocus(foundUserStories);

    // const found = displayUserStories.filter(
    //   (story) => story.id === sprintBackLog.product_backlog_item_id
    // );
    // setSelectedUserStories(found);

    // setActiveSearchTerm(userStory?.universityName);
    // setLastInFocusItem({
    //   context: widgetProps?.itemContext,
    //   item: universityInFocus,
    // });
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
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
      itemInFocus={sprintBackLogInFocus}
      styled={styled}
    />
  );
  const chip = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      BackLogItems Chip
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
        data={selectedSprintBackLogs}
        selectedData={selectedSprintBackLogs}
        setSelectedItem={setSelectedSprintBackLogs}
        selector={{
          selector: 'sprintBackLogsSelector',
          selected: 'selectedSprintBackLog',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={sprintBackLogInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetBackLogInFocus}
        customElement={null}
        alertElement={null}
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
        chip={chip}
        tree={tree}
        flexList={flexList}
      />
    </>
  );
}
