import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import './ResponseStyles.css'; // Import the CSS styles
import { handleFormatResponse } from './functions';

const ChatMessage = ({
  data,
  setData,
  streamedResponse,
  setStreamedResponse,
  fullResponse,
  setFullResponse,
  promptInputText,
  setPromppromptInputText,
  loading,
  setLoading,
  messageInFocus,
  setMessageInFocus,
  setError,
  styled,
}) => {
  const [formattedText, setFormattedText] = useState(streamedResponse);
  console.log('streamedResponse', streamedResponse);

  useEffect(() => {
    // Split the response into code blocks and regular text
    if (!streamedResponse?.length) {
      return;
    } else {
      // handleFormatResponse(formattedText, setFormattedText, Typography, Box);
    }

    return () => {};
  }, [streamedResponse]);

  return (
    <>
      {messageInFocus ? (
        <Box
          className="chat-response widget"
          sx={{ width: '100%', height: '100%' }}
        >
          {/* {formattedText} */}

          {messageInFocus?.parts?.map((part, i) => (
            <Paper key={i}>
              <Typography sx={styled?.textBody}>
                {handleFormatResponse(part?.text, Typography, Box, styled)}
              </Typography>
            </Paper>
          ))}
        </Box>
      ) : (
        'please selecet a chat in the chat list'
      )}
    </>
  );
};
export default ChatMessage;
