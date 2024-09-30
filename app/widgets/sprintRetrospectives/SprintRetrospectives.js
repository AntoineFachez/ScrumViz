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
import { themeSettings } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import SearchContext from '@/context/SearchContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import WidgetMenu from '@/app/pages/WidgetMenu';
import StandInTable from '@/app/components/table/StandInTable';

import { handleSelectWidgetContext } from '../actions';
import SprintRetrospectivesContext from './SprintRetrospectivesContext';
import SingleItem from '@/app/pages/SingleItem';
import { singleItemScheme } from './dataScheme';
import MultiItems from '@/app/pages/MultiItems';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';

export default function SprintRetrospectives({
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
    handleSetSprintRetrospectiveInFocus,
    handleSearchTermChange,
  } = useContext(SprintRetrospectivesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'sprintRetrospectives';
  const widgetProps = {
    appContext: appContext,
    scrumManagerContext: scrumManagerContext,
    iconButton: <History />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',

    onClick: () => {
      setScrumManagerContext(collection);
      return;
    },
  };
  const menuProps = {
    states: { showMenu: showSprinReviewtMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowSprinReviewtMenu,
    },
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
