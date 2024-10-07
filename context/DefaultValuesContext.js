'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const DefaultValuesContext = createContext();

export const DefaultValuesProvider = ({ children }) => {
  const startUp = 'scrumManager';
  const [defaultAmountPromptToken, setDefaultAmountPromptToken] =
    useState(7000);
  const [defaultMinPromptToken, setDefaultMinPromptToken] = useState(1000);
  const [defaultMaxPromptToken, setDefaultMaxPromptToken] = useState(20000);

  return (
    <DefaultValuesContext.Provider
      value={{
        startUp,
        defaultAmountPromptToken,
        setDefaultAmountPromptToken,
        defaultMinPromptToken,
        setDefaultMinPromptToken,
        defaultMaxPromptToken,
        setDefaultMaxPromptToken,
      }}
    >
      {children}
    </DefaultValuesContext.Provider>
  );
};
export default DefaultValuesContext;
export const DefaultValuesState = () => {
  return useContext(DefaultValuesContext);
};