'use client';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DateRange, StoreMallDirectoryOutlined } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import DailiesContext from './DailiesContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintsContext from '../sprints/SprintsContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';

import { singleItemScheme } from './dataScheme';

import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';

export default function Dailies({
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
    selectedDailies,
    setSelectedDailies,
    dailiesInFocus,
    setDailiesInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,
  } = useContext(DailiesContext);
  const { handleFindSprints } = useContext(SprintsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'dailies';
  const handleSetDailiesInFocus = (item) => {
    handleSetItemInFocus(setDailiesInFocus, item, setLatestItemInFocus);
  };
  const widgetProps = {
    iconButton: <DateRange />,
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
    data: selectedDailies,
    selectedData: selectedDailies,
    setSelectedItem: setSelectedDailies,
    selector: { selector: 'dailiesSelector', selected: 'selectedDailies' },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: dailiesInFocus,

    onClick: () => {
      setUiGridMapContext(collection);
      return;
    },
    menuProps: {
      states: {
        showMenu: showWidgetUIMenu,
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
    handleSetItemInFocus: handleSetDailiesInFocus,
  };

  useEffect(() => {
    if (dailiesInFocus) handleFindSprints('id', dailiesInFocus, 'sprint_id');

    return () => {};
  }, [dailiesInFocus]);

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

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // menu={menu}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        // singleItem={singleItem}
        tree={tree}
        // flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
