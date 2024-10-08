'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import DefaultValuesContext from './DefaultValuesContext';

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const { startUpCollectionContext } = useContext(DefaultValuesContext);
  const [collectionContext, setCollectionContext] = useState(
    startUpCollectionContext
  );

  return (
    <CollectionContext.Provider
      value={{
        collectionContext,
        setCollectionContext,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
export default CollectionContext;
export const CollectionState = () => {
  return useContext(CollectionContext);
};
