let paletteBg = "#1d1d1b";
let paletteStroke = "#DEDDE2"; // light grey for outlines
let paletteColors = [
  "#F49306", "#F13D09", "#E0858E",
  "#A5BB1A", "#DEDDE2", "#F5CAE8"
];

let cols, rows, moduleSize;
let seed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  noFill();
  strokeCap(ROUND);
  
  cols = floor(random(4, 7));
  moduleSize = width / cols;
  rows = ceil(height / moduleSize);
  
  seed = random(1000);
}

function draw() {
  background(paletteBg);
  randomSeed(seed);
  noiseSeed(seed);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * moduleSize;
      let y = j * moduleSize;
      push();
      translate(x + moduleSize / 2, y + moduleSize / 2);

      // Stroke and fill handling
      let strokeCol = random(paletteColors);
      let fillCol = random(paletteColors.filter(c => c !== strokeCol));
      stroke(strokeCol);
      strokeWeight(1.5);
      fill(fillCol);

      let shapeType = floor(random(3));
      if (shapeType === 0) drawBlob(moduleSize * 0.35);
      else if (shapeType === 1) drawSpiral(moduleSize * 0.4);
      else drawWaveform(moduleSize * 0.8, 15);
      pop();
    }
  }
}

function drawBlob(radius) {
  let offset = frameCount * 0.01;
  beginShape();
  let points = 30;
  for (let i = 0; i < points; i++) {
    let angle = TWO_PI * i / points;
    let r = radius + noise(cos(angle) + offset, sin(angle) + offset) * 20;
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawSpiral(maxRadius) {
  let points = 80;
  beginShape();
  for (let i = 0; i < points; i++) {
    let angle = i * 0.25;
    let r = map(i, 0, points, 0, maxRadius);
    let x = cos(angle + frameCount * 0.01) * r;
    let y = sin(angle + frameCount * 0.01) * r;
    vertex(x, y);
  }
  endShape();
}

function drawWaveform(length, amplitude) {
  beginShape();
  let offset = frameCount * 0.1;
  for (let x = -length / 2; x <= length / 2; x += 5) {
    let y = sin(x * 0.1 + offset) * amplitude;
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
