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
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Message } from '@chatscope/chat-ui-kit-react';

const ChatMessage = ({ data, styled, messageInFocus }) => {
  return (
    <>
      {data ? (
        <Paper
          // className="chat-response widget"
          sx={{ ...styled.widget, width: '100%', height: '100%' }}
          // variant="outlined"
          square={false}
        >
          {data?.parts?.map((part, i) => {
            console.log('streamedResponse', part.type);
            return (
              <Message
                model={{
                  message: part?.content,
                  sentTime: 'just now',
                  sender: data?.role,
                  direction: data?.role === 'model' ? 'incoming' : 'outgoing',
                }}
                key={i}
                // style={{
                //   backgroundColor: data === messageInFocus ? 'green' : '',
                // }}
              >
                <Message.CustomContent>
                  {part.type === 'code' ? (
                    <SyntaxHighlighter
                      language={part.language}
                      // style={{
                      //   ...vs2015,
                      //   width: '100%',
                      //   backgroundColor: 'black',
                      // }}
                      style={vs2015}
                      wrapLongLines={true}
                    >
                      {part.content}
                    </SyntaxHighlighter>
                  ) : (
                    <>
                      <Typography sx={styled.textBody}>
                        {part.content}
                      </Typography>
                    </>
                  )}
                </Message.CustomContent>
              </Message>
            );
          })}
        </Paper>
      ) : (
        `selecet a message of the chat`
      )}
    </>
  );
};
export default ChatMessage;
