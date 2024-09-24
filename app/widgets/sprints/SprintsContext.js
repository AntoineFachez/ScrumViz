'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprints } from './mockSprints';

const SprintsContext = createContext();

export const SprintsProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displaySprints, setDisplaySprints] = useState(sprints);
  const [selectedSprints, setSelectedSprints] = useState(displaySprints);
  const [sprintInFocus, setSprintInFocus] = useState(false);

  return (
    <SprintsContext.Provider
      value={{
        displaySprints,
        setDisplaySprints,
        selectedSprints,
        setSelectedSprints,
        sprintInFocus,
        setSprintInFocus,
      }}
    >
      {children}
    </SprintsContext.Provider>
  );
};
export default SprintsContext;
export const SprintsState = () => {
  return useContext(SprintsContext);
};
