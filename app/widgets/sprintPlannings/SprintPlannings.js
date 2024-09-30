'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';
import { Replay, Schedule, SportsRugbyOutlined } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
import UserStoriesContext from '../userStories/UserStoriesContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import SprintPlanningsContext from './SprintPlanningsContext';

import { handleSelectWidgetContext } from '../actions';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';
import MultiItems from '@/app/pages/MultiItems';
import SingleItem from '@/app/pages/SingleItem';
import WidgetMenu from '@/app/pages/WidgetMenu';

import { singleItemScheme } from './dataScheme';

import { themeSettings } from '@/app/theme/ThemeContext';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';

export default function SprintPlannings({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const {
    appContext,
    setAppContext,
    scrumManagerContext,
    setScrumManagerContext,
  } = useContext(AppContext);
  const { showSprintPlanningMenu, setShowSprintPlanningMenu } =
    useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedUserStories, setSelectedUserStories } =
    useContext(UserStoriesContext);
  const { displaySprintBackLogs, setSelectedSprintBackLogs } = useContext(
    SprintBackLogsContext
  );
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const {
    displaySprintPlannings,
    setDisplaySprintPlannings,
    selectedSprintPlannings,
    setSelectedSprintPlannings,
    sprintPlanningInFocus,
    setSprintPlanningInFocus,
  } = useContext(SprintPlanningsContext);
  const collection = 'sprintPlannings';
  const widgetProps = {
    appContext: appContext,
    scrumManagerContext: scrumManagerContext,
    iconButton: <Schedule />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',
    // menu: menu,
    // soloWidget: soloWidget,
    // table: table,
    // singleItem: singleItem,
    // chip: chip,
    // tree: tree,
    // flexList: flexList,
    onClick: () => {
      setScrumManagerContext(collection);
      return;
    },
  };
  const menuProps = {
    states: { showMenu: showSprintPlanningMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowSprintPlanningMenu,
    },
  };

  const handleSetSprintPlanningInFocus = (sprintPlanning) => {
    setSprintPlanningInFocus(sprintPlanning);
    const productBacklogItemIds = new Set(
      sprintPlanning.sprint_backlog.map((item) => item.product_backlog_item_id)
    );

    const filteredUserStories = selectedUserStories.filter((story) =>
      productBacklogItemIds.has(story.id)
    );

    setSelectedUserStories(filteredUserStories);

    const foundSprintLogs = displaySprintBackLogs.filter((backLog) =>
      productBacklogItemIds.has(backLog.product_backlog_item_id)
    );
    setSelectedSprintBackLogs(foundSprintLogs);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };

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
      SprintPlanning New Item
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
      SprintPlanning SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={sprintPlanningInFocus}
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
      SprintPlanning Chip
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
      SprintPlanning Tree
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
        data={selectedSprintPlannings}
        selectedData={selectedSprintPlannings}
        setSelectedItem={setSelectedSprintPlannings}
        selector={{
          selector: 'sprintPlanningsSelector',
          selected: 'selectedSprintPlanning',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={sprintPlanningInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetSprintPlanningInFocus}
        customElement={null}
        alertElement={null}
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
        chip={chip}
        tree={tree}
        flexList={flexList}
      />
    </>
  );
}
