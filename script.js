// GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ===== THEME SWITCHER =====
const body = document.body;
const themeSwitch = document.querySelector(".theme-switch");
const sunIcon = document.querySelector(".theme-switch .sun");
const moonIcon = document.querySelector(".theme-switch .moon");

// Initialize theme icons
function updateIcons() {
  if (body.classList.contains("dark")) {
    sunIcon.style.display = "inline";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline";
  }
}
updateIcons();

// Theme toggle
themeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  updateIcons();
  
  // Save preference
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.remove('dark', 'light');
  body.classList.add(savedTheme);
  updateIcons();
}

// ===== HERO ANIMATIONS =====
gsap.from(".hero-badge", {
  opacity: 0,
  y: -30,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".hero h1", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.3,
  ease: "power4.out"
});

gsap.from(".hero-subtitle", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5,
  ease: "power3.out"
});

gsap.from(".hero-buttons .btn", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.7,
  stagger: 0.2,
  ease: "power3.out"
});

gsap.from(".hero-stats .stat-item", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.9,
  stagger: 0.15,
  ease: "power3.out"
});

gsap.from(".code-card.big", {
  opacity: 0,
  x: 100,
  duration: 1.2,
  delay: 0.4,
  ease: "power4.out"
});

// ===== PARALLAX EFFECT =====
document.addEventListener("mousemove", (e) => {
  const parallaxElements = document.querySelectorAll(".parallax");
  
  parallaxElements.forEach((el) => {
    const depth = el.dataset.depth || 0.5;
    const moveX = (window.innerWidth / 2 - e.pageX) * depth;
    const moveY = (window.innerHeight / 2 - e.pageY) * depth;
    
    gsap.to(el, {
      x: moveX / 40,
      y: moveY / 40,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

// ===== SECTION ANIMATIONS =====
// About Section
gsap.from(".about-text", {
  scrollTrigger: {
    trigger: "#about-section",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: -80,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".about-visual", {
  scrollTrigger: {
    trigger: "#about-section",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: 80,
  duration: 1,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".highlight-item", {
  scrollTrigger: {
    trigger: ".about-highlights",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});

// Work Section
gsap.from(".card", {
  scrollTrigger: {
    trigger: "#work",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 80,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Tech Stack Section with Skill Bars
gsap.utils.toArray(".tech-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    delay: index * 0.1,
    ease: "power3.out"
  });

  // Animate skill bar
  const fill = card.querySelector(".skill-fill");
  if (fill) {
    gsap.to(fill, {
      width: fill.dataset.width,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }
});

// Contact Section
gsap.from(".contact-item", {
  scrollTrigger: {
    trigger: ".contact-info",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: -50,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact-form",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: 50,
  duration: 1,
  ease: "power3.out"
});

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    
    if (target) {
      const offset = 80; // Navbar height
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link, .bottom-nav .nav-item");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });
  
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector(".typing-text");
const texts = ["Frontend Developer", "UI/UX Designer", "Web Developer", "React Specialist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ===== FADE IN ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(section);
});

// ===== CONSOLE MESSAGE =====
console.log("%c👋 Hey there!", "font-size: 24px; font-weight: bold; color: #7c3aed;");
console.log("%cLike what you see? Let's build something amazing together!", "font-size: 14px; color: #666;");
console.log("%c📧 codewithsid1998@gmail.com", "font-size: 12px; color: #999;");
