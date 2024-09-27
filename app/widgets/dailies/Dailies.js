'use client';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DateRange, StoreMallDirectoryOutlined } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import SearchContext from '@/context/SearchContext';
import DailiesContext from './DailiesContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import { themeSettings } from '@/app/theme/ThemeContext';
import MultiItems from '@/app/pages/MultiItems';
import SingleItem from '@/app/pages/SingleItem';

import { singleItemScheme } from './dataScheme';

import StandInTable from '@/app/components/table/StandInTable';
import SprintsContext from '../sprints/SprintsContext';
import WidgetMenu from '@/app/pages/WidgetMenu';

import { handleSelectWidgetContext } from '../actions';

export default function Dailies({
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const {
    homeUiSelected,
    setHomeUiSelected,
    showDailyMenu,
    setShowDailyMenu,
    toggleDrawer,
  } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    selectedDailies,
    setSelectedDailies,
    dailiesInFocus,
    setDailiesInFocus,
    searchTerm,
    setSearchTerm,
  } = useContext(DailiesContext);
  const { handleFindSprints } = useContext(SprintsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'dailies';
  const widgetProps = {
    iconButton: <DateRange />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',

    onClick: () => {
      setAppContext(collection);
      return;
    },
  };
  const menuProps = {
    functions: {
      handleShowMenu: setShowDailyMenu,
    },
    states: { showMenu: showDailyMenu, widgetProps: widgetProps },
  };

  const handleSetDailiesInFocus = (dailies) => {
    setDailiesInFocus(dailies);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (dailiesInFocus) handleFindSprints('id', dailiesInFocus, 'sprint_id');

    return () => {};
  }, [dailiesInFocus]);

  const menu = (
    <WidgetMenu
      widgetProps={widgetProps}
      menuProps={menuProps}
      setSelectedWidgetContext={setSelectedWidgetContext}
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
      Daily New Item
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
      Daily SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={dailiesInFocus}
      styled={styled}
    />
  );

  const tree = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      Daily Tree
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
        data={selectedDailies}
        selectedData={selectedDailies}
        setSelectedItem={setSelectedDailies}
        selector={{
          selector: 'dailiesSelector',
          selected: 'selectedDailies',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={dailiesInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetDailiesInFocus}
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
        tree={tree}
        flexList={flexList}
      />
    </>
  );
}
