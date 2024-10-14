import React from 'react';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';

export default function Sketch({ width, height, isModified }) {
  const sketchRef = useRef(null);

  const Sketch = (p) => {
    let ps;
    let imgP_X = [];
    let imgP_Y = [];
    let iter = 0;

    p.setup = () => {
      p.createCanvas(width, height);
      p.colorMode(p.HSB);
      // p.background(0, 0, 0, 0);

      var point = p.createVector(p.width / 2, p.height / 2);
      ps = new ParticleSystem(point.x, point.y);

      for (var i = 0; i < 100; i++) {
        let posX = 70 * p.cos((2 * p.PI * i) / 100) + p.width / 2;
        let posY = 70 * p.sin((2 * p.PI * i) / 100) + p.height / 2;
        imgP_X.push(posX);
        imgP_Y.push(posY);
      }
    };

    p.draw = () => {
      let countFrame = p.frameCount / 2 + 200;
      p.clear();
      p.blendMode(p.BLEND);
      p.background(0, 0, 0, 0);

      // p.blendMode(p.ADD);

      if (p.frameCount % 10 === 0) {
        ps.initColor();
      }

      ps.addParticle(imgP_X[iter], imgP_Y[iter]);
      iter += 1;
      if (imgP_X.length <= iter) {
        iter = 0;
      }
      ps.run();
    };
    class ParticleSystem {
      constructor(x, y, f) {
        this.particles = new Array();
        this.origin = p.createVector(x, y);
        this.runtime = 0;
        this.colorR = 0;
        this.colorG = 0;
        this.colorB = 0;
        this.f = f;
      }

      addParticle(X, Y) {
        //noise

        // var x_ = this.origin.x + p.noise(this.runtime) * 100 + 100;
        // var y_ = this.origin.y;

        //random

        // var x_ = this.origin.x + p5.random(-100, 100);
        // var y_ = this.origin.y + p5.random(-100, 100);

        //circle

        // var rad = this.runtime;
        // var x_ = this.origin.x + 80 * p.cos(this.runtime);
        // var y_ = this.origin.y + 80 * p.sin(this.runtime);
        // this.runtime = this.runtime + 0.1;
        // if (2 * p.PI < this.runtime) {
        //   this.runtime = 0;
        // }

        //wave
        // var x_ = p.map(this.runtime, 0, 2 * p.PI, 0, p.width);
        // var y_ = height / 2 + 100 * p.sin(this.runtime);
        // this.runtime = this.runtime + 0.05;
        // if (2 * p.PI < this.runtime) {
        //   this.runtime = 0;
        // }

        //sp.piral

        // var r = 10;
        // var x_ = this.origin.x + r * this.runtime * p.cos(this.runtime);
        // var y_ = this.origin.y + r * this.runtime * p.sin(this.runtime);
        // this.runtime = this.runtime + 0.1;
        // if (6 * p.PI < this.runtime) {
        //   this.runtime = 0;
        // }

        //Lissajous figure
        // var rad = this.runtime;
        // var x_ = this.origin.x + 100 * p.cos(3 * this.runtime);
        // var y_ = this.origin.y + 100 * p.sin(2 * this.runtime);
        // this.runtime = this.runtime + 0.1;
        // if (2 * p.PI < this.runtime) {
        //   this.runtime = 0;
        // }

        //mouse
        // var x_ = p.mouseX;
        // var y_ = p.mouseY;

        var x_ = X;
        var y_ = Y;
        this.particles.push(
          new Particle(x_, y_, this.colorR, this.colorG, this.colorB)
        );
      }

      applyForce(fx, fy) {
        this.particles.forEach(function (value) {
          value.applyForce(fx, fy);
        });
      }

      run() {
        var removeIndexs = new Array();
        this.particles.forEach(function (value, index) {
          value.update();
          value.display();
          if (value.isDead()) {
            removeIndexs.push(index);
          }
        });
        for (var i = 0; i < removeIndexs.length; i++) {
          this.particles.splice(removeIndexs[i], 1);
        }

        for (var i = 0; i < this.particles.length; i++) {
          var p1 = p.createVector(
            this.particles[i].location.x,
            this.particles[i].location.y
          );
          for (var j = i + 1; j < this.particles.length; j++) {
            var p2 = p.createVector(
              this.particles[j].location.x,
              this.particles[j].location.y
            );
            displayline(
              p1,
              p2,
              this.particles[i].lifespan,
              this.particles[i].R,
              this.particles[i].G,
              this.particles[i].B
            );
          }
        }
      }

      initOrigin(X, Y) {
        this.origin.x = X;
        this.origin.y = Y;
      }
      initColor() {
        this.colorR = p.random(0, 255); //255;
        this.colorG = p.random(0, 255);
        this.colorB = p.random(0, 255);
      }
    }

    class Particle {
      constructor(x, y, R, G, B) {
        this.mass = 1;
        this.r = 1;
        this.location = p.createVector(x, y);
        this.velocity = p.createVector(
          p.random(-0.2, 0.2),
          p.random(-0.2, 0.2)
        );
        this.accelaration = p.createVector(0, 0);
        this.lifespan = 200;
        this.c = p.color(0, 0, 0);
        this.R = R;
        this.G = G;
        this.B = B;
      }

      run() {
        this.update();
        this.display();
      }

      applyForce(fx, fy) {
        var force = p.createVector(fx, fy);
        var f = p5.Vector.div(force, this.mass);
        this.accelaration.add(f);
      }

      update() {
        this.velocity.add(this.accelaration);
        this.location.add(this.velocity);
        this.accelaration.mult(0);
        this.lifespan = this.lifespan - 2;
      }

      display() {
        p.noStroke(0);
        this.c.setAlpha(this.lifespan);
        p.fill(this.c);
        // p.ellipse(this.location.x, this.location.y, 5, 5);
      }

      checkEdges() {
        if (this.location.x + this.r / 2 > p.width) {
          this.location.x = p.width - this.r / 2;
          this.velocity.x *= -1;
        } else if (this.location.x + this.r / 2 < 0) {
          this.location.x = this.r / 2;
          this.velocity.x *= -1;
        }
        if (this.location.y + this.r / 2 > p.height) {
          this.location.y = p.height - this.r / 2;
          this.velocity.y *= -1;
        }
      }

      isDead() {
        if (this.lifespan < 0) {
          return 1;
        } else {
          return 0;
        }
      }
    }

    function displayline(p1, p2, lifespan, R, G, B) {
      var lineAlpha = 40;
      var connectionRadius = 18;
      var distance = p5.Vector.dist(p1, p2);
      var a = Math.pow(1 / (distance / connectionRadius + 1), 8);
      if (10 < distance && distance <= connectionRadius) {
        p.push();
        p.linecolor = p.color(
          255 - lifespan * 2,
          180 - lifespan * 0.7,
          455 - lifespan * 1.3,
          a * lineAlpha
        );
        p.stroke(p.linecolor);
        //stroke(0,0,255);
        p.line(p1.x, p1.y, p2.x, p2.y);
        p.pop();
      }
    }
  };

  useEffect(() => {
    let inst = new p5(Sketch, sketchRef.current);
    return () => inst.remove();
  }, [width, height, isModified]);

  return <div ref={sketchRef}></div>;
}
