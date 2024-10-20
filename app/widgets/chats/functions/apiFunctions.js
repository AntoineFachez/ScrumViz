import { GoogleGenerativeAI } from '@google/generative-ai';

import { vertexAI, model } from '@/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { notify } from '@/utils/utils';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY;

export const runChat = async (
  availablePromptTokensAmount,
  chatInFocus,
  setChatInFocus,
  codeBlockContent,
  setCodeBlockContent,
  inputText,
  setIsLoading,
  setStreamedResponse,
  setPromptTokenConsumed,
  setError
) => {
  try {
    if (!inputText) {
      alert('Please enter text!');
      return;
    }

    setIsLoading(true);

    chatInFocus.history.push({ role: 'user', parts: [{ text: inputText }] });

    const chat = model.startChat({
      history: chatInFocus.history,
      generationConfig: { max_output_tokens: availablePromptTokensAmount },
    });

    const { totalTokens, totalBillableCharacters } = await model.countTokens(
      inputText
    );
    setPromptTokenConsumed({ totalTokens, totalBillableCharacters });

    let response = '';
    const result = await chat.sendMessageStream(inputText);

    chatInFocus?.history?.push({
      role: 'model',
      parts: [{ text: response }],
    });
    for await (const chunk of result.stream) {
      try {
        if (chunk.candidates?.[0]?.content) {
          setIsLoading(false);
          const chunkText = chunk.candidates[0].content.parts[0].text;

          if (chunkText.includes('```')) {
            // Start or end of code block
            if (codeBlockContent) {
              // Closing "```" encountered
              setCodeBlockContent(''); // Reset for next code block
            } else {
              // Opening "```" encountered
              setCodeBlockContent(chunkText);
            }
          } else if (codeBlockContent) {
            // Accumulate code block content
            setCodeBlockContent((prevContent) => prevContent + chunkText);
          }
          response += chunk.candidates[0].content.parts[0].text;

          setChatInFocus((prevChat) => ({
            ...prevChat,
            history: [
              ...prevChat.history.slice(0, -1),
              { role: 'model', parts: [{ text: response }] },
            ],
          }));
        } else {
          setIsLoading(false);
          // Check for safety ratings and blocked status
          const safetyRatings = chunk.candidates?.[0]?.safetyRatings;
          if (safetyRatings) {
            const blockedRating = safetyRatings.find(
              (rating) => rating.blocked
            );
            if (blockedRating) {
              console.warn('Response blocked due to safety:', blockedRating);
              notify({
                state: 'error',
                note: 'Response blocked due to safety concerns.',
              });
            } else {
              console.warn('Unexpected response format:', chunk);
            }
          } else {
            console.warn('Unexpected response format:', chunk);
          }
        }
      } catch (error) {
        console.error('Error processing chunk:', error);
      }
    }

    // getTextGemini(prompt, 0.5);
  } catch (error) {
    setIsLoading(false);
    // setError(error);
    console.error('runChat error: ', error);
  }
};
export const fetchDataFromGeminiProVisionAPI = async (
  inputText,
  setIsLoading,
  setData,
  setError
) => {
  try {
    // TEXT AND FILE
    if (!inputText) {
      alert('Please load an image!');
      return;
    }
    setIsLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const fileInputEl = document.querySelector('input[type=file]');
    const imageParts = await Promise.all(
      [...fileInputEl.files].map(fileToGenerativePart)
    );
    const result = await model.generateContent([inputText, ...imageParts]);
    const text = result.response.text();

    setIsLoading(false);
    setData(text);
  } catch (error) {
    setIsLoading(false);
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
