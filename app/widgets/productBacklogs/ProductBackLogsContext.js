'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { productBackLogs } from './mockProductBackLogs';

const BackLogsContext = createContext();

export const BackLogsProvider = ({ children }) => {
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);
  const [displayProductBackLogs, setDisplayProductBackLogs] =
    useState(productBackLogs);
  const [selectedProductBackLogs, setSelectedProductBackLogs] = useState(
    displayProductBackLogs
  );
  const [productBackLogInFocus, setProductBackLogInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  // const handleSearchTermChange = (e) => {
  //   e.preventDefault();

  //   setSearchTerm(e.target.value);
  //   setActiveSearchTerm(e.target.value);
  // };
  const handleResetFiltered = () => {
    setSelectedUserStories(displayUserStories);
    setIsFiltered(false);
  };
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
        selectedWidgetContext,
        setSelectedWidgetContext,
        displayProductBackLogs,
        setDisplayProductBackLogs,
        selectedProductBackLogs,
        setSelectedProductBackLogs,
        productBackLogInFocus,
        setProductBackLogInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        // handleSearchTermChange,
        handleResetFiltered,
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
