'use client';
import { createUUID } from '@/utils/utils';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const DefaultValuesContext = createContext();

const examples = [
  {
    product_name: 'Edible Fungus App',
    status: 'in developement',
    description:
      'Users of the app can mark locations of where they found edible fungus. Users can take an image, upload it to gemini and ask for the according wikipedia article.',
    productBackLog_items: '',
    safetyGuidelines: '...',
    expertVerification: '...',
  },
  {
    product_name: 'Smartphone Camera App',
    status: 'in developement',
    description:
      'Design the basic layout for a smartphone camera app that utilizes pose estimation. The app should allow users to: Capture photos and videos with real-time pose detection overlaid on the screen.    Choose between different pose visualization options (e.g., skeleton, stick figure, dots).    Toggle pose estimation on/off.    Access standard camera features like zoom, flash, and switching between front/rear cameras.',
    productBackLog_items: '',
    safetyGuidelines: '...',
    expertVerification: '...',
  },
];

export const DefaultValuesProvider = ({ children }) => {
  const startUpAppContext = 'home';
  const startUpCollectionContext = '';
  const [defaultAmountPromptToken, setDefaultAmountPromptToken] =
    useState(8192);
  const [defaultMinPromptToken, setDefaultMinPromptToken] = useState(1000);
  const [defaultMaxPromptToken, setDefaultMaxPromptToken] = useState(20000);
  const [exampleProduct, setExampleProduct] = useState(examples[1]);
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
