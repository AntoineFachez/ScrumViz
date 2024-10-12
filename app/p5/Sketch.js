import React from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

export default function Sketch({ width, height, isModified }) {
  const sketchRef = useRef(null);

  const Sketch = (p) => {
    const canvasWidth = width;
    const canvasHeight = height;

    p.preload = () => {};
    //
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.colorMode(p.HSB);
      p.background(0, 0, 0, 0);
    };

    p.draw = () => {
      p.clear();
      p.background(0, 0, 0, 0);
    };
  };

  useEffect(() => {
    let inst = new p5(Sketch, sketchRef.current);
    return () => inst.remove();
  }, [width, height, isModified]);

  return <div ref={sketchRef}></div>;
}
