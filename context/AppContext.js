'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const startUp = 'scrumManager';
  const [appContext, setAppContext] = useState(startUp);
  const [uiGridMapContext, setUiGridMapContext] = useState('scrumManager');
  const [newItemElement, setNewItemElement] = useState(null);

  return (
    <AppContext.Provider
      value={{
        appContext,
        setAppContext,
        uiGridMapContext,
        setUiGridMapContext,
        newItemElement,
        setNewItemElement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
export const AppState = () => {
  return useContext(AppContext);
};
