'use client';
import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Add, DateRange } from '@mui/icons-material';

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
    showNewItem,
    setShowNewItem,
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
    selector: { selector: 'dailiesSelector', selected: 'selectedDailies' },
    data: selectedDailies,
    selectedData: selectedDailies,
    setSelectedItem: setSelectedDailies,
    itemInFocus: dailyInFocus,
    handleSetItemInFocus: handlesetDailyInFocus,

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
        tooltip_title: 'Create new Acceptance Criteria',
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
    handleSetItemInFocus: handleSetChatInFocus,
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
