'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
// import { sprintPlannings } from './mockSpringPlanning';

const SprintRetrospectivesContext = createContext();

export const SprintRetrospectivesProvider = ({ children }) => {
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);
  const [displaySprintRetrospectives, setDisplaySprintRetrospectives] =
    useState(null);
  const [selectedSprintRetrospectives, setSelectedSprintRetrospectives] =
    useState(displaySprintRetrospectives);
  const [sprintRetrospectiveInFocus, setSprintRetrospectiveInFocus] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const handleResetFiltered = () => {
    setSprintRetrospectiveInFocus(sprintRetrospectiveInFocus);
    setIsFiltered(false);
  };
  // const handleSetSprintRetrospectiveInFocus = (sprintRetrospective) => {
  //   setSprintRetrospectiveInFocus(sprintRetrospective);
  // };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  useEffect(() => {
    setSelectedSprintRetrospectives(
      displaySprintRetrospectives?.filter((sprintRetrospective) =>
        sprintRetrospective.sprintRetrospective_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedSprintRetrospectives(displaySprintRetrospectives);

    return () => {};
  }, [displaySprintRetrospectives]);
  return (
    <SprintRetrospectivesContext.Provider
      value={{
        selectedWidgetContext,
        setSelectedWidgetContext,
        displaySprintRetrospectives,
        setDisplaySprintRetrospectives,
        selectedSprintRetrospectives,
        setSelectedSprintRetrospectives,
        sprintRetrospectiveInFocus,
        setSprintRetrospectiveInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSearchTermChange,
        // handleResetFiltered,
        // handleSetSprintRetrospectiveInFocus,
        // handleSelectWidgetContext,
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
