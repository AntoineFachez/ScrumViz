import React from 'react';

export default function Media({ itemInFocus, singleItemScheme }) {
  return (
    <>
      <img
        style={{
          zIndex: 1,
          bottom: 0,
          position: 'absolute',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
        src={itemInFocus[singleItemScheme.img_uri]}
        alt=""
      />
    </>
  );
}
