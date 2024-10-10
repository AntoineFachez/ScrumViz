'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { products } from './mockProducts';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);
  const [displayProducts, setDisplayProducts] = useState(products);
  const [selectedProducts, setSelectedProducts] = useState(displayProducts);
  const [productInFocus, setProductInFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  // const handleSearchTermChange = (e) => {
  //   e.preventDefault();

  //   setSearchTerm(e.target.value);
  //   setActiveSearchTerm(e.target.value);
  // };
  const handleResetFiltered = () => {
    setSelectedProducts(displayUserStories);
    setIsFiltered(false);
  };
  useEffect(() => {
    setSelectedProducts(
      displayProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return () => {};
  }, [searchTerm]);
  useEffect(() => {
    setSelectedProducts(displayProducts);

    return () => {};
  }, [displayProducts]);
  return (
    <ProductsContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        // selectedWidgetContext,
        // setSelectedWidgetContext,
        displayProducts,
        setDisplayProducts,
        selectedProducts,
        setSelectedProducts,
        productInFocus,
        setProductInFocus,
        isFiltered,
        searchTerm,
        setSearchTerm,
        // handleSearchTermChange,
        handleResetFiltered,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsContext;
export const ProductsState = () => {
  return useContext(ProductsContext);
};
