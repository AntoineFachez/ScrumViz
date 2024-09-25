'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

import { userStories } from './mockUserStories';

const UserStoriesContext = createContext();

export const UserStoriesProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { displayTeamMembers } = useContext(TeamMembersContext);
  const [displayUserStories, setDisplayUserStories] = useState(userStories);
  const [selectedUserStories, setSelectedUserStories] =
    useState(displayUserStories);
  const [userStoryInFocus, setUserStoryInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

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
        // handleSearchTermChange,
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
