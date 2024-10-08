'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprints } from './mockSprints';

const SprintsContext = createContext();

export const SprintsProvider = ({ children }) => {
  const [displaySprints, setDisplaySprints] = useState(sprints);
  const [selectedSprints, setSelectedSprints] = useState(displaySprints);
  const [sprintInFocus, setSprintInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleFindSprints = (sprintIdKey, item, item_key) => {
    const foundSprint = displaySprints.filter(
      (sprint) => sprint[sprintIdKey] === item[item_key]
    );
    setSelectedSprints(foundSprint);
  };
  useEffect(() => {
    setSelectedSprints(
      displaySprints.filter((sprint) =>
        sprint.sprint_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedSprints(displaySprints);

    return () => {};
  }, [displaySprints]);
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
        handleFindSprints,
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
