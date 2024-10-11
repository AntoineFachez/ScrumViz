'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { dailies } from './mockDailes';

const DailiesContext = createContext();

export const DailiesProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [displayDailies, setDisplayDailies] = useState(dailies);
  const [selectedDailies, setSelectedDailies] = useState(displayDailies);
  const [dailyInFocus, setDailyInFocus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isFiltered, setIsFiltered] = useState(false);
  const handleResetFiltered = () => {
    setSelectedDailies(displayDailies);
    setIsFiltered(false);
  };
  // const handlesetDailyInFocus = (dailies) => {
  //   setDailyInFocus(dailies);
  // };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  useEffect(() => {
    setSelectedDailies(
      displayDailies.filter((daily) =>
        daily.done.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedDailies(displayDailies);

    return () => {};
  }, [displayDailies]);
  return (
    <DailiesContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        displayDailies,
        setDisplayDailies,
        selectedDailies,
        setSelectedDailies,
        dailyInFocus,
        setDailyInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        // handlesetDailyInFocus,
        handleSearchTermChange,
      }}
    >
      {children}
    </DailiesContext.Provider>
  );
};
export default DailiesContext;
export const DailiesState = () => {
  return useContext(DailiesContext);
};
