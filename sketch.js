let fishPositions = [];
let fishColors = ['#FF6347', '#1E90FF', '#32CD32', '#FFD700'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#d8e2dc"); // 修改背景顏色
  for (let i = 0; i < 4; i++) {
    fishPositions.push({ x: random(width), y: random(height / 2, height) });
  }
}

let yoff = 0.0;

function draw() {
  clear(); // 清除背景，確保海草和魚在網頁前面
  background("#d8e2dc"); // 修改背景顏色
  
  strokeWeight(30); // 將線條稍微細一點
  noFill();
  
  let colors = [
    'rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)', 
    'rgba(255, 255, 0, 0.2)', 'rgba(255, 0, 255, 0.2)', 'rgba(0, 255, 255, 0.2)', 
    'rgba(128, 0, 0, 0.2)', 'rgba(0, 128, 0, 0.2)', 'rgba(0, 0, 128, 0.2)', 
    'rgba(128, 128, 0, 0.2)', 'rgba(128, 0, 128, 0.2)', 'rgba(0, 128, 128, 0.2)', 
    'rgba(192, 192, 192, 0.2)', 'rgba(128, 128, 128, 0.2)', 'rgba(64, 64, 64, 0.2)'
  ];
  
  let additionalColors = [
    'rgba(255, 105, 180, 0.2)', 'rgba(75, 0, 130, 0.2)', 'rgba(255, 165, 0, 0.2)', 
    'rgba(0, 255, 127, 0.2)', 'rgba(255, 20, 147, 0.2)', 'rgba(0, 191, 255, 0.2)', 
    'rgba(255, 69, 0, 0.2)', 'rgba(154, 205, 50, 0.2)'
  ];
  
  let allColors = colors.concat(additionalColors);
  let spacing = width / 40; // 調整間距以適應40條海草
  
  for (let i = 0; i < 40; i++) { // 增加海草的數量到40條
    stroke(allColors[i % allColors.length]);
    beginShape();
    let xoff = 0;
    let seaweedHeight = (i % 2 === 0) ? height / 2 : height / 1.5; // 單數的海草會比較低一點
    for (let y = height; y >= seaweedHeight; y -= 10) {
      let x = map(noise(xoff, yoff + i * 0.1), 0, 1, spacing * i - 70, spacing * i + 70); // 增加擺動幅度，使海草重疊
      vertex(x, y);
      xoff += 0.05;
    }
    endShape();
  }
  
  yoff += 0.01;
  
  // Draw fish
  let fishLength = 60; // 6 cm in pixels
  let fishWidth = 40;  // 4 cm in pixels
  
  for (let i = 0; i < fishPositions.length; i++) {
    fill(fishColors[i]);
    noStroke();
    let fishX = fishPositions[i].x;
    let fishY = fishPositions[i].y;
    ellipse(fishX, fishY, fishLength, fishWidth); // Fish body
    triangle(fishX - fishLength / 2, fishY, fishX - fishLength / 2 - 20, fishY - 10, fishX - fishLength / 2 - 20, fishY + 10); // Fish tail
    
    // Move fish to the right
    fishPositions[i].x += 2;
    
    // Loop fish back to the left if it goes off the right edge
    if (fishPositions[i].x > width) {
      fishPositions[i].x = 0;
    }
  }
}

