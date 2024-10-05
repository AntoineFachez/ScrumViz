import React, { useEffect, useRef, useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { Box, IconButton, Paper, Typography } from '@mui/material';

import { handleFormatResponse, runChat } from './functions';
import ChatMessageList from './ChatMessageList';

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

// import './ChatInFocus.scss';
export default function ChatInFocus({
  messageInputRef,
  maxOutputTokens,
  chatInFocus,
  data,
  setData,
  streamedResponse,
  setStreamedResponse,
  fullResponse,
  setFullResponse,
  promptTextInFocus,
  setPromptTextInFocus,
  loading,
  setLoading,
  promptTokenConsumed,
  setPromptTokenConsumed,
  messageInFocus,
  setMessageInFocus,
  handleStoreChat,
  handleSelectMessage,
  handleInputChange,
  setError,
  styled,
}) {
  useEffect(() => {
    console.log(promptTextInFocus);

    return () => {};
  }, [promptTextInFocus]);

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative !important',
        overflow: 'scroll',
        // "& >*": { padding: 0, margin: 0, fontSize: "0.4rem" },
        '& .cs-chat-container .cs-message-input': {
          backgroundColor: 'transparent',
          border: 'none',
          margin: 0,
          padding: 0,
        },
        '& .cs-message-input >*': {
          backgroundColor: 'transparent',
          // backgroundColor: 'white',
          borderRadius: '0px',
        },
        '& .cs-message-input__content-editor-wrapper': {
          margin: 0,
          padding: 0,
        },
        '& .cs-message-input__content-editor-container': {
          borderRadius: '5px',
          padding: '0.5rem 1rem 1rem 1rem',
          backgroundColor: 'transparent',
          backgroundColor: 'white',
          maxHeight: '100%',
        },
        '& .cs-message-input__content-editor': {
          // borderRadius: '5px',
          textAlign: 'start',
          backgroundColor: 'transparent',
        },
        // '& .cs-chat-container': {
        //   backgroundColor: 'green',
        // },
        // '& .scrollbar-container': {
        //   // backgroundColor: "hotpink",
        //   height: '100%', // padding: "1rem",
        //   overflow: 'scroll',
        // },
        // '& .cs-message-list__scroll-wrapper': {
        //   // backgroundColor: "hotpink",
        //   height: '100%', // padding: "1rem",
        //   overflow: 'scroll',
        // },
        // '& .cs-message__content': {
        //   // fontSize: "0.4rem",
        //   // backgroundColor: "hotpink",
        //   // height: "100%",
        //   padding: '0rem',
        //   // border: "none",
        //   // overflow: "scroll",
        // },
        // '& .cs-button--attachment': {
        //   color: styled.iconButton.action,
        //   width: '100%',
        //   height: '100%',
        // },
        // '& .cs-button--send': {
        //   color: styled.iconButton.action,
        //   width: '100%',
        //   height: '100%',
        // },
      }}
      className="widget"
    >
      {' '}
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <ChatMessageList
              chatInFocus={chatInFocus}
              handleSelectMessage={handleSelectMessage}
              handleFormatResponse={handleFormatResponse}
              messageInFocus={messageInFocus}
              setMessageInFocus={setMessageInFocus}
              styled={styled}
            />
          </MessageList>
          {/* 
          <MessageInput
            ref={messageInputRef}
            placeholder="Type message here..."
            onChange={handleInputChange}
            value={promptTextInFocus.prompt_text}
            sendDisabled={loading}
            onSend={(textContent) =>
              runChat(
                maxOutputTokens,
                chatInFocus,
                textContent,
                setLoading,
                data,
                setData,
                streamedResponse,
                setStreamedResponse,
                fullResponse,
                setFullResponse,
                promptTokenConsumed,
                setPromptTokenConsumed,
                setError
              )
            }
          /> */}
        </ChatContainer>
      </MainContainer>
    </Paper>
  );
}
