import React from 'react';

export default function ChatInputText({
  messageInputRef,
  handleInputChange,
  promptInputText,
  loading,
  textContent,
  maxOutputTokens,
  chatInFocus,
  setLoading,
  data,
  setData,
  streamedResponse,
  setStreamedResponse,
  fullResponse,
  setFullResponse,
  promptTokenConsumed,
  setPromptTokenConsumed,
  setError,
}) {
  return (
    <>
      {' '}
      <MessageInput
        ref={messageInputRef}
        placeholder="Type message here..."
        onChange={handleInputChange}
        value={promptInputText}
        sendDisabled={loading}
        onSend={(textContent) =>
          runChat(
            maxOutputTokens,
            chatInFocus,
            textContent,
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
      />
    </>
  );
}
