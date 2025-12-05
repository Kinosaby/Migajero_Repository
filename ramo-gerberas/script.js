const colors = ['pink', 'orange', 'yellow', 'red', 'coral', 'magenta', 'white', 'lavender'];
const messages = [
    '"Las Gerberas simbolizan la alegría y la pureza."',
    '"Un ramo de Gerberas dice más que mil palabras."',
    '"Cada pétalo es una sonrisa de la naturaleza."',
    '"Las Gerberas son el arcoíris del jardín."'
];

let count = 0;
const max = 7;

// Posiciones del ramo
const pos = [
    { x: 225, y: 80, r: 0 },
    { x: 160, y: 100, r: -12 },
    { x: 290, y: 100, r: 12 },
    { x: 190, y: 130, r: -6 },
    { x: 260, y: 130, r: 6 },
    { x: 130, y: 150, r: -18 },
    { x: 320, y: 150, r: 18 }
];

function initParticles() {
    const c = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 12 + 's';
        p.style.animationDuration = (10 + Math.random() * 5) + 's';
        c.appendChild(p);
    }
}

function createGerbera(color, p) {
    const g = document.createElement('div');
    g.className = `gerbera ${color}`;
    g.style.left = p.x + 'px';
    g.style.top = p.y + 'px';
    g.style.setProperty('--r', p.r + 'deg');
    g.style.zIndex = 10 - count;

    // Tallo con hojas
    const stem = document.createElement('div');
    stem.className = 'stem';
    stem.innerHTML = '<div class="leaf leaf-l"></div><div class="leaf leaf-r"></div>';

    // Cabeza
    const head = document.createElement('div');
    head.className = 'head';

    const petals = document.createElement('div');
    petals.className = 'petals';
    petals.style.animationDelay = Math.random() * -90 + 's';

    // Pétalos externos
    for (let i = 0; i < 16; i++) {
        const pt = document.createElement('div');
        pt.className = 'petal';
        pt.style.transform = `rotate(${i * 22.5}deg) translateX(12px)`;
        petals.appendChild(pt);
    }
    // Pétalos medios
    for (let i = 0; i < 12; i++) {
        const pt = document.createElement('div');
        pt.className = 'petal-m';
        pt.style.transform = `rotate(${i * 30 + 10}deg) translateX(10px)`;
        petals.appendChild(pt);
    }
    // Pétalos internos
    for (let i = 0; i < 8; i++) {
        const pt = document.createElement('div');
        pt.className = 'petal-s';
        pt.style.transform = `rotate(${i * 45 + 5}deg) translateX(8px)`;
        petals.appendChild(pt);
    }

    head.appendChild(petals);
    head.innerHTML += '<div class="center"><div class="center-inner"></div></div>';

    g.appendChild(stem);
    g.appendChild(head);

    return g;
}

function addFlower() {
    if (count >= max) return;
    const b = document.getElementById('bouquet');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const f = createGerbera(color, pos[count]);
    f.style.opacity = '0';
    b.appendChild(f);
    setTimeout(() => { f.style.transition = 'opacity 0.4s'; f.style.opacity = '1'; }, 10);
    count++;
    updateMsg();
}

function shuffleColors() {
    document.querySelectorAll('.gerbera').forEach(g => {
        colors.forEach(c => g.classList.remove(c));
        g.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    });
    updateMsg();
}

function reset() {
    document.getElementById('bouquet').innerHTML = '';
    count = 0;
    setTimeout(() => { for (let i = 0; i < 5; i++) setTimeout(addFlower, i * 150); }, 200);
}

function updateMsg() {
    const m = document.getElementById('message');
    m.style.opacity = '0';
    setTimeout(() => {
        m.textContent = messages[Math.floor(Math.random() * messages.length)];
        m.style.opacity = '1';
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setTimeout(() => { for (let i = 0; i < 5; i++) setTimeout(addFlower, i * 180); }, 300);
});
