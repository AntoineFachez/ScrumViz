'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from './AppContext';
import {
  agileCodingMap,
  scrumManagerMap,
  productsMap,
  userStoriesMap,
  scrumTeamsMap,
  teamMembersMap,
  productBackLogsMap,
  dailiesMap,
  sprintPlanningsMap,
  sprintsMap,
  sprintReviewsMap,
  sprintRetrospectivesMap,
  timeStampsMap,
  chatsMap,
} from '@/app/components/grid/defaultGridMaps';
import {
  widgetListHome,
  widgetListAgileCoding,
  widgetListScrumManager,
  widgetListProducts,
  widgetListUserStories,
  widgetListSprints,
  widgetListScrumTeams,
  widgetListProductBackLogs,
} from '@/app/uiItems/navBar/navBarWidgetList';
const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const { appContext, uiGridMapContext } = useContext(AppContext);

  const [navBarWidgetList, setNavBarWidgetList] = useState(widgetListHome);
  const [showWidgetMenus, setShowWidgetMenus] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [toggleBG, setToggleBG] = useState(false);
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const [defaultWidgetMap, setDefaultWidgetMap] = useState(null);
  const [gridDOMMap, setGridDOMMap] = useState(defaultWidgetMap);
  const [latestGridValues, setLatestGridValues] = useState({});

  const [showSliderExtendData, setShowSliderExtendData] =
    useState(showWidgetMenus);
  const [sliderSize, setSliderSize] = useState('small');

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOrientationDrawer({ ...orientationDrawer, [anchor]: open });
  };
  const handleCloseDialog = (value) => {
    setShowDialog(false);
    //  setSelectedValue(value);
  };
  useEffect(() => {
    setNavBarWidgetList(() => {
      switch (appContext) {
        case 'home':
          return widgetListHome;
        case 'scrumManager':
          return widgetListScrumManager;
        default:
          return widgetListHome;
      }
    });
    return () => {};
  }, [appContext]);
  useEffect(() => {
    setNavBarWidgetList(() => {
      switch (uiGridMapContext) {
        case 'home':
          return widgetListHome;
        case 'agileCoding':
          return widgetListAgileCoding;
        case 'scrumManager':
          return widgetListScrumManager;
        case 'products':
          return widgetListScrumManager;
        case 'productBackLogs':
          return widgetListProductBackLogs;
        case 'userStories':
          return widgetListScrumManager;
        case 'scrumTeams':
          return widgetListScrumTeams;
        case 'sprints':
          return widgetListSprints;
        case 'sprints':
          return widgetListSprints;
        case 'sprintPlannings':
          return widgetListSprints;
        case 'sprintBackLogs':
          return widgetListSprints;
        case 'dailies':
          return widgetListSprints;
        case 'sprintReviews':
          return widgetListSprints;
        case 'sprintRetrospectives':
          return widgetListSprints;
        case 'teamMembers':
          return widgetListScrumTeams;
        case 'persons':
          return widgetListScrumTeams;
        default:
          return widgetListHome;
      }
    });
    return () => {};
  }, [uiGridMapContext]);

  useEffect(() => {
    setDefaultWidgetMap();
    setTimeout(() => {
      setDefaultWidgetMap(() => {
        switch (uiGridMapContext) {
          case 'agileCoding':
            return agileCodingMap;
          case 'scrumManager':
            return scrumManagerMap;
          case 'products':
            return productsMap;
          case 'userStories':
            return userStoriesMap;
          case 'productBackLogs':
            return productBackLogsMap;
          case 'sprintPlannings':
            return sprintPlanningsMap;
          case 'teamMembers':
            return teamMembersMap;
          case 'scrumTeams':
            return scrumTeamsMap;
          case 'dailies':
            return dailiesMap;
          case 'sprints':
            return sprintsMap;
          case 'sprintReview':
            return sprintReviewsMap;
          case 'sprintRetrospectives':
            return sprintRetrospectivesMap;
          case 'timeStamps':
            return timeStampsMap;
          case 'prompts':
            return chatsMap;
          default:
            return scrumManagerMap;
        }
      });
    }, 5);
    return () => {};
  }, [appContext, uiGridMapContext]);

  return (
    <UIContext.Provider
      value={{
        navBarWidgetList,
        setNavBarWidgetList,
        showWidgetMenus,
        setShowWidgetMenus,
        showDialog,
        setShowDialog,
        toggleBG,
        setToggleBG,
        // showProductsItemMenu,
        // setShowProductsItemMenu,
        // showUserStoryMenu,
        // setShowUserStoryMenu,
        // showSprintPlanningMenu,
        // setShowSprintPlanningMenu,
        // showSprintMenu,
        // setShowSprintMenu,
        // showBackLogItemMenu,
        // setShowBackLogItemMenu,
        // showImageDropMenu,
        // setShowImageDropMenu,
        // showPersonsMenu,
        // setShowPersonsMenu,
        // showTeamMembersMenu,
        // setShowTeamMembersMenu,
        // showDailyMenu,
        // setShowDailyMenu,
        // showSprinReviewtMenu,
        // setShowSprinReviewtMenu,
        // showChatsMenu,
        // setShowChatsMenu,
        // showDefaultPromptsMenu,
        // setShowDefaultPromptsMenu,

        defaultWidgetMap,
        setDefaultWidgetMap,
        imageUrlArr,
        setImageUrlArr,
        gridDOMMap,
        setGridDOMMap,
        latestGridValues,
        setLatestGridValues,
        showSliderExtendData,
        setShowSliderExtendData,
        sliderSize,
        setSliderSize,
        handleCloseDialog,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
export default UIContext;
export const UIState = () => {
  return useContext(UIContext);
};
