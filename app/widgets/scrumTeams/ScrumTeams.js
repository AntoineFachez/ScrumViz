'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import { StoreMallDirectoryOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import ScrumTeamsContext from './ScrumTeamsContext';
import { singleItemScheme } from './dataScheme';
import SingleItem from '@/app/pages/SingleItem';
import MultiItems from '@/app/pages/MultiItems';
import SearchContext from '@/context/SearchContext';
import SprintsContext from '../sprints/SprintsContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

export default function ScrumTeam({
  uiContext,
  startUpWidgetLayout,
  url,
  setUrl,
  targetUrl,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { homeUiSelected, setHomeUiSelected } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    displayScrumTeams,
    setDisplayScrumTeams,
    selectedScrumTeams,
    setSelectedScrumTeams,
    scrumTeamInFocus,
    setScrumTeamInFocus,
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
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'scrumTeams';
  const widgetProps = {
    iconButton: <Avatar />,
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
      // window.location.href = `/scrumTeam`;
      setAppContext(collection);
    },
  };
  const handleSelectWidgetContext = (context) => {
    //  if (generated) {
    //    setPassWidgetContext(context);
    //  }
    setSelectedWidgetContext(context);
    //  if (startUpWidgetLayout !== context) {
    //    //TODO: if widgetContext of former widget is different to the new one's then dialogue:"wanna keep table view or set to default view of component?
    //  } else {
    //  }
  };
  const handleSetScrumTeamInFocus = (scrumTeam) => {
    setScrumTeamInFocus(scrumTeam);
    const found = displaySprints.filter((sprint) => {
      console.log(sprint.scrum_id, scrumTeam.id);
      return sprint.team_id === scrumTeam.id;
    });
    setSelectedSprints(found);
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

  const handleResetFiltered = () => {
    setSelectedScrumTeams(displayScrumTeams);
    setIsFiltered(false);
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
    <Menu
      widgetProps={widgetProps}
      handleSelectWidgetContext={handleSelectWidgetContext}
      handleSearchTermChange={handleSearchTermChange}
      searchTerm={searchTerm}
    />
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
        handleClickCustomArrayItem={handleClickCustomArrayItem}
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
