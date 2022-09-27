---
layout: post
title: Mapa de México a lo Joy Division
description: Mapa topográfico de México hecho en Python
---

<div style="text-align: center">
  <canvas id="canvas" style="width:100%; padding: 0"></canvas>
</div>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"></script>
<script type="text/javascript" src="/assets/js/noisep5.js"></script>
<script type="text/javascript" src="/assets/js/unkpls.js"></script>


<img src="/assets/images/mapatopo/" alt="mapamex" width="100%"/>

<script type="text/javascript">
//you can play with these values here, but mine reporduce album art most closely I think
const config = {
    count: 80,
    separation: 6,
    width: 400,
    speed: 0.03,
    warity: 0.04
};


let lines = [];
let time = 0;

const gaussianCurve = x => Math.exp(-(Math.pow(x / 15, 2) / 2)) * 100;

function setup() {
    createCanvas(600, 200);
    background(0);

    for (let i = 0; i < config.count; i++) {
        lines.push(new DivisionLine(i * config.separation));
    }
}

let timeStamp = Date.now();
function draw() {
    background(243,243,243);
    const dt = Date.now() - timeStamp;
    //center it
    translate(
      width / 2 - config.width / 2,
      height / 1.8 - (config.count * config.separation) / 2
    );

    for (const line of lines) {
        line.draw();
    }

    time += config.speed * dt * 0.057;
    timeStamp = Date.now();
}

class DivisionLine {
    baseline;
    width = config.width;
    sampling = 3;
    timeOffset = 0;
    patternOffset = random(300);

    constructor(baseline) {
        this.baseline = baseline;
    }

    draw() {
        stroke(255);
        strokeWeight(2);
        fill(13,50,81);

        let noiseOffset = this.patternOffset;
        const steps = this.width / this.sampling;

        beginShape();
        for (let i = 0; i < steps; i++) {
            const noiseValue = noise(noiseOffset, time);
            const gaussValue = gaussianCurve(i - (steps / 2)) + 10;

            const value = abs(map(noiseValue, 0, 1, -gaussValue, gaussValue));

            vertex(this.sampling * i, this.baseline - value);
            noiseOffset += config.warity;
        }
        endShape();
    };
}
</script>
<canvas id="defaultCanvas0" style="width:100%; padding: 0"></canvas>
