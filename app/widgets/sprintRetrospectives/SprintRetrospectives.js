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

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import SprintRetrospectivesContext from './SprintRetrospectivesContext';
import SingleItem from '@/app/uiItems/SingleItem';
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
    selectedSprintRetrospectives,
    setSelectedSprintRetrospectives,
    isFiltered,
    sprintRetrospectiveInFocus,
    setSprintRetrospectiveInFocus,
    searchTerm,
    handleResetFiltered,
    // handleSetSprintRetrospectiveInFocus,
    handleSearchTermChange,
  } = useContext(SprintRetrospectivesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'sprintRetrospectives';
  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <History />,
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
  };
  const menuProps = {
    states: { showMenu: showSprinReviewtMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowSprinReviewtMenu,
    },
  };
  const handleSetSprintRetrospectiveInFocus = (item) => {
    handleSetItemInFocus(
      setSprintRetrospectiveInFocus,
      item,
      setLatestItemInFocus
    );
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
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={sprintRetrospectiveInFocus}
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
        handleSetItemInFocus={handleSetSprintRetrospectiveInFocus}
        customElement={null}
        alertElement={null}
        data={selectedSprintRetrospectives}
        selectedData={selectedSprintRetrospectives}
        setSelectedItem={setSelectedSprintRetrospectives}
        selector={{
          selector: 'sprintRetrospectiveSelector',
          selected: 'selectedSprintRetrospectives',
        }}
        itemInFocus={sprintRetrospectiveInFocus}
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
        // chip={chip}
        tree={tree}
        flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
