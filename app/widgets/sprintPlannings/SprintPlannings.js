'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import { Replay, Schedule, SportsRugbyOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SprintPlanningsContext from './SprintPlanningsContext';
import MultiItems from '@/app/pages/MultiItems';
import SingleItem from '@/app/pages/SingleItem';
import { singleItemScheme } from './dataScheme';
import SearchContext from '@/context/SearchContext';
import UserStoriesContext from '../userStories/UserStoriesContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';

export default function SprintPlannings({
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
    iconButton: <Schedule />,
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

  const handleSetSprintPlanningInFocus = (sprintPlanning) => {
    setSprintPlanningInFocus(sprintPlanning);
    const productBacklogItemIds = new Set(
      sprintPlanning.sprint_backlog.map((item) => item.product_backlog_item_id)
    );
    console.log(productBacklogItemIds, selectedUserStories);

    // 2. Filter userStories based on the extracted IDs
    const filteredUserStories = selectedUserStories.filter((story) =>
      productBacklogItemIds.has(story.id)
    );

    // 3. Do something with the filteredUserStories (e.g., update state, display them, etc.)
    setSelectedUserStories(filteredUserStories);

    const foundSprintLogs = displaySprintBackLogs.filter((backLog) =>
      productBacklogItemIds.has(backLog.product_backlog_item_id)
    );
    setSelectedSprintBackLogs(foundSprintLogs);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  const CardSubHeaderElement = (data) => (
    <Typography
      onClick={() => handleSetSprintPlanningInFocus(data)}
      sx={styled?.textBody}
      variant={styled?.textBody?.variant}
    ></Typography>
  );
  const menu = (
    <Menu
      widgetProps={widgetProps}
      handleSelectWidgetContext={handleSelectWidgetContext}
      //   searchString={searchString}
      // handleSearch={handleSearch}
      // handleFilterEntities={handleFilterEntities}
      // loading={loading}
      // getAllentitiesTypes={getAllentitiesTypes}
      // handlePaste={handlePaste}
      // handleSubmit={handleSubmit}
      //   styled={styled}
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
        cardSubHeaderElement={CardSubHeaderElement}
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
      />
    </>
  );
}
