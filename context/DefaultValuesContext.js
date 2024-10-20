'use client';
import { createUUID } from '@/utils/utils';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const DefaultValuesContext = createContext();

export const DefaultValuesProvider = ({ children }) => {
  const startUpAppContext = 'home';
  const startUpCollectionContext = '';
  const [defaultAmountPromptToken, setDefaultAmountPromptToken] =
    useState(8192);
  const [defaultMinPromptToken, setDefaultMinPromptToken] = useState(1000);
  const [defaultMaxPromptToken, setDefaultMaxPromptToken] = useState(20000);
  const [exampleProduct, setExampleProduct] = useState({
    product_name: 'Edible Fungus App',
    status: 'in developement',
    description:
      'Users of the app can mark locations of where they found edible fungus. Users can take an image, upload it to gemini and ask for the according wikipedia article.',
    productBackLog_items: '',
    safetyGuidelines: '...',
    expertVerification: '...',
  });
  return (
    <DefaultValuesContext.Provider
      value={{
        startUpAppContext,
        startUpCollectionContext,
        defaultAmountPromptToken,
        setDefaultAmountPromptToken,
        defaultMinPromptToken,
        setDefaultMinPromptToken,
        defaultMaxPromptToken,
        setDefaultMaxPromptToken,
        exampleProduct,
        setExampleProduct,
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
