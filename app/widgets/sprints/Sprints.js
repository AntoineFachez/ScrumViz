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

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import MultiItems from '@/app/uiItems/MultiItems';
import SingleItem from '@/app/uiItems/singleItem/SingleItem';
import StandInTable from '@/app/components/table/StandInTable';
import { singleItemScheme } from './dataScheme';

import { useMode } from '@/app/theme/ThemeContext';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import WidgetMenu from '@/app/uiItems/WidgetMenu';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';

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
  const collection = 'sprints';
  const widgetProps = {
    iconButton: <Replay sx={{ transform: 'scaleX(-1) scaleY(-1)' }} />,
    widget: widget,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
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
