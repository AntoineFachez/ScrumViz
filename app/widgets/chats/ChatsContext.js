'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';

import { chats } from './mockChats';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayChats, setDisplayChats] = useState(chats);
  const [selectedChats, setSelectedChats] = useState(displayChats);

  const [chatInFocus, setChatInFocus] = useState(null);
  const [messageInFocus, setMessageInFocus] = useState(null);
  const [promptInputText, setPromptInputText] = useState('');
  const [chatContext, setChatContext] = useState('hello world');
  const [streamedResponse, setStreamedResponse] = useState([]);
  const [fullResponse, setFullResponse] = useState('');
  const [promptTokenConsumed, setPromptTokenConsumed] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  useEffect(() => {
    // const filteredprompts = prompts?.filter(
    //   (chats) => chats.chatId === chatInFocus.chatId,
    // );
    // console.log("filteredprompts", filteredprompts);
    return () => {};
  }, [fullResponse]);
  const handleResetFiltered = () => {
    setSelectedChats(displayChats);
    setIsFiltered(false);
  };
  const handleSetUserStoryInFocus = (chat) => {
    setChatInFocus(chat);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  useEffect(() => {
    setSelectedChats(
      displayChats?.filter((chat) =>
        chat?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);

  return (
    <ChatsContext.Provider
      value={{
        selectedWidgetContext,
        setSelectedWidgetContext,
        displayChats,
        setDisplayChats,
        selectedChats,
        setSelectedChats,
        chatInFocus,
        setChatInFocus,
        messageInFocus,
        setMessageInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSearchTermChange,
        // handleResetFiltered,
        handleSetUserStoryInFocus,
        // handleSelectWidgetContext,
        promptInputText,
        setPromptInputText,
        chatContext,
        setChatContext,
        streamedResponse,
        setStreamedResponse,
        fullResponse,
        setFullResponse,
        promptTokenConsumed,
        setPromptTokenConsumed,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
export default ChatsContext;
export const ChatsState = () => {
  return useContext(ChatsContext);
};
