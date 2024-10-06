import React, { memo, useContext, useState } from 'react';
import Menu from './Menu';
import { useMode } from '@/app/theme/ThemeContext';
import { Box } from '@mui/material';
import UIContext from '@/context/UIContext';

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
  const { showWidgetMenus, setShowWidgetMenus } = useContext(UIContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {showWidgetMenus && (
        <Box className="widgetMenu" sx={styled?.widgetMenu}>
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
        </Box>
      )}
    </>
  );
};

export default Index;
