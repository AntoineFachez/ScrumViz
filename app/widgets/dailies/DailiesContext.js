'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { dailies } from './mockDailes';

const DailiesContext = createContext();

export const DailiesProvider = ({ children }) => {
  const [displayDailies, setDisplayDailies] = useState(dailies);
  const [selectedDailies, setSelectedDailies] = useState(displayDailies);
  const [dailiesInFocus, setDailiesInFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isFiltered, setIsFiltered] = useState(false);
  const handleResetFiltered = () => {
    setSelectedDailies(displayDailies);
    setIsFiltered(false);
  };
  const handleSetDailiesInFocus = (dailies) => {
    setDailiesInFocus(dailies);
  };
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

  return (
    <DailiesContext.Provider
      value={{
        displayDailies,
        setDisplayDailies,
        selectedDailies,
        setSelectedDailies,
        dailiesInFocus,
        setDailiesInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSetDailiesInFocus,
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
