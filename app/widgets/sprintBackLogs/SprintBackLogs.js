'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AddToQueue, BackupOutlined } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintBackLogsContext from './SprintBackLogsContext';
import UserStoriesContext from '../userStories/UserStoriesContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';

import { singleItemScheme } from './dataScheme';
import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import { useMode } from '@/app/theme/ThemeContext';
import AcceptanceCriteriaContext from '../acceptanceCriteria/AcceptanceCriteriaContext';

export default function SprintBackLogs({
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
    displaySprintBackLogs,
    setDisplaySprintBackLogs,
    selectedSprintBackLogs,
    setSelectedSprintBackLogs,
    sprintBackLogInFocus,
    setSprintBackLogInFocus,
    searchTerm,
    setSearchTerm,
    handleFindSprintBackLogs,
  } = useContext(SprintBackLogsContext);
  const {
    displayUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
  } = useContext(UserStoriesContext);
  const { acceptanceCriteriaInFocus } = useContext(AcceptanceCriteriaContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetBackLogInFocus = (item) => {
    handleSetItemInFocus(setSprintBackLogInFocus, item, setLatestItemInFocus);

    const foundUserStories = displayUserStories.filter(
      (story) => story.id === item.product_backlog_item_id
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
  const collection = 'sprintBackLogs';
  const widgetProps = {
    iconButton: <AddToQueue />,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    itemContext: '',
    collection: collection,
    handleSetItemInFocus: handleSetBackLogInFocus,
    data: selectedSprintBackLogs,
    selectedData: selectedSprintBackLogs,
    setSelectedItem: setSelectedSprintBackLogs,
    selector: {
      selector: 'sprintBackLogsSelector',
      selected: 'selectedSprintBackLog',
    },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: sprintBackLogInFocus,
    orderedBy: '',

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

  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  useEffect(() => {
    handleFindSprintBackLogs(
      acceptanceCriteriaInFocus,
      'id',
      'acceptanceCriteria_id',
      'call acceptanceCriteriaInFocus'
    );

    return () => {};
  }, [acceptanceCriteriaInFocus]);
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

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        tree={tree}
      />
    </>
  );
}
