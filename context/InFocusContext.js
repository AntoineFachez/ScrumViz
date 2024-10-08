'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import DefaultValuesContext from './DefaultValuesContext';

const InFocusContext = createContext();

export const InFocusProvider = ({ children }) => {
  const { startUpInFocusContext, startUpUiGridMapContext } =
    useContext(DefaultValuesContext);
  const [inFocusContext, setInFocusContext] = useState(startUpInFocusContext);
  const [latestSelectedItem, setLatestSelectedItem] = useState(null);

  return (
    <InFocusContext.Provider
      value={{
        inFocusContext,
        setInFocusContext,
        latestSelectedItem,
        setLatestSelectedItem,
      }}
    >
      {children}
    </InFocusContext.Provider>
  );
};
export default InFocusContext;
export const InFocusState = () => {
  return useContext(InFocusContext);
};
