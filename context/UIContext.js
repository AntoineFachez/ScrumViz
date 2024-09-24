'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from './AppContext';
// import useIntersectionObserver from '../hooks/useIntersectionObserver';
// import { styled } from "../themes/styled";
import {
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
            return scrumManagerMap;
          case 'userStories':
            return userStoriesMap;
          case 'productBackLogs':
            return productBackLogsMap;
          case 'sprintPlannings':
            return sprintPlanningsMap;
          case 'teamMembers':
            return teamMembersMap;
          case 'scrumTeam':
            return scrumTeamMap;
          case 'dailies':
            return dailyMap;
          case 'sprints':
            return sprintsMap;
          case 'sprintReview':
            return sprintReviewMap;
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
