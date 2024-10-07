import { useState } from 'react';
import { Close, HourglassBottom, Send, TextSnippet } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { fetchDataFromGeminiProAPI, runChat } from '../functions/apiFunctions';

function SubmitText({
  chatInFocus,
  inputText,
  setInputText,
  data,
  setData,
  streamedResponse,
  setStreamedResponse,
  fullResponse,
  setFullResponse,
  promptTokenConsumed,
  setPromptTokenConsumed,
  error,
  setError,
  isLoading,
  setIsLoading,
  setShowGeminiCard,
  styled,
}) {
  return (
    <>
      <Box sx={{ height: '100%', alignItems: 'space-around' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              size="small"
              type="text"
              sx={{ width: '100%' }}
              label="prompt"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />{' '}
            <IconButton
              sx={styled?.iconButton?.active}
              disabled={isLoading}
              onClick={() =>
                runChat(
                  availablePromptTokensAmount,
                  chatInFocus,
                  inputText,
                  setIsLoading,
                  setStreamedResponse,
                  setPromptTokenConsumed,
                  setError
                )
              }
            >
              {isLoading ? <HourglassBottom /> : <Send />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SubmitText;
