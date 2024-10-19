'use client';
import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Add, Assignment } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintPlanningsContext from '../sprintPlannings/SprintPlanningsContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import UIContext from '@/context/UIContext';
import UserStoriesContext from './UserStoriesContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { scheme, singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';
// import { handleNewUserStory } from './functions/dbFunctions';
import { useMode } from '@/app/theme/ThemeContext';
import AcceptanceCriteria from '../acceptanceCriteria/AcceptanceCriteria';
import AcceptanceCriteriaContext from '../acceptanceCriteria/AcceptanceCriteriaContext';
import { updateWidgetContext } from '@/app/components/grid/helperFunctions';

export default function UserStory({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const {} = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    setShowNewItem,
    selectedUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,
  } = useContext(UserStoriesContext);
  const { handleFindSprintPlannings } = useContext(SprintPlanningsContext);
  const { handleFindSprintBackLogs } = useContext(SprintBackLogsContext);
  const {
    displayAcceptanceCriteria,
    selectedAcceptanceCriteria,
    setSelectedAcceptanceCriteria,
    acceptanceCriteriaInFocus,
    setAcceptanceCriteriaInFocus,
    handleFindAcceptanceCriteria,
  } = useContext(AcceptanceCriteriaContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'userStories';

  const handleSetUserStoryInFocus = (item) => {
    handleSetItemInFocus(setUserStoryInFocus, item, setLatestItemInFocus);
  };
  const handleClickCustomArrayItem = (item) => {
    const found = displayAcceptanceCriteria.filter(
      (criteria) => criteria.id === item.acceptanceCriteria_id
    )[0];
    setAcceptanceCriteriaInFocus(found);
    // handleFindAcceptanceCriteria(item, 'id', 'acceptanceCriteria_id');
  };

  const widgetProps = {
    iconButton: <Assignment />,
    tooltipTitle_newItem: 'Create new User Story',
    collection_context_title: 'User Stories',
    dialogTitle: 'Create new User Story',
    itemContext: '',
    data: selectedUserStories,
    selectedData: selectedUserStories,
    setSelectedItem: setSelectedUserStories,
    itemInFocus: userStoryInFocus,
    customArrayItemInFocus: acceptanceCriteriaInFocus,
    selector: {
      selector: 'userStoriesSelector',
      selected: 'selectedUserStories',
    },
    handleSetItemInFocus: handleSetUserStoryInFocus,

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
        tooltip_title: 'Create new User Story',
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

  useEffect(() => {
    if (userStoryInFocus) {
      handleFindSprintPlannings(userStoryInFocus, 'id', 'userStory_id');
      handleFindSprintBackLogs(userStoryInFocus, 'id', 'userStory_id');
    }

    return () => {};
  }, [userStoryInFocus]);

  // useEffect(() => {
  //   console.log('updateWidgetContext', uiGridMapContext);

  //   updateWidgetContext(
  //     widget,
  //     widgetProps.uiGridMapContext,
  //     widgetProps.widgetContext
  //   );
  //   return () => {};
  // }, [widgetProps.uiGridMapContext]);

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

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // newItem={newItem}
        soloWidget={soloWidget}
        // table={table}
        tree={tree}
        // multiItems={multiItems}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
