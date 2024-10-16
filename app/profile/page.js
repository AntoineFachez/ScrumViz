'use client';
import React, { useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import Draggable from '../components/dragDrop/Draggable';
import NavBarButton from '../components/navBar/navBarButton/NavBarButton';
import { useMode } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import SketchWrapper from '../p5/neonText/SketchWrapper';
import AuthContext from '../widgets/auth/AuthContext';

export default function Profile({ uiContext }) {
  const { setAppContext } = useContext(AppContext);
  const { currentSession, setCurrentSession } = useContext(AuthContext);
  const containerRef = useRef();
  const [theme, colorMode, palette, styled] = useMode();
  const collection = 'profiles';

  const session = useSession();
  if (session?.status === 'loading') {
    return <Box>...Loading</Box>;
    // <SketchWrapper containerRef={containerRef} />;
  }

  if (session?.status === 'authenticated') {
    const { data } = session;
    setCurrentSession(data);
    const widgetProps = {
      collection: collection,
      iconButton: (
        <Avatar
          src={data?.user?.image}
          alt={data?.user?.name}
          sx={{
            ...styled.iconButton,
            // width: '2rem',
            // height: '2rem',
            // padding: '1rem',
          }}
        />
      ),
      dropWidgetName: collection,
      onClick: () => setAppContext('profile'),
      styled: styled,
    };
    return (
      <>
        {uiContext === 'navBar' ? (
          <NavBarButton widgetProps={widgetProps} styled={styled} />
        ) : (
          <Box sx={{}}>
            <Tooltip
              title={widgetProps.collection}
              placement="bottom"
              arrow={true}
            >
              {' '}
              <Draggable
                keyToPass={uuidv4()}
                item={widgetProps?.dropWidgetName}
                context="draggable"
                htmlItem={
                  <NavBarButton widgetProps={widgetProps} styled={styled} />
                }
                styled={styled}
              />{' '}
            </Tooltip>{' '}
            {data?.user?.name}
          </Box>
        )}
      </>
    );
  }
  return (
    <>
      <div>You are not logged in.</div>
    </>
  );
}
