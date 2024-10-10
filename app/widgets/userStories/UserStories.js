'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import {
  Add,
  Assignment,
  StoreMallDirectoryOutlined,
} from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import InFocusContext from '@/context/InFocusContext';
import SearchContext from '@/context/SearchContext';
import SprintPlanningsContext from '../sprintPlannings/SprintPlanningsContext';
import SprintBackLogsContext from '../sprintBackLogs/SprintBackLogsContext';
import UIContext from '@/context/UIContext';
import UserStoriesContext, { UserStoriesProvider } from './UserStoriesContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';
import TableComponent from '@/app/components/table/TableComponent';
import StandInTable from '@/app/components/table/StandInTable';
import MultiItems from '@/app/uiItems/MultiItems';
import SingleItem from '@/app/uiItems/singleItem/SingleItem';
import NewItem from '@/app/uiItems/NewItem';

import { scheme, singleItemScheme } from './dataScheme';
import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
} from '../actions';
// import { handleNewUserStory } from './functions/dbFunctions';
import { useMode } from '@/app/theme/ThemeContext';
import AcceptanceCriteria from '../acceptanceCriteria/AcceptanceCriteria';
import AcceptanceCriteriaContext from '../acceptanceCriteria/AcceptanceCriteriaContext';

export default function UserStory({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const {} = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showUserStoryMenu,
    setShowUserStoryMenu,
    // selectedWidgetContext,
    // setSelectedWidgetContext,
    displayUserStories,
    setDisplayUserStories,
    selectedUserStories,
    setSelectedUserStories,
    userStoryInFocus,
    setUserStoryInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,

    handleNewUserStory,
    // handleResetFiltered,
    // handleSetUserStoryInFocus,
    // handleSelectWidgetContext,
  } = useContext(UserStoriesContext);
  const { handleFindSprintPlannings } = useContext(SprintPlanningsContext);
  const { handleFindSprintBackLogs } = useContext(SprintBackLogsContext);
  const {
    displayAcceptanceCriteria,
    selectedAcceptanceCriteria,
    setSelectedAcceptanceCriteria,
    setAcceptanceCriteriaInFocus,
    handleFindAcceptanceCriteria,
  } = useContext(AcceptanceCriteriaContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'userStories';

  const handleSetUserStoryInFocus = (item) => {
    handleSetItemInFocus(setUserStoryInFocus, item, setLatestItemInFocus);
  };
  const handleClickCustomArrayItem = (item) => {
    console.log('acceptanceCriteria_id');

    const found = displayAcceptanceCriteria.filter(
      (criteria) => criteria.id === item.acceptanceCriteria_id
    )[0];
    setAcceptanceCriteriaInFocus(found);
    // handleFindAcceptanceCriteria(item, 'id', 'acceptanceCriteria_id');
  };
  const widgetProps = {
    iconButton: <Assignment />,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    itemContext: '',
    collection: collection,
    data: selectedUserStories,

    selectedData: selectedUserStories,
    setSelectedItem: setSelectedUserStories,
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: userStoryInFocus,
    customArrayItemInFocus: userStoryInFocus,
    tooltipTitle_newItem: 'Create new User Story',
    handleNewItem: () => handleNewUserStory(),
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
    selector: {
      selector: 'userStoriesSelector',
      selected: 'selectedUserStories',
    },
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    handleSelectWidgetContext: handleSelectWidgetContext,
    searchTerm: searchTerm,
    setActiveSearchTerm: setActiveSearchTerm,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),

    handleSetItemInFocus: handleSetUserStoryInFocus,
    handleClickCustomArrayItem: handleClickCustomArrayItem,
  };

  useEffect(() => {
    if (userStoryInFocus) {
      handleFindSprintPlannings(userStoryInFocus, 'id', 'userStory_id');
      handleFindSprintBackLogs(userStoryInFocus, 'id', 'userStory_id');
    }

    return () => {};
  }, [userStoryInFocus]);

  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      UserStory SoloWidget
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
      UserStory Tree
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
        flexFlow: 'column',
      }}
    >
      {' '}
    </Box>
  );
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
      }}
    >
      {' '}
      <Box
        sx={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row' }}
        className="widget"
      >
        {/* <Box sx={{ width: '40%', maxWidth: '25ch' }}>
          {defaultPromptSelector}
        </Box> */}
        <NewItem
          component="form"
          sxStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eee',
            '& .MuiDialog-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiTextField-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiInputBase-root': { m: 1, width: '100%', height: '100%' },
            '& .MuiInputBase-input': { m: 1, width: '100%', height: '100%' },
          }}
          autoComplete="off"
          size={'small'}
          id="outlined-multiline-static"
          label={collection}
          rows={14}
          data={userStoryInFocus}
          scheme={scheme}
        />
      </Box>
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
        tree={tree}
        // flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
