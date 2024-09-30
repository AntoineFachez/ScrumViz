'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '@/context/AppContext';
// import SearchContext from '@/context/SearchContext';

const ScrumManagerContext = createContext();

export const ScrumManagerProvider = ({ children }) => {
  const { scrumManagerContext, setScrumManagerContext } =
    useContext(AppContext);
  // const { setActiveSearchTerm } = useContext(SearchContext);

  return (
    <ScrumManagerContext.Provider
      value={{
        scrumManagerContext,
        setScrumManagerContext,
      }}
    >
      {children}
    </ScrumManagerContext.Provider>
  );
};
export default ScrumManagerContext;
export const ScrumManagerState = () => {
  return useContext(ScrumManagerContext);
};
