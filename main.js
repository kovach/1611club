var init0 = function() {
  mcanvas = document.createElement('canvas');
  mctx = mcanvas.getContext('2d');

  bcanvas = document.createElement('canvas');
  bctx = bcanvas.getContext('2d');

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  image0 = new Image();
  image0.src = 'welcome.jpg'

  image1 = new Image();
  image1.src = 'emoclew.jpg'
}

var rand = function(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

var rx = function(w) {
  return w * rand(0, window.innerWidth / w);
}
var ry = function(w) {
  return w * rand(0, window.innerHeight / w);
}

var w = 18;

var redraw = function() {
  var width = window.innerWidth, height = window.innerHeight;

  bctx.clearRect(0, 0, width, height);

  bctx.drawImage(mcanvas, 0, 0);
  bctx.globalCompositeOperation = 'source-in';
  bctx.drawImage(image1, 0, 0, window.innerWidth, window.innerHeight);

  bctx.globalCompositeOperation = 'destination-over';
  bctx.drawImage(image0, 0, 0, window.innerWidth, window.innerHeight);

  ctx.drawImage(bcanvas, 0, 0);
}

var resize = function() {
  bcanvas.width = window.innerWidth;
  bcanvas.height = window.innerHeight;
  mcanvas.width = window.innerWidth;
  mcanvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

var update = function() {
  var x = rx(w), y = ry(w);
  mctx.fillRect(x, y, w, w);
  redraw();
  console.log('update!');
}

var timestep = function() {
  update();
  setTimeout(timestep, rand(20, 150));
}

var test = function() {
  i = 0;
  while (i < 150) {
    var x = rx(w), y = ry(w);
    mctx.fillRect(x, y, w, w);
    i++;
  }
  redraw();
}

var init = function() {
  ready++;
  if (ready > 1) {
    resize();
    timestep();
    //test();
  }
}

var ready = 0;
init0();

image0.onload = init
image1.onload = init
