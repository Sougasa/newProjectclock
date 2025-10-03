// ============================ CANVAS E ANIMAÇÃO ============================
const spaceCanvas = document.getElementById('spaceCanvas');
const spaceCtx = spaceCanvas.getContext('2d');
const nebulaCanvas = document.getElementById('nebulaCanvas');
const nebulaCtx = nebulaCanvas.getContext('2d');

let width = spaceCanvas.width = window.innerWidth;
let height = spaceCanvas.height = window.innerHeight;
nebulaCanvas.width = width;
nebulaCanvas.height = height;

window.addEventListener('resize', () => {
  width = spaceCanvas.width = window.innerWidth;
  height = spaceCanvas.height = window.innerHeight;
  nebulaCanvas.width = width;
  nebulaCanvas.height = height;
  initUniverse();
});

// ============================ CLASSES ============================
class Star {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.5 + 0.2;
    this.alpha = Math.random();
  }
  draw() {
    spaceCtx.beginPath();
    spaceCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    spaceCtx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    spaceCtx.fill();
  }
  update() {
    this.y -= this.speed;
    if(this.y < 0) this.y = height;
    this.alpha += (Math.random() - 0.5) * 0.05;
    if(this.alpha < 0) this.alpha = 0;
    if(this.alpha > 1) this.alpha = 1;
  }
}

class Planet {
  constructor(color, radius, speed) {
    this.x = Math.random() * width;
    this.y = Math.random() * height/2;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }
  draw() {
    spaceCtx.beginPath();
    spaceCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    spaceCtx.fillStyle = this.color;
    spaceCtx.fill();
  }
  update() {
    this.x += this.speed;
    if(this.x - this.radius > width) this.x = -this.radius;
  }
}

class Comet {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.length = Math.random() * 80 + 20;
    this.speed = Math.random() * 4 + 2;
    this.angle = Math.random() * Math.PI/3 + Math.PI/6;
  }
  draw() {
    spaceCtx.beginPath();
    spaceCtx.moveTo(this.x, this.y);
    spaceCtx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
    spaceCtx.strokeStyle = "rgba(255,255,255,0.8)";
    spaceCtx.lineWidth = 2;
    spaceCtx.stroke();
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    if(this.y > height || this.x > width) this.reset();
  }
}

class NebulaParticle {
  constructor() {
    this.x = Math.random()*width;
    this.y = Math.random()*height;
    this.size = Math.random()*50+50;
    this.alpha = Math.random()*0.2+0.05;
  }
  draw() {
    const gradient = nebulaCtx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);
    gradient.addColorStop(0, `rgba(142,68,173,${this.alpha})`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    nebulaCtx.fillStyle = gradient;
    nebulaCtx.beginPath();
    nebulaCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
    nebulaCtx.fill();
  }
}

// ============================ INICIALIZAÇÃO ============================
let stars = [], planets = [], comets = [], nebulas = [];

function initUniverse() {
  stars = []; planets = []; comets = []; nebulas = [];
  for(let i=0;i<250;i++) stars.push(new Star());
  planets.push(new Planet("#8e44ad",25,0.2));
  planets.push(new Planet("#e100ff",40,0.1));
  planets.push(new Planet("#ff00ff",15,0.3));
  for(let i=0;i<5;i++) comets.push(new Comet());
  for(let i=0;i<8;i++) nebulas.push(new NebulaParticle());
}

function animate() {
  spaceCtx.clearRect(0,0,width,height);
  nebulaCtx.clearRect(0,0,width,height);
  
  nebulas.forEach(n=>n.draw());
  stars.forEach(s=>{s.update();s.draw();});
  planets.forEach(p=>{p.update();p.draw();});
  comets.forEach(c=>{c.update();c.draw();});
  
  requestAnimationFrame(animate);
}

initUniverse();
animate();

// ============================ SCROLL ANIMATION ============================
function initScrollAnimation() {
  const scrollElements = document.querySelectorAll('.scroll-animate');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });

  scrollElements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initScrollAnimation);
