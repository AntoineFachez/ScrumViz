'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';
import {
  History,
  RateReview,
  Replay,
  SportsRugbyOutlined,
} from '@mui/icons-material';

import UIContext from '@/context/UIContext';
import { useMode } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import SearchContext from '@/context/SearchContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';
import StandInTable from '@/app/components/table/StandInTable';

import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
} from '../actions';
import SprintRetrospectivesContext from './SprintRetrospectivesContext';
import SingleItem from '@/app/uiItems/singleItem/SingleItem';
import { singleItemScheme } from './dataScheme';
import MultiItems from '@/app/uiItems/MultiItems';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';

export default function SprintRetrospectives({
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
  const { showSprinReviewtMenu, setShowSprinReviewtMenu } =
    useContext(UIContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    selectedSprintRetrospectives,
    setSelectedSprintRetrospectives,
    isFiltered,
    sprintRetrospectiveInFocus,
    setSprintRetrospectiveInFocus,
    searchTerm,
    handleResetFiltered,
    // handleSetSprintRetrospectiveInFocus,
  } = useContext(SprintRetrospectivesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetSprintRetrospectiveInFocus = (item) => {
    handleSetItemInFocus(
      setSprintRetrospectiveInFocus,
      item,
      setLatestItemInFocus
    );
  };
  const collection = 'sprintRetrospectives';
  const widgetProps = {
    iconButton: <History />,
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
    handleSetItemInFocus: handleSetSprintRetrospectiveInFocus,

    data: selectedSprintRetrospectives,
    selectedData: selectedSprintRetrospectives,
    setSelectedItem: setSelectedSprintRetrospectives,
    selector: {
      selector: 'sprintRetrospectiveSelector',
      selected: 'selectedSprintRetrospectives',
    },
    itemInFocus: sprintRetrospectiveInFocus,
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: sprintRetrospectiveInFocus,
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

  // const handleSearchTermChange = (e) => {
  //   e.preventDefault();
  //   // setResetData();
  //   console.log(e.target.value);

  //   setSearchTerm(e.target.value);
  //   setActiveSearchTerm(e.target.value);
  // };
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      SprintRetrospective New Item
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
      Sprint Retrospective SoloWidget
    </Box>
  );
  // const singleItem = (
  //   <SingleItem
  //     singleItemScheme={singleItemScheme}
  //     itemContext={widgetProps?.itemContext}
  //     itemInFocus={sprintRetrospectiveInFocus}
  //     styled={styled}
  //   />
  // );
  const chip = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      Sprint Retrospective Chip
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
      Sprint Retrospective Tree
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
