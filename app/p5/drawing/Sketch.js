import React from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

export default function Sketch({ width, height, isModified }) {
  const sketchRef = useRef(null);
  const previousDrawing = useRef(); // Store previous drawing
  const previousLines = useRef([]); // Store previous lines
  // let previousWidth;
  // let previousHeight;
  const Sketch = (p) => {
    let g;
    let x = 0;
    let y = 0;
    p.preload = () => {};
    //
    p.setup = () => {
      // previousWidth = width; // Store previous width
      // previousHeight = height; // Store previous height
      p.createCanvas(width, height);
      p.colorMode(p.HSB);
      p.background(0, 0, 0, 0);
      g = p.createGraphics(width, height);
      // Redraw previous drawing if available
      if (previousDrawing.current) {
        g.image(previousDrawing.current, 0, 0, width, height);
      }
      // if (previousLines.current) {
      //   previousLines.current.forEach((line) => {
      //     g.stroke(0, 128, 200);
      //     g.strokeWeight(3);

      //     // Recalculate line coordinates
      //     const x1 = (line.x1 / previousWidth) * width;
      //     const y1 = (line.y1 / previousHeight) * height;
      //     const x2 = (line.x2 / previousWidth) * width;
      //     const y2 = (line.y2 / previousHeight) * height;

      //     g.line(x1, y1, x2, y2);
      //   });
      // }
    };

    p.draw = () => {
      let a = p.mouseIsPressed ? 9 : 1; // Acceleration factor
      let u = x;
      let v = y;

      x += (p.mouseX - x) / a; // Update x position
      y += (p.mouseY - y) / a;
      p.clear();
      p.background(0, 0, 0, 0);
      g.stroke(0, 128, 200);
      g.strokeWeight(3);
      u = x;
      v = y;
      if (a == 9) {
        g.line(x, y, u, v);
        // previousLines.current.push({ x1: x, y1: y, x2: u, y2: v });
      }
      p.image(g, 0, 0, width, height);
      previousDrawing.current = g.get();
    };
  };

  useEffect(() => {
    let inst = new p5(Sketch, sketchRef.current);
    // previousWidth = width;
    // previousHeight = height;
    return () => {
      // previousWidth = width;
      // previousHeight = height;
      inst.remove();
    };
    // Optionally clear previous drawing if needed
    // previousDrawing.current = null;
  }, [width, height, isModified]);

  return <div ref={sketchRef}></div>;
}
