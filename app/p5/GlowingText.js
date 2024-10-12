import React from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

export default function Sketch({ width, height, isModified }) {
  const sketchRef = useRef(null);
  const message = 'Scrum Viz';
  let tmpMessage = '';
  let x = [];
  let t = 0;
  const Sketch = (p) => {
    const canvasWidth = width;
    const canvasHeight = height;

    p.preload = () => {};
    //
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.colorMode(p.HSB);
      p.background(0, 0, 0, 0);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.textSize((canvasWidth / message.length) * 0.4);
      p.textAlign(p.CENTER, p.CENTER);
      p.drawingContext.shadowBlur = 40;

      x[0] = 0;
      for (let i = 0; i < message.length; i++) {
        tmpMessage += message.charAt(i);
        x[i + 1] = p.textWidth(tmpMessage);
      }
    };

    p.draw = () => {
      p.clear();
      p.background(0, 0, 0, 0);
      for (let i = 0; i < message.length; i++) {
        p.drawingContext.shadowColor = p.color(
          (t + (360 * i) / message.length) % 360,
          100,
          100
        );
        p.text(
          message.charAt(i),
          x[i] + width / 2 - x[x.length - 1] / 2,
          height / 2
        );
      }

      t += 3;
    };
  };

  useEffect(() => {
    let inst = new p5(Sketch, sketchRef.current);
    return () => inst.remove();
  }, [width, height, isModified]);

  return <div ref={sketchRef}></div>;
}
