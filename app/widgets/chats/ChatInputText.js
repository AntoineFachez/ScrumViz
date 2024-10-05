import { MessageInput } from '@chatscope/chat-ui-kit-react';
import React from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import './ChatInFocus.scss';
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
