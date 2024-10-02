import { GoogleGenerativeAI } from '@google/generative-ai';
import { Close, HourglassBottom, Image, Send } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { fetchDataFromGeminiProVisionAPI } from '../functions';

function SubmitImage({ setShowGeminiCard, styled }) {
  const [error, setError] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY;
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box sx={{ height: '100%', alignItems: 'space-around' }}>
        {/* {showCard ? ( */}
        <Typography variant="h6">Drop an image:</Typography>
        <Box>
          {/* <IconButton onClick={() => setShowGeminiCard(null)}>
            <Close sx={{ width: "2rem", height: "2rem", fontSize: "1rem" }} />
          </IconButton>{" "} */}
          <Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TextField
                type="file"
                id="fileInput"
                size="small"
                // sx={{ width: 0, heighth: 0, opacity: 0 }}
              />
              <TextField
                size="small"
                type="text"
                sx={{ width: '100%' }}
                label="prompt"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />{' '}
              <IconButton
                sx={styled?.menuButtonText?.active}
                disabled={loading}
                onClick={() =>
                  fetchDataFromGeminiProVisionAPI(
                    inputText,
                    setLoading,
                    setData,
                    setError
                  )
                }
              >
                {loading ? <HourglassBottom /> : <Send />}
              </IconButton>
            </Box>
          </Box>
        </Box>
        <hr />
        <Box>Response: {data}</Box>
        {/* <Box>Response: {error}</Box>) : (
        <IconButton onClick={() => setShowCard((prev) => !prev)}>
          <Image sx={{ width: "8rem", height: "8rem", fontSize: "8rem" }} />
        </IconButton>
        )} */}
      </Box>
    </>
  );
}

export default SubmitImage;
