'use client';
import { useContext, useEffect, useState } from 'react';
import { Replay } from '@mui/icons-material';
import { Box } from '@mui/material';

import AppContext from '@/context/AppContext';
import DailiesContext from '../dailies/DailiesContext';
import InFocusContext from '@/context/InFocusContext';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';
import SearchContext from '@/context/SearchContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import SprintsContext from './SprintsContext';
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

export default function Sprints({
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

    displaySprints,
    setDisplaySprints,
    selectedSprints,
    setSelectedSprints,
    sprintInFocus,
    setSprintInFocus,
    searchTerm,
    setSearchTerm,
  } = useContext(SprintsContext);
  const { displaySprintBacklogs } = useContext(SprintBackLogsContext);
  const { displayDailies, selectedDailies, setSelectedDailies } =
    useContext(DailiesContext);
  const { handleFindScrumTeam } = useContext(ScrumTeamsContext);

  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetSprintInFocus = (item) => {
    handleSetItemInFocus(setSprintInFocus, item, setLatestItemInFocus);

    const found = displayDailies.filter((daily) => {
      return daily.sprint_id === item.id;
    });
    setSelectedDailies(found);
  };
  const handleClickCustomArrayItem = (item) => {
    // const found = displaySprintBacklogs.filter(
    //   (sprintBackLog) => sprintBackLog.id === item.acceptanceCriteria_id
    // )[0];
    // setSelectedSprintBackLogs(found);
    // handleFindAcceptanceCriteria(item, 'id', 'acceptanceCriteria_id');
  };
  const collection = 'sprints';
  const widgetProps = {
    iconButton: <Replay sx={{ transform: 'scaleX(-1) scaleY(-1)' }} />,
    tooltipTitle_newItem: 'Create new Sprint',
    collection_context_title: 'Sprints',
    dialogTitle: 'Create new Sprint',
    handleSetItemInFocus: handleSetSprintInFocus,
    data: selectedSprints,
    selectedData: selectedSprints,
    setSelectedItem: setSelectedSprints,
    selector: {
      selector: 'sprintSelector',
      selected: 'selectedSprints',
    },
    itemInFocus: sprintInFocus,
    customArrayItemInFocus: displaySprintBacklogs,

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
    handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleResetFiltered = () => {
    setSelectedSprints(displaySprints);
    setIsFiltered(false);
  };
  useEffect(() => {
    if (sprintInFocus) handleFindScrumTeam(sprintInFocus, 'team_id');

    return () => {};
  }, [sprintInFocus]);

  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      Sprint SoloWidget
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
      Sprint Tree
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        soloWidget={soloWidget}
        tree={tree}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
