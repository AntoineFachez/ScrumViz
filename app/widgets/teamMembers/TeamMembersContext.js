'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { scrumTeamMembers } from './mockScrumTeamMembers';
import InFocusContext from '@/context/InFocusContext';
import { handleSetItemInFocus } from '../actions';

const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
  const { setLatestSelectedItem } = useContext(InFocusContext);
  const [displayTeamMembers, setDisplayTeamMembers] =
    useState(scrumTeamMembers);
  const [selectedTeamMembers, setSelectedTeamMembers] =
    useState(displayTeamMembers);
  const [teamMemberInFocus, setTeamMemberInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  // const handleSetTeamMemberInFocus = (teamMember) => {
  //   handleSetItemInFocus(
  //     setTeamMemberInFocus,
  //     teamMember,
  //     setLatestSelectedItem
  //   );
  // };

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
        displayTeamMembers,
        setDisplayTeamMembers,
        selectedTeamMembers,
        setSelectedTeamMembers,
        teamMemberInFocus,
        setTeamMemberInFocus,
        searchTerm,
        setSearchTerm,
        // handleSetTeamMemberInFocus,
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
