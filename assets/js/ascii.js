window.onload = function() {
  var sprite = document.querySelector('img'),
      W = sprite.width,
      H = sprite.height,
      tcanvas = document.createElement('canvas'),
      tctx = tcanvas.getContext('2d'),
      ascii = document.querySelector('#ascii'),
      character = '', 
      string = '',
      frames = 0,
      container,
      frame_width = 0;

  tcanvas.width = W;
  tcanvas.height = H;
  tctx.fillStyle = '#fff';
  tctx.fillRect(0, 0, W, H);

  tctx.drawImage(sprite, 0, 0, W, H);

  var pixels = tctx.getImageData(0, 0, W, H),
      colorData = pixels.data,
      r, g, b, gray;

  for (var i = 0; i < colorData.length; i += 4) {
    r = colorData[i];
    g = colorData[i + 1];
    b = colorData[i + 2];
    gray = r*0.2126 + g*0.7152 + b*0.0722;
    colorData[i] = colorData[i + 1] = colorData[i + 2] = gray;
    if (gray > 250) character = ' ';
    else if (gray > 230) character = "'";
    else if (gray > 200) character = ":";
    else if (gray > 175) character = "*";
    else if (gray > 150) character = "+";
    else if (gray > 125) character = "#";
    else if (gray > 50) character = "W";
    else character = '@';

    string += character;

    if ( i !== 0 && (i / 4) % W === 0) {
      ascii.appendChild(document.createTextNode(string));
      ascii.appendChild(document.createElement('br'));
      string = '';
    }

  }
  frames = 8;
  container = document.getElementById("container");
  frame_width = parseInt(window.getComputedStyle(container).width)/frames;
  container.style.width = frame_width+"px";

  ascii.style.marginLeft = "0";

  container.style.width = frame_width+"px";

  ascii.style.marginLeft = 0;

  setInterval(loop, 1000 / 10);

  function loop() {
    var currentMarginLeft = parseFloat(ascii.style.marginLeft);
    if (currentMarginLeft === frame_width * (frames - 1) * -1) {
      ascii.style.marginLeft = '0px';
    } else {
      ascii.style.marginLeft = (currentMarginLeft - frame_width) + 'px';
    }
  }

  tctx.putImageData(pixels, 0, 0);
  tctx.clearRect(0, 0, W, H);
  sprite.parentNode.insertBefore(tcanvas, sprite);
}
