import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

// import fontFile from '../fonts/FuturaLT-Light.ttf';

import localFont from 'next/font/local';

const fontFile = localFont({
  src: '../fonts/FuturaLT-Light.ttf',
  variable: '--font-futura-lt-light', // Optional: If it's a variable font
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
      // font = p.loadFont(
      //   fontFile,
      //   // () => {},
      //   (error) => {
      //     console.error('Error loading Font:', error);
      //   }
      // );
    };
    p.setup = () => {
      p.createCanvas(width, height);
      p.background('#ffffff');

      // pg = p.createGraphics(width, height);
      p.noStroke();
    };

    p.draw = () => {
      p.clear();
      p.background(backgroundColor);
      // pg.background(backgroundColor);
      // pg.fill(p.color(mainObjColor));
      // pg.textFont(font);
      // pg.textSize(60);
      // pg.push();
      // pg.translate(width / 2, height / 2);
      // pg.textAlign(p.CENTER, p.CENTER);
      // pg.text(textToWrite, 0, 0);
      // pg.pop();
      // let tilesX = 20;
      // let tilesY = 6;
      // let tileW = p.round(width / tilesX);
      // let tileH = p.round(height / tilesY);
      // for (let y = 0; y < tilesY; y++) {
      //   for (let x = 0; x < tilesX; x++) {
      //     // WARP
      //     let wave = p.round(
      //       p.sin(p.frameCount * p.sin(0.01 + 0.01) + x * y * 0.1) * 15
      //     );
      //     // SOURCE
      //     let sx = x * tileW + wave;
      //     let sy = y * tileH;
      //     let sw = tileW;
      //     let sh = tileH;
      //     // DESTINATION
      //     let dx = x * tileW;
      //     let dy = y * tileH;
      //     let dw = tileW;
      //     let dh = tileH;
      //     p.copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
      //   }
      // }
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
