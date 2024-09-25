'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import { RateReview, Replay, SportsRugbyOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SearchContext from '@/context/SearchContext';
import MultiItems from '@/app/pages/MultiItems';
import { singleItemScheme } from './dataScheme';
import SprintRetrospectives from '../sprintRetrospectives/SprintRetrospectives';
import SprintReviewContext from './SprintReviewsContext';

export default function SprintReviews({
  uiContext,
  startUpWidgetLayout,
  url,
  setUrl,
  targetUrl,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { homeUiSelected, setHomeUiSelected } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const {
    displaySprintReviews,
    setDisplaySprintReviews,
    selectedSprintReviews,
    setSelectedSprintReviews,
    sprintReviewInFocus,
    setSprintReviewInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    // handleSearchTermChange,
    // handleResetFiltered,
    handleSetSprintReviewInFocus,
    // handleSelectWidgetContext,
  } = useContext(SprintReviewContext);

  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'sprintReviews';
  const widgetProps = {
    iconButton: <RateReview />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',

    onClick: () => {
      // window.location.href = `/userStory`;
      setAppContext(collection);
      return;
    },
  };
  const handleSelectWidgetContext = (context) => {
    //  if (generated) {
    //    setPassWidgetContext(context);
    //  }
    setSelectedWidgetContext(context);
    //  if (startUpWidgetLayout !== context) {
    //    //TODO: if widgetContext of former widget is different to the new one's then dialogue:"wanna keep table view or set to default view of component?
    //  } else {
    //  }
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleResetFiltered = () => {
    setSelectedSprintReviews(displaySprintReviews);
    setIsFiltered(false);
  };

  const menu = (
    <Menu
      widgetProps={widgetProps}
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
      SprintReview New Item
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
      SprintReview SoloWidget
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
      SprintReview SingleItem
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
      SprintReview Chip
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
      SprintReview Tree
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
        data={selectedSprintReviews}
        selectedData={selectedSprintReviews}
        setSelectedItem={setSelectedSprintReviews}
        selector={{
          selector: 'sprintReviewSelector',
          selected: 'selectedSprintReviews',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={sprintReviewInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetSprintReviewInFocus}
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
        chip={chip}
        tree={tree}
        flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
