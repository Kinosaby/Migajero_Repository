// Canvas para partículas de corazones
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

// Ajustar tamaño del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Array de partículas
let particles = [];

// Clase para las partículas de corazón
class HeartParticle {
  constructor(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || canvas.height + 10;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.color = this.getRandomColor();
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.1;
  }

  getRandomColor() {
    const colors = [
      "rgba(255, 105, 180, ", // Hot Pink
      "rgba(255, 182, 193, ", // Light Pink
      "rgba(219, 112, 147, ", // Pale Violet Red
      "rgba(255, 20, 147, ", // Deep Pink
      "rgba(255, 192, 203, ", // Pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    // Dibujar corazón
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(0, topCurveHeight);

    // Curva izquierda superior
    ctx.bezierCurveTo(
      -this.size / 2,
      -topCurveHeight,
      -this.size,
      topCurveHeight,
      0,
      this.size
    );

    // Curva derecha superior
    ctx.bezierCurveTo(
      this.size,
      topCurveHeight,
      this.size / 2,
      -topCurveHeight,
      0,
      topCurveHeight
    );

    ctx.fillStyle = this.color + this.opacity + ")";
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // Si sale de la pantalla, reiniciar
    if (this.y + this.size < 0) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }

    this.draw();
  }
}

// Crear partículas iniciales
function createInitialParticles() {
  for (let i = 0; i < 30; i++) {
    particles.push(
      new HeartParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    );
  }
}

// Animar partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });

  requestAnimationFrame(animateParticles);
}

// Botón interactivo
const loveButton = document.getElementById("loveButton");
let clickCount = 0;

const messages = [
  "¡Te amo! 💕",
  "Eres mi todo 💖",
  "Mi amor eterno 💗",
  "Juntos por siempre 💞",
  "Eres mi felicidad 💝",
  "Mi corazón es tuyo 💓",
  "Amor verdadero 💘",
  "Para siempre 💍",
];

loveButton.addEventListener("click", function (e) {
  // Cambiar mensaje
  clickCount++;
  const messageIndex = clickCount % messages.length;

  // Crear explosión de corazones
  createHeartExplosion(e.clientX, e.clientY);

  // Mostrar mensaje temporal
  showTemporaryMessage(messages[messageIndex]);

  // Efecto de vibración
  navigator.vibrate && navigator.vibrate(100);
});

// Crear explosión de corazones al hacer clic
function createHeartExplosion(x, y) {
  for (let i = 0; i < 15; i++) {
    const particle = new HeartParticle();
    particle.x = x;
    particle.y = y;
    particle.speedY = Math.random() * 5 + 2;
    particle.speedX = (Math.random() - 0.5) * 8;
    particle.size = Math.random() * 30 + 15;
    particles.push(particle);
  }

  // Limitar número de partículas
  if (particles.length > 100) {
    particles = particles.slice(-100);
  }
}

// Mostrar mensaje temporal
function showTemporaryMessage(message) {
  // Crear elemento de mensaje
  const messageEl = document.createElement("div");
  messageEl.textContent = message;
  messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 5px 20px rgba(255, 105, 180, 0.8);
        z-index: 10000;
        pointer-events: none;
        animation: messagePopup 2s ease-out forwards;
    `;

  // Agregar animación CSS
  if (!document.querySelector("#messageAnimation")) {
    const style = document.createElement("style");
    style.id = "messageAnimation";
    style.textContent = `
            @keyframes messagePopup {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                30% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                70% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -100%) scale(0.8);
                }
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(messageEl);

  // Eliminar después de la animación
  setTimeout(() => {
    messageEl.remove();
  }, 2000);
}

// Crear partículas al mover el mouse
let mouseTimeout;
document.addEventListener("mousemove", function (e) {
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    if (Math.random() > 0.7) {
      const particle = new HeartParticle();
      particle.x = e.clientX;
      particle.y = e.clientY;
      particle.size = Math.random() * 15 + 5;
      particles.push(particle);

      if (particles.length > 100) {
        particles.shift();
      }
    }
  }, 50);
});

// Inicializar
createInitialParticles();
animateParticles();

// Agregar efecto de título escribiéndose
const mainMessage = document.querySelector(".main-message");
const originalText = mainMessage.textContent;
mainMessage.textContent = "";

let charIndex = 0;
function typeWriter() {
  if (charIndex < originalText.length) {
    mainMessage.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 200);
  }
}

// Iniciar animación de escritura después de un breve delay
setTimeout(typeWriter, 500);

// Efecto de sonido (opcional - comentado por defecto)
/*
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // Do
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

loveButton.addEventListener('click', playSound);
*/
