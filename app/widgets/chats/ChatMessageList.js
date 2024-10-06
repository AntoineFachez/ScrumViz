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
  styled,
}) {
  return (
    <Box
      sx={{
        // ...styled.widget,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        // padding: '0.5rem 0.5rem 0 0.5rem',
        // alignItems: 'flex-end',
        flexFlow: 'column nowrap',
        // gap: 1,
      }}
    >
      {chatInFocus?.history?.map((message, i) => (
        <Box
          // sx={{ margin: 0, padding: 0 }}
          key={i}
          onClick={() => setMessageInFocus(message)}
        >
          <ChatMessage
            data={message}
            messageInFocus={messageInFocus}
            styled={styled}
          />
        </Box>
      ))}
    </Box>
  );
}
