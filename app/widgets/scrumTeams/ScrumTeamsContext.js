'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { scrumTeams } from './mockScrumTeams';

const ScrumTeamsContext = createContext();

export const ScrumTeamsProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displayScrumTeams, setDisplayScrumTeams] = useState(scrumTeams);
  const [selectedScrumTeams, setSelectedScrumTeams] = useState(false);
  const [scrumTeamInFocus, setScrumTeamInFocus] = useState(false);

  return (
    <ScrumTeamsContext.Provider
      value={{
        displayScrumTeams,
        setDisplayScrumTeams,
        selectedScrumTeams,
        setSelectedScrumTeams,
        scrumTeamInFocus,
        setScrumTeamInFocus,
      }}
    >
      {children}
    </ScrumTeamsContext.Provider>
  );
};
export default ScrumTeamsContext;
export const ScrumTeamsState = () => {
  return useContext(ScrumTeamsContext);
};
