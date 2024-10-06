import { Slider } from '@mui/material';
import React, { useState } from 'react';

export default function SliderComponent({
  size,
  value,
  setValue,
  //   defaultValue,
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
  //   const [value, setValue] = useState(defaultValue);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };
  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <>
      {/* {value} */}
      <Slider
        sx={{
          width: '100%',
          '& .MuiSlider-mark': {
            backgroundColor: 'white', // Change the color
            width: '4px', // Adjust the width
            height: '10px', // Adjust the height
            borderRadius: '1px', // Add rounded corners
          },
          '& .MuiSlider-markLabel': {
            // Style the mark labels
            color: 'white',
            fontSize: '12px',
          },
        }}
        value={value}
        onChange={handleChange}
        size={size}
        // defaultValue={defaultValue}
        aria-label={size}
        valueLabelDisplay="auto" //"on"
        getAriaValueText={valuetext}
        step={step}
        marks={marks}
        min={min}
        max={max}
        disabled={disabled} //boolean
      />
    </>
  );
}
