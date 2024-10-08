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
  widgetListScrumManager,
} from '@/app/uiItems/navBarWidgetList';
const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const { appContext, uiGridMapContext } = useContext(AppContext);

  const [navBarWidgetList, setNavBarWidgetList] = useState(widgetListHome);
  const [showWidgetMenus, setShowWidgetMenus] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [showProductsItemMenu, setShowProductsItemMenu] = useState(false);
  const [showUserStoryMenu, setShowUserStoryMenu] = useState(false);
  const [showSprintPlanningMenu, setShowSprintPlanningMenu] = useState(false);
  const [showSprintMenu, setShowSprintMenu] = useState(false);
  const [showBackLogItemMenu, setShowBackLogItemMenu] = useState(false);
  const [showImageDropMenu, setShowImageDropMenu] = useState(false);
  const [showPersonsMenu, setShowPersonsMenu] = useState(false);
  const [showTeamMembersMenu, setShowTeamMembersMenu] = useState(false);
  const [showDailyMenu, setShowDailyMenu] = useState(false);
  const [showSprinReviewtMenu, setShowSprinReviewtMenu] = useState(false);
  const [showChatsMenu, setShowChatsMenu] = useState(false);
  const [showDefaultPromptsMenu, setShowDefaultPromptsMenu] = useState(false);

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
        showProductsItemMenu,
        setShowProductsItemMenu,
        showUserStoryMenu,
        setShowUserStoryMenu,
        showSprintPlanningMenu,
        setShowSprintPlanningMenu,
        showSprintMenu,
        setShowSprintMenu,
        showBackLogItemMenu,
        setShowBackLogItemMenu,
        showImageDropMenu,
        setShowImageDropMenu,
        showPersonsMenu,
        setShowPersonsMenu,
        showTeamMembersMenu,
        setShowTeamMembersMenu,
        showDailyMenu,
        setShowDailyMenu,
        showSprinReviewtMenu,
        setShowSprinReviewtMenu,
        showChatsMenu,
        setShowChatsMenu,
        showDefaultPromptsMenu,
        setShowDefaultPromptsMenu,
        defaultWidgetMap,
        setDefaultWidgetMap,
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
