// Coordinates for mouse position
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Color palette for circles
const colors = [
  "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e",
  "#ec805d", "#e36e5c", "#df685c", "#d5585c", "#d1525c",
  "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f",
  "#950f5f", "#830060", "#7c0060", "#680060", "#60005f",
  "#48005f", "#3d005e"
];

// Initialize circles with colors
circles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

// Update mouse coordinates on mouse move
window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

// Animate circles based on mouse position
function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = `${x - 12}px`;
    circle.style.top = `${y - 12}px`;
    
    // Scale circles based on their index
    circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

// Start the animation
animateCircles();

// Reveal text on scroll
const text = document.getElementById('text');
window.addEventListener('scroll', () => {
  const position = text.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (position < windowHeight) {
    text.classList.add('visible');
  }
});

// Intersection Observer for reveal animations
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  };

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        entry.target.classList.remove('reveal');
      } else {
        entry.target.classList.remove('reveal-visible');
        entry.target.classList.add('reveal');
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  const targets = document.querySelectorAll('.reveal');
  targets.forEach(target => observer.observe(target));
});

// Dark mode functionality (commented out for now)

const toggleButton = document.getElementById('toggle-theme');
const body = document.body;

// Vérifiez le mode actuel et appliquez-le
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    toggleButton.textContent = '☀️'; // Changer l'icône pour le mode clair
} else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    toggleButton.textContent = '🌙'; // Changer l'icône pour le mode sombre
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Mettez à jour le texte du bouton
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = '☀️'; // Mode clair
        localStorage.setItem('theme', 'dark'); // Enregistrer le thème
    } else {
        toggleButton.textContent = '🌙'; // Mode sombre
        localStorage.setItem('theme', 'light'); // Enregistrer le thème
    }
});
