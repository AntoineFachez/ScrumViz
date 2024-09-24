import React from 'react';
import VerticalList from './VerticalList';

export default function Index({
  elements,
  keys,
  searchString,
  styled,
  setItemInFocus,
  handleSetInFocus,
  imagesLoaded,
}) {
  // console.log( data, keys, styled);
  return (
    <>
      <VerticalList
        elements={elements}
        keys={keys}
        searchString={searchString}
        styled={styled}
        setItemInFocus={setItemInFocus}
        handleSetInFocus={handleSetInFocus}
        imagesLoaded={imagesLoaded}
      />
    </>
  );
}
