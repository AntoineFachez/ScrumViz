import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import ChatsContext from './ChatsContext';
import DefaultPromptsContext from '../defaultPrompts/DefaultPromptsContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
// import UserContext from '@/context/UserContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/WidgetMenu';

import AIModelSelector from './gemini/AIModelSelector';
import ChatInFocus from './ChatInFocus';
import ChatMessage from './ChatMessage';

import { handleSelectWidgetContext } from '../actions';
import { useMode } from '@/app/theme/ThemeContext';
import MultiItems from '@/app/uiItems/MultiItems';
// import SliderComponent from '@/app/components/slider/Slider';

import { singleItemSchemeChat } from './dataScheme';
import ChatInputField from './ChatInputField';
import SettingsAndMenu from './SettingsAndMenu';

import { runChat } from './functions/apiFunctions';
import { handleNewChat, handleStoreChat } from './functions/dbFunctions';

import './ChatInFocus.scss';

export default function ChatsWidget({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showChatsMenu, setShowChatsMenu, showSliderExtendData, sliderSize } =
    useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    isLoading,
    setIsLoading,
    // selectedWidgetContext,
    // setSelectedWidgetContext,

    availablePromptTokensAmount,
    setAvailablePromptTokensAmount,
    minPromptTokens,
    maxPromptTokens,
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
    handleSetChatInFocus,
    handleSelectMessage,
    handleInputChange,
    handleChangeTokenAmount,
    streamedResponse,
    setStreamedResponse,
    fullResponse,
    setFullResponse,
    promptTokenConsumed,
    setPromptTokenConsumed,
  } = useContext(ChatsContext);
  const { promptTextInFocus, setPromptTextInFocus } = useContext(
    DefaultPromptsContext
  );
  const messageInputRef = useRef();

  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  useEffect(() => {
    setSelectedWidgetContext(startUpWidgetLayout);
    return () => {};
  }, []);
  const [showGeminiCard, setShowGeminiCard] = useState('text');

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
      }}
    >
      {/* <SimpleDialog
        data={data}
        onClose={handleClose}
        selectedValue={selectedValue}
        open={showDialog}
      /> */}
    </Box>
  );
  const settingsAndMenu = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        flexFlow: 'row',
      }}
    >
      <SettingsAndMenu
        chatInFocus={chatInFocus}
        handleStoreChat={handleStoreChat}
        handleNewChat={handleNewChat}
        availablePromptTokensAmount={availablePromptTokensAmount}
        size={sliderSize}
        showExtendData={showSliderExtendData}
        orientation="horizontal"
        value={availablePromptTokensAmount}
        setValue={setAvailablePromptTokensAmount}
        aria={sliderSize}
        valueLabelDisplay="off"
        defaultValue={availablePromptTokensAmount}
        step={500}
        marks={[
          {
            value: minPromptTokens,
            label: 'Basic',
          },
          {
            value: minPromptTokens * 4 + maxPromptTokens / 4,
            label: 'Extend',
          },
          {
            value: (maxPromptTokens / 3) * 2,
            label: 'Pro',
          },
          {
            value: maxPromptTokens,
            label: 'Enterprise',
          },
        ]}
        min={minPromptTokens}
        max={maxPromptTokens}
        disabled={false}
        handleChange={handleChangeTokenAmount}
        styled={styled}
      />
    </Box>
  );
  const modelSelector = (
    <>
      <AIModelSelector
        showGeminiCard={showGeminiCard}
        setShowGeminiCard={setShowGeminiCard}
        direction="row"
      />
    </>
  );
  const chatSelector = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
        flexFlow: 'column',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Create new Chat" placement="top" arrow>
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={() => handleNewChat()}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
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

  const messageInFocusWidget = (
    <Box
      className="widget"
      sx={{
        ...styled?.widget,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-end',
      }}
    >
      <ChatMessage
        data={messageInFocus}
        messageInFocus={messageInFocus}
        styled={styled}
      />
    </Box>
  );

  const chatInFocusWidget = (
    <>
      <ChatInFocus
        maxPromptTokens={maxPromptTokens}
        chatInFocus={chatInFocus}
        data={selectedChats}
        setData={setSelectedChats}
        streamedResponse={streamedResponse}
        setStreamedResponse={setStreamedResponse}
        fullResponse={fullResponse}
        setFullResponse={setFullResponse}
        promptTextInFocus={promptTextInFocus}
        setPromptTextInFocus={setPromptTextInFocus}
        promptTokenConsumed={promptTokenConsumed}
        setPromptTokenConsumed={setPromptTokenConsumed}
        messageInFocus={messageInFocus}
        setMessageInFocus={setMessageInFocus}
        handleStoreChat={handleStoreChat}
        handleSelectMessage={handleSelectMessage}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setError={setError}
        styled={styled}
      />
      {/* ) : (
        flexList
      )} */}
    </>
  );

  const promptField = (
    <ChatInputField
      ref={messageInputRef}
      placeholder="Type message here..."
      onChange={handleInputChange}
      value={promptTextInFocus?.description}
      sendDisabled={isLoading}
      onSend={(inputText) =>
        runChat(
          availablePromptTokensAmount,
          chatInFocus,
          inputText,
          setIsLoading,
          setStreamedResponse,
          setPromptTokenConsumed,
          setError
        )
      }
      fancyScroll={true}
      onAttachClick={null}
      styled={styled}
    />
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
        horizontal={settingsAndMenu}
        flexList={chatSelector}
        // vertical={defaultPromptSelector}
        selector={modelSelector}
        inputField={promptField}
        singleItem={chatInFocusWidget}
        soloWidget={messageInFocusWidget}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
