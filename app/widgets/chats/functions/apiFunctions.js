import { GoogleGenerativeAI } from '@google/generative-ai';

import { vertexAI, model } from '@/firebase/firebase';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY;

export const runChat = async (
  availablePromptTokensAmount,
  chatInFocus,
  inputText,
  setIsLoading,
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
    setIsLoading(true);
    chatInFocus?.history?.push({
      role: 'user',
      parts: [{ text: inputText }],
    });
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

    chatInFocus?.history?.push({
      role: 'model',
      parts: [{ text: response }],
    });
    console.log('chatInFocus', chatInFocus.history);

    // setStreamedResponse();
    // getTextGemini(prompt, 0.5);
    setIsLoading(false);
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
