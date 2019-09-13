let image0;
let image1;
let canvasWidth;
let canvasHeight;

const makeCanvases = function() {
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

const redraw = function() {
  bctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // the magic compositing sequence
  bctx.drawImage(mcanvas, 0, 0);
  bctx.globalCompositeOperation = 'source-in';
  bctx.drawImage(image1, 0, 0, canvasWidth, canvasHeight);

  bctx.globalCompositeOperation = 'destination-over';
  bctx.drawImage(image0, 0, 0, canvasWidth, canvasHeight);

  ctx.drawImage(bcanvas, 0, 0);
}

let cellWidth;

// TODO: maybe handle window resizing after initial load. currently this function is called only once
const setDimensions = function() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  bcanvas.width = canvasWidth;
  bcanvas.height = canvasHeight;
  mcanvas.width = canvasWidth;
  mcanvas.height = canvasHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  cellWidth = Math.sqrt(canvasWidth * canvasHeight) / 60;
  cellWidth = Math.floor(cellWidth);
}

const rand = function(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
const rx = function(w) {
  return w * rand(0, window.innerWidth / w);
}
const ry = function(w) {
  return w * rand(0, window.innerHeight / w);
}

// overwrites one rectangle; redraw will fill it in with the reflected image
const tick = function() {
  const x = rx(cellWidth), y = ry(cellWidth);
  mctx.fillRect(x, y, cellWidth, cellWidth);
}

const mainLoop = function() {
  tick();
  redraw();
  setTimeout(mainLoop, rand(20, 150));
}

// draw a number of rectangles all at once
const test = function() {
  for (let i = 0; i < 550; i++) {
    tick();
  }
  redraw();
}

let imagesReady = 0;

const onImageLoaded = function() {
  imagesReady++;
  if (imagesReady > 1) {
    setDimensions();
    mainLoop();
    test();
  }
}

makeCanvases();

image0.onload = onImageLoaded
image1.onload = onImageLoaded
