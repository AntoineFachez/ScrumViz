'use client';
import { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Add, Schedule } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import ProductBackLogsContext from '../productBacklogs/ProductBackLogsContext';
import SearchContext from '@/context/SearchContext';
import SprintsContext from '../sprints/SprintsContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import SprintPlanningsContext from './SprintPlanningsContext';
import UserStoriesContext from '../userStories/UserStoriesContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import { scheme, singleItemScheme } from './dataScheme';

import { useMode } from '@/app/theme/ThemeContext';

export default function SprintPlannings({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showSprintPlanningMenu, setShowSprintPlanningMenu } =
    useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { displayUserStories, selectedUserStories, setSelectedUserStories } =
    useContext(UserStoriesContext);
  const { displaySprintBackLogs, setSelectedSprintBackLogs } = useContext(
    SprintBackLogsContext
  );
  const { sprintInFocus } = useContext(SprintsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    setShowNewItem,
    displaySprintPlannings,
    setDisplaySprintPlannings,
    selectedSprintPlannings,
    setSelectedSprintPlannings,
    sprintPlanningInFocus,
    setSprintPlanningInFocus,
    handleNewSprintPlanning,
    handleFindSprintPlannings,
    handleOpenNewItem,
    handleCloseNewItem,
  } = useContext(SprintPlanningsContext);
  const { displayProductBackLogs, setSelectedProductBackLogs } = useContext(
    ProductBackLogsContext
  );
  const { userStoryInFocus } = useContext(UserStoriesContext);
  const { displaySprints, setSelectedSprints } = useContext(SprintsContext);
  const handleSetSprintPlanningInFocus = (item) => {
    handleSetItemInFocus(setSprintPlanningInFocus, item, setLatestItemInFocus);

    // setSprintPlanningInFocus(item);
    const productBacklog_item_ids = new Set(
      item.sprintBackLog_items.map((backLog) => backLog.productBackLog_item_id)
    );
    const userStories_ids = new Set(
      item.sprintBackLog_items.map((backLog) => backLog.userStory_id)
    );

    const filteredUserStories = displayUserStories.filter((story) =>
      userStories_ids.has(story.id)
    );

    setSelectedUserStories(filteredUserStories);
    const filteredSprints = displaySprints.filter(
      (sprint) => sprint.id === item.sprint_id
    );

    setSelectedSprints(filteredSprints);

    // const filteredProductBackLogs = displayProductBackLogs.filter((backLog) => {
    //   console.log(backLog);
    //   return productBacklog_item_ids.has(backLog.id);
    // });

    // setSelectedProductBackLogs(filteredProductBackLogs);

    const foundSprintLogs = displaySprintBackLogs.filter((backLog) =>
      productBacklog_item_ids.has(backLog.id)
    );
    setSelectedSprintBackLogs(foundSprintLogs);
  };
  const handleClickCustomArrayItem = (item) => {
    const found = displaySprintBackLogs.filter(
      (backLog) => backLog.id === item.sprintBackLog_item_id
    );
    setSelectedSprintBackLogs(found);
    // handleFindAcceptanceCriteria(item, 'id', 'acceptanceCriteria_id');
  };
  const collection = 'sprintPlannings';
  const widgetProps = {
    iconButton: <Schedule />,
    tooltipTitle_newItem: 'Create new Sprint Planning',
    collection_context_title: 'Sprint Planning',
    dialogTitle: 'Create new Sprint Planning',
    data: selectedSprintPlannings,
    selectedData: selectedSprintPlannings,
    setSelectedItem: setSelectedSprintPlannings,
    selector: {
      selector: 'sprintPlanningsSelector',
      selected: 'selectedSprintPlanning',
    },
    itemInFocus: sprintPlanningInFocus,
    handleSetItemInFocus: handleSetSprintPlanningInFocus,

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
        tooltip_title: 'Create new Sprint Planning',
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
    handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };
  // useEffect(() => {
  //   const foundSprintPlannings = displaySprintPlannings.filter(
  //     (planning) => planning.sprint_id === sprintInFocus.id
  //   );
  //   setSelectedSprintPlannings(foundSprintPlannings);
  //   return () => {};
  // }, [sprintInFocus]);
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };

  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      SprintPlanning SoloWidget
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
      SprintPlanning Tree
    </Box>
  );
  const table = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    ></Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        tree={tree}
        // multiItems={multiItems}
      />
    </>
  );
}
