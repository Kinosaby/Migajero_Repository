// Configuración de girasoles
const sunflowers = [
    { x: '50%', bottom: 60, stemH: 240, stemW: 14, headSize: 95, rot: 0, delay: 0, z: 10 },
    { x: '32%', bottom: 80, stemH: 195, stemW: 12, headSize: 75, rot: -10, delay: 0.2, z: 8 },
    { x: '68%', bottom: 80, stemH: 195, stemW: 12, headSize: 75, rot: 10, delay: 0.2, z: 8 },
    { x: '20%', bottom: 95, stemH: 160, stemW: 10, headSize: 60, rot: -16, delay: 0.4, z: 6 },
    { x: '80%', bottom: 95, stemH: 160, stemW: 10, headSize: 60, rot: 16, delay: 0.4, z: 6 },
    { x: '40%', bottom: 100, stemH: 145, stemW: 9, headSize: 52, rot: -5, delay: 0.6, z: 5 },
    { x: '60%', bottom: 100, stemH: 145, stemW: 9, headSize: 52, rot: 5, delay: 0.6, z: 5 },
];

function createSunflowers() {
    const garden = document.getElementById('garden');
    
    sunflowers.forEach((config, idx) => {
        const flower = document.createElement('div');
        flower.className = 'sunflower';
        flower.style.left = config.x;
        flower.style.bottom = config.bottom + 'px';
        flower.style.setProperty('--rot', config.rot + 'deg');
        flower.style.animationDelay = config.delay + 's';
        flower.style.zIndex = config.z;
        
        // Tallo
        const stem = document.createElement('div');
        stem.className = 'stem';
        stem.style.height = config.stemH + 'px';
        stem.style.width = config.stemW + 'px';
        
        // Hojas del tallo
        const leafContainer = document.createElement('div');
        leafContainer.className = 'leaf-container';
        
        const leafW = config.headSize * 0.65;
        const leafH = config.headSize * 0.35;
        
        const leafL = document.createElement('div');
        leafL.className = 'leaf leaf-left';
        leafL.style.width = leafW + 'px';
        leafL.style.height = leafH + 'px';
        leafL.style.left = -(leafW - 8) + 'px';
        
        const leafR = document.createElement('div');
        leafR.className = 'leaf leaf-right';
        leafR.style.width = leafW + 'px';
        leafR.style.height = leafH + 'px';
        leafR.style.right = -(leafW - 8) + 'px';
        
        leafContainer.appendChild(leafL);
        leafContainer.appendChild(leafR);
        stem.appendChild(leafContainer);
        
        // Cabeza
        const head = document.createElement('div');
        head.className = 'flower-head';
        head.style.width = config.headSize + 'px';
        head.style.height = config.headSize + 'px';
        head.style.bottom = (config.stemH - 18) + 'px';
        
        // Pétalos
        const petals = document.createElement('div');
        petals.className = 'petals';
        petals.style.animationDelay = (idx * 0.4) + 's';
        
        const petalCount = 16;
        const petalW = config.headSize * 0.5;
        const petalH = config.headSize * 0.16;
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.width = petalW + 'px';
            petal.style.height = petalH + 'px';
            petal.style.transform = `rotate(${i * (360 / petalCount)}deg) translateX(${config.headSize * 0.22}px)`;
            petals.appendChild(petal);
        }
        
        for (let i = 0; i < 12; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal-inner';
            petal.style.width = (petalW * 0.7) + 'px';
            petal.style.height = (petalH * 0.85) + 'px';
            petal.style.transform = `rotate(${i * 30 + 15}deg) translateX(${config.headSize * 0.17}px)`;
            petals.appendChild(petal);
        }
        
        head.appendChild(petals);
        
        const center = document.createElement('div');
        center.className = 'center';
        center.style.width = (config.headSize * 0.45) + 'px';
        center.style.height = (config.headSize * 0.45) + 'px';
        head.appendChild(center);
        
        flower.appendChild(stem);
        flower.appendChild(head);
        garden.appendChild(flower);
    });
}

// SIN hojas del suelo - las eliminamos porque causaban el error visual

function createHearts() {
    const container = document.getElementById('hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '🩷', '💘'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 14 + 's';
        heart.style.animationDuration = (12 + Math.random() * 6) + 's';
        heart.style.fontSize = (20 + Math.random() * 30) + 'px';
        container.appendChild(heart);
    }
}

function createBigHearts() {
    const container = document.getElementById('bigHearts');
    const positions = [
        { x: '8%', y: '65%' },
        { x: '88%', y: '70%' },
        { x: '5%', y: '88%' },
        { x: '92%', y: '85%' },
        { x: '45%', y: '92%' },
    ];
    
    positions.forEach((pos, i) => {
        const heart = document.createElement('div');
        heart.className = 'big-heart';
        heart.textContent = '❤️';
        heart.style.left = pos.x;
        heart.style.top = pos.y;
        heart.style.animationDelay = (i * 0.6) + 's';
        container.appendChild(heart);
    });
}

function createStars() {
    const container = document.getElementById('stars');
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 55 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        const size = 2 + Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        container.appendChild(star);
    }
}

const messages = [
    'Cada girasol representa mi amor por ti ❤️',
    'Eres mi sol, mi luz, mi todo 🌻',
    'Te amo más que a todo en el mundo 💕',
    'Contigo mi vida florece 🌸',
    'Eres el girasol de mi jardín 💛',
];

let msgIdx = 0;

function rotateMessages() {
    const el = document.getElementById('message');
    el.style.opacity = '0';
    setTimeout(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        el.textContent = messages[msgIdx];
        el.style.opacity = '1';
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    createSunflowers();
    createHearts();
    createBigHearts();
    createStars();
    setInterval(rotateMessages, 4500);
});
