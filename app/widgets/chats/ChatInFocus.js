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
  codeBlockContent,
  messageInFocus,
  setMessageInFocus,
  handleSelectMessage,
  isLoading,
  styled,
}) {
  return (
    <Paper
      className="widget"
      sx={{
        ...styled.widget,
        backgroundColor: 'transparent',
        height: '100%',
        overflow: 'scroll',
      }}
    >
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <ChatMessageList
              chatInFocus={chatInFocus}
              codeBlockContent={codeBlockContent}
              handleSelectMessage={handleSelectMessage}
              handleFormatResponse={handleFormatResponse}
              messageInFocus={messageInFocus}
              setMessageInFocus={setMessageInFocus}
              isLoading={isLoading}
              styled={styled}
            />{' '}
          </MessageList>
        </ChatContainer>
      </MainContainer>
    </Paper>
  );
}
