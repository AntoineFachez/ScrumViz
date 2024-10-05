import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import ChatsContext from './ChatsContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
import UserContext from '@/context/UserContext';

import { fetchDataFromGeminiProVisionAPI, runChat } from './functions';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import AIModelSelector from './gemini/AIModelSelector';
import ChatInFocus from './ChatInFocus';
import ChatMessage from './ChatMessage';
import { MessageInput } from '@chatscope/chat-ui-kit-react';

import { handleSelectWidgetContext } from '../actions';
// import prompts from "../../assets/data/mockData/chats.json";
import { useMode } from '@/app/theme/ThemeContext';
import './ChatInFocus.scss';
import {
  getDocIdSByValueSearch,
  handleUpdateDoc,
  submitToFirestore,
} from '@/firebase/helperFunctions';
import DefaultPromptSelector from './DefaultPromptSelector';
import { defaultPrompts } from '../defaultPrompts';
import MultiItems from '@/app/uiItems/MultiItems';
import { singleItemSchemeChat, singleItemSchemePrompt } from './dataScheme';
import ChatInputText from './ChatInputText';

export default function ChatsWidget({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showChatsMenu, setShowChatsMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    // selectedWidgetContext,
    // setSelectedWidgetContext,
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
    promptInputText,
    setPromptInputText,
    chatContext,
    streamedResponse,
    setStreamedResponse,
    fullResponse,
    setFullResponse,
    promptTokenConsumed,
    setPromptTokenConsumed,
  } = useContext(ChatsContext);
  const { maxOutputTokens } = useContext(UserContext);
  const messageInputRef = useRef();
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const [showGeminiCard, setShowGeminiCard] = useState('text');
  const [defaultPromptInFocus, setDefaultPromptInFocus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const collection = 'chats';
  const widgetProps = {
    appContext: appContext,
    uiGridMapContext: uiGridMapContext,
    iconButton: <Chat />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',

    onClick: () => {
      setUiGridMapContext(collection);
      return;
    },
  };
  const menuProps = {
    states: { showMenu: showChatsMenu, widgetProps: widgetProps },
    functions: {
      handleShowMenu: setShowChatsMenu,
    },
  };
  const handleInputChange = (textContent) => {
    // Use the textContent here to update your component's state or perform other actions
    setPromptInputText(textContent);
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
  const handleSetChatInFocus = (chat) => {
    setChatInFocus(chat);
  };

  const menu = (
    <>
      <WidgetMenu
        widget={widget}
        widgetProps={widgetProps}
        menuProps={menuProps}
        setSelectedWidgetContext={setSelectedWidgetContext}
        handleSelectWidgetContext={handleSelectWidgetContext}
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
      />
    </>
  );
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      UserStory New Item
    </Box>
  );

  const selector = (
    <>
      <AIModelSelector
        showGeminiCard={showGeminiCard}
        setShowGeminiCard={setShowGeminiCard}
        direction="row"
      />
    </>
  );

  const flexList = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      <MultiItems
        widget={widget}
        uiContext={uiContext}
        singleItemScheme={singleItemSchemeChat}
        selectedWidgetContext={selectedWidgetContext}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetChatInFocus}
        customElement={null}
        alertElement={null}
        data={selectedChats}
        selectedData={selectedChats}
        setSelectedItem={setSelectedChats}
        selector={{
          selector: 'chatsSelector',
          selected: 'selectedChats',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={chatInFocus}
        styled={styled}
      />
    </Box>
  );

  const vertical = (
    <>
      <DefaultPromptSelector
        button={''}
        data={defaultPrompts}
        defaultPromptInFocus={defaultPromptInFocus}
        setDefaultPromptInFocus={setDefaultPromptInFocus}
        styled={styled}
      />
    </>
  );
  const response = (
    <Box className="widget" sx={styled?.widget}>
      <ChatMessage
        data={messageInFocus}
        messageInFocus={messageInFocus}
        styled={styled}
      />
    </Box>
  );

  const promtWithChat = (
    <>
      <Box
        // className="widget"
        sx={{
          zIndex: 1000,
          position: 'absolute',
          top: '0rem',
          right: '0.5rem',
          width: 'fit-content',
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Typography sx={{ color: 'white' }}>
          maxToken: {maxOutputTokens}
        </Typography>
        {chatInFocus && (
          <Tooltip title="Store Chat">
            <IconButton
              sx={styled?.iconButton?.action}
              onClick={() => handleStoreChat(chatInFocus)}
            >
              <Backup />
            </IconButton>
          </Tooltip>
        )}

        <IconButton
          sx={styled?.iconButton?.action}
          onClick={() => handleNewChat()}
        >
          <Add />
        </IconButton>
      </Box>
      {/* {chatInFocus ? ( */}
      <ChatInFocus
        maxOutputTokens={maxOutputTokens}
        chatInFocus={chatInFocus}
        data={selectedChats}
        setData={setSelectedChats}
        streamedResponse={streamedResponse}
        setStreamedResponse={setStreamedResponse}
        fullResponse={fullResponse}
        setFullResponse={setFullResponse}
        promptInputText={promptInputText}
        setPromptInputText={setPromptInputText}
        loading={loading}
        setLoading={setLoading}
        promptTokenConsumed={promptTokenConsumed}
        setPromptTokenConsumed={setPromptTokenConsumed}
        messageInFocus={messageInFocus}
        setMessageInFocus={setMessageInFocus}
        handleStoreChat={handleStoreChat}
        setError={setError}
        styled={styled}
      />
      {/* ) : (
        flexList
      )} */}
    </>
  );

  const inputField = (
    <Box className="widget" sx={styled?.widget}>
      <Box
        // className="widget"
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#444',
          color: '#fff',
          '& .cs-message-input': {
            height: '100%',
            maxHeight: 'none',
          },
          '& .cs-message-input__content-editor-container': {
            height: '100%',
            maxHeight: 'none',
          },
          '& .cs-button--attachment': {
            color: styled?.iconButton?.action?.color,
          },
          '& .cs-button--send': {
            color: styled?.iconButton?.action?.color,
          },
        }}
      >
        <ChatInputText
          messageInputRef={messageInputRef}
          handleInputChange={handleInputChange}
          promptInputText={promptInputText}
          loading={loading}
          // textContent={textContent}
          maxOutputTokens={maxOutputTokens}
          chatInFocus={chatInFocus}
          setLoading={setLoading}
          data={selectedChats}
          setData={setSelectedChats}
          streamedResponse={streamedResponse}
          setStreamedResponse={setStreamedResponse}
          fullResponse={fullResponse}
          setFullResponse={setFullResponse}
          promptTokenConsumed={promptTokenConsumed}
          setPromptTokenConsumed={setPromptTokenConsumed}
          setError={setError}
        />
      </Box>
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // selectedArrayItems={chatGPTMessages}
        uiContext={uiContext}
        widgetContext={selectedWidgetContext}
        // contextSpaces={contextSpaces}
        // contextToolBar={contextToolBar}
        // iconButton={<Chat />}
        // onClick={handleSetAppContext}
        menu={menu}
        // horizontal={horizontal}
        vertical={vertical}
        inputField={inputField}
        selector={selector}
        soloWidget={response}
        flexList={flexList}
        // table={table}
        // chip={chip}
        singleItem={promtWithChat}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
