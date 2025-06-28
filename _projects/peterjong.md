---
layout: post
title: Atractores de Peter de Jong
description: Generador de atractores de Peter de Jong
---
##### Genera tu propio atractor

<div style="padding: 15px; max-width: 100%; box-sizing: border-box;">
  <!-- Parameter Controls -->
  <div style="display: grid; gap: 20px; margin-bottom: 20px;">
    
    <!-- Parameter A -->
    <div style="background: #f9f9f9; padding: 15px; border-radius: 12px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <label style="font-weight: bold; font-size: 16px; color: #333;">a:</label>
        <input type="number" id="a" step="0.01" value="1.4" min="-10" max="10" inputmode="decimal" 
               style="width: 80px; padding: 8px 12px; border: 2px solid #ddd; border-radius: 8px; 
                      font-size: 16px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-a" min="-10" max="10" step="0.01" value="1.4" 
             style="width: 100%; height: 44px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e0e0e0 0%, #4CAF50 57%, #e0e0e0 100%); 
                    border-radius: 22px; outline: none; cursor: pointer;">
    </div>
    
    <!-- Parameter B -->
    <div style="background: #f9f9f9; padding: 15px; border-radius: 12px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <label style="font-weight: bold; font-size: 16px; color: #333;">b:</label>
        <input type="number" id="b" step="0.01" value="-2.3" min="-10" max="10" inputmode="decimal" 
               style="width: 80px; padding: 8px 12px; border: 2px solid #ddd; border-radius: 8px; 
                      font-size: 16px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-b" min="-10" max="10" step="0.01" value="-2.3" 
             style="width: 100%; height: 44px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e0e0e0 0%, #2196F3 38.5%, #e0e0e0 100%); 
                    border-radius: 22px; outline: none; cursor: pointer;">
    </div>
    
    <!-- Parameter C -->
    <div style="background: #f9f9f9; padding: 15px; border-radius: 12px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <label style="font-weight: bold; font-size: 16px; color: #333;">c:</label>
        <input type="number" id="c" step="0.01" value="2.4" min="-10" max="10" inputmode="decimal" 
               style="width: 80px; padding: 8px 12px; border: 2px solid #ddd; border-radius: 8px; 
                      font-size: 16px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-c" min="-10" max="10" step="0.01" value="2.4" 
             style="width: 100%; height: 44px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e0e0e0 0%, #FF9800 62%, #e0e0e0 100%); 
                    border-radius: 22px; outline: none; cursor: pointer;">
    </div>
    
    <!-- Parameter D -->
    <div style="background: #f9f9f9; padding: 15px; border-radius: 12px; border: 1px solid #e0e0e0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <label style="font-weight: bold; font-size: 16px; color: #333;">d:</label>
        <input type="number" id="d" step="0.01" value="-2.1" min="-10" max="10" inputmode="decimal" 
               style="width: 80px; padding: 8px 12px; border: 2px solid #ddd; border-radius: 8px; 
                      font-size: 16px; text-align: center; background: white; 
                      -webkit-appearance: none; appearance: none;">
      </div>
      <input type="range" id="slider-d" min="-10" max="10" step="0.01" value="-2.1" 
             style="width: 100%; height: 44px; -webkit-appearance: none; appearance: none; 
                    background: linear-gradient(to right, #e0e0e0 0%, #9C27B0 39.5%, #e0e0e0 100%); 
                    border-radius: 22px; outline: none; cursor: pointer;">
    </div>
    
  </div>
  
  <!-- Generate Button -->
  <button onclick="draw()" 
          style="width: 100%; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                 color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; 
                 cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); 
                 transition: all 0.3s ease; touch-action: manipulation;">
    Generar Atractor
  </button>
  
</div>

<div id="warning" style="color: red; font-weight: bold; margin-top: 10px; display: none;">
  Los parámetros no son válidos.
</div>

<canvas id="canvas" style="background-color:#f8f8f8; margin-top: 20px; width: 100%; height: auto; max-width: 800px;"></canvas>

<style>
  /* Custom slider thumb styles for better mobile experience */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    background: white;
    border: 3px solid #333;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 28px;
    height: 28px;
    background: white;
    border: 3px solid #333;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-moz-range-thumb:active {
    transform: scale(1.2);
  }
  
  /* Input number styling for iOS */
  input[type="number"] {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
  }
  
  input[type="number"]:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    outline: none;
  }
  
  /* Button hover effect */
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
  }
  
  button:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3) !important;
  }
  
  /* Responsive adjustments for very small screens */
  @media (max-width: 320px) {
    div[style*="padding: 15px"] {
      padding: 10px !important;
    }
    
    div[style*="gap: 20px"] {
      gap: 15px !important;
    }
    
    input[type="number"] {
      width: 70px !important;
      font-size: 14px !important;
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
      value = Math.max(-10, Math.min(10, value));
      slider.value = value;
      updateSliderBackground(param, value);
    });
    
    slider.addEventListener('input', function() {
      const value = parseFloat(this.value);
      input.value = value;
      updateSliderBackground(param, value);
    });
  }
  
  // Update slider background to show current position
  function updateSliderBackground(param, value) {
    const slider = document.getElementById('slider-' + param);
    const percentage = ((value + 10) / 20) * 100;
    
    const colors = {
      'a': '#4CAF50',
      'b': '#2196F3', 
      'c': '#FF9800',
      'd': '#9C27B0'
    };
    
    const color = colors[param];
    slider.style.background = `linear-gradient(to right, #e0e0e0 0%, ${color} ${percentage}%, #e0e0e0 100%)`;
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
