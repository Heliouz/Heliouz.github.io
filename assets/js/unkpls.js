/*
p5 noise
https://codepen.io/enxaneta/pen/7e315d161a8ee073ded48ab5d1669290
*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var c = {}
var cw = canvas.width = 600;
c.x = cw / 2;
var ch = canvas.height = 600;
c.y = ch / 2;
ctx.lineJoin = "round";
ctx.strokeStyle = "#0D3251";
ctx.fillStyle = "rgba(0,0,0,1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#f3f3f3"; //HERE, use HEX format in 6 digits
var rad = Math.PI / 180;
var x, y;

var amplitude = 5;
var frequency = .02;
var phi = 0;

var increment = 0.05;
var lines = [];

function SquigglyLine(y) {
  this.y = y;
  this.xoff = Math.random() * 10000;
  this.Xoff = this.xoff;
  this.phi = Math.random() * 10000;
  this.draw = function(i) {
    ctx.beginPath();

    this.xoff = this.Xoff; // reset xoff;

    for (var x = -2; x < cw + 2; x++) {

      if (x > cw / 3 && x < 2 * cw / 3) {
        var k = map(x, cw / 3, 2 * cw / 3, 0, 180);
      } else {
        k = 0;
      }

      var y = -Math.abs(Math.sin((x + noise(this.xoff) * 100) * frequency + this.phi) * (amplitude + Math.sin(k * rad) * 50)) + this.y;

      ctx.lineTo(x, y);

      this.xoff += increment;

    }
    ctx.lineTo(cw + 2, ch + 2);
    ctx.lineTo(-2, ch + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

  }
}

for (var y = 60; y < ch; y += 16) {

  var line = new SquigglyLine(y);
  lines.push(line);

}

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  ctx.fillRect(0, 0, cw, ch);

  noiseDetail(2, .5);

  for (var i = 0; i < lines.length; i++) {
    lines[i].phi += 1 / 30;
    lines[i].draw(i);
  }

}

requestId = window.requestAnimationFrame(Draw);

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + (n - a) * u;
}
