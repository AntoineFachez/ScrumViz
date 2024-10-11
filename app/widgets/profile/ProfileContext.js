'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

import { persons, generateMockPerson } from './mockProfile';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  return (
    <ProfileContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        selectedWidgetContext,
        setSelectedWidgetContext,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
export default ProfileContext;
export const ProfileState = () => {
  return useContext(ProfileContext);
};
