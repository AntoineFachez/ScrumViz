'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import TeamMembersContext from '../teamMembers/TeamMembersContext';

import { persons } from './mockPersons';

const PersonsContext = createContext();

export const PersonsProvider = ({ children }) => {
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayPersons, setDisplayPersons] = useState(persons);
  const [selectedPersons, setSelectedPersons] = useState(displayPersons);
  const [personInFocus, setPersonInFocus] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const handleResetFiltered = () => {
    setSelectedPersons(displayPersons);
    setIsFiltered(false);
  };
  // const handleSetPersonInFocus = (person) => {
  //   setPersonInFocus(person);
  // };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  useEffect(() => {
    setSelectedPersons(
      displayPersons.filter((person) =>
        person.person_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedPersons(displayPersons);

    return () => {};
  }, [displayPersons]);
  return (
    <PersonsContext.Provider
      value={{
        selectedWidgetContext,
        setSelectedWidgetContext,
        displayPersons,
        setDisplayPersons,
        selectedPersons,
        setSelectedPersons,
        personInFocus,
        setPersonInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSearchTermChange,
        // handleResetFiltered,
        // handleSetPersonInFocus,
        // handleSelectWidgetContext,
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};
export default PersonsContext;
export const PersonsState = () => {
  return useContext(PersonsContext);
};
