// Canvas de confeti
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase para el confeti
class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    getRandomColor() {
        const colors = [
            '#FF69B4', // Pink
            '#FFD700', // Gold
            '#87CEEB', // Sky Blue
            '#FF6347', // Tomato
            '#98FB98', // Pale Green
            '#DDA0DD', // Plum
            '#FFA500', // Orange
            '#FF1493'  // Deep Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Reiniciar si sale de la pantalla
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }

        this.draw();
    }
}

// Crear confeti inicial
let confettiArray = [];
for (let i = 0; i < 50; i++) {
    confettiArray.push(new Confetti());
}

// Animar confeti
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiArray.forEach(confetti => {
        confetti.update();
    });

    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Botón de celebración
const celebrateBtn = document.getElementById('celebrateBtn');
let clickCount = 0;

const celebrationMessages = [
    "¡Feliz cumpleaños Piojito! 🎂",
    "¡Que cumplas muchos más! 🎉",
    "¡Eres increíble! ✨",
    "¡Que todos tus deseos se cumplan! 🌟",
    "¡Te deseo lo mejor! 💖",
    "¡Que tengas un día maravilloso! 🎊",
    "¡Eres muy especial! 💝",
    "¡Celebremos juntos! 🎈"
];

celebrateBtn.addEventListener('click', function(e) {
    // Cambiar mensaje
    clickCount++;
    const messageIndex = clickCount % celebrationMessages.length;
    
    // Explosión de confeti extra
    createConfettiExplosion(e.clientX, e.clientY);
    
    // Mostrar mensaje
    showCelebrationMessage(celebrationMessages[messageIndex]);
    
    // Fuegos artificiales
    createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5);
    
    // Vibración en móviles
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
    
    // Sonido de celebración (opcional - comentado por defecto)
    // playCelebrationSound();
});

// Crear explosión de confeti
function createConfettiExplosion(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = new Confetti();
        confetti.x = x;
        confetti.y = y;
        confetti.speedX = (Math.random() - 0.5) * 10;
        confetti.speedY = Math.random() * -10 - 5;
        confettiArray.push(confetti);
    }
    
    // Limitar cantidad de confeti
    if (confettiArray.length > 150) {
        confettiArray.splice(0, 30);
    }
}

// Mostrar mensaje de celebración
function showCelebrationMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: white;
        background: rgba(255, 107, 157, 0.9);
        padding: 30px 50px;
        border-radius: 30px;
        text-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        pointer-events: none;
        animation: messagePopup 2.5s ease-out forwards;
        border: 5px solid #FFD700;
    `;
    
    // Agregar animación CSS
    if (!document.querySelector('#celebrationMessageAnimation')) {
        const style = document.createElement('style');
        style.id = 'celebrationMessageAnimation';
        style.textContent = `
            @keyframes messagePopup {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                80% {
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
    
    setTimeout(() => {
        messageEl.remove();
    }, 2500);
}

// Crear fuegos artificiales
function createFirework(x, y) {
    const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#FF6347', '#98FB98'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = Math.random() * 100 + 50;
        
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 999;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        const endX = x + Math.cos(angle) * velocity;
        const endY = y + Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Fuegos artificiales aleatorios periódicos
function randomFireworks() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;
    createFirework(x, y);
}

// Crear fuegos artificiales cada cierto tiempo
setInterval(randomFireworks, 3000);

// Fuego artificial inicial después de 2 segundos
setTimeout(randomFireworks, 2000);

// Animación de velas parpadeantes (simulada)
const candles = document.querySelectorAll('.candle');
candles.forEach((candle, index) => {
    setInterval(() => {
        const flame = candle.querySelector('.flame');
        if (flame) {
            flame.style.opacity = Math.random() * 0.3 + 0.7;
        }
    }, 100 + index * 50);
});

// Mensaje de bienvenida
setTimeout(() => {
    showCelebrationMessage('¡Feliz Cumpleaños America! 🎂🎉');
}, 1000);

// Reproducir música de cumpleaños (opcional - comentado)
/*
function playCelebrationSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Notas de "Feliz Cumpleaños"
    const notes = [
        {freq: 262, duration: 0.25}, // C
        {freq: 262, duration: 0.25}, // C
        {freq: 294, duration: 0.5},  // D
        {freq: 262, duration: 0.5},  // C
        {freq: 349, duration: 0.5},  // F
        {freq: 330, duration: 1}     // E
    ];
    
    let time = audioContext.currentTime;
    
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
        
        oscillator.start(time);
        oscillator.stop(time + note.duration);
        
        time += note.duration;
    });
}
*/

console.log('🎂 ¡Feliz Cumpleaños America Azyade "Piojito"! 🎉');
console.log('💖 Que tengas un día maravilloso lleno de amor y felicidad 💖');
