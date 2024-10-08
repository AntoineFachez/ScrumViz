'use client';
import { useContext, useState } from 'react';
import { Group, StoreMallDirectoryOutlined } from '@mui/icons-material';

import { Box } from '@mui/material';

import { useMode } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import StandInTable from '@/app/components/table/StandInTable';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import { handleSelectWidgetContext } from '../actions';
import SearchContext from '@/context/SearchContext';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';

export default function Persons({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showPersonsMenu, setShowPersonsMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const collection = 'persons';
  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <Group />,
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
    states: { showMenu: showPersonsMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowPersonsMenu,
    },
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
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
  const singleItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TeamMembers SingleItem
    </Box>
  );
  const chip = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TeamMembers Chip
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
  const flexList = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TeamMembers
      {/* <MultiItems
        uiContext={uiContext}
        selectedWidgetContext={selectedWidgetContext}
        data={displayUserStories}
        selectedData={selectedUserStories}
        setSelectedItem={setSelectedUserStories}
        selector={{
          selector: 'userStoriesSelector',
          selected: 'selectedUserStories',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={userStoryInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetUserStoryInFocus}
        customElement={null}
        alertElement={null}
        cardSubHeaderElement={CardSubHeaderElement}
        styled={styled}
      /> */}
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
        chip={chip}
        tree={tree}
        flexList={flexList}
      />
    </>
  );
}
