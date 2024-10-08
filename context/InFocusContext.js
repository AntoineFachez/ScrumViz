'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import DefaultValuesContext from './DefaultValuesContext';
import { createUUID } from '@/utils/utils';

const InFocusContext = createContext();

export const InFocusProvider = ({ children }) => {
  const [latestItemInFocus, setLatestItemInFocus] = useState('prompts');
  useEffect(() => {
    // console.log(latestItemInFocus);

    return () => {};
  }, [latestItemInFocus]);
  useEffect(() => {
    const uuids = createUUID(10);

    return () => {};
  }, []);
  return (
    <InFocusContext.Provider
      value={{
        latestItemInFocus,
        setLatestItemInFocus,
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
