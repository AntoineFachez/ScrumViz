import { MessageInput } from '@chatscope/chat-ui-kit-react';
import { Paper } from '@mui/material';
import React from 'react';

export default function ChatInputField({
  ref,
  placeholder,
  onChange,
  value,
  sendDisabled,
  onSend,
  styled,
}) {
  return (
    <Paper
      className="widget"
      sx={{
        ...styled?.widget,
        width: '100%',
        height: '100%',
        // position: 'relative !important',
        // overflow: 'scroll',
        // backgroundColor: '#111',
        paddingBottom: '0.5rem',
        '& .cs-chat-container .cs-message-input': {
          width: '100%',
          // height: '100%',
          height: 'fit-content',
          backgroundColor: 'transparent',
          border: 'none',
          margin: 0,
          padding: 0,
        },
        '& .cs-message-input': {
          marginTop: '1rem',
          paddingTop: '0rem',
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
          height: '100%',
          // height: 'fit-content',
          backgroundColor: 'transparent',
          // backgroundColor: 'white',
          borderRadius: '0px',
        },
        '& .cs-message-input >*': {
          // width: '100%',
          // height: 'fit-content',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: 'transparent',
          borderRadius: '0px',
        },
        '& .cs-message-input__content-editor-wrapper': {
          width: '100%',
          // height: 'fit-content',
          height: '100%',
          // maxHeight: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          margin: 0,
          marginBottom: '0.5rem',
          borderRadius: '5px',
          // backgroundColor: '#3e3e50',
        },
        '& .cs-message-input__content-editor-container': {
          width: '100%',
          // height: '100%',
          height: 'fit-content',
          backgroundColor: 'transparent',
          maxHeight: '100%',
        },
        '& .cs-message-input__content-editor': {
          height: '100%',
          textAlign: 'start',
          border: '1px solid #666',
          borderRadius: '5px',
          padding: '0.5rem 1rem 1rem 1rem',
          backgroundColor: 'transparent',
          backgroundColor: '#eee',
          color: '#000',
          overflow: 'visible',
        },
        // '& .cs-message-input__content-editor >*': {
        //   whiteSpace: 'pre-wrap',
        //   overflowX: 'auto',
        // },

        '& .cs-button:hover:not(:disabled)': {
          width: '3rem',
          height: '3rem',
          color: 'white',
          opacity: 1,
        },
        '& .cs-button--attachment': {
          ...styled.iconButton.action,
          width: '3rem',
          height: '3rem',
          border: 'none',
          backgroundColor: '#111',
          // '&:hover': styled.iconButton.action,
        },
        '& .cs-button--send': {
          ...styled.iconButton.action,
          width: '3rem',
          height: '3rem',
          border: 'none',
          backgroundColor: '#111',
          // '&:hover': styled.iconButton.action,
        },
      }}
    >
      <MessageInput
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        sendDisabled={sendDisabled}
        onSend={onSend}
      />
    </Paper>
  );
}
