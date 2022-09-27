var Boid = function ( x, y, angle, gen ) {
  this.x = x;
  this.y = y;

  this.angle = Math.pow( Math.random(), 10 ) + angle;
  this.dx = Math.cos( this.angle );
  this.dy = Math.sin( this.angle );
  this.life = Math.random() * 30 + 10;
  this.gen = gen;
  this.dead = false;
  this.dist = dist(this.x, this.y, width/2, height/2);
  this.hue = Math.random() * 120;
  this.update = function () {
    roads_context.strokeStyle = '#808080';
    roads_context.beginPath();
    roads_context.moveTo( this.x, this.y );

    this.x += this.dx * 2; 
    this.y += this.dy * 2;
    
    this.dist = dist(this.x, this.y, width/2, height/2);
    
    roads_context.lineTo( this.x, this.y );
    roads_context.stroke();
    
    var trail = Math.random() * ( (50-10) * ((this.dist/width)*2) )+10;
    var color = {h: this.hue,s:"60%",l:"50%"}
    watercolor_context.strokeStyle="hsla("+color.h+","+color.s+","+color.l+",0.1)";
    watercolor_context.lineWidth=2;
    for ( var i = 0; i < 5; i ++ ) {
      watercolor_context.beginPath();
      watercolor_context.moveTo( this.x, this.y );
      var px = this.x + Math.cos( this.angle + 90)*(i*(trail/10));
      var py = this.y + Math.sin( this.angle + 90)*(i*(trail/10));
      watercolor_context.lineTo(px,py);
      watercolor_context.stroke();
    }
    
    var index = ( Math.floor( this.x ) + width * Math.floor( this.y ) ) * 4;

    if ( this.gen >=  this.life ) this.kill();
    if ( data[ index + 3 ] > 0 ) {
      this.kill();
      blocks++;
    }

    if ( this.x < 0 || this.x > width ) this.kill();						
    if ( this.y < 0 || this.y > height ) this.kill();

  }

  this.kill = function () {

    boids.splice( boids.indexOf( this ), 1 );
    this.dead = true;

  }

}
var dist = function(x1,y1,x2,y2){
  return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}


var width = 1500;
var height = 1500;

var canvas = document.getElementById( 'world' );
canvas.width = width;
canvas.height = height;

roads_canvas = document.createElement('canvas');
roads_canvas.width = width;
roads_canvas.height = height;
roads_context = roads_canvas.getContext('2d');

watercolor_canvas = document.createElement('canvas');
watercolor_canvas.width = width;
watercolor_canvas.height = height;
watercolor_context = watercolor_canvas.getContext('2d');

var context = canvas.getContext( '2d' );
var image, data;

var boids = [];

var blocks = 0;

boids.push( new Boid( width / 2, height / 2, Math.random() * 180 * Math.PI / 180, 0) );

var drawing = setInterval( function () {

  image = roads_context.getImageData( 0, 0, width, height );
  data = image.data;
  for ( var i = 0; i < boids.length; i ++ ) {

    var boid = boids[ i ];
    boid.update();
    // Looks messy but just sets a range
    var n =( (0.9-0.6) * ((boid.dist/width)*2) )+0.6;
    if ( !boid.dead && Math.random() > n && boids.length < 400 ) {
      boids.push( new Boid( boid.x, boid.y, ( Math.random() > 0.5 ? 90 : - 90 ) * Math.PI / 180 + boid.angle, boid.gen+1 ) );
    }
    
  }
  context.clearRect(0, 0, width, height);
  context.globalAlpha = 0.5;
  context.drawImage(watercolor_canvas, 0, 0);
  context.globalAlpha = 1;
  context.drawImage(roads_canvas, 0, 0); 
  
  if(boids.length == 0 ){
    clearInterval(drawing);
    console.log(blocks + " city blocks.");
  } 
}, 1000 / 60 );
