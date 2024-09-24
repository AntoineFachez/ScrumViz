import React, { memo, useState } from 'react';
import Menu from './Menu';
import { themeSettings } from '@/app/theme/ThemeContext';

const Index = ({
  menuProps,
  verticalArray,
  horizontalArray,
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
  const { palette, styled } = themeSettings('dark');
  const [isOpen, setIsOpen] = useState(false);
  // console.log(sliderValue);
  return (
    <>
      <Menu
        menuProps={menuProps}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        verticalArray={verticalArray}
        horizontalArray={horizontalArray}
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
