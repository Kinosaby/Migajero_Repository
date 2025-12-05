// Seleccionar todas las flores
const gerberas = document.querySelectorAll('.gerbera');

// Array de nombres de colores en español
const colorNames = {
    'pink': '¡Rosa hermosa! 🌸',
    'orange': '¡Naranja brillante! 🧡',
    'yellow': '¡Amarilla radiante! 💛',
    'red': '¡Roja pasional! ❤️',
    'purple': '¡Morada elegante! 💜'
};

// Contador de clics por flor
let clickCounts = new Map();

// Agregar evento de clic a cada gerbera
gerberas.forEach((gerbera, index) => {
    clickCounts.set(gerbera, 0);
    
    gerbera.addEventListener('click', function(e) {
        // Incrementar contador
        let count = clickCounts.get(gerbera) + 1;
        clickCounts.set(gerbera, count);
        
        // Agregar clase de floración
        this.classList.add('blooming');
        
        // Obtener color de la flor
        const color = this.dataset.color;
        const message = colorNames[color] || '¡Hermosa flor! 🌼';
        
        // Crear partículas
        createParticles(e.clientX, e.clientY, color);
        
        // Mostrar mensaje
        showMessage(message, e.clientX, e.clientY);
        
        // Sonido de floración (vibración en móviles)
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        
        // Remover clase después de la animación
        setTimeout(() => {
            this.classList.remove('blooming');
        }, 600);
        
        // Easter egg: si haces clic 5 veces en la misma flor
        if (count === 5) {
            makeItRain(color);
            showMessage('¡Lluvia de pétalos! 🌸✨', window.innerWidth / 2, 100);
            clickCounts.set(gerbera, 0); // Reset contador
        }
    });
    
    // Efecto hover con el mouse
    gerbera.addEventListener('mouseenter', function() {
        const flowerHead = this.querySelector('.flower-head');
        flowerHead.style.transform = 'translateX(-50%) scale(1.05)';
    });
    
    gerbera.addEventListener('mouseleave', function() {
        const flowerHead = this.querySelector('.flower-head');
        flowerHead.style.transform = 'translateX(-50%) scale(1)';
    });
});

// Crear partículas cuando se hace clic
function createParticles(x, y, color) {
    const colors = {
        'pink': '#FF69B4',
        'orange': '#FF8C00',
        'yellow': '#FFD700',
        'red': '#DC143C',
        'purple': '#9370DB'
    };
    
    const particleColor = colors[color] || '#FF69B4';
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = Math.random() * 100 + 50;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${particleColor};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px ${particleColor};
        `;
        
        document.body.appendChild(particle);
        
        // Animar partícula
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
            duration: 800,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        // Eliminar partícula después de la animación
        setTimeout(() => particle.remove(), 800);
    }
}

// Mostrar mensaje flotante
function showMessage(text, x, y) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y - 50}px;
        transform: translateX(-50%);
        font-size: 1.5rem;
        font-weight: bold;
        color: #2d5016;
        text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
    `;
    
    document.body.appendChild(message);
    
    // Animar mensaje
    message.animate([
        {
            opacity: 0,
            transform: 'translateX(-50%) translateY(0) scale(0.5)'
        },
        {
            opacity: 1,
            transform: 'translateX(-50%) translateY(-30px) scale(1)'
        },
        {
            opacity: 0,
            transform: 'translateX(-50%) translateY(-60px) scale(0.8)'
        }
    ], {
        duration: 2000,
        easing: 'ease-out'
    });
    
    setTimeout(() => message.remove(), 2000);
}

// Efecto de lluvia de pétalos
function makeItRain(color) {
    const colors = {
        'pink': '#FF69B4',
        'orange': '#FF8C00',
        'yellow': '#FFD700',
        'red': '#DC143C',
        'purple': '#9370DB'
    };
    
    const petalColor = colors[color] || '#FF69B4';
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            const startX = Math.random() * window.innerWidth;
            const size = Math.random() * 15 + 10;
            const duration = Math.random() * 3000 + 2000;
            const rotation = Math.random() * 360;
            
            petal.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: -20px;
                width: ${size}px;
                height: ${size * 1.5}px;
                background: ${petalColor};
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                pointer-events: none;
                z-index: 999;
                transform: rotate(${rotation}deg);
                opacity: 0.8;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            `;
            
            document.body.appendChild(petal);
            
            // Animar caída
            petal.animate([
                {
                    transform: `translateY(0) rotate(${rotation}deg)`,
                    opacity: 0.8
                },
                {
                    transform: `translateY(${window.innerHeight + 50}px) rotate(${rotation + 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'linear'
            });
            
            setTimeout(() => petal.remove(), duration);
        }, i * 50);
    }
}

// Animación de abejas volando (añadido extra)
function createBee() {
    const bee = document.createElement('div');
    bee.textContent = '🐝';
    bee.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 100;
        left: -50px;
        top: ${Math.random() * (window.innerHeight - 200) + 100}px;
    `;
    
    document.body.appendChild(bee);
    
    // Animar abeja atravesando la pantalla
    bee.animate([
        {
            left: '-50px',
            transform: 'translateY(0)'
        },
        {
            left: `${window.innerWidth / 3}px`,
            transform: 'translateY(-30px)'
        },
        {
            left: `${window.innerWidth * 2 / 3}px`,
            transform: 'translateY(20px)'
        },
        {
            left: `${window.innerWidth + 50}px`,
            transform: 'translateY(-10px)'
        }
    ], {
        duration: 8000,
        easing: 'ease-in-out'
    });
    
    setTimeout(() => bee.remove(), 8000);
}

// Crear abejas periódicamente
setInterval(() => {
    if (Math.random() > 0.7) {
        createBee();
    }
}, 10000);

// Crear primera abeja después de 3 segundos
setTimeout(createBee, 3000);

// Efecto de rocío en las flores en la mañana
function addDewdrops() {
    gerberas.forEach(gerbera => {
        const center = gerbera.querySelector('.center');
        if (center && Math.random() > 0.5) {
            const dewdrop = document.createElement('div');
            dewdrop.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(173, 216, 230, 0.6));
                border-radius: 50%;
                top: ${Math.random() * 20 + 5}px;
                left: ${Math.random() * 20 + 5}px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                animation: dewdropsShine 2s ease-in-out infinite;
            `;
            center.appendChild(dewdrop);
        }
    });
}

// Agregar animación de brillo para las gotas de rocío
const style = document.createElement('style');
style.textContent = `
    @keyframes dewdropsShine {
        0%, 100% {
            opacity: 0.6;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);

// Agregar gotas de rocío al cargar
setTimeout(addDewdrops, 1000);

// Mensaje de bienvenida
setTimeout(() => {
    showMessage('¡Bienvenido al jardín! 🌼', window.innerWidth / 2, window.innerHeight / 2);
}, 500);

console.log('🌼 Jardín de Gerberas cargado correctamente');
console.log('💡 Tip: Haz clic 5 veces en la misma flor para una sorpresa especial!');
