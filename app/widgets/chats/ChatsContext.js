'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import DefaultValuesContext from '@/context/DefaultValuesContext';

import { chats } from './mockChats';
import UIContext from '@/context/UIContext';
import DefaultPromptsContext from '../prompts/PromptsContext';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { appContext, setAppContext } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { showDialog, setShowDialog } = useContext(UIContext);
  const {
    defaultAmountPromptToken,
    setDefaultAmountPromptToken,
    defaultMinPromptToken,
    setDefaultMinPromptToken,
    defaultMaxPromptToken,
    setDefaultMaxPromptToken,
  } = useContext(DefaultValuesContext);
  const { promptInFocus, setPromptInFocus } = useContext(DefaultPromptsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [chatContext, setChatContext] = useState('hello world');
  const [displayChats, setDisplayChats] = useState(chats);
  const [selectedChats, setSelectedChats] = useState(displayChats);
  const [chatInFocus, setChatInFocus] = useState(chats[0]);

  const [messageInFocus, setMessageInFocus] = useState(null);

  const [availablePromptTokensAmount, setAvailablePromptTokensAmount] =
    useState(defaultAmountPromptToken);
  const [minPromptTokens, setMinPrompTokens] = useState(defaultMinPromptToken);
  const [maxPromptTokens, setMaxPrompTokens] = useState(defaultMaxPromptToken);
  const [streamedResponse, setStreamedResponse] = useState([]);
  const [fullResponse, setFullResponse] = useState('');
  const [promptTokenConsumed, setPromptTokenConsumed] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleResetFiltered = () => {
    setSelectedChats(displayChats);
    setIsFiltered(false);
  };
  const handleSetChatInFocus = (chat) => {
    setChatInFocus(chat);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  // const handleSetDefaultPromptInFocus = (item) => {
  //   setPromptInFocus(item);
  // };
  const handleSelectMessage = (message) => {
    setMessageInFocus(message);
  };
  const handleInputChange = (textContent) => {
    console.log(textContent);
    const plainText = textContent?.replace(/<[^>]+>/g, '');

    setPromptInFocus(plainText);
  };

  const handleChangeTokenAmount = (e, newValue) => {
    setAvailablePromptTokensAmount(newValue);
  };
  const handleNewChat = async () => {
    console.log('handleNewChat');
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  const handleCloseNewItem = () => {
    console.log('handleCloseNewItem');

    setShowNewItem(false);
  };
  // const handleNewChat = async () => {
  //   const data = {
  //     chat_id: uuidv4(),
  //     title: 'next chat',
  //     createdAt: new Date(),
  //     summary: '',
  //     history: [
  //       {
  //         role: 'user',
  //         parts: [
  //           {
  //             text: 'I am in development of an AI integration.',
  //           },
  //         ],
  //       },
  //       {
  //         role: 'model',
  //         parts: [{ text: 'hi. Tell me more about that.' }],
  //       },
  //       {
  //         role: 'user',
  //         parts: [
  //           {
  //             text: 'Please return what ever comes to your mind. By now I only need to receive some kind of response and am wondering what you come up with.',
  //           },
  //         ],
  //       },
  //     ],
  //   };
  //   submitToFirestore({
  //     //firestoreContext, data, setItemInFocus, setter, setSetter
  //     dataPack: {
  //       firestoreContext: widgetProps.collection,
  //       data: data,
  //       setItemInFocus: setChatInFocus,
  //       arrayToPushOnTo: displayChats,
  //       // setDisplayChats,
  //       // uploadFileUrl: data.uploadFileUrl || "",
  //     },
  //   }).then((tempArray) => {
  //     setDisplayChats(tempArray);
  //   });
  // };
  // // const handleNewDefaultPrompt = async () => {
  // //   console.log('handleNewDefaultPrompt');
  // //   setShowDialog(true);
  // // };
  // const handleStoreChat = async (data) => {
  //   const parentCollectionName = collection;
  //   let queryField;

  //   let searchString;
  //   searchString = data?.chat_id;
  //   queryField = 'chat_id';

  //   const parentDoc = await getDocIdSByValueSearch(
  //     parentCollectionName,
  //     queryField,
  //     searchString
  //   );
  //   if (parentDoc?.parentId) {
  //     handleUpdateDoc(parentCollectionName, parentDoc?.parentId, data);
  //   } else {
  //     submitToFirestore({
  //       //firestoreContext, data, setItemInFocus, setter, setSetter
  //       dataPack: {
  //         firestoreContext: widgetProps.collection,
  //         data: data,
  //         setItemInFocus: setChatInFocus,
  //         arrayToPushOnTo: displayChats,
  //       },
  //     }).then((tempArray) => {
  //       setDisplayChats(tempArray);
  //     });
  //   }
  // };

  useEffect(() => {
    setSelectedChats(
      displayChats?.filter((chat) =>
        chat?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    // const filteredprompts = prompts?.filter(
    //   (chats) => chats.chatId === chatInFocus.chatId,
    // );
    // console.log("filteredprompts", filteredprompts);
    return () => {};
  }, [fullResponse]);
  useEffect(() => {
    return () => {};
  }, [chatInFocus]);
  useEffect(() => {
    setSelectedChats(displayChats);

    return () => {};
  }, [displayChats]);
  return (
    <ChatsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        setShowNewItem,
        // selectedWidgetContext,
        // setSelectedWidgetContext,

        availablePromptTokensAmount,
        setAvailablePromptTokensAmount,
        minPromptTokens,
        setMinPrompTokens,
        maxPromptTokens,
        setMaxPrompTokens,

        displayChats,
        setDisplayChats,
        selectedChats,
        setSelectedChats,
        chatInFocus,
        setChatInFocus,

        messageInFocus,
        setMessageInFocus,
        // promptInFocus,
        // setPromptInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSearchTermChange,
        // handleResetFiltered,
        handleSetChatInFocus,
        // handleSelectWidgetContext,
        handleNewChat,
        handleCloseNewItem,
        // handleNewDefaultPrompt,
        // handleStoreChat,
        // handleSetDefaultPromptInFocus,
        handleSelectMessage,
        handleInputChange,
        handleChangeTokenAmount,
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
