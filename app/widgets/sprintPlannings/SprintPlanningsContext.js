'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprintPlannings } from './mockSpringPlanning';
import UIContext from '@/context/UIContext';

const SprintPlanningsContext = createContext();

export const SprintPlanningsProvider = ({ children }) => {
  const { showDialog, setShowDialog } = useContext(UIContext);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [displaySprintPlannings, setDisplaySprintPlannings] =
    useState(sprintPlannings);
  const [selectedSprintPlannings, setSelectedSprintPlannings] = useState(
    displaySprintPlannings
  );
  const [sprintPlanningInFocus, setSprintPlanningInFocus] = useState(false);

  const handleFindSprintPlannings = (item, itemKey, filterKey) => {
    console.log('handleFindSprintPlannings');
    const foundPlannings = displaySprintPlannings.filter((planning) => {
      return planning?.sprintBackLog_items?.some((backLog) => {
        return backLog[filterKey] === item[itemKey];
      });
    });
    setSelectedSprintPlannings(foundPlannings);
  };
  const handleNewSprintPlanning = async () => {
    console.log('handleNewDefaultPrompt');
    // setSelectedWidgetContext('newItem');
    setShowDialog(true);
  };
  useEffect(() => {
    setSelectedSprintPlannings(displaySprintPlannings);

    return () => {};
  }, [displaySprintPlannings]);
  return (
    <SprintPlanningsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        displaySprintPlannings,
        setDisplaySprintPlannings,
        selectedSprintPlannings,
        setSelectedSprintPlannings,
        sprintPlanningInFocus,
        setSprintPlanningInFocus,
        handleFindSprintPlannings,
        handleNewSprintPlanning,
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
