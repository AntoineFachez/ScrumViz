'use client';
import { useContext, useState } from 'react';
import {
  Add,
  RateReview,
  Replay,
  SportsRugbyOutlined,
} from '@mui/icons-material';
import { Box } from '@mui/material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintReviewContext from './SprintReviewsContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { singleItemScheme, scheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';
import SimpleDialog from '@/app/components/dialog/Dialog';

import { useMode } from '@/app/theme/ThemeContext';
export default function SprintReviews({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
    setShowNewItem,
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
  } = useContext(SprintReviewContext);

  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
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

  const collection = 'sprintReviews';
  const widgetProps = {
    iconButton: <RateReview />,
    tooltipTitle_newItem: 'Create new Sprint Review',
    collection_context_title: 'Sprint Reviews',
    dialogTitle: 'Create new Sprint Review',
    handleSetItemInFocus: handleSetSprintReviewInFocus,
    data: selectedSprintReviews,
    selectedData: selectedSprintReviews,
    setSelectedItem: setSelectedSprintReviews,
    selector: {
      selector: 'sprintReviewSelector',
      selected: 'selectedSprintReviews',
    },
    itemInFocus: sprintReviewInFocus,

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
        tooltip_title: 'Create new Sprint Review',
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
    setSelectedSprintReviews(displaySprintReviews);
    setIsFiltered(false);
  };

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
