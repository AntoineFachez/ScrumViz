import { useContext } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';

import { vertexAI, model } from '@/firebase/firebase';
// import CodeBlock from '../../components/codeBlock/Index';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY;
export const runChat = async (
  availablePromptTokensAmount,
  chatInFocus,
  inputText,
  setLoading,
  setStreamedResponse,
  setPromptTokenConsumed,
  setError
) => {
  try {
    console.log(availablePromptTokensAmount);

    if (!inputText) {
      alert('Please enter text!');
      return;
    }
    setLoading(true);
    chatInFocus?.history?.push(
      {
        role: 'user',
        parts: [{ text: inputText }],
      }
      //   //   {
      //   //     role: 'model',
      //   //     parts: [{ type: 'text', content: response }],
      //   //   }
    );
    const chat = model.startChat({
      history: chatInFocus?.history,
      generationConfig: {
        max_output_tokens: availablePromptTokensAmount,
      },
    });

    const { totalTokens, totalBillableCharacters } = await model.countTokens(
      inputText
    );
    setPromptTokenConsumed({
      totalTokens: totalTokens,
      totalBillableCharacters: totalBillableCharacters,
    });
    // console.log(
    //   `Total tokens: ${totalTokens}, total billable characters: ${totalBillableCharacters}`
    // );

    let response = '';
    const result = await chat.sendMessageStream(inputText);
    for await (const chunk of result.stream) {
      const chunkText = chunk.candidates[0].content.parts[0].text;
      response += chunkText;

      // setStreamedResponse(response);
    }

    setLoading(false);

    chatInFocus?.history?.push(
      // {
      //   role: 'user',
      //   parts: [{ text: inputText }],
      // },
      {
        role: 'model',
        parts: [{ text: response }],
      }
    );
    console.log('chatInFocus', chatInFocus.history);

    // setStreamedResponse();
    // getTextGemini(prompt, 0.5);
  } catch (error) {
    setLoading(false);
    // setError(error);
    console.error('runChat error: ', error);
  }
  setLoading(false);
};
export const handleFormatResponse = (
  textToBeFormatted,
  // setFormattedText,
  Typography,
  Box,
  styled
) => {
  const enclosedPatternRegex = /```(.*?)```/gs;
  // const parts = streamedResponse?.join("")?.split(enclosedPatternRegex);
  const parts = textToBeFormatted?.split(enclosedPatternRegex);
  // console.log('textToBeFormattedCode', parts);
  const formattedParts = parts?.map((part, index) => {
    if (index % 2 === 0) {
      // console.log("textToBeFormatted", textToBeFormatted?.split(parts));
      const paragraphs = part?.split('\n\n');
      // console.log("streamedResponse", paragraphs);
      const formattedParagraphs = paragraphs?.map((paragraph, index) => {
        // if (index % 2 === 0) {
        // Split each paragraph into lines
        const lines = paragraph.split('\n');
        const formattedLines = lines.map((line, lineIndex) => {
          if (line?.startsWith('##')) {
            // Handle lines starting with double asterisks as headings
            return (
              <Typography key={lineIndex} variant="h3">
                {line?.replace(/##/g, '')}
              </Typography>
            );
          } else if (line?.startsWith('* ')) {
            if (line?.startsWith('**')) {
              // Handle lines starting with asterisks as list items
              return (
                <Box sx={{ padding: '0rem 0 0 2rem' }} key={lineIndex}>
                  <Typography variant="h5">
                    {line?.substring(2)?.replace(/\*\*/g, ``)}
                    {lineIndex}
                  </Typography>
                </Box>
              );
            } else {
              return (
                <Typography key={lineIndex} variant="h6">
                  <Box
                    sx={{
                      padding: '0rem 0 0 2rem',
                    }}
                  >
                    {line?.substring(2)?.replace(/\*\*/g, ``)}
                  </Box>
                </Typography>
              ); // Remove the "* "
            }
          } else if (line?.startsWith('**')) {
            // Handle lines starting with double asterisks as headings
            return (
              <Box sx={{ padding: '0rem 0 0 1rem' }} key={lineIndex}>
                <Typography variant="body1">
                  {line?.replace(/\*\*/g, '')}
                </Typography>
              </Box>
            ); // Remove the "**"
          } else {
            // Other lines are regular text
            return (
              <Box sx={{ padding: '0rem 0rem 0.5rem 0.5rem' }} key={lineIndex}>
                <Typography
                  variant="body1"
                  sx={
                    line.length > 300
                      ? { ...styled?.truncate, fontSize: '0.4rem' }
                      : { ...styled?.textBody, fontSize: '0.8rem' }
                  }
                >
                  {line}
                </Typography>
              </Box>
            );
          }
        });
        // Wrap list items in a <ul> if needed
        if (formattedLines.some((line) => line?.type === 'li')) {
          return (
            <ul key={index}>
              <Typography
                sx={{ ...styled?.textBody, fontSize: '0.8rem' }}
                key={formattedLines}
                variant="body1"
              >
                {formattedLines}
              </Typography>
            </ul>
          );
        } else {
          return formattedLines;
          // Otherwise, just return the formatted lines
        }
      });
      return formattedParagraphs;
    } else {
      const language = part.split('\n')[0];
      const code = part.replace(`json `, '');
      // console.log("textToBeFormattedCode", code);
      // const code = JSON.stringify(part.split("json ")[1]);
      // return (
      //   <CodeBlock
      //     key={lineIndex}
      //     content={code}
      //     language="json"
      //     styled={styled}
      //   />
      // );
      // if (language === "json") {
      //   // Handle JSON code blocks
      //   return <CodeBlock content={code} language="json" />;
      // }
    }
    // return null;
  });
  return formattedParts;
  // setFormattedText(formattedParts);
};
export const fetchDataFromGeminiProAPI = async (
  chatInFocus,
  inputText,
  setLoading,
  data,
  setData,
  streamedResponse,
  setStreamedResponse,
  setFullResponse,
  setPromptTokenConsumed,
  setError
) => {
  try {
    if (!inputText) {
      alert('Please enter text!');
      return;
    }
    setLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
    const { totalTokens, totalBillableCharacters } = await model.countTokens(
      inputText
    );
    setPromptTokenConsumed({
      totalTokens: totalTokens,
      totalBillableCharacters: totalBillableCharacters,
    });
    let response = '';
    const result = await model.generateContentStream(inputText);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      response += chunkText;
      setData((prevText) => prevText + chunkText);
      streamedResponse?.push(chunkText);
    }
    setLoading(false);
    setFullResponse(result);

    chatInFocus?.history?.push(
      {
        role: 'user',
        parts: [
          {
            text: inputText,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: response,
          },
        ],
      }
    );
    setStreamedResponse();
    // getTextGemini(prompt, 0.5);
  } catch (error) {
    setLoading(false);
    setError(error);
    console.error('fetchData from GeminiText API error: ', error);
  }
};
export const fetchDataFromGeminiProVisionAPI = async (
  inputText,
  setLoading,
  setData,
  setError
) => {
  try {
    // TEXT AND FILE
    if (!inputText) {
      alert('Please load an image!');
      return;
    }
    setLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const fileInputEl = document.querySelector('input[type=file]');
    const imageParts = await Promise.all(
      [...fileInputEl.files].map(fileToGenerativePart)
    );
    const result = await model.generateContent([inputText, ...imageParts]);
    const text = result.response.text();

    setLoading(false);
    setData(text);
  } catch (error) {
    setLoading(false);
    setError(error);
    console.error('fetchData from GeminiPro Vision API error: ', error);
  }
};
export const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};
export const splitWithIndex = (str, setCode) => {
  const regex = /```([\s\S]*?)```/;
  let segments = str.split(regex);
  let result = [];

  for (let i = 0; i < segments.length; i++) {
    const matches = str?.match(regex);

    if (matches) {
      const tempCode = matches[1];
      setCode(tempCode);

      result.push({
        index: i,
        type: matches[1] === segments[i] && 'code',
        segment: segments[i],
      });
    } else {
      result.push({ index: i, type: 'comment', segment: segments[i] });
    }
  }

  return result;
};
export const printLetterByLetter = (destination, message, speed) => {
  var i = 0;

  if (i > message.length) {
    var interval = setInterval(function () {
      document.getElementById(destination).innerHTML += message.charAt(i);
      i++;
      clearInterval(interval);
    }, speed);
  }
};
