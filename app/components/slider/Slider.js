import { Slider } from '@mui/material';
import React, { useState } from 'react';

export default function SliderComponent({
  showExtendData,
  size,
  value,
  setValue,
  orientation,
  defaultValue,
  aria,
  valueLabelDisplay,
  step,
  marks,
  min,
  max,
  disabled,
  handleChange,
  styled,
}) {
  // const [value, setValue] = useState(defaultValue);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  function valuetext(value) {
    return `max token/ prompt: ${value}`;
  }
  return (
    <>
      {showExtendData ? valuetext(value) : null}
      <Slider
        sx={styled.slider}
        value={value}
        orientation={orientation}
        onChange={handleChange}
        size={size}
        // defaultValue={defaultValue}
        aria-label={size}
        valueLabelDisplay={valueLabelDisplay}
        getAriaValueText={showExtendData ? valuetext : null}
        step={step}
        marks={showExtendData ? marks : null}
        min={min}
        max={max}
        disabled={disabled} //boolean
      />
    </>
  );
}
