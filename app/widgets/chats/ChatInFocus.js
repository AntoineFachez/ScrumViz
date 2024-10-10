import React from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
} from '@chatscope/chat-ui-kit-react';
import { Paper } from '@mui/material';

import ChatMessageList from './ChatMessageList';
import { handleFormatResponse } from '@/utils/formatters';

export default function ChatInFocus({
  chatInFocus,
  messageInFocus,
  setMessageInFocus,
  handleSelectMessage,
  isLoading,
  styled,
}) {
  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative !important',
        overflow: 'scroll',
      }}
      className="widget"
    >
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <ChatMessageList
              chatInFocus={chatInFocus}
              handleSelectMessage={handleSelectMessage}
              handleFormatResponse={handleFormatResponse}
              messageInFocus={messageInFocus}
              setMessageInFocus={setMessageInFocus}
              isLoading={isLoading}
              styled={styled}
            />
          </MessageList>
        </ChatContainer>
      </MainContainer>
    </Paper>
  );
}
