let paletteBg = "#1d1d1b";
let paletteStroke = "#DEDDE2";
let paletteColors = [
  "#F49306", "#F13D09", "#E0858E",
  "#A5BB1A", "#DEDDE2", "#F5CAE8"
];

function refreshSketch() {
  seed = random(1000);
  redraw(); // force redraw since p5 loop is running
}

window.onload = function () {
  const btn = document.getElementById("refreshBtn");
  btn.addEventListener("click", refreshSketch);
};

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

      let strokeCol = random(paletteColors);
      let fillCol = random(paletteColors.filter(c => c !== strokeCol));
      stroke(strokeCol);
      strokeWeight(1.5);
      fill(fillCol);

      let shapeType = floor(random(4)); // Now 4 types
      if (shapeType === 0) drawBlob(moduleSize * 0.35);
      else if (shapeType === 1) drawSpiral(moduleSize * 0.4);
      else if (shapeType === 2) drawWaveform(moduleSize * 0.8, 15);
      else drawCircularFractal(moduleSize * 0.15, 3);

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

function drawCircularFractal(radius, depth) {
  if (depth <= 0 || radius < 2) return;

  ellipse(0, 0, radius * 2);
  let branches = 6;
  let angleOffset = frameCount * 0.01;

  for (let i = 0; i < branches; i++) {
    let angle = TWO_PI * i / branches + angleOffset;
    let newX = cos(angle) * radius * 1.5;
    let newY = sin(angle) * radius * 1.5;

    push();
    translate(newX, newY);
    scale(0.9);
    drawCircularFractal(radius * 0.5, depth - 1);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
