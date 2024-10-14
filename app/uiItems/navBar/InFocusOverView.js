import React, { useContext, useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import Draggable from '@/app/components/dragDrop/Index';
import ChatsContext from '../../widgets/chats/ChatsContext';
import ProductBackLogsContext from '../../widgets/productBacklogs/ProductBackLogsContext';

export default function InFocusOverView({ contextToolBar, styled }) {
  const { appContext, uiGridMapContext, alert } = useContext(AppContext);

  const { userRole, setUserRole, intro, setIntro } = useContext(UIContext);
  const { productBackLogInFocus } = useContext(ProductBackLogsContext);
  const { availablePromptTokensAmount } = useContext(ChatsContext);

  const data = [
    // { display: '', key: 'app', value: appContext },
    { display: '', key: 'grid', value: uiGridMapContext },
    {
      display: '',
      key: '',
      value: productBackLogInFocus?.product_name,
      styled: styled.chip.multilines.selected,
    },
    { display: 'chat', key: 'maxToken', value: availablePromptTokensAmount },
    // {
    //   key: 'maxToken:',
    //   value: alert?.error_code === 9000 ? 'wait a minute' : rateLimitRemaining,
    // },
  ];
  return (
    <>
      {contextToolBar === 'navBar' ? (
        <>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexFlow: 'column wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {data.map((item, i) => (
              <>
                {item.display === appContext ||
                  (item.display === '' && (
                    <Draggable
                      key={uuidv4()}
                      item={uiGridMapContext}
                      context="draggable"
                      htmlItem={
                        <>
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              // flexFlow: 'column wrap',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              sx={{
                                // ...styled.subTitle,
                                ...item.styled,
                                // width: '25rem',
                                // height: '2rem',
                                // display: 'flex',
                                // flexDirection: 'column wrap',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // fontSize: '1rem',
                                borderRadius: '15px',
                                // border: '1px solid white',
                                color: 'white',
                              }}
                              // variant={styled.subTitle.variant}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        </>
                      }
                      styled={styled}
                    />
                  ))}
                {/* {item.key}:{item.value} */}
              </>
            ))}
          </Box>{' '}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
