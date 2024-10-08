'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import DefaultValuesContext from './DefaultValuesContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { startUpAppContext } = useContext(DefaultValuesContext);
  const [appContext, setAppContext] = useState(startUpAppContext);
  const [uiGridMapContext, setUiGridMapContext] = useState('prompts');
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
