'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
// import InFocusContext from "./InFocusContext";
// import { submitToFirestore } from "../firebase/helperFunctions";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // const { universityInFocus } = useContext(InFocusContext);
  const [searchContext, setSearchContext] = useState('library');
  const [showHistorySearch, setShowHistorySearch] = useState(false);

  const [searchString, setSearchString] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [activeSearchTerm, setActiveSearchTerm] = useState('berl');
  const [rawData, setRawData] = useState([]);

  const [queryLocation, setQueryLocation] = useState([]);
  const [answerLocation, setAnswerLocation] = useState({});

  return (
    <SearchContext.Provider
      value={{
        showHistorySearch,
        setShowHistorySearch,
        searchString,
        setSearchString,
        searchHistory,
        setSearchHistory,
        activeSearchTerm,
        setActiveSearchTerm,
        rawData,
        setRawData,

        queryLocation,
        setQueryLocation,
        answerLocation,
        setAnswerLocation,

        searchContext,
        setSearchContext,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;
export const SearchState = () => {
  return useContext(SearchContext);
};
