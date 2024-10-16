import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Add, Backup, Chat } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import ChatsContext from './ChatsContext';
import DefaultPromptsContext from '../defaultPrompts/DefaultPromptsContext';
import SearchContext from '@/context/SearchContext';
import UIContext from '@/context/UIContext';
// import UserContext from '@/context/UserContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import WidgetMenu from '@/app/uiItems/widgetItems/WidgetMenu';

import AIModelSelector from './gemini/AIModelSelector';
import ChatInFocus from './ChatInFocus';
import ChatMessage from './ChatMessage';

import {
  handleSearchTermChange,
  handleSelectWidgetContext,
  handleSetItemInFocus,
  handleOpenNewItem,
  handleCloseNewItem,
} from '../actions';
import { useMode } from '@/app/theme/ThemeContext';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';
// import SliderComponent from '@/app/components/slider/Slider';

import { singleItemScheme, singleItemSchemeChat, scheme } from './dataScheme';
import ChatInputField from './ChatInputField';
import SettingsAndMenu from './SettingsAndMenu';

import { runChat } from './functions/apiFunctions';
import { handleStoreChat } from './functions/dbFunctions';

import './ChatInFocus.scss';
import InFocusContext from '@/context/InFocusContext';
import NewItem from '@/app/uiItems/widgetItems/NewItem';
import SimpleDialog from '@/app/components/dialog/Dialog';

export default function ChatsWidget({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const {
    showChatsMenu,
    setShowChatsMenu,
    showSliderExtendData,
    sliderSize,
    showDialog,
    handleCloseDialog,
  } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {
    isLoading,
    setIsLoading,
    showWidgetUIMenu,
    setShowWidgetUIMenu,
    showNewItem,
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
    // promptTextInFocus,
    // setPromptTextInFocus,
    searchTerm,
    setSearchTerm,
    isFiltered,
    setIsFiltered,
    handleResetFiltered,
    // handleResetFiltered,
    // handleSetChatInFocus,
    // handleSelectWidgetContext,
    // handleNewChat,
    // handleNewDefaultPrompt,
    // handleStoreChat,
    // handleSetDefaultPromptInFocus,
    handleSelectMessage,
    handleInputChange,
    handleChangeTokenAmount,
    handleNewChat,
    handleCloseNewItem,
    chatContext,
    setChatContext,
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
  const handleSetChatInFocus = (item) => {
    handleSetItemInFocus(setChatInFocus, item, setLatestItemInFocus);
  };
  const collection = 'chats';

  const widgetProps = {
    iconButton: <Chat />,
    tooltipTitle_newItem: 'Create new Chat',
    collection_context_title: 'Chats',
    dialogTitle: 'Create new Chat',
    data: selectedChats,
    selectedData: selectedChats,
    setSelectedItem: setSelectedChats,
    selector: {
      selector: 'chatsSelector',
      selected: 'selectedChats',
    },
    itemInFocus: chatInFocus,
    tooltipTitle_newItem: 'Create new Chat',
    dialogTitle: 'Create New Chat',

    appContext: appContext,
    collection: collection,
    scheme: scheme,
    uiContext: uiContext,
    dropWidgetName: collection,
    uiGridMapContext: uiGridMapContext,
    setUiGridMapContext: setUiGridMapContext,
    widget: widget,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    onClickNewItem: () => handleOpenNewItem(setShowNewItem, collection),
    openDialogueState: showNewItem,
    onCloseDialogue: () => handleCloseNewItem(setShowNewItem, collection),

    searchTerm: searchTerm,
    setActiveSearchTerm: setActiveSearchTerm,
    singleItemScheme: singleItemScheme,
    orderedBy: '',
    menuProps: {
      states: {
        showMenu: showWidgetUIMenu,
      },
      functions: {
        handleShowMenu: setShowWidgetUIMenu,
      },
    },
    onClick: () => setUiGridMapContext(collection),
    handleSetItemInFocus: handleSetChatInFocus,
    handleSelectWidgetContext: handleSelectWidgetContext,
    // handleClickCustomArrayItem: handleClickCustomArrayItem,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  useEffect(() => {
    return () => {};
  }, [streamedResponse]);

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
      <MultiItems
        widget={widget}
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
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
      messageInputRef={messageInputRef}
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

  const multiItems = <MultiItems widgetProps={widgetProps} styled={styled} />;
  return (
    <>
      <SimpleDialog
        widgetProps={{
          ...widgetProps,
          dialogCustomComponent: multiItems,
        }}
      />
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
        // menu={settingsAndMenu}
        horizontal={settingsAndMenu}
        flexList={chatSelector}
        multiItems={multiItems}
        vertical={chatInFocusWidget}
        selector={modelSelector}
        inputField={promptField}
        // singleItem={chatInFocusWidget}
        soloWidget={messageInFocusWidget}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
