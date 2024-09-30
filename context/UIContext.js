'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from './AppContext';
// import useIntersectionObserver from '../hooks/useIntersectionObserver';
// import { styled } from "../themes/styled";
import {
  userStoriesMap,
  scrumManagerMap,
  scrumTeamsMap,
  teamMembersMap,
  productBackLogsMap,
  dailiesMap,
  sprintPlanningsMap,
  sprintsMap,
  sprintReviewsMap,
  sprintRetrospectivesMap,
  timeStampsMap,
} from '@/app/components/grid/defaultGridMaps';
import { widgetListHome } from '@/app/pages/navBarWidgetList';
import { getFromLS, saveToLS } from '@/app/components/grid/helperFunctions';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [intro, setIntro] = useState(false);
  const [userRole, setUserRole] = useState('viewer');
  const [homeUiSelected, setHomeUiSelected] = useState('locations');

  const [navBarWidgetList, setNavBarWidgetList] = useState(widgetListHome);
  const [showUserStoryMenu, setShowUserStoryMenu] = useState(false);
  const [showSprintPlanningMenu, setShowSprintPlanningMenu] = useState(false);
  const [showSprintMenu, setShowSprintMenu] = useState(false);
  const [showBackLogItemMenu, setShowBackLogItemMenu] = useState(false);
  const [showImageDropMenu, setShowImageDropMenu] = useState(false);
  const [showPersonsMenu, setShowPersonsMenu] = useState(false);
  const [showTeamMembersMenu, setShowTeamMembersMenu] = useState(false);
  const [showDailyMenu, setShowDailyMenu] = useState(false);
  const [showSprinReviewtMenu, setShowSprinReviewtMenu] = useState(false);

  const [defaultWidgetMap, setDefaultWidgetMap] = useState(null);
  const [gridDOMMap, setGridDOMMap] = useState(defaultWidgetMap);
  const [latestGridValues, setLatestGridValues] = useState({});
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOrientationDrawer({ ...orientationDrawer, [anchor]: open });
  };

  useEffect(() => {
    setDefaultWidgetMap();
    setTimeout(() => {
      setDefaultWidgetMap(() => {
        switch (appContext) {
          case 'scrumManager':
            return scrumManagerMap;
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
          default:
            return scrumManagerMap;
        }
      });

      setNavBarWidgetList(() => {
        switch (appContext) {
          case 'home':
            return widgetListHome;
          case 'userStory':
            return widgetListHome;
          default:
            return widgetListHome;
        }
      });
    }, 5);
    // setDefaultWidgetMap(getFromLS(appContext)[0]?.startUpWidgetLayout);

    return () => {};
  }, [appContext]);

  // useEffect(() => {
  //   setDefaultWidgetMap(getFromLS(appContext)[0]?.startUpWidgetLayout);

  //   return () => {};
  // }, [appContext]);

  return (
    <UIContext.Provider
      value={{
        homeUiSelected,
        setHomeUiSelected,
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
        defaultWidgetMap,
        setDefaultWidgetMap,
        gridDOMMap,
        setGridDOMMap,
        latestGridValues,
        setLatestGridValues,
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
