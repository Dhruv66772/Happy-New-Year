// Countdown Timer
const countdown = () => {
  const now = new Date().getTime();
  const newYear = new Date('January 1, 2025 00:00:00').getTime();
  const timeLeft = newYear - now;

  if (timeLeft <= 0) {
    clearInterval(timer);
    document.querySelector('.greeting').innerText = '🎉 Happy New Year 2025 🎉';
    startFireworks();
    return;
  }

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
};

// Fireworks Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = color;
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
    if (this.alpha <= 0) this.alpha = 0;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const createFirework = (x, y) => {
  const colors = ['#ff5f6d', '#ffc371', '#85d8ce', '#ffe08c'];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
};

const animateFireworks = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateFireworks);
};

// Initialize Fireworks on Splash Screen
const triggerSplashFireworks = () => {
  createFirework(canvas.width / 2, canvas.height / 2); // Center Firework
  createFirework(Math.random() * canvas.width, Math.random() * canvas.height); // Random Fireworks
};

// Transition Splash Screen to Countdown
const startCountdown = () => {
  document.querySelector('.splash-screen').classList.add('hidden');
  document.querySelector('.hero').classList.remove('hidden');
  timer = setInterval(countdown, 1000);
};

// Run Script
let timer;
setTimeout(startCountdown, 3000); // 3 seconds for splash screen
setInterval(triggerSplashFireworks, 500); // Trigger fireworks every 500ms
animateFireworks();
