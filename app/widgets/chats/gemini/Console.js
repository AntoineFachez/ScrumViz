import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { TextSnippet, Image, Close } from '@mui/icons-material';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { app } from '../../../firebase/firebase';
import InFocusContext from '../../../context/InFocusContext';
import PromptContext from '../../../context/ChatContext';
import SubmitText from './SubmitText';
import SubmitImage from './SubmitImage';
import Message from '../ChatMessage';
import Header from '../../../components/header/Index';
import AIModelSelector from './AIModelSelector';
import Chats from '../ChatsSelector';
import chatsData from '../../../assets/data/mockData/chats.json';
import ChatInFocus from './ChatInFocus';
import { runChat, fetchDataFromGeminiProAPI } from '../functions';
import FirebaseContext from '../../../context/FirebaseContext';
import ChatsContext from '../ChatsContext';

export default function Console({ inputField, setInputField, styled }) {
  const { chatInFocus, setChatInFocus } = useContext(ChatsContext);
  const {
    promptContext,
    streamedResponse,
    setStreamedResponse,
    fullResponse,
    setFullResponse,
  } = useContext(PromptContext);
  const [showGeminiCard, setShowGeminiCard] = useState('text');
  const [promptTokenConsumed, setPromptTokenConsumed] = useState({});
  const [data, setData] = useState([undefined]);
  const [error, setError] = useState(null);
  const [promptInputText, setPromppromptInputText] = useState(
    'send me a receipt to cook pasta carbonara'
  );
  const [loading, setLoading] = useState(false);
  const sideMenuWidth = '12rem';
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: "space-between",
        }}
        className="widget"
      >
        {/* <Header content={header} styled={styled} /> */}
        <AIModelSelector
          setShowGeminiCard={setShowGeminiCard}
          showGeminiCard={showGeminiCard}
          direction="row"
        />{' '}
        {promptTokenConsumed?.totalTokens}
        {promptTokenConsumed?.totalBillableCharacters}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: sideMenuWidth,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',

              flexGrow: 0,
              // flexShrink: 2,
              overflow: 'auto',
              justifyContent: 'space-between',
            }}
          >
            <>
              <Chats
                data={chatsData}
                chatInFocus={chatInFocus}
                setChatInFocus={setChatInFocus}
                styled={styled}
              />
            </>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',

              // justifyContent: "space-between",
              // padding: "0.5rem 0.5rem 0 0.5rem",
            }}
          >
            {showGeminiCard === 'text' ? (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  // padding: "0 0 4rem 0",
                  // overflow: "auto",
                  // alignItems: "stretch",
                  padding: '0.5rem 0.5rem 1.5rem 0.5rem',
                }}
              >
                {error ? (
                  <Box>Response: {JSON.stringify(error?.message)}</Box>
                ) : (
                  <>
                    {' '}
                    <Box
                      sx={{
                        width: '100%',

                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'auto',
                        // alignItems: "stretch",

                        padding: '1rem 1rem 1rem 0rem',
                      }}
                    >
                      {' '}
                      <ChatInFocus
                        chatInFocus={chatInFocus}
                        data={data}
                        setData={setData}
                        streamedResponse={streamedResponse}
                        setStreamedResponse={setStreamedResponse}
                        fullResponse={fullResponse}
                        setFullResponse={setFullResponse}
                        promptInputText={promptInputText}
                        setPromppromptInputText={setPromppromptInputText}
                        loading={loading}
                        setLoading={setLoading}
                        styled={styled}
                      />
                      <Box
                        sx={{
                          // position: "absolute",
                          // bottom: 0,
                          width: '100%',
                          // maxWidth: "70ch",
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          // overflow: "auto",
                          // justifyContent: "center",
                          // padding: `0rem 0rem 0 ${sideMenuWidth} `,
                          // backgroundColor: styled?.darkGrey?.backgroundColor,
                          backgroundColor: '#111',
                        }}
                      ></Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          // maxWidth: "70ch",
                          // height: "3rem",
                          display: 'flex',
                          flexDirection: 'row',
                          // overflow: "auto",
                          // justifyContent: "center",
                          // padding: `0rem 0rem 0 ${sideMenuWidth} `,
                          // backgroundColor: styled?.darkGrey?.backgroundColor,
                          backgroundColor: '#111',
                        }}
                      >
                        {' '}
                        <Button
                          sx={{
                            color: '#fff',
                          }}
                          onClick={() =>
                            fetchDataFromGeminiProAPI(
                              chatInFocus,
                              promptInputText,
                              setLoading,
                              data,
                              setData,
                              streamedResponse,
                              setStreamedResponse,
                              fullResponse,
                              setFullResponse,
                              promptTokenConsumed,
                              setPromptTokenConsumed,
                              setError
                            )
                          }
                        >
                          single turn promt
                        </Button>
                        <SubmitText
                          chatInFocus={chatInFocus}
                          promptInputText={promptInputText}
                          setPromppromptInputText={setPromppromptInputText}
                          data={data}
                          setData={setData}
                          streamedResponse={streamedResponse}
                          setStreamedResponse={setStreamedResponse}
                          fullResponse={fullResponse}
                          setFullResponse={setFullResponse}
                          promptTokenConsumed={promptTokenConsumed}
                          setPromptTokenConsumed={setPromptTokenConsumed}
                          error={error}
                          setError={setError}
                          loading={loading}
                          setLoading={setLoading}
                          setShowGeminiCard={setShowGeminiCard}
                          styled={styled}
                        />
                      </Box>
                    </Box>
                  </>
                )}{' '}
              </Box>
            ) : (
              <>
                <SubmitImage
                  setShowGeminiCard={setShowGeminiCard}
                  styled={styled}
                />
              </>
            )}
          </Box>{' '}
        </Box>{' '}
      </Box>
    </>
  );
}
