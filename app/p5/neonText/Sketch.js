import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

import localFont from 'next/font/local';

const fontFile = localFont({
  src: '../../fonts/FuturaLT-Light.ttf',
  variable: '--font-futura-lt-light',
});

export default function Sketch({
  width,
  height,
  textToWrite,
  mainObjColor,
  backgroundColor,
}) {
  console.log(width, height, textToWrite, mainObjColor, backgroundColor);
  const sketchRef = useRef(null);
  let pg;
  var font;
  const Sketch = (p) => {
    p.preload = () => {
      font = p.loadFont(fontFile);
    };
    p.setup = () => {
      p.createCanvas(width, height);
      p.background('#ffffff');

      p.noStroke();
    };

    p.draw = () => {
      p.clear();
      p.background(backgroundColor);
    };
  };
  useEffect(() => {
    let inst = new p5(Sketch, sketchRef.current);
    return () => inst.remove();
  }, [width, height, textToWrite, backgroundColor, mainObjColor]);

  return (
    <>
      <div id="p5-template" ref={sketchRef}></div>
    </>
  );
}
