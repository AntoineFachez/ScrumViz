import React from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

export default function Sketch({ imageUrls, width, height, isModified }) {
  console.log('imageUrls', imageUrls, width, height);
  const sketchRef = useRef(null);
  let images = [];

  const Sketch = (p) => {
    const canvasWidth = width;
    const canvasHeight = height;

    p.preload = () => {
      for (let imageUrl of imageUrls) {
        let img = p.loadImage(
          imageUrl,
          (img) => {
            // Image loaded successfully
            images.push(img);
          },
          (error) => {
            // Error handling if image fails to load
            console.error('Error loading image:', error);
          },
          {
            // Set crossOrigin to 'anonymous'
            crossOrigin: 'anonymous',
          }
        );
      }
    };
    //
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.colorMode(p.HSB);
      p.background(0, 0, 0, 0);
    };

    p.draw = () => {
      p.clear();
      p.background(0, 0, 0, 0);
      let x = 0;
      let y = 0;

      for (let img of images) {
        p.image(img, x, y);
        x += img.width;

        if (x > width) {
          x = 0;
          y += img.height;
        }
      }
    };
  };

  useEffect(() => {
    let inst = new p5(Sketch, sketchRef.current);
    return () => inst.remove();
  }, [imageUrls, width, height, isModified]);

  return <div ref={sketchRef}></div>;
}
