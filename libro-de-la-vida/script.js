// ============================================
// INICIALIZACIÓN Y CONFIGURACIÓN
// ============================================

// Crear flores flotantes al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  createFloatingFlowers();
  activateScrollAnimations();
  showSection(0);
});

// ============================================
// FLORES FLOTANTES ANIMADAS
// ============================================

function createFloatingFlowers() {
  const container = document.getElementById("floatingFlowers");
  const flowerEmojis = ["🌼", "🌺", "🌸", "🏵️", "💐"];
  const numberOfFlowers = 20;

  for (let i = 0; i < numberOfFlowers; i++) {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.textContent =
      flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

    // Posición aleatoria
    flower.style.left = Math.random() * 100 + "%";

    // Duración de animación aleatoria
    const duration = 10 + Math.random() * 20;
    flower.style.animationDuration = duration + "s";

    // Retraso aleatorio para que no caigan todas a la vez
    flower.style.animationDelay = Math.random() * 10 + "s";

    container.appendChild(flower);
  }
}

// ============================================
// NAVEGACIÓN ENTRE SECCIONES
// ============================================

let currentSection = 0;
const sections = document.querySelectorAll(".section");

function nextSection(sectionIndex) {
  // Remover clase active de la sección actual
  sections[currentSection].classList.remove("active");

  // Actualizar índice de sección actual
  currentSection = sectionIndex;

  // Agregar clase active a la nueva sección
  sections[currentSection].classList.add("active");

  // Scroll suave a la nueva sección
  sections[currentSection].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // Agregar efectos especiales según la sección
  addSectionEffects(sectionIndex);
}

function showSection(index) {
  sections[index].classList.add("active");
}

// ============================================
// EFECTOS ESPECIALES POR SECCIÓN
// ============================================

function addSectionEffects(sectionIndex) {
  switch (sectionIndex) {
    case 1:
      // Sección de Recuerdos
      animateMemoryCards();
      break;
    case 2:
      // Sección de Promesas
      animatePromises();
      break;
    case 3:
      // Sección de Declaración
      animatePoem();
      break;
    case 4:
      // Sección del Puente
      animateBridge();
      break;
  }
}

// ============================================
// ANIMACIONES DE TARJETAS DE RECUERDOS
// ============================================

function animateMemoryCards() {
  const memoryCards = document.querySelectorAll(".memory-card");

  memoryCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";

      setTimeout(() => {
        card.style.transition = "all 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    }, index * 200);
  });

  // Agregar efecto de click a las tarjetas
  memoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(1.1) rotate(2deg)";
      setTimeout(() => {
        this.style.transform = "scale(1) rotate(0deg)";
      }, 300);

      // Crear partículas al hacer click
      createParticles(this);
    });
  });
}

// ============================================
// ANIMACIÓN DE PROMESAS
// ============================================

function animatePromises() {
  const promises = document.querySelectorAll(".promise-item");

  promises.forEach((promise, index) => {
    setTimeout(() => {
      promise.style.opacity = "0";
      promise.style.transform = "translateX(-50px)";

      setTimeout(() => {
        promise.style.transition = "all 0.6s ease";
        promise.style.opacity = "1";
        promise.style.transform = "translateX(0)";
      }, 50);
    }, index * 300);
  });
}

// ============================================
// ANIMACIÓN DEL POEMA
// ============================================

function animatePoem() {
  const verses = document.querySelectorAll(".verse");

  verses.forEach((verse, index) => {
    verse.style.opacity = "0";
    verse.style.transform = "translateX(-30px)";

    setTimeout(() => {
      verse.style.transition = "all 0.8s ease";
      verse.style.opacity = "1";
      verse.style.transform = "translateX(0)";
    }, index * 400);
  });

  // Crear notas musicales flotantes
  createMusicalNotes();
}

// ============================================
// ANIMACIÓN DEL PUENTE
// ============================================

function animateBridge() {
  const bridge = document.querySelector(".flower-path");

  // Crear flores adicionales en el puente
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const flower = document.createElement("div");
      flower.textContent = "🌼";
      flower.style.position = "absolute";
      flower.style.fontSize = "30px";
      flower.style.left = Math.random() * 100 + "%";
      flower.style.top = Math.random() * 100 + "%";
      flower.style.opacity = "0";
      flower.style.transition = "all 1s ease";

      bridge.appendChild(flower);

      setTimeout(() => {
        flower.style.opacity = "1";
        flower.style.transform = "scale(1.5) rotate(360deg)";
      }, 50);
    }, i * 200);
  }
}

// ============================================
// SISTEMA DE PARTÍCULAS
// ============================================

function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.textContent = "✨";
    particle.style.position = "fixed";
    particle.style.left = rect.left + rect.width / 2 + "px";
    particle.style.top = rect.top + rect.height / 2 + "px";
    particle.style.fontSize = "20px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "10000";
    particle.style.transition = "all 1s ease-out";

    document.body.appendChild(particle);

    setTimeout(() => {
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
      particle.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// ============================================
// NOTAS MUSICALES FLOTANTES
// ============================================

function createMusicalNotes() {
  const poemContainer = document.querySelector(".poem-container");
  const notes = ["♪", "♫", "♬", "♩"];

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const note = document.createElement("div");
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.position = "absolute";
      note.style.fontSize = "40px";
      note.style.color = "rgba(6, 188, 193, 0.4)";
      note.style.left = Math.random() * 100 + "%";
      note.style.top = "100%";
      note.style.pointerEvents = "none";
      note.style.transition = "all 3s ease-out";

      poemContainer.appendChild(note);

      setTimeout(() => {
        note.style.top = "-10%";
        note.style.opacity = "0";
        note.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      }, 50);

      setTimeout(() => {
        note.remove();
      }, 3000);
    }, i * 500);
  }
}

// ============================================
// REVELACIÓN FINAL
// ============================================

function showFinalReveal() {
  const modal = document.getElementById("finalModal");
  modal.classList.add("show");

  // Crear efecto de fuegos artificiales
  createFireworks();

  // Crear confeti
  createConfetti();

  // Cerrar modal al hacer click fuera
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}

// ============================================
// FUEGOS ARTIFICIALES
// ============================================

function createFireworks() {
  const fireworksContainer = document.querySelector(".fireworks");
  const colors = ["#FF6B35", "#FFD23F", "#06BCC1", "#F72585", "#AB83A1"];

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const burst = document.createElement("div");
      burst.style.position = "absolute";
      burst.style.left = Math.random() * 100 + "%";
      burst.style.top = Math.random() * 100 + "%";

      fireworksContainer.appendChild(burst);

      // Crear partículas del fuego artificial
      for (let j = 0; j < 20; j++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = "8px";
        particle.style.height = "8px";
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        particle.style.transition = "all 1s ease-out";

        burst.appendChild(particle);

        setTimeout(() => {
          const angle = (Math.PI * 2 * j) / 20;
          const distance = 50 + Math.random() * 50;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          particle.style.transform = `translate(${x}px, ${y}px)`;
          particle.style.opacity = "0";
        }, 10);
      }

      setTimeout(() => {
        burst.remove();
      }, 1500);
    }, i * 800);
  }
}

// ============================================
// CONFETI
// ============================================

function createConfetti() {
  const modalContent = document.querySelector(".modal-content");
  const colors = ["#FF6B35", "#FFD23F", "#06BCC1", "#F72585", "#AB83A1"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = "50%";
    confetti.style.top = "20%";
    confetti.style.zIndex = "10001";
    confetti.style.transition = "all 2s ease-out";
    confetti.style.pointerEvents = "none";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "100%";
      confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      confetti.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

function activateScrollAnimations() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// ============================================
// EFECTOS DE HOVER ADICIONALES
// ============================================

// Efecto de brillo al pasar el mouse sobre los botones
document.querySelectorAll(".magic-button").forEach((button) => {
  button.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glow = this.querySelector(".button-glow");
    if (glow) {
      glow.style.left = x + "px";
      glow.style.top = y + "px";
    }
  });
});

// ============================================
// MÚSICA DE FONDO (OPCIONAL)
// ============================================

// Si quieres agregar música, descomenta esta función
// y agrega un archivo de audio llamado 'background-music.mp3'
/*
function playBackgroundMusic() {
    const audio = new Audio('background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    
    // Reproducir al primer click del usuario
    document.addEventListener('click', function() {
        audio.play();
    }, { once: true });
}
*/

// ============================================
// EFECTO DE ESTRELLAS EN EL FONDO
// ============================================

setTimeout(() => {
  const introSection = document.querySelector(".intro-section");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.style.position = "absolute";
    star.style.width = "2px";
    star.style.height = "2px";
    star.style.backgroundColor = "white";
    star.style.borderRadius = "50%";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.opacity = Math.random();
    star.style.animation = `twinkle ${
      2 + Math.random() * 3
    }s ease-in-out infinite`;

    introSection.appendChild(star);
  }
}, 500);

// Agregar animación de parpadeo de estrellas
const style = document.createElement("style");
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
