'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { productBackLogs } from './mockProductBackLogs';
import UIContext from '@/context/UIContext';
import { handleSetItemInFocus } from '../actions';
import UserStoriesContext from '../userStories/UserStoriesContext';
import InFocusContext from '@/context/InFocusContext';
import ProductsContext from '../products/ProductsContext';

const BackLogsContext = createContext();

export const BackLogsProvider = ({ children }) => {
  const { setShowDialog } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { displayProducts, setProductInFocus } = useContext(ProductsContext);
  const { displayUserStories, setSelectedUserStories } =
    useContext(UserStoriesContext);

  const optionsVertMenu = ['Set to Production', 'Delete'];
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);
  const [displayProductBackLogs, setDisplayProductBackLogs] =
    useState(productBackLogs);
  const [selectedProductBackLogs, setSelectedProductBackLogs] = useState(
    displayProductBackLogs
  );
  const [productBackLogInFocus, setProductBackLogInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleNewProductBackLog = async () => {
    console.log('handleNewProductBackLog');
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  // const handleSearchTermChange = (e) => {
  //   e.preventDefault();

  //   setSearchTerm(e.target.value);
  //   setActiveSearchTerm(e.target.value);
  // };
  const handleResetFiltered = () => {
    setSelectedUserStories(displayUserStories);
    setIsFiltered(false);
  };
  const handleSetProductBackLogInFocus = (item) => {
    handleSetItemInFocus(setProductBackLogInFocus, item, setLatestItemInFocus);

    const foundUserStories = displayUserStories.filter((userStory) => {
      return item?.productBackLog_items?.some(
        (backLog_item) => backLog_item.userStory_id === userStory.id
      );
    });

    setSelectedUserStories(foundUserStories);

    const foundProducts = displayProducts.filter(
      (product) => product.id === item.productBackLog_id
    );
    setProductInFocus(foundProducts[0]);
  };
  useEffect(() => {
    setSelectedProductBackLogs(
      displayProductBackLogs.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedProductBackLogs(displayProductBackLogs);

    return () => {};
  }, [displayProductBackLogs]);
  return (
    <BackLogsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        setShowNewItem,
        optionsVertMenu,
        selectedWidgetContext,
        setSelectedWidgetContext,
        displayProductBackLogs,
        setDisplayProductBackLogs,
        selectedProductBackLogs,
        setSelectedProductBackLogs,
        productBackLogInFocus,
        setProductBackLogInFocus,
        searchTerm,
        setSearchTerm,
        isFiltered,
        setIsFiltered,
        handleNewProductBackLog,
        // handleSearchTermChange,
        handleResetFiltered,
        handleSetProductBackLogInFocus,
      }}
    >
      {children}
    </BackLogsContext.Provider>
  );
};
export default BackLogsContext;
export const BackLogsState = () => {
  return useContext(BackLogsContext);
};
