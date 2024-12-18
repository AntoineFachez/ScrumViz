'use client';
import { useContext, useState } from 'react';
import { Add, Group, StoreMallDirectoryOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import PersonsContext from './ProfileContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';

import { scheme, singleItemScheme } from './dataScheme';
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

export default function Persons({
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
    selectedPersons,
    setSelectedPersons,
    personInFocus,
  } = useContext(PersonsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetPersonInFocus = (item) => {
    handleSetItemInFocus(setPersonInFocus, item, setLatestItemInFocus);
  };
  const collection = 'profiles';
  const widgetProps = {
    iconButton: <Group />,
    tooltipTitle_newItem: 'Create new Profile',
    collection_context_title: 'Profiles',
    dialogTitle: 'Create new Profile',
    data: selectedPersons,
    selectedData: selectedPersons,
    setSelectedItem: setSelectedPersons,
    // handleNewItem: () => handleNewPerson(),
    selector: {
      selector: 'personsSelector',
      selected: 'selectedPersons',
    },
    itemInFocus: personInFocus,
    handleSetItemInFocus: handleSetPersonInFocus,

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
        tooltip_title: 'Create new Profile',
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
  };
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      UserStory New Item
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
      TeamMembers SoloWidget
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
      TeamMembers Tree
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
        widgetProps={{
          ...widgetProps,
          dialogCustomComponent: multiItems,
        }}
      />
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        tree={tree}
        multiItems={multiItems}
      />
    </>
  );
}
