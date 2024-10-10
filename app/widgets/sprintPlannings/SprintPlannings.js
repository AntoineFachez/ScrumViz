'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import {
  Add,
  Replay,
  Schedule,
  SportsRugbyOutlined,
} from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import ProductBackLogsContext from '../productBacklogs/ProductBackLogsContext';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import SearchContext from '@/context/SearchContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import SprintPlanningsContext from './SprintPlanningsContext';
import UserStoriesContext from '../userStories/UserStoriesContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';
import StandInTable from '@/app/components/table/StandInTable';
import MultiItems from '@/app/uiItems/MultiItems';
import SingleItem from '@/app/uiItems/singleItem/SingleItem';
import NewItem from '@/app/uiItems/NewItem';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import { scheme, singleItemScheme } from './dataScheme';

import { useMode } from '@/app/theme/ThemeContext';
import AcceptanceCriteriaContext from '../acceptanceCriteria/AcceptanceCriteriaContext';

export default function SprintPlannings({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showSprintPlanningMenu, setShowSprintPlanningMenu } =
    useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { displayUserStories, selectedUserStories, setSelectedUserStories } =
    useContext(UserStoriesContext);
  const { displaySprintBackLogs, setSelectedSprintBackLogs } = useContext(
    SprintBackLogsContext
  );
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    displaySprintPlannings,
    setDisplaySprintPlannings,
    selectedSprintPlannings,
    setSelectedSprintPlannings,
    sprintPlanningInFocus,
    setSprintPlanningInFocus,
    handleNewSprintPlanning,
  } = useContext(SprintPlanningsContext);
  const { displayProductBackLogs, setSelectedProductBackLogs } = useContext(
    ProductBackLogsContext
  );
  const handleSetSprintPlanningInFocus = (item) => {
    handleSetItemInFocus(setSprintPlanningInFocus, item, setLatestItemInFocus);

    // setSprintPlanningInFocus(item);
    const productBacklog_item_ids = new Set(
      item.sprintBackLog_items.map((backLog) => backLog.productBackLog_item_id)
    );
    const userStories_ids = new Set(
      item.sprintBackLog_items.map((backLog) => backLog.userStory_id)
    );
    console.log(productBacklog_item_ids);

    const filteredUserStories = displayUserStories.filter((story) =>
      userStories_ids.has(story.id)
    );

    setSelectedUserStories(filteredUserStories);

    // const filteredProductBackLogs = displayProductBackLogs.filter((backLog) => {
    //   console.log(backLog);
    //   return productBacklog_item_ids.has(backLog.id);
    // });

    // setSelectedProductBackLogs(filteredProductBackLogs);

    const foundSprintLogs = displaySprintBackLogs.filter((backLog) =>
      productBacklog_item_ids.has(backLog.id)
    );
    setSelectedSprintBackLogs(foundSprintLogs);
  };
  const collection = 'sprintPlannings';
  const widgetProps = {
    iconButton: <Schedule />,
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
    handleSetItemInFocus: handleSetSprintPlanningInFocus,
    data: selectedSprintPlannings,
    selectedData: selectedSprintPlannings,
    setSelectedItem: setSelectedSprintPlannings,
    selector: {
      selector: 'sprintPlanningsSelector',
      selected: 'selectedSprintPlanning',
    },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: sprintPlanningInFocus,
    orderedBy: '',
    tooltipTitle_newItem: 'Create new Sprint Planning',
    onClickNewItem: () => handleNewSprintPlanning(),
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
  };

  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
      }}
    >
      {' '}
      <Box
        sx={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row' }}
        className="widget"
      >
        {/* <Box sx={{ width: '40%', maxWidth: '25ch' }}>
          {defaultPromptSelector}
        </Box> */}
        <NewItem
          component="form"
          sxStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eee',
            '& .MuiDialog-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiTextField-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiInputBase-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiInputBase-input': { m: 1, width: '100%', height: '100%' },
          }}
          autoComplete="off"
          size={'small'}
          id="outlined-multiline-static"
          label={collection}
          rows={14}
          data={sprintPlanningInFocus}
          scheme={scheme}
        />
      </Box>
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
      />
    </>
  );
}
