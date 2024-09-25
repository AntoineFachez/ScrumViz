'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { mockScrumTeamMembers } from './mockScrumTeamMembers';

const TeamMembersContext = createContext();

export const TeamMembersProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displayTeamMembers, setDisplayTeamMembers] =
    useState(mockScrumTeamMembers);
  const [selectedTeamMembers, setSelectedTeamMembers] =
    useState(displayTeamMembers);
  const [teamMemberInFocus, setTeamMemberInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // setSelectedTeamMembers(
    //   displayTeamMembers.filter((userStory) =>
    //     userStory.userStory_name
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase())
    //   )
    // );

    return () => {};
  }, [searchTerm]);

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
