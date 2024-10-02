import React, { useEffect, useRef, useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  InputToolbox,
  AttachmentButton,
  SendButton,
} from '@chatscope/chat-ui-kit-react';
import { Box, IconButton, Typography } from '@mui/material';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Backup, Cloud, Save, Send, Store, Upload } from '@mui/icons-material';
import {
  fetchDataFromGeminiProVisionAPI,
  handleFormatResponse,
  runChat,
} from './functions';
import ChatMessageList from './ChatMessageList';

// import geminiIcon from "../../assets/icons/GeminiIcon.png";
// import CodeBlock from '../../components/codeBlock/Index';
export default function ChatInFocus({
  maxOutputTokens,
  chatInFocus,
  data,
  setData,
  streamedResponse,
  setStreamedResponse,
  fullResponse,
  setFullResponse,
  promptInputText,
  setPromptInputText,
  loading,
  setLoading,
  promptTokenConsumed,
  setPromptTokenConsumed,
  messageInFocus,
  setMessageInFocus,
  handleStoreChat,
  setError,
  styled,
}) {
  const messageInputRef = useRef();
  const [formattedText, setFormattedText] = useState(streamedResponse);

  useEffect(() => {
    // handleFormatResponse(formattedText, setFormattedText, Typography, Box);
    return () => {};
  }, [streamedResponse]);
  const handleSelectMessage = (message) => {
    setMessageInFocus(message);
  };
  const handleInputChange = (textContent) => {
    // Use the textContent here to update your component's state or perform other actions
    setPromptInputText(textContent);

    // Example: Update a state variable with the text content
    // setTextMessage(textContent);
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative !important',
        overflow: 'scroll',
        // "& >*": { padding: 0, margin: 0, fontSize: "0.4rem" },
        '& .scrollbar-container': {
          // backgroundColor: "hotpink",
          height: '100%', // padding: "1rem",
          overflow: 'scroll',
        },
        '& .cs-message-list__scroll-wrapper': {
          // backgroundColor: "hotpink",
          height: '100%', // padding: "1rem",
          overflow: 'scroll',
        },
        '& .cs-message__content': {
          // fontSize: "0.4rem",
          // backgroundColor: "hotpink",
          // height: "100%",
          padding: '0rem',
          // border: "none",
          // overflow: "scroll",
        },
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
              styled={styled}
            />
          </MessageList>

          <MessageInput
            ref={messageInputRef}
            placeholder="Type message here..."
            onChange={handleInputChange}
            value={promptInputText}
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
          />
        </ChatContainer>
      </MainContainer>
    </Box>
  );
}
