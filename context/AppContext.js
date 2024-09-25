'use client';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
// import MiniMap from "../widgets/locations/Index";
// import mockData from "../assets/data/stories/stories.json";
// import useGeolocation from "../hooks/useGeoLocation";
// import Stories from '../widgets/stories/Stories';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const startUp = 'sprintPlannings';
  const [playGround, setPlayGround] = useState(false);

  const [showDev, setShowDev] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [showMainPlayer, setShowMainPlayer] = useState(false);

  // const [userVerified, setUserVerified] = useState(null);
  const [appContext, setAppContext] = useState(startUp);
  const [newItemElement, setNewItemElement] = useState(null);
  // console.log("appContext", appContext);
  const [storyContext, setStoryContext] = useState('');
  const [switchDesktopSketch, setSwitchDesktopSketch] = useState(false);
  const [playGame, setPlayGame] = useState(false);
  const [switchDesktopPlayGround, setSwitchDesktopPlayGround] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatGPTMessages, setChatGPTMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: new Date().getTime(),
      sender: 'ChatGPT',
      // chatId: chatInFocusId,
    },
  ]);
  // const [droppedJSON, setDroppedJSON] = useState(
  //   useEffect(() => {
  //     let value = JSON.stringify(mockData);
  //     const dataInJSON = JSON.parse(value);
  //     if (typeof dataInJSON === "object") {
  //       setDroppedJSON(value);
  //     } else {
  //       setDroppedJSON([{}]);
  //     }
  //   }, [])
  // );
  const [collection, setCollection] = useState();
  const [rootOfArrayInFocus, setRootOfArrayInFocus] = useState();
  const [rootOfArrayComponent, setRootOfArrayComponent] = useState('');
  const [rootKeys, setRootKeys] = useState([]);
  const [jSONItemInFocus, setJSONItemInFocus] = useState({});

  // const [selectedStoryId, setSelectedStoryId] = useState();
  // const [storyInFocus, setStoryInFocus] = useState();

  // const { latitude, longitude } = useGeolocation();
  // const [coordsUser, setCoordsUser] = useState({
  //   lat: latitude,
  //   lng: longitude,
  // });
  // const [latLngInFocus, setLatLngInFocus] = useState({
  //   lat: latitude,
  //   lng: longitude,
  // });
  // const [centerDefault, setCenterDefault] = useState([
  //   { lat: latitude, lng: longitude },
  // ]);
  const [markerData, setMarkerData] = useState([]);

  const [widgetActive, setWidgetActive] = useState(startUp);
  // const [widgetActiveWidget, setWidgetActiveWidget] = useState(<Stories />);
  const [widgetActiveBottomLeft, setWidgetActiveBottomLeft] = useState();
  const [widgetActiveBottomRight, setWidgetActiveBottomRight] = useState();
  // const [widgetActiveWidgetBottom, setWidgetActiveWidgetBottom] = useState([]);

  // useEffect(() => {
  //   if (!appContext) setAppContext("stories");

  //   return () => {};
  // }, [appContext]);

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
        // widgetActiveWidget,
        // setWidgetActiveWidget,
        // widgetActiveWidgetBottom,
        // setWidgetActiveWidgetBottom,
        // coordsUser,
        // setCoordsUser,
        // latLngInFocus,
        // setLatLngInFocus,
        // centerDefault,
        // setCenterDefault,
        markerData,
        setMarkerData,
        searchTerm,
        setSearchTerm,
        chatGPTMessages,
        setChatGPTMessages,
        // droppedJSON,
        // setDroppedJSON,
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
