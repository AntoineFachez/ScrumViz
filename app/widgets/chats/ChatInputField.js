import { MessageInput } from '@chatscope/chat-ui-kit-react';
import { Send } from '@mui/icons-material';
import { IconButton, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function ChatInputField({
  messageInputRef,
  placeholder,
  onChange,
  value,
  sendDisabled,
  onSend,
  fancyScroll,
  onAttachClick,
  styled,
}) {
  const [inputContent, setInputContent] = useState({
    html: value,
    plainText: value,
  });
  // console.log('promptInFocus', value);
  const handleInputChange = (htmlContent) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    const plainText = tempElement.textContent;

    setInputContent({ html: htmlContent, plainText: plainText });
    const cleanedText = inputContent?.plainText?.trim();
    onChange(cleanedText);
  };
  useEffect(() => {
    // console.log(value);
    setInputContent({
      html: value,
      plainText: value,
    });

    return () => {};
  }, [value]);

  return (
    <Paper
      className="widget"
      sx={{
        ...styled?.widget,
        width: '100%',
        height: '100%',
        // maxHeight: '20rem',
        // position: 'relative !important',
        // overflow: 'scroll',
        // backgroundColor: '#111',
        backgroundColor: 'transparent',
        paddingBottom: '0.5rem',
        '& .cs-chat-container .cs-message-input': {
          // ...styled?.widget,
          width: '100%',
          height: '100%',
          // height: 'fit-content',
          backgroundColor: 'transparent',
          border: 'none',
          margin: 0,
          padding: 0,
        },
        '& .cs-message-input': {
          // ...styled?.widget,
          width: '100%',
          height: '100%',
          marginTop: '1rem',
          paddingTop: '0rem',
          display: 'flex',
          alignItems: 'flex-end',
          // height: 'fit-content',
          backgroundColor: 'transparent',
          // backgroundColor: 'white',
          borderRadius: '0px',
        },
        '& .cs-message-input >*': {
          // ...styled?.widget,
          // width: '100%',
          // height: 'fit-content',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: 'transparent',
          borderRadius: '0px',
        },
        '& .cs-message-input__content-editor-wrapper': {
          // ...styled?.widget,
          width: '100%',
          // height: 'fit-content',
          height: '100%',
          // maxHeight: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          margin: 0,
          marginBottom: '0.5rem',
          borderRadius: '5px',
          overflow: 'visible',
          // backgroundColor: '#3e3e50',
        },
        '& .cs-message-input__content-editor-container': {
          width: '100%',
          height: '100%',
          // height: 'fit-content',
          backgroundColor: 'transparent',
          maxHeight: '100%',
          // overflow: 'visible',
        },
        '& .cs-message-input__content-editor': {
          height: '100%',
          textAlign: 'start',
          border: '1px solid #666',
          // borderRadius: '5px',
          padding: '0.5rem 1rem 1rem 1rem',
          backgroundColor: 'transparent',
          // backgroundColor: '#eee',
          color: '#fff',
          overflow: 'auto',
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
          // backgroundColor: '#111',
          backgroundColor: 'transparent',
          // '&:hover': styled.iconButton.action,
        },
        '& .cs-button--send': {
          ...styled.iconButton.action,
          width: '3rem',
          height: '3rem',
          border: 'none',
          // backgroundColor: '#111',
          backgroundColor: 'transparent',
          // '&:hover': styled.iconButton.action,
        },
      }}
    >
      <MessageInput
        ref={messageInputRef}
        placeholder={placeholder}
        value={inputContent.html}
        // value={value}
        onChange={handleInputChange}
        sendDisabled={sendDisabled}
        onSend={onSend}
        fancyScroll={fancyScroll}
        // onAttachClick={onAttachClick}
      />
      {/* <IconButton sx={styled.iconButton.action} onClick={onSend}>
        <Send />
      </IconButton>
      <TextField
        ref={messageInputRef}
        label={placeholder}
        value={inputContent.html}
        defaultValue={inputContent.html}
        sx={styled.textFieldLarge}
        size={styled.textFieldLarge.size}
        variant={styled.textFieldLarge.variant}
        multiline
        rows={15}
        // onMouseUp={handleMouseUp}
        onChange={handleInputChange}
      /> */}
    </Paper>
  );
}
