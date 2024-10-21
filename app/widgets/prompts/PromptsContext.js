'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import DefaultValuesContext from '@/context/DefaultValuesContext';

import { defaultPrompts } from './mockDefaultPrompts';
import UIContext from '@/context/UIContext';
import ScrumTeamsContext from '../scrumTeams/ScrumTeamsContext';

const PromptsContext = createContext();

export const PromptsProvider = ({ children }) => {
  const { appContext, setAppContext } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { showDialog, setShowDialog } = useContext(UIContext);
  const { exampleProduct } = useContext(DefaultValuesContext);
  const { scrumTeamInFocus, setScrumTeamInFocus } =
    useContext(ScrumTeamsContext);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayPrompts, setDisplayPrompts] = useState(defaultPrompts);
  const [selectedPrompts, setSelectedPrompts] = useState(displayPrompts);

  const [defaultPromptInFocus, setDefaultPromptInFocus] = useState(
    defaultPrompts[0]
  );
  const [promptInFocus, setPromptInFocus] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleResetFiltered = () => {
    setSelectedChats(displayChats);
    setIsFiltered(false);
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };
  // const handleSetDefaultPromptInFocus = (item) => {
  //   setPromptInFocus(item);
  // };

  const handleNewDefaultPrompt = async () => {
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  const handleCloseNewItem = () => {
    setShowNewItem(false);
  };
  const handleOnChangeAdoptPrompt = (dataToAdoptWith) => {
    // console.log('dataToAdoptWith', dataToAdoptWith);
    const generatedPrompt = createPrompt(
      defaultPromptInFocus.content,
      dataToAdoptWith,
      defaultPromptInFocus.dataScheme
    );
    // setPromptInFocus(generatedPrompt);

    setPromptInFocus(generatedPrompt);
  };
  function transformScrumTeamData(data) {
    console.log(data.members);
    if (data.members) {
      // const members = data?.members.map((member) => {
      // const { id, ...memberWithoutId } = member; // Remove the member's id
      return `
      <div class="team">
        <div class="members">
          ${data?.members
            .map(
              (member) => `
                <div class="member" style="display:flex;flex-flow:row">
                <div class="member-role">${member.role}: </div>
                  <div class="member-name">${member.name}</div>
                </div>
              `
            )
            .join('')} 
        </div>
      </div>
    `;
    } else {
      return [];
    }
  }

  const transformedData = transformScrumTeamData(scrumTeamInFocus);

  function createPrompt(defaultPrompt, inputProduct, dataScheme) {
    const description = defaultPrompt
      .replace('<standInFor_product_Name>', `${inputProduct?.product_name}`)
      .replace(
        '<standInFor_product_description>',
        `${inputProduct?.description}`
      )
      .replace('<standInFor_scrumTeam>', `${transformedData}`)
      .replace('<amountBackLogs>', 3)
      .replace('<standInForDataScheme>', `${dataScheme}`);
    const prompt = {
      id: uuidv4(),
      title: 'develop user stories for this digital product',
      description: description,
      source_collection: 'productBackLogs',
      target_collection: 'userStories',
    };

    return prompt;
  }

  useEffect(() => {
    setSelectedPrompts(
      displayPrompts?.filter((prompt) =>
        prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);
  useEffect(() => {
    setSelectedPrompts(displayPrompts);

    return () => {};
  }, [displayPrompts]);

  return (
    <PromptsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        setShowNewItem,
        selectedWidgetContext,
        setSelectedWidgetContext,

        defaultPrompts,
        displayPrompts,
        setDisplayPrompts,
        selectedPrompts,
        setSelectedPrompts,
        defaultPromptInFocus,
        setDefaultPromptInFocus,
        promptInFocus,
        setPromptInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleResetFiltered,
        handleSearchTermChange,

        handleNewDefaultPrompt,
        handleCloseNewItem,
        handleOnChangeAdoptPrompt,
        // handleSetDefaultPromptInFocus,
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
};
export default PromptsContext;
export const PromptsState = () => {
  return useContext(PromptsContext);
};
