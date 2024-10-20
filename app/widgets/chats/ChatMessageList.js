import React, { Fragment, useEffect } from 'react';
import { Message } from '@chatscope/chat-ui-kit-react';
import { Box, Paper, Skeleton, Typography } from '@mui/material';
import ChatMessage from './ChatMessage';
import useScrollToItem from '@/hooks/useScrollToItem';

export default function ChatMessageList({
  chatInFocus,
  codeBlockContent,
  handleSelectMessage,
  handleFormatResponse,
  messageInFocus,
  setMessageInFocus,
  isLoading,
  styled,
}) {
  const { flexListRef, scrollToItem } = useScrollToItem();
  const latestMessage = chatInFocus.history[chatInFocus.history.length - 1];
  useEffect(() => {
    return () => {};
  }, [chatInFocus]);

  useEffect(() => {
    if (flexListRef.current && chatInFocus.history.length > 0) {
      // Scroll to the last message container (Box) in the list
      const lastMessageContainer = flexListRef.current.lastChild;
      if (lastMessageContainer) {
        lastMessageContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'end', // Scroll to the end of the container
          inline: 'nearest',
        });
      }
    }
  }, [chatInFocus.history, flexListRef]);

  return (
    <Box
      ref={flexListRef}
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
          {isLoading &&
          message?.role === 'model' &&
          i === chatInFocus?.history?.length - 1 ? ( // Conditionally render Skeleton for the last message
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : (
            <ChatMessage
              message={message}
              codeBlockContent={codeBlockContent}
              chatInFocus={chatInFocus}
              isLoading={isLoading}
              messageInFocus={messageInFocus}
              styled={styled}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
