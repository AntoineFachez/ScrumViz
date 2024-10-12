'use client';
import React, { useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { Box, Tooltip } from '@mui/material';
import Draggable from '../components/dragDrop/Draggable';
import NavBarButton from '../components/navBar/navBarButton/NavBarButton';
import { useMode } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import SketchWrapper from '../p5/SketchWrapper';

export default function Profile({ uiContext }) {
  const { setAppContext } = useContext(AppContext);
  const containerRef = useRef();
  const [theme, colorMode, palette, styled] = useMode();
  const session = useSession();
  const collection = 'profiles';

  if (session?.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session?.status === 'authenticated') {
    const { data } = session;
    const widgetProps = {
      collection: collection,
      iconButton: (
        <img
          src={data?.user?.image}
          alt={data?.user?.name}
          style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
        />
      ),
      dropWidgetName: collection,
      onClick: () => setAppContext('profile'),
      styled: styled,
    };
    return (
      <>
        {uiContext === 'navBar' ? (
          <div>
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
          </div>
        ) : (
          <p>Logged in as {data?.user?.email}</p>
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
