import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  docco,
  vs2015,
  a11yDark,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Message } from '@chatscope/chat-ui-kit-react';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ContentCopy } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { notify } from '@/utils/utils';

const ChatMessage = ({ data, styled, messageInFocus }) => {
  const handleCopyToClipBoard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        notify('Copied to clipboard!', 'success');
      })
      .catch((err) => {
        notify('Copy not successfull!', 'error');
      });
  };

  return (
    <>
      {data ? (
        <Box
          // className="chat-response widget"
          sx={{ backgroundColor: data === messageInFocus ? 'green' : '' }}
          // variant="outlined"
          square={false}
        >
          {' '}
          {data?.parts?.map((part, i) => {
            return (
              <Message
                key={i}
                model={{
                  message: part?.content,
                  sentTime: 'just now',
                  sender: data?.role,
                  direction: data?.role === 'model' ? 'incoming' : 'outgoing',
                }}
                style={
                  {
                    // marginTop: 0,
                    // marginBottom: 0,
                    // padding: 0,
                  }
                }
              >
                <Message.CustomContent
                // style={{
                //   width: '100%',
                //   marginTop: 0,
                //   marginBottom: 0,
                //   padding: 0,
                //   padding: '0.5rem',
                // }}
                >
                  {part.type === 'code' ? (
                    <>
                      <SyntaxHighlighter
                        language={part.language}
                        style={{
                          ...a11yDark,

                          // backgroundColor: 'black',
                          '& pre': {
                            // Target the 'code' element within the 'pre'
                            backgroundColor: '#f8f8f8',
                          },
                          '& code': {
                            // Target the 'code' element within the 'pre'
                            backgroundColor: '#f8f8f8',
                          },
                        }}
                        wrapLongLines={true}
                      >
                        {part.content}
                      </SyntaxHighlighter>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Tooltip title="copy code">
                          <IconButton
                            onClick={() => handleCopyToClipBoard(part.content)}
                            sx={{ color: 'white' }}
                          >
                            <ContentCopy />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography sx={{ ...styled.textBody, width: '100%' }}>
                        {part.content}
                      </Typography>
                    </>
                  )}
                </Message.CustomContent>
              </Message>
            );
          })}
        </Box>
      ) : (
        `selecet a message of the chat`
      )}
    </>
  );
};
export default ChatMessage;
