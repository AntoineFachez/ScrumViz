'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprintPlannings } from './mockSpringPlanning';

const SprintRetrospectivesContext = createContext();

export const SprintRetrospectivesProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displaySprintRetrospectives, setDisplaySprintRetrospectives] =
    useState(null);
  const [selectedSprintRetrospectives, setSelectedSprintRetrospectives] =
    useState(false);
  const [sprintRetrospectiveInFocus, setSprintRetrospectiveInFocus] =
    useState(false);

  return (
    <SprintRetrospectivesContext.Provider
      value={{
        displaySprintRetrospectives,
        setDisplaySprintRetrospectives,
        selectedSprintRetrospectives,
        setSelectedSprintRetrospectives,
        sprintRetrospectiveInFocus,
        setSprintRetrospectiveInFocus,
      }}
    >
      {children}
    </SprintRetrospectivesContext.Provider>
  );
};
export default SprintRetrospectivesContext;
export const SprintRetrospectivesState = () => {
  return useContext(SprintRetrospectivesContext);
};
