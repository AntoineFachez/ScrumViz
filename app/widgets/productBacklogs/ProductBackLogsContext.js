'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { productBackLogs } from './mockProductBackLogs';

const BackLogsContext = createContext();

export const BackLogsProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displayProductBackLogs, setDisplayProductBackLogs] =
    useState(productBackLogs);
  const [selectedProductBackLogs, setSelectedProductBackLogs] = useState(
    displayProductBackLogs
  );
  const [productBackLogInFocus, setProductBackLogInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setSelectedProductBackLogs(
      displayProductBackLogs.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  return (
    <BackLogsContext.Provider
      value={{
        displayProductBackLogs,
        setDisplayProductBackLogs,
        selectedProductBackLogs,
        setSelectedProductBackLogs,
        productBackLogInFocus,
        setProductBackLogInFocus,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </BackLogsContext.Provider>
  );
};
export default BackLogsContext;
export const BackLogsState = () => {
  return useContext(BackLogsContext);
};
