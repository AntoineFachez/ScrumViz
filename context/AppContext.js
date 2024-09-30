'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const startUp = 'scrumManager';
  const [playGround, setPlayGround] = useState(false);

  const [showDev, setShowDev] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [showMainPlayer, setShowMainPlayer] = useState(false);

  // const [userVerified, setUserVerified] = useState(null);
  const [appContext, setAppContext] = useState(startUp);

  const [scrumManagerContext, setScrumManagerContext] =
    useState('scrumManager');

  const [newItemElement, setNewItemElement] = useState(null);
  // console.log("appContext", appContext);
  const [storyContext, setStoryContext] = useState('');
  const [switchDesktopSketch, setSwitchDesktopSketch] = useState(false);
  const [playGame, setPlayGame] = useState(false);
  const [switchDesktopPlayGround, setSwitchDesktopPlayGround] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [collection, setCollection] = useState();
  const [rootOfArrayInFocus, setRootOfArrayInFocus] = useState();
  const [rootOfArrayComponent, setRootOfArrayComponent] = useState('');
  const [rootKeys, setRootKeys] = useState([]);
  const [jSONItemInFocus, setJSONItemInFocus] = useState({});

  const [markerData, setMarkerData] = useState([]);

  const [widgetActive, setWidgetActive] = useState(startUp);
  const [widgetActiveBottomLeft, setWidgetActiveBottomLeft] = useState();
  const [widgetActiveBottomRight, setWidgetActiveBottomRight] = useState();
  return (
    <AppContext.Provider
      value={{
        welcome,
        setWelcome,
        switchDesktopSketch,
        setSwitchDesktopSketch,
        showMainPlayer,
        setShowMainPlayer,
        playGame,
        setPlayGame,
        switchDesktopPlayGround,
        setSwitchDesktopPlayGround,
        playGround,
        setPlayGround,
        showDev,
        setShowDev,
        appContext,
        setAppContext,
        scrumManagerContext,
        setScrumManagerContext,
        newItemElement,
        setNewItemElement,
        storyContext,
        setStoryContext,

        widgetActive,
        setWidgetActive,
        widgetActiveBottomLeft,
        setWidgetActiveBottomLeft,
        widgetActiveBottomRight,
        setWidgetActiveBottomRight,
        markerData,
        setMarkerData,
        searchTerm,
        setSearchTerm,

        collection,
        setCollection,

        rootKeys,
        setRootKeys,
        rootOfArrayInFocus,
        setRootOfArrayInFocus,
        rootOfArrayComponent,
        setRootOfArrayComponent,
        jSONItemInFocus,
        setJSONItemInFocus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
export const AppState = () => {
  return useContext(AppContext);
};
