'use client';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import {
  Add,
  DateRange,
  StoreMallDirectoryOutlined,
} from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import DailiesContext from './DailiesContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintsContext from '../sprints/SprintsContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';

import { singleItemScheme, scheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';
import SimpleDialog from '@/app/components/dialog/Dialog';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';

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
    showUserStoryMenu,
    setShowUserStoryMenu,
    showNewItem,
    setShowNewItem,
    selectedDailies,
    setSelectedDailies,
    dailyInFocus,
    setDailyInFocus,
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
  const handlesetDailyInFocus = (item) => {
    console.log(item);

    handleSetItemInFocus(setDailyInFocus, item, setLatestItemInFocus);
  };
  const widgetProps = {
    iconButton: <DateRange />,
    tooltipTitle_newItem: 'Create new Daily',
    collection_context_title: 'Dailies',
    dialogTitle: 'Create new Daily',
    data: selectedDailies,
    selectedData: selectedDailies,
    setSelectedItem: setSelectedDailies,
    selector: { selector: 'dailiesSelector', selected: 'selectedDailies' },
    itemInFocus: dailyInFocus,
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
        tooltip_title: 'Create new Daily',
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

  useEffect(() => {
    if (dailyInFocus) handleFindSprints('id', dailyInFocus, 'sprint_id');

    return () => {};
  }, [dailyInFocus]);

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
  const multiItems = <MultiItems widgetProps={widgetProps} styled={styled} />;
  return (
    <>
      <SimpleDialog
        widgetProps={widgetProps}
        dialogCustomComponent={
          <Box sx={{ display: 'flex', flexFlow: 'row' }} className="widget">
            <Box sx={{ width: '30%', maxWidth: '25ch' }}>{multiItems}</Box>
            {newItem}
          </Box>
        }
      />
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // menu={menu}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        // singleItem={singleItem}
        tree={tree}
        multiItems={multiItems}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
