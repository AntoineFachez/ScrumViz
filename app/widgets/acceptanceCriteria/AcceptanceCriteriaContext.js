'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { acceptanceCriteria } from './mockAcceptanceCriteria';

const AcceptanceCriteriaContext = createContext();

export const AcceptanceCriteriaProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [displayAcceptanceCriteria, setDisplayAcceptanceCriteria] =
    useState(acceptanceCriteria);
  const [selectedAcceptanceCriteria, setSelectedAcceptanceCriteria] = useState(
    displayAcceptanceCriteria
  );
  const [dailiesInFocus, setAcceptanceCriteriaInFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isFiltered, setIsFiltered] = useState(false);
  const handleResetFiltered = () => {
    setSelectedAcceptanceCriteria(displayAcceptanceCriteria);
    setIsFiltered(false);
  };
  // const handleSetAcceptanceCriteriaInFocus = (dailies) => {
  //   setAcceptanceCriteriaInFocus(dailies);
  // };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  useEffect(() => {
    setSelectedAcceptanceCriteria(
      displayAcceptanceCriteria.filter((criteria) =>
        criteria.acceptanceCriteria_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedAcceptanceCriteria(displayAcceptanceCriteria);

    return () => {};
  }, [displayAcceptanceCriteria]);
  return (
    <AcceptanceCriteriaContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        displayAcceptanceCriteria,
        setDisplayAcceptanceCriteria,
        selectedAcceptanceCriteria,
        setSelectedAcceptanceCriteria,
        dailiesInFocus,
        setAcceptanceCriteriaInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        // handleSetAcceptanceCriteriaInFocus,
        handleSearchTermChange,
      }}
    >
      {children}
    </AcceptanceCriteriaContext.Provider>
  );
};
export default AcceptanceCriteriaContext;
export const AcceptanceCriteriaState = () => {
  return useContext(AcceptanceCriteriaContext);
};
