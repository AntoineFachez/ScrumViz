'use client';
import { useContext, useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import {
  Group,
  GroupAdd,
  StoreMallDirectoryOutlined,
} from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from './TeamMembersContext';
import MultiItems from '@/app/uiItems/MultiItems';
import { singleItemScheme } from './dataScheme';
import SingleItem from '@/app/uiItems/singleItem/SingleItem';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';

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
    iconButton: <GroupAdd />,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    itemContext: '',
    collection: collection,
    handleSetItemInFocus: handleSetTeamMemberInFocus,
    data: selectedTeamMembers,
    selectedData: selectedTeamMembers,
    setSelectedItem: setSelectedTeamMembers,
    selector: {
      selector: 'teamMembersSelector',
      selected: 'selectedTeamMembers',
    },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: teamMemberInFocus,
    // menu: menu,
    // soloWidget: soloWidget,
    // table: table,
    // singleItem: singleItem,
    // chip: chip,
    // tree: tree,
    // flexList: flexList,
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
    setSelectedTeamMembers(displayTeamMembers);
    setIsFiltered(false);
  };
  useEffect(() => {
    if (teamMemberInFocus) handleFindMemberInScrumTeam(teamMemberInFocus);
    return () => {};
  }, [teamMemberInFocus]);

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
  // const singleItem = (
  //   <SingleItem
  //     singleItemScheme={singleItemScheme}
  //     itemContext={widgetProps?.itemContext}
  //     itemInFocus={teamMemberInFocus}
  //     styled={styled}
  //   />
  // );
  // const chip = (
  //   <Box
  //     className="widget"
  //     sx={{
  //       ...styled.widget,
  //       // backgroundColor: '#555',
  //     }}
  //   >
  //     TeamMembers Chip
  //   </Box>
  // );
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
        // chip={chip}
        tree={tree}
        // flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
