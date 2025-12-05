// Crear pétalos del girasol ultra detallados
function createPetals() {
    const petals = document.getElementById('petals');
    
    // Capa externa de pétalos
    const petalCount = 16;
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.transform = `rotate(${i * (360 / petalCount)}deg) translateX(28px)`;
        petal.style.animationDelay = (i * 0.05) + 's';
        petals.appendChild(petal);
    }
    
    // Segunda capa de pétalos
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.transform = `rotate(${i * 30 + 15}deg) translateX(22px)`;
        petal.style.width = '40px';
        petal.style.height = '15px';
        petal.style.opacity = '0.9';
        petals.appendChild(petal);
    }
}

// Crear corazones de fondo con variedad
function createHearts() {
    const container = document.getElementById('hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '🩷'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.animationDuration = (8 + Math.random() * 5) + 's';
        heart.style.fontSize = (16 + Math.random() * 20) + 'px';
        container.appendChild(heart);
    }
}

// Botón "Sí" - celebración
function sayYes() {
    const response = document.getElementById('response');
    response.textContent = '¡Yaaay! 💕🎉 ¡Te quiero mucho! 💖';
    response.classList.add('show');
    
    document.querySelector('.sunflower-container').classList.add('celebrate');
    createHeartExplosion();
    
    // Cambiar el botón No
    const noBtn = document.getElementById('noBtn');
    noBtn.textContent = '¡Sííí! 💕';
    noBtn.style.background = 'linear-gradient(135deg, #ff6b9d, #e91e63)';
    noBtn.onclick = () => createHeartExplosion();
}

// Botón "No" - se escapa del cursor
const noBtn = document.getElementById('noBtn');
let escapeCount = 0;

noBtn.addEventListener('mouseover', () => {
    escapeCount++;
    
    if (escapeCount < 6) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 100;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        noBtn.style.transition = 'transform 0.2s ease-out';
        
        // Textos progresivos
        const texts = ['No 😢', '¿Seguro? 🥺', 'Piénsalo 💭', 'Ándale 🙏', '¡Por favor! 💕'];
        noBtn.textContent = texts[Math.min(escapeCount - 1, texts.length - 1)];
    } else {
        noBtn.textContent = '¡Sí, quiero! 💖';
        noBtn.onclick = sayYes;
        noBtn.style.transform = 'translate(0, 0)';
        noBtn.style.background = 'linear-gradient(135deg, #ff6b9d, #e91e63)';
    }
});

// Explosión de corazones
function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝'];
    
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                font-size: ${22 + Math.random() * 25}px;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 120 + Math.random() * 180;
            
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1.3) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], { 
                duration: 1200 + Math.random() * 600, 
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
            });
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1800);
        }, i * 35);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    createHearts();
});
