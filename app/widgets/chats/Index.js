import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import ChatsContext from './ChatsContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
import UserContext from '@/context/UserContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import AIModelSelector from './gemini/AIModelSelector';
import ChatInFocus from './ChatInFocus';
import ChatMessage from './ChatMessage';

import { handleSelectWidgetContext } from '../actions';
import { useMode } from '@/app/theme/ThemeContext';
import MultiItems from '@/app/uiItems/MultiItems';

import { singleItemSchemeChat, singleItemSchemePrompt } from './dataScheme';
import ChatInputText from './ChatInputText';import './ChatInFocus.scss';


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
    selectedChats,
    setSelectedChats,
    chatInFocus,
    defaultPrompts,
    messageInFocus,
    setMessageInFocus,
    promptTextInFocus,
    setPromptTextInFocus,
    searchTerm,
    isFiltered,
    handleResetFiltered,
    handleSearchTermChange,
    handleNewChat,
    handleStoreChat,
    handleSetChatInFocus,
    handleSetDefaultPromptInFocus,
    handleSelectMessage,
    handleInputChange,
    streamedResponse,
    setStreamedResponse,
    fullResponse,
    setFullResponse,
    promptTokenConsumed,
    setPromptTokenConsumed,
  } = useContext(ChatsContext);
  const { maxOutputTokens } = useContext(UserContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const [showGeminiCard, setShowGeminiCard] = useState('text');
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
  useEffect(() => {
    if (!loading) setPromptTextInFocus('');
    return () => {};
  }, []);
  useEffect(() => {
    return () => {};
  }, [streamedResponse]);
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
      <Box className="widget" sx={styled?.widget}>
        <MultiItems
          widget={widget}
          uiContext={uiContext}
          singleItemScheme={singleItemSchemeChat}
          selectedWidgetContext={selectedWidgetContext}
          setActiveSearchTerm={setActiveSearchTerm}
          handleSetItemInFocus={handleSetDefaultPromptInFocus}
          customElement={null}
          alertElement={null}
          data={defaultPrompts}
          selectedData={defaultPrompts}
          // setSelectedItem={setDefaultPrompts}
          selector={{
            selector: 'chatsSelector',
            selected: 'selectedChats',
          }}
          itemContext={widgetProps?.itemContext}
          itemInFocus={promptTextInFocus}
          styled={styled}
        />
      </Box>
    </>
  );
  const response = (
    <Box
      className="widget"
      sx={{
        ...styled?.widget,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      }}
    >
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
        promptTextInFocus={promptTextInFocus}
        setPromptTextInFocus={setPromptTextInFocus}
        loading={loading}
        setLoading={setLoading}
        promptTokenConsumed={promptTokenConsumed}
        setPromptTokenConsumed={setPromptTokenConsumed}
        messageInFocus={messageInFocus}
        setMessageInFocus={setMessageInFocus}
        handleStoreChat={handleStoreChat}
        handleSelectMessage={handleSelectMessage}
        handleInputChange={handleInputChange}
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
