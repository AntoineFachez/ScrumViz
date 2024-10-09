'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import { RateReview, Replay, SportsRugbyOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SearchContext from '@/context/SearchContext';
import MultiItems from '@/app/uiItems/MultiItems';
import { singleItemScheme } from './dataScheme';
import SprintRetrospectives from '../sprintRetrospectives/SprintRetrospectives';
import SprintReviewContext from './SprintReviewsContext';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';

export default function SprintReviews({
  widget,
  uiContext,
  startUpWidgetLayout,

  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showSprinReviewtMenu, setShowSprinReviewtMenu } =
    useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    displaySprintReviews,
    setDisplaySprintReviews,
    selectedSprintReviews,
    setSelectedSprintReviews,
    sprintReviewInFocus,
    setSprintReviewInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    // handleSearchTermChange,
    // handleResetFiltered,
    // handleSetSprintReviewInFocus,
    // handleSelectWidgetContext,
  } = useContext(SprintReviewContext);

  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'sprintReviews';
  const widgetProps = {
    appContext: appContext,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    uiGridMapContext: uiGridMapContext,
    iconButton: <RateReview />,
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

  const handleSetSprintReviewInFocus = (item) => {
    handleSetItemInFocus(setSprintReviewInFocus, item, setLatestItemInFocus);

    // const foundPlannings = displaySprintPlannings.filter((planning) =>
    //   planning.sprint_backlog.some(
    //     (task) => task.product_backlog_item_id === sprintReview.id
    //   )
    // );
    // setSelectedSprintPlannings(foundPlannings);
    // const foundSprintLogs = displaySprintBackLogs.filter(
    //   (sprintBackLog) => sprintBackLog.product_backlog_item_id === sprintReview.id
    // );
    // setSelectedSprintBackLogs(foundSprintLogs);
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleResetFiltered = () => {
    setSelectedSprintReviews(displaySprintReviews);
    setIsFiltered(false);
  };

  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      SprintReview New Item
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
      SprintReview SoloWidget
    </Box>
  );
  const singleItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      SprintReview SingleItem
    </Box>
  );
  const chip = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      SprintReview Chip
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
      SprintReview Tree
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
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetSprintReviewInFocus}
        customElement={null}
        alertElement={null}
        data={selectedSprintReviews}
        selectedData={selectedSprintReviews}
        setSelectedItem={setSelectedSprintReviews}
        selector={{
          selector: 'sprintReviewSelector',
          selected: 'selectedSprintReviews',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={sprintReviewInFocus}
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
