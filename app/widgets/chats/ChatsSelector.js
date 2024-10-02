import React, { useRef } from 'react';
import { Box, Button, Chip, IconButton, Typography } from '@mui/material';

export default function ChatsSelector({
  data,
  chatInFocus,
  setChatInFocus,
  styled,
}) {
  const responseContainerRef = useRef(null);
  const contentEndRef = useRef(null);
  if (responseContainerRef.current) {
    contentEndRef.current.scrollIntoView({
      behavior: 'smooth', // Enable smooth scrolling
      block: 'end', // Scroll to the end (bottom)
      inline: 'nearest', // Align the element horizontally (optional)
    });
  }
  const handleSelectChat = (chat) => {
    setChatInFocus(chat);
    // console.log('chatInFocus', chat);
  };
  return (
    <Box sx={styled?.listFlex} ref={responseContainerRef} className="widget">
      {data?.map((chat, i) => {
        console.log(chat.title);
        return (
          <Chip
            key={i}
            label={chat?.title}
            sx={
              chatInFocus?.chatId === chat.chatId
                ? styled?.chip?.multilines?.selected
                : styled?.chip?.multilines?.unselected
            }
            onClick={() => handleSelectChat(chat)}
          >
            {chat?.title}
          </Chip>
        );
      })}
      <Box ref={contentEndRef} sx={{ height: '3rem' }}></Box>
    </Box>
  );
}
