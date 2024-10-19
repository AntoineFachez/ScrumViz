'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '../../../context/AppContext';
import SearchContext from '@/context/SearchContext';
import DefaultValuesContext from '@/context/DefaultValuesContext';

import { defaultPrompts } from './mockDefaultPrompts';
import UIContext from '@/context/UIContext';

const PromptsContext = createContext();

export const PromptsProvider = ({ children }) => {
  const { appContext, setAppContext } = useContext(AppContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const { showDialog, setShowDialog } = useContext(UIContext);
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  const [displayPrompts, setDisplayPrompts] = useState(defaultPrompts);
  const [selectedPrompts, setSelectedPrompts] = useState(displayPrompts);

  const [promptInFocus, setPromptInFocus] = useState({
    product_name: 'Mushroom App',
    status: 'in developement',
    description:
      'Users of the app can mark locations of where they found a mushroom. Users can shoot an image, upload it to gemini and ask for the according wikipedia article.',
    productBackLog_items: '',
  });

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
    console.log('handleNewDefaultPrompt');
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  const handleCloseNewItem = () => {
    console.log('handleCloseNewItem');

    setShowNewItem(false);
  };
  const handleOnChangeAdoptPrompt = (dataToAdoptWith) => {
    console.log('dataToAdoptWith', dataToAdoptWith);
    const generatedPrompt = createPrompt(
      promptOnNewProduct,
      dataToAdoptWith,
      standInDataScheme
    );
    // setPromptInFocus(generatedPrompt);

    setPromptInFocus(generatedPrompt);
  };
  const promptOnNewProduct =
    "lets talk about scrum management and user stories. Here is a layout for a digital product: <standInForProduct>. Please return the three most common user stories for such a product. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these user stories. Return the three user stories I asked for as an array of json objects. The data structure of these user stories / for the json objects you shall return is as follows (find further instructions in parenthese such as 'generate uniqueUUID'):  <standInForDataScheme>   ";
  const standInForProduct =
    'product_name: Mushroom App, product_description: Users of the app can mark locations of where they found a mushroom. Users can shoot an image, upload it to gemini and ask for the according wikipedia article';
  const standInDataScheme =
    "[{id: 'generate a unique UUiD', userStory_name: 'generate a meaningful name', userStory_short:'generate the story similar to: 'As a user, I … '', acceptanceCriteria: [{acceptanceCriteria_id: 'generate a Unique UUID for each criteria',acceptanceCriteria_description: 'generate meaningful criteria description',}, ],writtenByTeamMember_id: 'ignore',wireFrame_uri:'ignore', },";

  function createPrompt(
    promptOnNewProduct,
    standInForProduct,
    standInDataScheme
  ) {
    const description = promptOnNewProduct
      .replace(
        '<standInForProduct>',
        `**product_name: ${standInForProduct.product_name}** product_description: *${standInForProduct.description}*`
      )
      .replace('<standInForDataScheme>', `\`${standInDataScheme}\``);

    const prompt = {
      id: uuidv4(),
      title: 'develop user stories for this digital product',
      description: description,
      source_collection: 'productBackLogs',
      target_collection: 'userStories',
    };

    return prompt;
  }
  // useEffect(() => {
  //   const generatedPrompt = createPrompt(
  //     promptOnNewProduct,
  //     standInForProduct,
  //     standInDataScheme
  //   );
  //   setPromptInFocus(generatedPrompt);

  //   return () => {};
  // }, [promptOnNewProduct, standInForProduct, standInDataScheme]);

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
        selectedWidgetContext,
        setSelectedWidgetContext,

        defaultPrompts,
        displayPrompts,
        setDisplayPrompts,
        selectedPrompts,
        setSelectedPrompts,
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
