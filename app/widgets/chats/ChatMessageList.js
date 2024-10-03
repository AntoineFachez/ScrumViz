import React from 'react';
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
    <Paper
      sx={{
        ...styled.widget,
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: 1,
      }}
    >
      {chatInFocus?.history?.map((message, i) => (
        <Box key={i} onClick={() => setMessageInFocus(message)}>
          <ChatMessage
            data={message}
            messageInFocus={messageInFocus}
            styled={styled}
          />
        </Box>
      ))}
    </Paper>
  );
}
