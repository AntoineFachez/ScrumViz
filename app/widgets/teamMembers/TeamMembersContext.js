'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { scrumTeamMembers } from './mockScrumTeamMembers';

const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [displayTeamMembers, setDisplayTeamMembers] =
    useState(scrumTeamMembers);
  const [selectedTeamMembers, setSelectedTeamMembers] =
    useState(displayTeamMembers);
  const [teamMemberInFocus, setTeamMemberInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSelectedTeamMembers(
      displayTeamMembers.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedTeamMembers(displayTeamMembers);

    return () => {};
  }, [displayTeamMembers]);
  return (
    <TeamMembersContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        displayTeamMembers,
        setDisplayTeamMembers,
        selectedTeamMembers,
        setSelectedTeamMembers,
        teamMemberInFocus,
        setTeamMemberInFocus,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </TeamMembersContext.Provider>
  );
};
export default TeamMembersContext;
export const TeamMembersState = () => {
  return useContext(TeamMembersContext);
};
