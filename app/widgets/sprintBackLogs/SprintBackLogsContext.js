'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { sprintBackLogs } from './mockSprintBackLogs';

const SprintBackLogsContext = createContext();

export const SprintBackLogsProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [displaySprintBackLogs, setDisplaySprintBackLogs] =
    useState(sprintBackLogs);
  const [selectedSprintBackLogs, setSelectedSprintBackLogs] = useState(
    displaySprintBackLogs
  );
  const [sprintBackLogInFocus, setSprintBackLogInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleFindSprintBackLogs = (item) => {
    // console.log('handleFindSprintBackLogs', item);

    const foundSprintLogs = displaySprintBackLogs.filter(
      (sprintBackLog) => sprintBackLog.userStory_id === item.id
    );
    setSelectedSprintBackLogs(foundSprintLogs);
  };
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
  useEffect(() => {
    setSelectedSprintBackLogs(displaySprintBackLogs);

    return () => {};
  }, [displaySprintBackLogs]);
  return (
    <SprintBackLogsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        displaySprintBackLogs,
        setDisplaySprintBackLogs,
        selectedSprintBackLogs,
        setSelectedSprintBackLogs,
        sprintBackLogInFocus,
        setSprintBackLogInFocus,
        searchTerm,
        setSearchTerm,
        handleFindSprintBackLogs,
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
