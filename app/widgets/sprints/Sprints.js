'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Replay, SportsRugbyOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import DailiesContext from '../dailies/DailiesContext';
import SearchContext from '@/context/SearchContext';
import SprintsContext from './SprintsContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';
import SingleItem from '@/app/uiItems/widgetItems/singleItem/SingleItem';
import StandInTable from '@/app/components/table/StandInTable';
import { singleItemScheme } from './dataScheme';

import { useMode } from '@/app/theme/ThemeContext';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import WidgetMenu from '@/app/uiItems/widgetItems/WidgetMenu';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';

export default function Sprints({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showSprintMenu, setShowSprintMenu } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
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
    collection_context_title: 'Sprint',

    widget: widget,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    setUiGridMapContext: setUiGridMapContext,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    itemContext: '',
    collection: collection,
    handleSetItemInFocus: handleSetSprintInFocus,
    data: selectedSprints,
    selectedData: selectedSprints,
    setSelectedItem: setSelectedSprints,
    selector: {
      selector: 'sprintSelector',
      selected: 'selectedSprints',
    },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: sprintInFocus,
    customArrayItemInFocus: displaySprintBacklogs,
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
    setActiveSearchTerm: setActiveSearchTerm,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
    handleClickCustomArrayItem: handleClickCustomArrayItem,
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
        handleSetItemInFocus={widgetProps?.handleSetItemInFocus}
        customElement={null}
        alertElement={null}
        data={widgetProps?.data}
        selectedData={widgetProps?.selectedData}
        setSelectedItem={widgetProps?.setSelectedItem}
        selector={widgetProps?.selector}
        itemInFocus={widgetProps?.itemInFocus}
        styled={styled}
      />
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
        // singleItem={singleItem}
        tree={tree}
        // flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
