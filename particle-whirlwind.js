const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;

// handle mouse
const mouse = {
  x: null,
  y: null,
  radius: 150
}

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;

});

window.addEventListener('touchmove', function(event) {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dirX = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 2);
    this.dirY = (Math.round(Math.random()) * 2 - 1) * (Math.random() * 2);
    this.velX = 0;
    this.velY = 0;
    this.size = Math.random() * 25;
    // this.color = "rgb(150, " + (Math.random() * 80)  + ", " + (Math.random() * 255) + ")";
    this.color = "rgb(0, 0, " + (Math.random() * 255) + ")";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  move() {

    // determine whether to follow cursor
    if (Math.abs(mouse.x - this.x) > ((25 / this.size) * 10)) {
      if (mouse.x < this.x) {
        this.x -= Math.random() * (6 - (this.size / 5));
        this.dirX = -2;
      }
      if (mouse.x > this.x) {
        this.x += Math.random() * (6 - (this.size / 5));
        this.dirX = 2;
      }
    }

    // check for boundaries
    if (this.x > canvas.width) { this.dirX = -1; this.x = canvas.width; }
    if (this.y > canvas.height) { this.dirY = -1; this.y = canvas.height; }
    if (this.x < 0) { this.dirX = 1; this.x = 0; }
    if (this.y < 0) { this.dirY = 1; this.y = 0; }

    // flutter
    this.x += this.dirX;
    this.y += this.dirY + Math.random();
  }
}

function init() {
  for (let i = 0; i < 2500; i++) {
    currentX += (Math.round(Math.random()) * 2 - 1) * (Math.random() * 10);
    currentY += (Math.round(Math.random()) * 2 - 1) * (Math.random() * 10);
    let x = currentX;
    let y = currentY;
    particleArray.push(new Particle(x, y));
    console.log(currentX + " " + currentY);
  }

}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].move();
  }
  requestAnimationFrame(animate);
}
animate();