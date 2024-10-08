import React, { Fragment } from 'react';
import { Message } from '@chatscope/chat-ui-kit-react';
import { Box, Paper, Typography } from '@mui/material';
import ChatMessage from './ChatMessage';

export default function ChatMessageList({
  chatInFocus,
  handleSelectMessage,
  handleFormatResponse,
  messageInFocus,
  setMessageInFocus,
  isLoading,
  styled,
}) {
  return (
    <Box
      sx={{
        // ...styled.widget,
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        overflowY: 'auto',
        // padding: '0.5rem 0.5rem 0 0.5rem',
        // alignItems: 'flex-end',
        padding: '1rem 1rem 0.5rem 0',
        gap: 1,
      }}
    >
      {chatInFocus?.history?.map((message, i) => (
        <Box
          sx={{ marginBottom: '0rem', padding: 0 }}
          key={i}
          onClick={() => setMessageInFocus(message)}
        >
          <ChatMessage
            data={message}
            isLoading={isLoading}
            messageInFocus={messageInFocus}
            styled={styled}
          />
        </Box>
      ))}
    </Box>
  );
}
