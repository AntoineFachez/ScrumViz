'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  return (
    <NavBarContext.Provider
      value={{
        selectedWidgetContext,
        setSelectedWidgetContext,
        searchTerm,
        setSearchTerm,
        handleSearchTermChange,
        // handleResetFiltered,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
export default NavBarContext;
export const NavBarState = () => {
  return useContext(NavBarContext);
};
