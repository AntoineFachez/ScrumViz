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
import Chats from './ChatsSelector';
import ChatInFocus from './ChatInFocus';
import Message from './ChatMessage';
import { MessageInput } from '@chatscope/chat-ui-kit-react';

import { handleSelectWidgetContext } from '../actions';
// import prompts from "../../assets/data/mockData/chats.json";
import { themeSettings } from '@/app/theme/ThemeContext';
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

export default function ChatsWidget({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
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
  console.log('widgetProps', widgetProps.widgetContext);
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
      chatId: uuidv4(),
      title: 'latest  chat',
      createdAt: new Date(),
      summery: '',
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'In the next prompt you will recieve instructions. The aim for you is to return a response that contains only the json. You will be provided furthermore with data.',
            },
          ],
        },
        {
          role: 'model',
          parts: [{ text: 'hi.' }],
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
    });
  };
  const handleStoreChat = async (data) => {
    const parentCollectionName = collection;
    let queryField;

    let searchString;
    searchString = data?.chatId;
    queryField = 'chatId';

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
          firestoreContext,
          data,
          setChatInFocus,
          chats,
          setChats,
          // uploadFileUrl: data.uploadFileUrl || "",
        },
      });
    }
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
  // const flexList = (
  //   <>
  //     <Chats
  //       button={''}
  //       data={selectedChats}
  //       chatInFocus={chatInFocus}
  //       setChatInFocus={setChatInFocus}
  //       styled={styled}
  //     />
  //   </>
  // );
  const handleSetChatInFocus = (chat) => {
    setChatInFocus(chat);
  };
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
  console.log('triggered_run_Chat', chatInFocus?.history);
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
      {chatInFocus ? (
        <ChatInFocus
          maxOutputTokens={maxOutputTokens}
          chatInFocus={chatInFocus}
          data={displayChats}
          setData={setDisplayChats}
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
      ) : (
        flexList
      )}
    </>
  );

  const response = (
    <Box className="widget" sx={styled?.widget}>
      <Message
        data=""
        setData={setDisplayChats}
        streamedResponse=""
        setStreamedResponse={setStreamedResponse}
        fullResponse={fullResponse}
        setFullResponse={setFullResponse}
        promptInputText={promptInputText}
        setPromptInputText={setPromptInputText}
        loading={loading}
        setLoading={setLoading}
        messageInFocus={messageInFocus}
        setMessageInFocus={setMessageInFocus}
        setError={setError}
        styled={styled}
      />
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

  // const inputBox = (
  //   <Box className="widget" sx={styled?.widget}>
  //     <Box
  //       // className="widget"
  //       sx={{
  //         width: '100%',
  //         height: '100%',
  //         backgroundColor: '#444',
  //         color: '#fff',
  //         '& .cs-message-input': {
  //           height: '100%',
  //           maxHeight: 'none',
  //         },
  //         '& .cs-message-input__content-editor-container': {
  //           height: '100%',
  //           maxHeight: 'none',
  //         },
  //         '& .cs-button--attachment': {
  //           color: styled?.iconButton?.action?.color,
  //         },
  //         '& .cs-button--send': {
  //           color: styled?.iconButton?.action?.color,
  //         },
  //       }}
  //     >
  //       <MessageInput
  //         ref={messageInputRef}
  //         placeholder="Type message here..."
  //         onChange={handleInputChange}
  //         value={promptInputText}
  //         sendDisabled={loading}
  //         onSend={(textContent) =>
  //           runChat(
  //             maxOutputTokens,
  //             chatInFocus,
  //             textContent,
  //             setLoading,
  //             data,
  //             setData,
  //             streamedResponse,
  //             setStreamedResponse,
  //             fullResponse,
  //             setFullResponse,
  //             promptTokenConsumed,
  //             setPromptTokenConsumed,
  //             setError
  //           )
  //         }
  //       />
  //     </Box>
  //   </Box>
  // );

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
        // inputField={inputBox}
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
