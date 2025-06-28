---
layout: post
title: Atractores de Peter de Jong
description: Generador de atractores de Peter de Jong
---

##### ¿Qué forma tiene el caos?

##### Pon tus paramétros y genera tu propio atractor:

<!--  -->
<div>
  <label>a: <input type="number" id="a" step="0.001" value="1.4"></label>
  <label>b: <input type="number" id="b" step="0.001" value="-2.3"></label>
  <label>c: <input type="number" id="c" step="0.001" value="2.4"></label>
  <label>d: <input type="number" id="d" step="0.001" value="-2.1"></label>
  <button onclick="draw()">Generar</button>
</div>
<div id="warning" style="color: red; font-weight: bold; margin-top: 10px; display: none;">
  Los parámetros no son válidos.
</div>
<canvas id="canvas" style="background-color:#f8f8f8; margin-top: 20px; width: 100%; height: auto; max-width: 800px;"></canvas>

<script>
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const size = Math.min(window.innerWidth - 20, 800);
    canvas.width = size;
    canvas.height = size;
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    draw();
  });

  function draw() {
    resizeCanvas();

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);
    const warning = document.getElementById('warning');
    warning.style.display = 'none';

    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const n = 500000;
    const xVals = new Array(n);
    const yVals = new Array(n);

    let x = 0.1, y = 0.1;
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    try {
      for (let i = 0; i < n; i++) {
        const newX = Math.sin(a * y) - Math.cos(b * x);
        const newY = Math.sin(c * x) - Math.cos(d * y);
        x = newX;
        y = newY;
        xVals[i] = x;
        yVals[i] = y;
        if (!isFinite(x) || !isFinite(y)) throw 'NaN detected';
        if (i > 100) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    } catch (e) {
      warning.style.display = 'block';
      return;
    }

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const scale = 0.9 * Math.min(width / rangeX, height / rangeY);
    const offsetX = width / 2 - scale * (minX + maxX) / 2;
    const offsetY = height / 2 - scale * (minY + maxY) / 2;

    ctx.fillStyle = '#2c3e50';
    ctx.globalAlpha = 0.4;

    for (let i = 0; i < n; i++) {
      const px = scale * xVals[i] + offsetX;
      const py = scale * yVals[i] + offsetY;
      ctx.fillRect(px, py, 0.3, 0.3);
    }

    ctx.globalAlpha = 1.0;
  }

  draw();
</script>
