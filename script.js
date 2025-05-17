// Intro overlay dismissal
const introOverlay = document.querySelector('.intro-overlay');
const unwrapSound = new Audio('https://www.soundjay.com/misc/paper-crumple-1.mp3');
unwrapSound.volume = 0.3;
introOverlay.addEventListener('click', () => {
  introOverlay.classList.add('hidden');
  unwrapSound.play();
  setTimeout(() => {
    document.querySelector('.container').classList.add('visible');
  }, 800);
});

// Scroll-based section visibility
const sections = document.querySelectorAll('.reels-section, .insta-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Parallax effect
window.addEventListener('scroll', () => {
  const bgOverlay = document.querySelector('.bg-overlay');
  const scrollY = window.scrollY;
  bgOverlay.style.transform = `translateY(${scrollY * -0.3}px)`;
});

// Balloon animation
const balloonCanvas = document.getElementById('balloon-canvas');
balloonCanvas.width = window.innerWidth;
balloonCanvas.height = window.innerHeight;
const balloonCtx = balloonCanvas.getContext('2d');
const balloons = [];

class Balloon {
  constructor() {
    this.x = Math.random() * balloonCanvas.width;
    this.y = balloonCanvas.height + 50;
    this.size = Math.random() * 15 + 15;
    this.speedY = -(Math.random() * 1.5 + 1);
    this.sway = Math.random() * 0.4;
    this.color = ['#f7cac9', '#d8b9ff', '#6d8299'][Math.floor(Math.random() * 3)];
    this.phase = Math.random() * Math.PI * 2;
    this.rotation = 0;
    this.bouncePhase = Math.random() * Math.PI * 2;
  }
  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.phase + this.y * 0.05) * this.sway;
    this.rotation += 0.02 * (Math.random() - 0.5);
    this.y += Math.sin(this.bouncePhase + this.y * 0.1) * 0.5;
    if (this.y < -this.size) {
      this.y = balloonCanvas.height + 50;
      this.x = Math.random() * balloonCanvas.width;
      this.rotation = 0;
    }
  }
  draw() {
    balloonCtx.save();
    balloonCtx.translate(this.x, this.y);
    balloonCtx.rotate(this.rotation);
    balloonCtx.beginPath();
    balloonCtx.arc(0, 0, this.size, 0, Math.PI * 2);
    balloonCtx.fillStyle = this.color;
    balloonCtx.fill();
    balloonCtx.beginPath();
    balloonCtx.moveTo(0, this.size);
    balloonCtx.lineTo(0, this.size + 15);
    balloonCtx.strokeStyle = '#3c4f76';
    balloonCtx.stroke();
    balloonCtx.restore();
  }
}

for (let i = 0; i < 25; i++) {
  balloons.push(new Balloon());
}

function animateBalloons() {
  balloonCtx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
  balloons.forEach(balloon => {
    balloon.update();
    balloon.draw();
  });
  requestAnimationFrame(animateBalloons);
}
animateBalloons();

// Confetti animation
const confettiCanvas = document.getElementById('confetti-canvas');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const confettiCtx = confettiCanvas.getContext('2d');
const confetti = [];

class Confetti {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = -10;
    this.size = Math.random() * 5 + 2;
    this.speedY = Math.random() * 3 + 2;
    this.color = ['#f7cac9', '#d8b9ff', '#6d8299'][Math.floor(Math.random() * 3)];
    this.rotation = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.1;
  }
  update() {
    this.y += this.speedY;
    this.rotation += this.spin;
    if (this.y > confettiCanvas.height + 10) {
      this.y = -10;
      this.x = Math.random() * confettiCanvas.width;
      this.speedY = Math.random() * 3 + 2;
    }
  }
  draw() {
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate(this.rotation);
    confettiCtx.fillStyle = this.color;
    confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    confettiCtx.restore();
  }
}

function triggerConfetti() {
  confetti.length = 0;
  for (let i = 0; i < 75; i++) {
    confetti.push(new Confetti());
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    c.update();
    c.draw();
  });
  requestAnimationFrame(animateConfetti);
}
setTimeout(() => {
  triggerConfetti();
  setInterval(triggerConfetti, 10000);
  document.addEventListener('click', triggerConfetti);
  animateConfetti();
}, 800);

// Sparkle animation
const sparkleCanvas = document.getElementById('sparkle-canvas');
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;
const sparkleCtx = sparkleCanvas.getContext('2d');
const sparkles = [];

class Sparkle {
  constructor() {
    this.x = Math.random() * sparkleCanvas.width;
    this.y = Math.random() * sparkleCanvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.fade = Math.random() * 0.01 + 0.005;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.fade;
    this.size = (Math.sin(this.pulsePhase + performance.now() * 0.002) * 0.5 + 1) * (Math.random() * 3 + 1);
    if (this.opacity <= 0) {
      this.x = Math.random() * sparkleCanvas.width;
      this.y = Math.random() * sparkleCanvas.height;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
    }
  }
  draw() {
    sparkleCtx.beginPath();
    sparkleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    sparkleCtx.fillStyle = `rgba(247, 202, 201, ${this.opacity})`;
    sparkleCtx.fill();
  }
}

for (let i = 0; i < 40; i++) {
  sparkles.push(new Sparkle());
}

function animateSparkles() {
  sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  sparkles.forEach(s => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animateSparkles);
}
animateSparkles();

window.addEventListener('resize', () => {
  balloonCanvas.width = window.innerWidth;
  balloonCanvas.height = window.innerHeight;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
});

// Typewriter sound
const typeSound = new Audio('https://cdn.freesound.org/previews/598/598496_5674468-lq.mp3');
typeSound.volume = 0.2;
let message = document.querySelector('.message');
let text = message.textContent;
message.textContent = '';
let i = 0;

function type() {
  if (i < text.length) {
    message.textContent += text.charAt(i);
    typeSound.play();
    i++;
    setTimeout(type, 80);
  }
}
setTimeout(type, 1300);

// Polaroid drop sound
const dropSound = new Audio('https://www.soundjay.com/misc/paper-drop-01.mp3');
dropSound.volume = 0.3;

// Gallery images (8 images + 2 group photos)
const imageUrls = [
  'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
  'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
];
const captions = [
  'Fearless Heart', 'Charming Glow', 'Wise Soul', 'Bold Spirit',
  'Dream Chaser', 'Golden Grace', 'Courageous Star', 'Joyful Light'
];
const zoomImages = [
  'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
  'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
];
const groupImages = [
  { url: 'Group1.jpg', caption: 'Squad Vibes' },
  { url: 'Group2.jpg', caption: 'Memories Forever' }
];

const gallery = document.getElementById('gallery');

// Regular polaroids
imageUrls.forEach((url, index) => {
  const polaroid = document.createElement('div');
  polaroid.className = 'polaroid';
  polaroid.style.animationDelay = `${index * 0.2}s`;
  const isZoomed = zoomImages.includes(url);
  polaroid.innerHTML = `
    <div class="flip-container">
      <div class="front">
        <img src="${url}" alt="Memory ${index + 1}" data-img="${url}" ${isZoomed ? 'class="zoom-img"' : ''}>
      </div>
      <div class="back">${captions[index]}</div>
    </div>
    <div class="polaroid-caption">${captions[index]}</div>
  `;
  gallery.appendChild(polaroid);
  polaroid.addEventListener('animationstart', () => {
    setTimeout(() => dropSound.play(), index * 200);
  });
});

// Group polaroids
groupImages.forEach((group, index) => {
  const polaroid = document.createElement('div');
  polaroid.className = 'group-polaroid';
  polaroid.style.animationDelay = `${(imageUrls.length + index) * 0.2}s`;
  polaroid.innerHTML = `
    <img src="${group.url}" alt="Group Photo ${index + 1}">
    <div class="polaroid-caption">${group.caption}</div>
  `;
  gallery.appendChild(polaroid);
  polaroid.addEventListener('animationstart', () => {
    setTimeout(() => dropSound.play(), (imageUrls.length + index) * 200);
  });
});

// Video error handling
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.muted = true;
  video.loop = true;
  video.addEventListener('error', (e) => {
    console.error(`Failed to load video: ${video.currentSrc}`, e);
  });
});