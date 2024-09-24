import React from 'react';
import NavBarButton from './NavBarButton';

export default function Index({
  appContext,
  widgetContext,
  onClick,
  iconButton,
  styled,
}) {
  return (
    <>
      {' '}
      <NavBarButton
        appContext={appContext}
        widgetContext={widgetContext}
        onClick={onClick}
        iconButton={iconButton}
        styled={styled}
      />
    </>
  );
}
