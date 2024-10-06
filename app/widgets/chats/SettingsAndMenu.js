import SliderComponent from '@/app/components/slider/Slider';
import { Add, Backup } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';

export default function SettingsAndMenu({
  chatInFocus,
  handleStoreChat,
  handleNewChat,
  availablePromptTokensAmount,
  size,
  value,
  setValue,
  aria,
  valueLabelDisplay,
  defaultValue,
  step,
  marks,
  min,
  max,
  disabled,
  handleChange,
  styled,
}) {
  return (
    <>
      <Box
        sx={{
          width: '100%',

          // height: '100%',
          height: 'fit-content',
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          padding: '0 2rem',
        }}
      >
        <SliderComponent
          size={size}
          value={value}
          setValue={setValue}
          aria={aria}
          valueLabelDisplay={valueLabelDisplay}
          defaultValue={defaultValue}
          step={step}
          marks={marks}
          min={min}
          max={max}
          disabled={disabled}
          handleChange={handleChange}
          styled={styled}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            height: '100%',
            color: 'white',
            textWrap: 'nowrap',
            verticalAlign: 'middle',
          }}
        >
          maxToken: {availablePromptTokensAmount}
        </Typography>
        {chatInFocus && (
          <Tooltip title="Store Chat">
            <IconButton
              sx={styled?.iconButton?.action}
              onClick={() => handleStoreChat(chatInFocus)}
            >
              <Backup />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Create new Chat">
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={() => handleNewChat()}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}
