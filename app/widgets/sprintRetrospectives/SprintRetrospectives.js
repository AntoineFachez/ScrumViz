'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';
import { RateReview, Replay, SportsRugbyOutlined } from '@mui/icons-material';

import UIContext from '@/context/UIContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import SearchContext from '@/context/SearchContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import WidgetMenu from '@/app/pages/WidgetMenu';
import StandInTable from '@/app/components/table/StandInTable';

import { handleSelectWidgetContext } from '../actions';

export default function SprintRetrospectives({
  widget,
  uiContext,
  startUpWidgetLayout,
  url,
  setUrl,
  targetUrl,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { showSprinReviewtMenu, setShowSprinReviewtMenu } =
    useContext(UIContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'sprintRetrospective';
  const widgetProps = {
    appContext: appContext,
    iconButton: <RateReview />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',
    // menu: menu,
    // soloWidget: soloWidget,
    // table: table,
    // singleItem: singleItem,
    // chip: chip,
    // tree: tree,
    // flexList: flexList,
    onClick: () => {
      // window.location.href = '/sprint';
      setAppContext(collection);
    },
  };
  const menuProps = {
    states: { showMenu: showSprinReviewtMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowSprinReviewtMenu,
    },
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

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
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      Sprint Retrospective SingleItem
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
      Sprint Retrospective
      {/* <MultiItems
        uiContext={uiContext}
        selectedWidgetContext={selectedWidgetContext}
        data={displayUserStories}
        selectedData={selectedUserStories}
        setSelectedItem={setSelectedUserStories}
        selector={{
          selector: 'userStorySelector',
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
