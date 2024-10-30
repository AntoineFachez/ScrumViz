'use client';
import { useContext, useState, useEffect } from 'react';
import { Add, Group } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import UIContext from '@/context/UIContext';
import SearchContext from '@/context/SearchContext';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import TeamMembersContext from './TeamMembersContext';

import { scheme, singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { useMode } from '@/app/theme/ThemeContext';

export default function TeamMembers({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showTeamMembersMenu, setShowTeamMembersMenu } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    setShowNewItem,
    displayTeamMembers,
    setDisplayTeamMembers,
    selectedTeamMembers,
    setSelectedTeamMembers,
    teamMemberInFocus,
    setTeamMemberInFocus,
    searchTerm,
    setSearchTerm,
  } = useContext(TeamMembersContext);
  const { handleFindMemberInScrumTeam } = useContext(ScrumTeamsContext);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetTeamMemberInFocus = (item) => {
    handleSetItemInFocus(setTeamMemberInFocus, item, setLatestItemInFocus);
  };
  const collection = 'teamMembers';
  const widgetProps = {
    iconButton: <Group />,
    tooltipTitle_newItem: 'Create new Team Member',
    collection_context_title: 'Team Members',
    dialogTitle: 'Create new Team Member',
    handleSetItemInFocus: handleSetTeamMemberInFocus,
    data: selectedTeamMembers,
    selectedData: selectedTeamMembers,
    setSelectedItem: setSelectedTeamMembers,
    selector: {
      selector: 'teamMembersSelector',
      selected: 'selectedTeamMembers',
    },
    itemInFocus: teamMemberInFocus,

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
        tooltip_title: 'Create new Team Member',
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
    // handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
    styled: styled,
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleResetFiltered = () => {
    setSelectedTeamMembers(displayTeamMembers);
    setIsFiltered(false);
  };
  useEffect(() => {
    if (teamMemberInFocus) handleFindMemberInScrumTeam(teamMemberInFocus);
    return () => {};
  }, [teamMemberInFocus]);

  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TeamMembers SoloWidget
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
      TeamMembers Tree
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
