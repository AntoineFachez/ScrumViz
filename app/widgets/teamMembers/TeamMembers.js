'use client';
import { useContext, useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import { Group, StoreMallDirectoryOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from './TeamMembersContext';
import MultiItems from '@/app/pages/MultiItems';
import { singleItemScheme } from './dataScheme';
import SingleItem from '@/app/pages/SingleItem';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';
import WidgetMenu from '@/app/pages/WidgetMenu';

import { handleSelectWidgetContext } from '../actions';

export default function TeamMembers({
  uiContext,
  startUpWidgetLayout,
  url,
  setUrl,
  targetUrl,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { showTeamMembersMenu, setShowTeamMembersMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
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
  const collection = 'teamMembers';
  const widgetProps = {
    iconButton: <Group />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',
    // menu: menu,
    // soloWidget: soloWidget,
    // table: table,
    // singleItem: singleItem,
    // chip: chip,
    // tree: tree,
    // flexList: flexList,
    onClick: () => {
      // window.location.href = '/sprint';
      setAppContext(collection);
    },
  };
  const menuProps = {
    functions: {
      handleShowMenu: setShowTeamMembersMenu,
    },
    states: { showMenu: showTeamMembersMenu, widgetProps: widgetProps },
  };

  const handleSetTeamMemberInFocus = (teamMember) => {
    setTeamMemberInFocus(teamMember);
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
      TeamMember New Item
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
      TeamMembers SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={teamMemberInFocus}
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
      TeamMembers Chip
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
        data={selectedTeamMembers}
        selectedData={selectedTeamMembers}
        setSelectedItem={setSelectedTeamMembers}
        selector={{
          selector: 'teamMembersSelector',
          selected: 'selectedTeamMembers',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={teamMemberInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetTeamMemberInFocus}
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
