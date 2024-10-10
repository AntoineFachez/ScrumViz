'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import DefaultValuesContext from './DefaultValuesContext';
import { notify } from '@/utils/utils';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { startUpAppContext, startUpCollectionContext } =
    useContext(DefaultValuesContext);
  const [appContext, setAppContext] = useState(startUpAppContext);
  const [uiGridMapContext, setUiGridMapContext] = useState(
    startUpCollectionContext
  );
  const [newItemElement, setNewItemElement] = useState(null);
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    notify(alert);

    return () => {};
  }, [alert]);
  return (
    <AppContext.Provider
      value={{
        appContext,
        setAppContext,
        uiGridMapContext,
        setUiGridMapContext,
        newItemElement,
        setNewItemElement,
        alert,
        setAlert,
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
