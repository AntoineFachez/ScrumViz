'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from './AppContext';
// import useIntersectionObserver from '../hooks/useIntersectionObserver';
// import { styled } from "../themes/styled";
import {
  defaultMap,
  userStoriesMap,
  scrumManagerMap,
  teamMembersMap,
  productBackLogsMap,
  dailyMap,
  sprintsMap,
  sprintReviewMap,
  sprintPlanningsMap,
  timeStampsMap,
} from '@/app/components/grid/defaultGridMaps';
import { widgetListHome } from '@/app/pages/navBarWidgetList';

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

  const [domGridMap, setDomGridMap] = useState(null);
  const [gridDOMMap, setGridDOMMap] = useState(domGridMap);
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
  // useEffect(() => {
  //   setDomContext(
  //     userRole === 'viewer'
  //       ? viewerGridMap
  //       : userRole === 'creator'
  //       ? textAnalyzerGridMap
  //       : userRole === 'researcher'
  //       ? researcherGridMap
  //       : userRole === 'dev'
  //       ? standAloneWidget
  //       : textAnalyzerGridMap
  //   );

  //   return () => {};
  // }, [userRole]);
  useEffect(() => {
    setDomGridMap();
    setTimeout(() => {
      setDomGridMap(() => {
        switch (appContext) {
          case 'scrumManager':
            console.log('scrumManager:', appContext);
            return scrumManagerMap;
          case 'productBackLogs':
            console.log('productBackLogs:', appContext);
            return productBackLogsMap;
          case 'sprintPlannings':
            console.log('sprintPlannings:', appContext);
            return sprintPlanningsMap;
          case 'teamMembers':
            console.log('teamMembers:', appContext);
            return teamMembersMap;
          case 'scrumTeam':
            console.log('scrumTeam:', appContext);
            return scrumTeamMap;
          case 'userStories':
            console.log('userStories:', appContext);
            return userStoriesMap;
          case 'dailies':
            console.log('dailies:', appContext);
            return dailyMap;
          case 'sprints':
            console.log('sprints:', appContext);
            return sprintsMap;
          case 'sprintReview':
            console.log('sprintReview:', appContext);
            return sprintReviewMap;
          case 'timeStamps':
            console.log('timeStamps:', appContext);
            return timeStampsMap;
          default:
            return defaultMap;
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

    return () => {};
  }, [appContext]);
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
        domGridMap,
        setDomGridMap,
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
