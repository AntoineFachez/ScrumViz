'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprintPlannings } from './mockSpringPlanning';

const SprintPlanningsContext = createContext();

export const SprintPlanningsProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displaySprintPlannings, setDisplaySprintPlannings] =
    useState(sprintPlannings);
  const [selectedSprintPlannings, setSelectedSprintPlannings] = useState(
    displaySprintPlannings
  );
  const [sprintPlanningInFocus, setSprintPlanningInFocus] = useState(false);

  return (
    <SprintPlanningsContext.Provider
      value={{
        displaySprintPlannings,
        setDisplaySprintPlannings,
        selectedSprintPlannings,
        setSelectedSprintPlannings,
        sprintPlanningInFocus,
        setSprintPlanningInFocus,
      }}
    >
      {children}
    </SprintPlanningsContext.Provider>
  );
};
export default SprintPlanningsContext;
export const SprintPlanningsState = () => {
  return useContext(SprintPlanningsContext);
};
