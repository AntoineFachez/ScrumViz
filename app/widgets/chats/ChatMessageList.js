import React from 'react';
import { Message } from '@chatscope/chat-ui-kit-react';
import { Box, Typography } from '@mui/material';

export default function ChatMessageList({
  chatInFocus,
  handleSelectMessage,
  handleFormatResponse,
  styled,
}) {
  console.log(chatInFocus);

  return (
    <Box sx={{}}>
      {chatInFocus?.history?.map((utterance, i) => (
        <>
          {utterance?.parts?.map((part) => (
            <>
              <Box
                sx={{
                  width: '100%',
                  height: 'fit-content',
                  display: 'flex',
                  flexDirection: 'row',
                  // padding: "0rem 0rem 2rem 0rem",
                }}
                onClick={() => handleSelectMessage(utterance)}
              >
                <Message
                  model={{
                    message: part?.text,
                    sentTime: 'just now',
                    sender: utterance?.role,
                    direction:
                      utterance?.role === 'model' ? 'incoming' : 'outgoing',
                  }}
                >
                  {/* <Avatar
                            name={utterance?.role}
                            src={utterance?.role === "model" ? geminiIcon : ""}
                            sx={{ width: 24, height: 24 }}
                          /> */}
                  <Message.CustomContent>
                    <Box
                      sx={{
                        padding: 0,
                        margin: 0,
                        '& >*': {
                          padding: 0,
                          margin: 0,
                          fontSize: '0.4rem',
                        },
                      }}
                    >
                      {handleFormatResponse(
                        part?.text,
                        Typography,
                        Box,
                        styled
                      )}
                    </Box>{' '}
                  </Message.CustomContent>{' '}
                </Message>
              </Box>
            </>
          ))}
        </>
      ))}
    </Box>
  );
}
