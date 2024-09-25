'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Assignment, StoreMallDirectoryOutlined } from '@mui/icons-material';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import { userStories } from './mockUserStories';

const UserStoriesContext = createContext();

export const UserStoriesProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [displayUserStories, setDisplayUserStories] = useState(userStories);
  const [selectedUserStories, setSelectedUserStories] =
    useState(displayUserStories);
  const [userStoryInFocus, setUserStoryInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleResetFiltered = () => {
    console.log('clicked');
    setSelectedUserStories(displayUserStories);
    setIsFiltered(false);
  };

  const handleSetUserStoryInFocus = (userStory) => {
    setUserStoryInFocus(userStory);
    const foundPlannings = displaySprintPlannings.filter((planning) =>
      planning.sprint_backlog.some(
        (task) => task.product_backlog_item_id === userStory.id
      )
    );
    setSelectedSprintPlannings(foundPlannings);
    const foundSprintLogs = displaySprintBackLogs.filter(
      (sprintBackLog) => sprintBackLog.product_backlog_item_id === userStory.id
    );
    setSelectedSprintBackLogs(foundSprintLogs);
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
  useEffect(() => {
    setSelectedUserStories(
      displayUserStories.filter((userStory) =>
        userStory.userStory_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);

  return (
    <UserStoriesContext.Provider
      value={{
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
        handleSearchTermChange,
        handleResetFiltered,
        handleSetUserStoryInFocus,
        handleSelectWidgetContext,
      }}
    >
      {children}
    </UserStoriesContext.Provider>
  );
};
export default UserStoriesContext;
export const UserStoriesState = () => {
  return useContext(UserStoriesContext);
};
