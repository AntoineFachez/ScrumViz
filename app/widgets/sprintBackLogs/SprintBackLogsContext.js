'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprintBackLogs } from './mockSprintBackLogs';

const SprintBackLogsContext = createContext();

export const SprintBackLogsProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displaySprintBackLogs, setDisplaySprintBackLogs] =
    useState(sprintBackLogs);
  const [selectedSprintBackLogs, setSelectedSprintBackLogs] = useState(
    displaySprintBackLogs
  );
  const [sprintBackLogInFocus, setSprintBackLogInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setSelectedSprintBackLogs(
      displaySprintBackLogs.filter((sprintBackLog) =>
        sprintBackLog.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);

  return (
    <SprintBackLogsContext.Provider
      value={{
        displaySprintBackLogs,
        setDisplaySprintBackLogs,
        selectedSprintBackLogs,
        setSelectedSprintBackLogs,
        sprintBackLogInFocus,
        setSprintBackLogInFocus,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </SprintBackLogsContext.Provider>
  );
};
export default SprintBackLogsContext;
export const SprintBackLogsState = () => {
  return useContext(SprintBackLogsContext);
};
