'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { userStories } from './mockUserStories';

const UserStoriesContext = createContext();

export const UserStoriesProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displayUserStories, setDisplayUserStories] = useState(userStories);
  const [selectedUserStories, setSelectedUserStories] =
    useState(displayUserStories);
  const [userStoryInFocus, setUserStoryInFocus] = useState(false);

  return (
    <UserStoriesContext.Provider
      value={{
        displayUserStories,
        setDisplayUserStories,
        selectedUserStories,
        setSelectedUserStories,
        userStoryInFocus,
        setUserStoryInFocus,
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
