'use client';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Group, StoreMallDirectoryOutlined } from '@mui/icons-material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import ScrumTeamsContext from './ScrumTeamsContext';
import { singleItemScheme } from './dataScheme';
import SingleItem from '@/app/uiItems/SingleItem';
import MultiItems from '@/app/uiItems/MultiItems';
import SearchContext from '@/context/SearchContext';
import SprintsContext from '../sprints/SprintsContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import WidgetMenu from '@/app/uiItems/WidgetMenu';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';

export default function ScrumTeam({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const {
    homeUiSelected,
    setHomeUiSelected,
    showTeamMembersMenu,
    setShowTeamMembersMenu,
    toggleDrawer,
  } = useContext(UIContext);
  const { setLatestSelectedItem } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    displayScrumTeams,
    setDisplayScrumTeams,
    selectedScrumTeams,
    setSelectedScrumTeams,
    scrumTeamInFocus,
    setScrumTeamInFocus,
    isFiltered,
    handleResetFiltered,
    searchTerm,
    setSearchTerm,
  } = useContext(ScrumTeamsContext);
  const { displayTeamMembers, teamMemberInFocus, setTeamMemberInFocus } =
    useContext(TeamMembersContext);
  const {
    displaySprints,
    setDisplaySprints,
    selectedSprints,
    setSelectedSprints,
    sprintInFocus,
    setSprintInFocus,
    handleFindSprints,
  } = useContext(SprintsContext);

  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'scrumTeams';
  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <Group />,
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
    states: { showMenu: showTeamMembersMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowTeamMembersMenu,
    },
  };
  const handleSetScrumTeamInFocus = (scrumTeam) => {
    handleSetItemInFocus(setScrumTeamInFocus, scrumTeam, setLatestSelectedItem);

    const foundSprints = displaySprints.filter((sprint) => {
      console.log(sprint.scrum_id, scrumTeam.id);
      return sprint.team_id === scrumTeam.id;
    });
    setSelectedSprints(foundSprints);
    // setActiveSearchTerm(userStory?.universityName);
    // setLastInFocusItem({
    //   context: widgetProps?.itemContext,
    //   item: universityInFocus,
    // });
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleClickCustomArrayItem = (e) => {
    const found = displayTeamMembers.filter(
      (teamMember) => teamMember.id === e.id
    )[0];
    console.log(found);
    setTeamMemberInFocus(found);
  };
  useEffect(() => {
    if (scrumTeamInFocus) {
      handleFindSprints('team_id', scrumTeamInFocus, 'id');
    }

    return () => {};
  }, [scrumTeamInFocus]);

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
      ScrumTeam SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={scrumTeamInFocus}
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
      ScrumTeam Chip
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
      ScrumTeam Tree
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
      {/* UserStory MultiItems */}
      <MultiItems
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
        selectedWidgetContext={selectedWidgetContext}
        handleClickCustomArrayItem={handleClickCustomArrayItem}
        customElement={null}
        alertElement={null}
        data={selectedScrumTeams}
        selectedData={selectedScrumTeams}
        setSelectedItem={setSelectedScrumTeams}
        selector={{
          selector: 'scrumTeamSelector',
          selected: 'selectedScrumTeam',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={scrumTeamInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        customArrayItemInFocus={teamMemberInFocus}
        handleSetItemInFocus={handleSetScrumTeamInFocus}
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
