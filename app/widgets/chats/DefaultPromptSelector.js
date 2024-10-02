import React, { useRef } from 'react';
import { Box, Button, Chip, IconButton, Typography } from '@mui/material';

export default function DefaultPromptSelector({
  data,
  defaultPromptInFocus,
  setDefaultPromptInFocus,
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
  const handleSelectDefaultPrompt = (defaultPrompt) => {
    setDefaultPromptInFocus(defaultPrompt);
    // console.log('defaultPromptInFocus', chat);
  };
  return (
    <Box sx={styled?.listFlex} ref={responseContainerRef} className="widget">
      {data?.map((prompt, i) => {
        {
          /* console.log(prompt.title); */
        }
        return (
          <Chip
            key={i}
            label={prompt?.title}
            // sx={
            //   defaultPromptInFocus?.chatId === chat.chatId
            //     ? styled?.chip?.multilines?.selected
            //     : styled?.chip?.multilines?.unselected
            // }
            onClick={() => handleSelectDefaultPrompt(prompt)}
          >
            {prompt?.title}
          </Chip>
        );
      })}
      <Box ref={contentEndRef} sx={{ height: '3rem' }}></Box>
    </Box>
  );
}
