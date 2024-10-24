'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Assignment, StoreMallDirectoryOutlined } from '@mui/icons-material';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import { sprintReviews } from './mockSprintReviews';

const SprintReviewContext = createContext();

export const SprintReviewProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [displaySprintReviews, setDisplaySprintReviews] =
    useState(sprintReviews);
  const [selectedSprintReviews, setSelectedSprintReviews] =
    useState(displaySprintReviews);
  const [sprintReviewInFocus, setSprintReviewInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const handleOpenNewItem = async () => {
    console.log('handleNewTeamMembers');
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  const handleCloseNewItem = () => {
    console.log('handleCloseNewTeamMembers');

    setShowNewItem(false);
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

  // const handleSetSprintReviewInFocus = (sprintReview) => {
  //   setSprintReviewInFocus(sprintReview);
  //   // const foundPlannings = displaySprintPlannings.filter((planning) =>
  //   //   planning.sprint_backlog.some(
  //   //     (task) => task.product_backlog_item_id === sprintReview.id
  //   //   )
  //   // );
  //   // setSelectedSprintPlannings(foundPlannings);
  //   // const foundSprintLogs = displaySprintBackLogs.filter(
  //   //   (sprintBackLog) => sprintBackLog.product_backlog_item_id === sprintReview.id
  //   // );
  //   // setSelectedSprintBackLogs(foundSprintLogs);
  // };
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
  useEffect(() => {
    setSelectedSprintReviews(
      displaySprintReviews.filter((sprintReview) =>
        sprintReview.accomplishments
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedSprintReviews(displaySprintReviews);

    return () => {};
  }, [displaySprintReviews]);
  return (
    <SprintReviewContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        setShowNewItem,
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
        handleSearchTermChange,
        handleResetFiltered,
        // handleSetSprintReviewInFocus,
        handleSelectWidgetContext,
        handleOpenNewItem,
        handleCloseNewItem,
      }}
    >
      {children}
    </SprintReviewContext.Provider>
  );
};
export default SprintReviewContext;
export const SprintReviewsState = () => {
  return useContext(SprintReviewContext);
};
