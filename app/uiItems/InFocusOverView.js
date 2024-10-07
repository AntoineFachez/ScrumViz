import React, { useContext, useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import Draggable from '@/app/components/dragDrop/Index';
import ChatsContext from '../widgets/chats/ChatsContext';
export default function InFocusOverView({ contextToolBar, styled }) {
  const { appContext, uiGridMapContext, alert } = useContext(AppContext);

  const { userRole, setUserRole, intro, setIntro } = useContext(UIContext);
  const { availablePromptTokensAmount } = useContext(ChatsContext);

  return (
    <>
      {contextToolBar === 'navBar' ? (
        <Box sx={styled.widgetInline}>
          {/* <Draggable
            key={uuidv4()}
            item="newItem"
            context="draggable"
            htmlItem={
              <Box
                sx={{
                  width: '25rem',
                  height: '3rem',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            }
            styled={styled}
          />{' '} */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={styled.textBody}>app: {appContext}</Typography>
            <br />
            <Typography sx={styled.textBody}>
              grid: {uiGridMapContext}
            </Typography>
            {/* <Typography
              // sx={(styled.textBodyFitText, styled.truncate)}
              sx={{
                width: 'fit-content',
                display: 'flex',
                flexFlow: 'row nowrap',
                overflow: 'scroll',
              }}
              variant={styled.variant}
            >
              {alert?.error_code === 9000
                ? 'wait a minute'
                : rateLimitRemaining}
            </Typography> */}{' '}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  width: '100%',
                  height: '100%',
                  color: 'white',
                  textWrap: 'nowrap',
                  verticalAlign: 'middle',
                }}
              >
                maxToken:
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  height: '100%',
                  color: 'white',
                  textWrap: 'nowrap',
                  verticalAlign: 'middle',
                }}
              >
                {availablePromptTokensAmount}
              </Typography>
            </Box>
          </Box>{' '}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
