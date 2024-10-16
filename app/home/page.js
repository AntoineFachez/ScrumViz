'use client';
import React, { useContext, useRef } from 'react';
import SketchWrapper from '../p5/neonText/SketchWrapper';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { Add, WidthWide } from '@mui/icons-material';
import { useMode } from '../theme/ThemeContext';
import ProductBackLogsContext from '../widgets/productBacklogs/ProductBackLogsContext';
import CardItem from '../components/card/CardItem';
// import Profile from '../profile/page';
// import { useSession } from 'next-auth/react';
import {
  scheme,
  singleItemScheme,
} from '../widgets/productBacklogs/dataScheme';
import EnvProductionIcon from '../components/icons/EnvProductionIcon';
export default function Home() {
  const [theme, colorMode, palette, styled] = useMode();
  const {
    optionsVertMenu,
    displayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    handleSetProductBackLogInFocus,
  } = useContext(ProductBackLogsContext);

  const widgetProps = {
    handleSetItemInFocus: handleSetProductBackLogInFocus,
    data: selectedProductBackLogs,
    selectedData: selectedProductBackLogs,
    setSelectedItem: setSelectedProductBackLogs,
    singleItemScheme: singleItemScheme,
    optionsVertMenu: optionsVertMenu,
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {' '}
      {/* <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          // flexFlow: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Header
      </Box> */}
      <Paper
        className="flexList"
        sx={{
          ...styled?.flexList,
          width: '100%',
          maxWidth: '48rem',
          height: '100%',
          maxHeight: '48rem',
          overflow: 'scroll',
          '& .MuiPaper-root': {
            width: '18rem',
            height: '16rem',
          },
        }}
      >
        {' '}
        <Box
          sx={{
            ...styled.card,
            width: '18rem',
            height: '16rem',
            position: 'relative',

            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow:
              '-1px 0 0 red, 0 1px 0 yellow, 1px 0 0 green, 0 -1px 0 blue',
          }}
        >
          {' '}
          <IconButton
            sx={{
              ...styled?.iconButton?.action,
            }}
          >
            <Add
              sx={{
                width: '3rem',
                height: '3rem',
              }}
            />
          </IconButton>
          <Typography
            sx={{
              ...styled.subTitle,

              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.5rem',
              transform: 'translate(0, 1rem)',
            }}
            variant={styled.subTitle.variant}
          >
            Create a Project
          </Typography>
        </Box>
        {displayProductBackLogs &&
          displayProductBackLogs?.map((item, i) => {
            if (item.status === 'in production') {
              item.customSubTitleItem = <EnvProductionIcon />;
            } else {
              item.customSubTitleItem = '';
            }
            return (
              <>
                <>
                  <CardItem
                    widgetProps={widgetProps}
                    dataSlug={item.id}
                    item={item}
                    handleClick={handleSetProductBackLogInFocus}
                    // styled={{ ...styled.card.width, width: '10rem' }}
                    styled={{ ...styled }}
                  />
                </>
              </>
            );
          })}
      </Paper>
      {/* <Box
        sx={{
          width: '100%',
          height: '100%',
          // height: '10rem',
          display: 'flex',
          // flexFlow: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Footer
      </Box> */}
    </Box>
  );
}
