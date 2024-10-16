'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import DefaultValuesContext from '@/context/DefaultValuesContext';

import { defaultPrompts } from './mockDefaultPrompts';
import UIContext from '@/context/UIContext';

const DefaultPromptsContext = createContext();

export const DefaultPromptsProvider = ({ children }) => {
  const { appContext, setAppContext } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { showDialog, setShowDialog } = useContext(UIContext);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayDefaultPrompts, setDisplayDefaultPrompts] =
    useState(defaultPrompts);
  const [selectedDefaultPrompts, setSelectedDefaultPrompts] = useState(
    displayDefaultPrompts
  );

  const [promptTextInFocus, setPromptTextInFocus] = useState(defaultPrompts[0]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleResetFiltered = () => {
    setSelectedChats(displayChats);
    setIsFiltered(false);
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  // const handleSetDefaultPromptInFocus = (item) => {
  //   setPromptTextInFocus(item);
  // };

  const handleNewDefaultPrompt = async () => {
    console.log('handleNewDefaultPrompt');
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  const handleCloseNewItem = () => {
    console.log('handleCloseNewItem');

    setShowNewItem(false);
  };
  useEffect(() => {
    setSelectedDefaultPrompts(
      displayDefaultPrompts.filter((displayDefaultPrompt) =>
        displayDefaultPrompt.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);
  useEffect(() => {
    setSelectedDefaultPrompts(displayDefaultPrompts);

    return () => {};
  }, [displayDefaultPrompts]);
  return (
    <DefaultPromptsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        selectedWidgetContext,
        setSelectedWidgetContext,

        defaultPrompts,
        displayDefaultPrompts,
        setDisplayDefaultPrompts,
        selectedDefaultPrompts,
        setSelectedDefaultPrompts,
        promptTextInFocus,
        setPromptTextInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSearchTermChange,

        handleNewDefaultPrompt,
        handleCloseNewItem,

        // handleSetDefaultPromptInFocus,
      }}
    >
      {children}
    </DefaultPromptsContext.Provider>
  );
};
export default DefaultPromptsContext;
export const DefaultPromptsState = () => {
  return useContext(DefaultPromptsContext);
};
