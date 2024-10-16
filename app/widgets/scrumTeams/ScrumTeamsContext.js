'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { scrumTeams } from './mockScrumTeams';

const ScrumTeamsContext = createContext();

export const ScrumTeamsProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [displayScrumTeams, setDisplayScrumTeams] = useState(scrumTeams);
  const [selectedScrumTeams, setSelectedScrumTeams] = useState(false);
  const [scrumTeamInFocus, setScrumTeamInFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFindScrumTeam = (item, sprint_IdKey) => {
    const foundTeam = displayScrumTeams.filter((team) => {
      return team.id === item[sprint_IdKey];
    });
    setSelectedScrumTeams(foundTeam);
  };
  const handleFindMemberInScrumTeam = (item) => {
    const foundTeam = displayScrumTeams.filter((team) =>
      team.members.some((member) => member.id === item.id)
    );
    setSelectedScrumTeams(foundTeam);
  };
  const handleResetFiltered = () => {
    setSelectedScrumTeams(displayScrumTeams);
    setIsFiltered(false);
  };
  useEffect(() => {
    setSelectedScrumTeams(
      displayScrumTeams.filter((scrumTeam) =>
        scrumTeam.scrumTeam_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedScrumTeams(displayScrumTeams);

    return () => {};
  }, [displayScrumTeams]);
  return (
    <ScrumTeamsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        setShowNewItem,
        displayScrumTeams,
        setDisplayScrumTeams,
        selectedScrumTeams,
        setSelectedScrumTeams,
        scrumTeamInFocus,
        setScrumTeamInFocus,
        handleFindScrumTeam,
        handleFindMemberInScrumTeam,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
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
