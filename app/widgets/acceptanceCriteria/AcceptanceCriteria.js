'use client';
import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DateRange } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintsContext from '../sprints/SprintsContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';

import { singleItemScheme, scheme } from './dataScheme';

import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
} from '../actions';

import { useMode } from '@/app/theme/ThemeContext';
import AcceptanceCriteriaContext from './AcceptanceCriteriaContext';

export default function AcceptanceCriteria({
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
    acceptanceCriteriaInFocus,
    setAcceptanceCriteriaInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,
  } = useContext(AcceptanceCriteriaContext); //);
  const { handleFindSprints } = useContext(SprintsContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'dailies';
  const handlesetDailyInFocus = (item) => {
    handleSetItemInFocus(setDailyInFocus, item, setLatestItemInFocus);
  };
  const widgetProps = {
    iconButton: <DateRange />,
    tooltipTitle_newItem: 'Create new Acceptance Criteria',
    collection_context_title: 'Acceptance Criterias',
    dialogTitle: 'Create new Acceptance Criteria',
    widget: widget,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    setUiGridMapContext: setUiGridMapContext,
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
    itemInFocus: dailyInFocus,

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
    handleSetItemInFocus: handlesetDailyInFocus,
  };

  useEffect(() => {
    if (dailyInFocus) handleFindSprints('id', dailyInFocus, 'sprint_id');

    return () => {};
  }, [dailyInFocus]);

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

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        soloWidget={soloWidget}
        // singleItem={singleItem}
        tree={tree}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
