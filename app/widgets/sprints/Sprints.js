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

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import MultiItems from '@/app/pages/MultiItems';
import SingleItem from '@/app/pages/SingleItem';
import StandInTable from '@/app/components/table/StandInTable';
import { singleItemScheme } from './dataScheme';

import { themeSettings } from '@/app/theme/ThemeContext';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';

import { handleSelectWidgetContext } from '../actions';
import WidgetMenu from '@/app/pages/WidgetMenu';

export default function Sprints({
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { showSprintMenu, setShowSprintMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
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
  const collection = 'sprints';
  const widgetProps = {
    iconButton: <Replay sx={{ transform: 'scaleX(-1) scaleY(-1)' }} />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',

    onClick: () => {
      setAppContext(collection);
    },
  };
  const menuProps = {
    functions: {
      handleShowMenu: setShowSprintMenu,
    },
    states: { showMenu: showSprintMenu, widgetProps: widgetProps },
  };

  const handleSetSprintInFocus = (sprint) => {
    setSprintInFocus(sprint);
    const found = displayDailies.filter((daily) => {
      return daily.sprint_id === sprint.id;
    });
    setSelectedDailies(found);
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

  const menu = (
    <>
      <WidgetMenu
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
      Sprint SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={sprintInFocus}
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
      Sprint Chip
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
        data={selectedSprints}
        selectedData={selectedSprints}
        setSelectedItem={setSelectedSprints}
        selector={{
          selector: 'sprintSelector',
          selected: 'selectedSprints',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={sprintInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetSprintInFocus}
        customElement={null}
        alertElement={null}
        styled={styled}
      />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widgetProps={widgetProps}
        menu={menu}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        singleItem={singleItem}
        chip={chip}
        tree={tree}
        flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
