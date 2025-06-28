---
layout: post
title: Atractores de Peter de Jong
description: Generador de atractores de Peter de Jong
---
##### Genera tu propio atractor

<div style="padding: 10px; max-width: 100%; box-sizing: border-box;">
  <!-- Parameter Controls -->
  <div style="display: grid; gap: 12px; margin-bottom: 15px;">
    
    <!-- Parameter A -->
    <div style="background: #f9f9f9; padding: 10px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label style="font-weight: bold; font-size: 14px; color: #333;">a:</label>
        <input type="number" id="a" step="0.001" value="1.400" min="-8" max="8" inputmode="decimal" 
               style="width: 70px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; 
                      font-size: 13px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-a" min="-8" max="8" step="0.001" value="1.400" 
             style="width: 100%; height: 20px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e8e8e8 0%, #8db4a0 58.75%, #e8e8e8 100%); 
                    border-radius: 10px; outline: none; cursor: pointer;">
    </div>
    
    <!-- Parameter B -->
    <div style="background: #f9f9f9; padding: 10px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label style="font-weight: bold; font-size: 14px; color: #333;">b:</label>
        <input type="number" id="b" step="0.001" value="-2.300" min="-8" max="8" inputmode="decimal" 
               style="width: 70px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; 
                      font-size: 13px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-b" min="-8" max="8" step="0.001" value="-2.300" 
             style="width: 100%; height: 20px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e8e8e8 0%, #7a9bb8 35.625%, #e8e8e8 100%); 
                    border-radius: 10px; outline: none; cursor: pointer;">
    </div>
    
    <!-- Parameter C -->
    <div style="background: #f9f9f9; padding: 10px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label style="font-weight: bold; font-size: 14px; color: #333;">c:</label>
        <input type="number" id="c" step="0.001" value="2.400" min="-8" max="8" inputmode="decimal" 
               style="width: 70px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; 
                      font-size: 13px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-c" min="-8" max="8" step="0.001" value="2.400" 
             style="width: 100%; height: 20px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e8e8e8 0%, #b8956f 65%, #e8e8e8 100%); 
                    border-radius: 10px; outline: none; cursor: pointer;">
    </div>
    
    <!-- Parameter D -->
    <div style="background: #f9f9f9; padding: 10px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label style="font-weight: bold; font-size: 14px; color: #333;">d:</label>
        <input type="number" id="d" step="0.001" value="-2.100" min="-8" max="8" inputmode="decimal" 
               style="width: 70px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; 
                      font-size: 13px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-d" min="-8" max="8" step="0.001" value="-2.100" 
             style="width: 100%; height: 20px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e8e8e8 0%, #9a8aa3 36.875%, #e8e8e8 100%); 
                    border-radius: 10px; outline: none; cursor: pointer;">
    </div>
    
  </div>
  
</div>

<div id="warning" style="color: red; font-weight: bold; margin-top: 10px; display: none;">
  Los parámetros no son válidos.
</div>

<canvas id="canvas" style="background-color:#f8f8f8; margin-top: 15px; width: 100%; height: auto; max-width: 800px;"></canvas>

<style>
  /* Custom slider thumb styles for better mobile experience */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: white;
    border: 2px solid #555;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: white;
    border: 2px solid #555;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-moz-range-thumb:active {
    transform: scale(1.1);
  }
  
  /* Input number styling for iOS */
  input[type="number"] {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
  }
  
  input[type="number"]:focus {
    border-color: #708090;
    box-shadow: 0 0 0 2px rgba(112, 128, 144, 0.2);
    outline: none;
  }
  
  /* Responsive adjustments for very small screens */
  @media (max-width: 320px) {
    div[style*="padding: 10px"] {
      padding: 8px !important;
    }
    
    div[style*="gap: 12px"] {
      gap: 10px !important;
    }
    
    input[type="number"] {
      width: 65px !important;
      font-size: 12px !important;
    }
  }
</style>

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
  
  // Sync sliders with input boxes
  function syncSliderToInput(param) {
    const input = document.getElementById(param);
    const slider = document.getElementById('slider-' + param);
    
    input.addEventListener('input', function() {
      let value = parseFloat(this.value);
      if (isNaN(value)) value = 0;
      value = Math.max(-8, Math.min(8, value));
      slider.value = value;
      updateSliderBackground(param, value);
      draw(); // Automatically redraw when input changes
    });
    
    slider.addEventListener('input', function() {
      const value = parseFloat(this.value);
      input.value = value.toFixed(3);
      updateSliderBackground(param, value);
      draw(); // Automatically redraw when slider changes
    });
  }
  
  // Update slider background to show current position
  function updateSliderBackground(param, value) {
    const slider = document.getElementById('slider-' + param);
    const percentage = ((value + 8) / 16) * 100;
    
    const colors = {
      'a': '#8db4a0',
      'b': '#7a9bb8', 
      'c': '#b8956f',
      'd': '#9a8aa3'
    };
    
    const color = colors[param];
    slider.style.background = `linear-gradient(to right, #e8e8e8 0%, ${color} ${percentage}%, #e8e8e8 100%)`;
  }
  
  // Initialize synchronization for all parameters
  ['a', 'b', 'c', 'd'].forEach(param => {
    syncSliderToInput(param);
    const value = parseFloat(document.getElementById(param).value);
    updateSliderBackground(param, value);
  });
  
  // Add haptic feedback for iOS (if supported)
  if ('vibrate' in navigator) {
    document.querySelectorAll('input[type="range"]').forEach(slider => {
      slider.addEventListener('input', () => {
        navigator.vibrate(10); // Light haptic feedback
      });
    });
  }
  
  // Initial draw
  draw();
</script>
