'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprintPlannings } from './mockSpringPlanning';
import { handleSetItemInFocus } from '../actions';
import InFocusContext from '@/context/InFocusContext';

const SprintPlanningsContext = createContext();

export const SprintPlanningsProvider = ({ children }) => {
  const { setLatestSelectedItem } = useContext(InFocusContext);
  const [displaySprintPlannings, setDisplaySprintPlannings] =
    useState(sprintPlannings);
  const [selectedSprintPlannings, setSelectedSprintPlannings] = useState(
    displaySprintPlannings
  );
  const [sprintPlanningInFocus, setSprintPlanningInFocus] = useState(false);

  // const handleSetSprintPlanningInFocus = (sprintPlanning) => {
  //   handleSetItemInFocus(
  //     setSprintPlanningInFocus,
  //     sprintPlanning,
  //     setLatestSelectedItem
  //   );
  // };

  const handleFindSprintPlannings = (item) => {
    const foundPlannings = displaySprintPlannings.filter((planning) =>
      planning.sprint_backlog.some(
        (task) => task.product_backlog_item_id === item.id
      )
    );
    setSelectedSprintPlannings(foundPlannings);
  };
  useEffect(() => {
    setSelectedSprintPlannings(displaySprintPlannings);

    return () => {};
  }, [displaySprintPlannings]);
  return (
    <SprintPlanningsContext.Provider
      value={{
        displaySprintPlannings,
        setDisplaySprintPlannings,
        selectedSprintPlannings,
        setSelectedSprintPlannings,
        sprintPlanningInFocus,
        setSprintPlanningInFocus,
        // handleSetSprintPlanningInFocus,
        handleFindSprintPlannings,
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
