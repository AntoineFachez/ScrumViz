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

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(searchTerm);
    const found = displaySprints.filter((sprint) => {
      return console.log(sprint.sprint_name);
      // sprint.sprint_name.toLowerCase().includes(searchTerm.toLowerCase())
    });
    console.log(found);
    // setSelectedSprints(
    // );

    return () => {};
  }, [searchTerm]);

  return (
    <SprintsContext.Provider
      value={{
        displaySprints,
        setDisplaySprints,
        selectedSprints,
        setSelectedSprints,
        sprintInFocus,
        setSprintInFocus,
        searchTerm,
        setSearchTerm,
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
