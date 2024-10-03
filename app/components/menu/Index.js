import React, { memo, useState } from 'react';
import Menu from './Menu';
import { useMode } from '@/app/theme/ThemeContext';

const Index = ({
  menuProps,
  verticalArray,
  horizontalArray,
  isFiltered,
  onResetFiltered,
  contextSelector,
  autoCompleteData,
  keys,
  imageUrl,
  query,
  setQuery,
  setAnswer,
  textfieldLabel,
  sliderValue,
  setSliderValue,
}) => {
  const [theme, colorMode, palette, styled] = useMode();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Menu
        menuProps={menuProps}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        verticalArray={verticalArray}
        horizontalArray={horizontalArray}
        isFiltered={isFiltered}
        onResetFiltered={onResetFiltered}
        contextSelector={contextSelector}
        autoCompleteData={autoCompleteData}
        keys={keys}
        imageUrl={imageUrl}
        query={query}
        setQuery={setQuery}
        setAnswer={setAnswer}
        textfieldLabel={textfieldLabel}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        styled={styled}
      />
    </>
  );
};

export default Index;
