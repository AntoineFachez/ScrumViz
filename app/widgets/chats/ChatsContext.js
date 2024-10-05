'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';

import { chats, defaultPrompts } from './mockChats';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayChats, setDisplayChats] = useState(chats);
  const [selectedChats, setSelectedChats] = useState(displayChats);
  const [chatInFocus, setChatInFocus] = useState(null);

  const [messageInFocus, setMessageInFocus] = useState(null);
  const [promptTextInFocus, setPromptTextInFocus] = useState(defaultPrompts[0]);
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
  const handleSetChatInFocus = (chat) => {
    setChatInFocus(chat);
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  const handleNewChat = async () => {
    const data = {
      chat_id: uuidv4(),
      title: 'next chat',
      createdAt: new Date(),
      summary: '',
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'I am in development of an AI integration.',
            },
          ],
        },
        {
          role: 'model',
          parts: [{ text: 'hi. Tell me more about that.' }],
        },
        {
          role: 'user',
          parts: [
            {
              text: 'I am in development of an AI integration. Please return what ever comes to your mind. By now I only need to receive some kind of response and am wondering what you come up with.',
            },
          ],
        },
      ],
    };
    submitToFirestore({
      //firestoreContext, data, setItemInFocus, setter, setSetter
      dataPack: {
        firestoreContext: widgetProps.collection,
        data: data,
        setItemInFocus: setChatInFocus,
        arrayToPushOnTo: displayChats,
        // setDisplayChats,
        // uploadFileUrl: data.uploadFileUrl || "",
      },
    }).then((tempArray) => {
      setDisplayChats(tempArray);
      console.log('displayChats', displayChats);
    });
  };
  const handleStoreChat = async (data) => {
    const parentCollectionName = collection;
    let queryField;

    let searchString;
    searchString = data?.chat_id;
    queryField = 'chat_id';

    const parentDoc = await getDocIdSByValueSearch(
      parentCollectionName,
      queryField,
      searchString
    );
    if (parentDoc?.parentId) {
      handleUpdateDoc(parentCollectionName, parentDoc?.parentId, data);
    } else {
      submitToFirestore({
        //firestoreContext, data, setItemInFocus, setter, setSetter
        dataPack: {
          firestoreContext: widgetProps.collection,
          data: data,
          setItemInFocus: setChatInFocus,
          arrayToPushOnTo: displayChats,
        },
      }).then((tempArray) => {
        setDisplayChats(tempArray);
        console.log('displayChats', displayChats);
      });
    }
  };

  const handleSetDefaultPromptInFocus = (defaultPrompt) => {
    setPromptTextInFocus(defaultPrompt);
    // console.log('defaultPromptInFocus', chat);
  };
  const handleSelectMessage = (message) => {
    setMessageInFocus(message);
  };
  const handleInputChange = (textContent) => {
    console.log(textContent);

    setPromptTextInFocus(textContent);
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
        defaultPrompts,
        messageInFocus,
        setMessageInFocus,
        promptTextInFocus,
        setPromptTextInFocus,
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
        handleStoreChat,
        handleSetDefaultPromptInFocus,
        handleSelectMessage,
        handleInputChange,
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
