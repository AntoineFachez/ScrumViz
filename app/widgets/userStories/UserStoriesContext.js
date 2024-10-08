'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

import { userStories } from './mockUserStories';
import InFocusContext from '@/context/InFocusContext';
import { handleSetItemInFocus } from '../actions';

const UserStoriesContext = createContext();

export const UserStoriesProvider = ({ children }) => {
  const { setLatestSelectedItem } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { displayTeamMembers } = useContext(TeamMembersContext);
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
  const handleSetUserStoryInFocus = (userStory) => {
    handleSetItemInFocus(setUserStoryInFocus, userStory, setLatestSelectedItem);
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
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
        // handleResetFiltered,
        handleSetUserStoryInFocus,
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
