import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
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
import { ContentCopy } from '@mui/icons-material';
import { handleCopyToClipBoard, notify } from '@/utils/utils';
import AuthContext from '../auth/AuthContext';
import AppContext from '@/context/AppContext';
import { useSession } from 'next-auth/react';

const ChatMessage = ({ isLoading, data, messageInFocus, styled }) => {
  const { setAlert } = useContext(AppContext);
  const { currentSession } = useContext(AuthContext);
  const { user } = currentSession;
  const { email, image } = user;

  const handleClickCopyToClipBoard = (code) => {
    handleCopyToClipBoard(code);
    setAlert({ state: 'success', note: 'copied to clipboard' });
  };
  return (
    <>
      {data ? (
        <Box
          className="chat-response widget"
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row',
          }}
          // variant="outlined"
          // square={false}
        >
          {' '}
          <Avatar
            src={
              data?.role === 'model'
                ? 'https://play-lh.googleusercontent.com/Pkwn0AbykyjSuCdSYCbq0dvOqHP-YXcbBLTZ8AOUZhvnRuhUnZ2aJrw_YCf6kVMcZ4PM=w240-h480'
                : image
            }
            sx={{ margin: '0.5rem', width: 30, height: 30, opacity: 0.8 }}
          />
          <Box
            sx={{
              // backgroundColor: data === messageInFocus ? 'green' : '',
              // padding: '1rem',
              // display: 'flex',
              width: '100%',
              height: '100%',
              flexFlow: 'column',
              borderRadius: '5px',
              textAlign: 'start',

              // backgroundColor: '#111',
              // '&  >*': {
              //   width: '100%',
              // },
            }}
            elevation={10}
            // variant="elevation"
          >
            {data?.parts?.map((part, i) => {
              return (
                <Message
                  key={i}
                  model={{
                    message: part?.content,
                    sentTime: 'just now',
                    sender: data?.role,
                    // direction: data?.role === 'model' ? 'incoming' : 'outgoing',
                  }}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    // height: '100%',
                  }}
                >
                  <Message.CustomContent>
                    <CodeBlock
                      key={i}
                      part={part}
                      handleClickCopyToClipBoard={handleClickCopyToClipBoard}
                      styled={styled}
                    />
                  </Message.CustomContent>
                </Message>
              );
            })}
          </Box>
        </Box>
      ) : (
        `selecet a message of the chat`
      )}
    </>
  );
};
export default ChatMessage;
function CodeBlock({ part, styled, handleClickCopyToClipBoard }) {
  const codeFenceRegex = /```(\w+)\n([\s\S]*?)```/;
  const match = part?.text.match(codeFenceRegex);

  if (match) {
    const language = match[1];
    const code = match[2];
    return (
      <Box
        sx={{ position: 'relative', paddingLeft: '1rem', borderRadius: '5px' }}
      >
        <SyntaxHighlighter
          language={language}
          style={{
            ...a11yDark,
            '& pre, & code': {
              // height: '100%',
              fontSize: '1rem',
              backgroundColor: '#f8f8f8',
            },
          }}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
        <Box
          sx={{
            position: 'sticky',
            // top: 0,
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            borderRadius: '5px',
            backgroundColor: 'rgb(43, 43, 43)',
          }}
        >
          <Tooltip title="copy code">
            <IconButton
              onClick={() => handleClickCopyToClipBoard(code)}
              sx={styled.iconButton.action}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );
  }

  return (
    <Typography
      sx={{
        ...styled.textBody,
        width: '100%',
        height: '100%',
        paddingLeft: '1rem',
      }}
    >
      {part.text}
    </Typography>
  );
}
