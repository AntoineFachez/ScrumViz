import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
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
import { ContentCopy } from '@mui/icons-material';
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
                : 'https://lh3.googleusercontent.com/a/ACg8ocKRaYWG3WkdMdzKGUHVruNwPGE9LWCL1K5NdaQVs2rNXsPNTLFx=s288-c-no'
            }
            sx={{ margin: '0.5rem', width: 30, height: 30, opacity: 0.8 }}
          />
          <Box
            sx={{
              // backgroundColor: data === messageInFocus ? 'green' : '',
              // padding: '1rem',
              // display: 'flex',
              width: '100%',
              flexFlow: 'column',
              borderRadius: '5px',
              textAlign: 'start',
              // '&  >*': {
              //   width: '100%',
              // },
            }}
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
                  }}
                >
                  <Message.CustomContent>
                    <CodeBlock
                      key={i}
                      part={part}
                      handleCopyToClipBoard={handleCopyToClipBoard}
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
function CodeBlock({ part, styled, handleCopyToClipBoard }) {
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
              onClick={() => handleCopyToClipBoard(code)}
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
    <Typography sx={{ ...styled.textBody, width: '100%', paddingLeft: '1rem' }}>
      {part.text}
    </Typography>
  );
}
