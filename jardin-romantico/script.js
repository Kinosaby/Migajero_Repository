// Seleccionar todas las flores
const flowers = document.querySelectorAll('.flower');

// Mensajes románticos por tipo de flor
const romanticMessages = {
    rose: [
        "Las rosas son el lenguaje del amor 🌹",
        "Cada rosa que florece es un 'te amo' 💕",
        "Roja pasión, eterno romance 🌹",
        "Una rosa para la más bella 🌹✨"
    ],
    tulip: [
        "Los tulipanes declaran amor perfecto 🌷",
        "Pureza y belleza en cada pétalo 🌷",
        "Tu amor florece como tulipanes 💕",
        "Colores de amor sincero 🌷✨"
    ],
    lily: [
        "Lirios de elegancia y devoción 🌺",
        "Belleza que trasciende el tiempo 🌺",
        "Tu esencia es como un lirio 💕",
        "Sofisticación y amor puro 🌺✨"
    ],
    violet: [
        "Las violetas hablan de amor humilde 💜",
        "Pequeñas pero llenas de sentimiento 💜",
        "Ternura en cada violeta 💕",
        "Modestia y gran amor 💜✨"
    ],
    gerbera: [
        "Gerberas de alegría infinita 🌼",
        "Tu sonrisa ilumina como gerberas 🌼",
        "Felicidad en cada color 💕",
        "Radiante como una gerbera 🌼✨"
    ]
};

// Contador de clics para cada tipo
let clickCounts = {
    rose: 0,
    tulip: 0,
    lily: 0,
    violet: 0,
    gerbera: 0
};

// Agregar evento de clic a cada flor
flowers.forEach((flower, index) => {
    // Animación inicial escalonada
    flower.style.animation = `gentleSway 4s ease-in-out infinite ${index * 0.1}s`;
    
    flower.addEventListener('click', function(e) {
        const flowerType = this.dataset.type;
        
        // Incrementar contador
        clickCounts[flowerType]++;
        
        // Agregar clase de clic
        this.classList.add('clicked');
        
        // Crear partículas
        createHeartParticles(e.clientX, e.clientY, flowerType);
        
        // Mostrar mensaje romántico
        const messages = romanticMessages[flowerType];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showFloatingMessage(randomMessage, e.clientX, e.clientY);
        
        // Vibración en móviles
        if (navigator.vibrate) {
            navigator.vibrate([30, 20, 30]);
        }
        
        // Remover clase después de la animación
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 600);
        
        // Easter egg: 10 clics en el mismo tipo
        if (clickCounts[flowerType] === 10) {
            createPetalRain(flowerType);
            showFloatingMessage(`¡Lluvia de ${flowerType}! 💕✨`, window.innerWidth / 2, 150);
            clickCounts[flowerType] = 0;
        }
    });
});

// Crear partículas de corazones
function createHeartParticles(x, y, type) {
    const colors = {
        rose: '#DC143C',
        tulip: '#FF69B4',
        lily: '#FFB6C1',
        violet: '#9370DB',
        gerbera: '#FFD700'
    };
    
    const color = colors[type] || '#FF69B4';
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            filter: drop-shadow(0 0 5px ${color});
        `;
        
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = Math.random() * 80 + 40;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        heart.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${endX - x}px, ${endY - y}px) scale(1) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// Mostrar mensaje flotante
function showFloatingMessage(text, x, y) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y - 60}px;
        transform: translateX(-50%);
        font-size: 1.3rem;
        font-weight: bold;
        color: #c06c84;
        background: rgba(255, 255, 255, 0.95);
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        pointer-events: none;
        z-index: 1001;
        white-space: nowrap;
        border: 2px solid rgba(255, 182, 193, 0.5);
    `;
    
    document.body.appendChild(message);
    
    message.animate([
        {
            opacity: 0,
            transform: 'translateX(-50%) translateY(0) scale(0.8)'
        },
        {
            opacity: 1,
            transform: 'translateX(-50%) translateY(-20px) scale(1)'
        },
        {
            opacity: 0,
            transform: 'translateX(-50%) translateY(-50px) scale(0.9)'
        }
    ], {
        duration: 2500,
        easing: 'ease-out'
    });
    
    setTimeout(() => message.remove(), 2500);
}

// Lluvia de pétalos
function createPetalRain(flowerType) {
    const emojis = {
        rose: '🌹',
        tulip: '🌷',
        lily: '🌺',
        violet: '💜',
        gerbera: '🌼'
    };
    
    const emoji = emojis[flowerType] || '🌸';
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            const startX = Math.random() * window.innerWidth;
            const size = Math.random() * 2 + 1.5;
            const duration = Math.random() * 3000 + 2500;
            
            petal.textContent = emoji;
            petal.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: -30px;
                font-size: ${size}rem;
                pointer-events: none;
                z-index: 999;
                opacity: 0.9;
            `;
            
            document.body.appendChild(petal);
            
            petal.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 0.9
                },
                {
                    transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'linear'
            });
            
            setTimeout(() => petal.remove(), duration);
        }, i * 40);
    }
}

// Efecto de abejas
function createBee() {
    const bee = document.createElement('div');
    bee.textContent = '🐝';
    bee.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 100;
        left: -50px;
        top: ${Math.random() * (window.innerHeight * 0.6) + 100}px;
    `;
    
    document.body.appendChild(bee);
    
    bee.animate([
        { left: '-50px', transform: 'translateY(0)' },
        { left: `${window.innerWidth / 3}px`, transform: 'translateY(-20px)' },
        { left: `${window.innerWidth * 2 / 3}px`, transform: 'translateY(15px)' },
        { left: `${window.innerWidth + 50}px`, transform: 'translateY(-10px)' }
    ], {
        duration: 10000,
        easing: 'ease-in-out'
    });
    
    setTimeout(() => bee.remove(), 10000);
}

// Crear abejas periódicamente
setInterval(() => {
    if (Math.random() > 0.6) {
        createBee();
    }
}, 15000);

// Efecto de pájaros ocasionales
function createBird() {
    const birds = ['🐦', '🐤', '🕊️'];
    const bird = document.createElement('div');
    bird.textContent = birds[Math.floor(Math.random() * birds.length)];
    bird.style.cssText = `
        position: fixed;
        font-size: 2.5rem;
        pointer-events: none;
        z-index: 100;
        right: -50px;
        top: ${Math.random() * 200 + 50}px;
    `;
    
    document.body.appendChild(bird);
    
    bird.animate([
        { right: '-50px' },
        { right: `${window.innerWidth + 50}px` }
    ], {
        duration: 8000,
        easing: 'linear'
    });
    
    setTimeout(() => bird.remove(), 8000);
}

setInterval(() => {
    if (Math.random() > 0.7) {
        createBird();
    }
}, 20000);

// Smooth scroll para secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mensaje de bienvenida
setTimeout(() => {
    showFloatingMessage('Bienvenido al Jardín del Amor 💕✨', window.innerWidth / 2, window.innerHeight / 2);
}, 800);

// Primera abeja y pájaro
setTimeout(createBee, 3000);
setTimeout(createBird, 5000);

// Log de inicio
console.log('🌹 Jardín Romántico cargado correctamente');
console.log('💡 Tip: Haz clic 10 veces en flores del mismo tipo para una sorpresa!');
