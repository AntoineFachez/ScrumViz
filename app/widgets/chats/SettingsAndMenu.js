import SliderComponent from '@/app/components/slider/Slider';
import { Add, Backup } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';

export default function SettingsAndMenu({
  chatInFocus,
  handleStoreChat,
  handleNewChat,
  availablePromptTokensAmount,
  showExtendData,
  size,
  orientation,
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
          padding: '0.5rem 2rem 0 2rem ',
        }}
      >
        {' '}
        <SliderComponent
          showExtendData={showExtendData}
          size={size}
          orientation={orientation}
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
      <Box
        sx={{
          width: 'fit-content',
          height: '100%',
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10%',
        }}
      >
        {chatInFocus && (
          <Tooltip title="Store Chat" placement="top" arrow>
            <IconButton
              sx={styled?.iconButton?.action}
              onClick={() => handleStoreChat(chatInFocus)}
            >
              <Backup />
            </IconButton>
          </Tooltip>
        )}
        {/* <Tooltip title="Create new Chat" placement="top" arrow>
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={() => handleNewChat()}
          >
            <Add />
          </IconButton>
        </Tooltip> */}
      </Box>
    </>
  );
}
