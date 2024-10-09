'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

import { userStories } from './mockUserStories';
import UIContext from '@/context/UIContext';

const UserStoriesContext = createContext();

export const UserStoriesProvider = ({ children }) => {
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { showDialog, setShowDialog } = useContext(UIContext);
  const { displayTeamMembers } = useContext(TeamMembersContext);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  // const [showUserStoryMenu, setShowUserStoryMenu] = useState(true);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayUserStories, setDisplayUserStories] = useState(userStories);
  const [selectedUserStories, setSelectedUserStories] =
    useState(displayUserStories);
  const [userStoryInFocus, setUserStoryInFocus] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleResetFiltered = () => {
    setSelectedUserStories(displayUserStories);
    setIsFiltered(false);
  };
  // const handleSetUserStoryInFocus = (userStory) => {
  //   setUserStoryInFocus(userStory);
  // };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  const handleNewUserStory = async () => {
    console.log('handleNewDefaultPrompt');
    // setSelectedWidgetContext('newItem');
    setShowDialog(true);
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
  useEffect(() => {
    setSelectedUserStories(displayUserStories);

    return () => {};
  }, [displayUserStories]);

  return (
    <UserStoriesContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        // showUserStoryMenu,
        // setShowUserStoryMenu,
        selectedWidgetContext,
        setSelectedWidgetContext,
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
        handleSearchTermChange,
        handleNewUserStory,
        // handleResetFiltered,
        // handleSetUserStoryInFocus,
        // handleSelectWidgetContext,
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
