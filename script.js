
// =============================================
// INITIALIZATION
// =============================================

class Portfolio {
  constructor() {
    // DOM Elements
    this.body = document.body;
    this.preloader = document.getElementById('preloader');
    this.cursor = document.getElementById('cursor');
    this.navbar = document.getElementById('navbar');
    this.themeToggle = document.getElementById('themeToggle');
    this.typingText = document.getElementById('typingText');
    this.mobileNav = document.getElementById('mobileNav');
    this.contactForm = document.getElementById('contactForm');
    this.backToTop = document.getElementById('backToTop');

    // State
    this.isLoading = true;
    this.scrollY = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    // Typing Effect Config
    this.typingTexts = [
      'Frontend Developer',
      'UI/UX Designer',
      'React Specialist',
      'Web Architect'
    ];
    this.typingIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    // Initialize
    this.init();
  }

  init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onReady());
    } else {
      this.onReady();
    }
  }

  onReady() {
    this.registerGSAP();
    this.initPreloader();
    this.initTheme();
    this.initCursor();
    this.initNavigation();
    this.initScrollEffects();
    this.initRevealAnimations();
    this.initTypingEffect();
    this.initCounterAnimation();
    this.initSkillBars();
    this.initProjectFilters();
    this.initContactForm();
    this.initMagneticButtons();
    this.logWelcome();
  }

  // =============================================
  // GSAP REGISTRATION
  // =============================================

  registerGSAP() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  // =============================================
  // PRELOADER
  // =============================================

  initPreloader() {
    const progress = this.preloader?.querySelector('.preloader-progress');
    const percentage = this.preloader?.querySelector('.preloader-percentage');

    let loaded = 0;
    const interval = setInterval(() => {
      loaded += Math.random() * 15;
      if (loaded >= 100) {
        loaded = 100;
        clearInterval(interval);
        this.hidePreloader();
      }
      if (progress) progress.style.width = `${loaded}%`;
      if (percentage) percentage.textContent = `${Math.floor(loaded)}%`;
    }, 100);
  }

  hidePreloader() {
    setTimeout(() => {
      this.preloader?.classList.add('hidden');
      this.body.removeAttribute('data-loading');
      this.isLoading = false;
      this.animateHero();
    }, 500);
  }

  // =============================================
  // THEME SWITCHER
  // =============================================

  initTheme() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.body.className = savedTheme;

    // Toggle handler
    this.themeToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const isDark = this.body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    this.body.classList.remove('dark', 'light');
    this.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    // Animate transition
    gsap.fromTo(this.body, 
      { opacity: 0.8 }, 
      { opacity: 1, duration: 0.3 }
    );
  }

  // =============================================
  // CUSTOM CURSOR
  // =============================================

  initCursor() {
    if (!this.cursor || window.matchMedia('(hover: none)').matches) return;

    const dot = this.cursor.querySelector('.cursor-dot');
    const outline = this.cursor.querySelector('.cursor-outline');

    // Mouse move
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      gsap.to(dot, {
        x: this.mouseX,
        y: this.mouseY,
        duration: 0.1
      });

      gsap.to(outline, {
        x: this.mouseX,
        y: this.mouseY,
        duration: 0.3
      });
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .magnetic');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('click');
    });
    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('click');
    });
  }

  // =============================================
  // NAVIGATION
  // =============================================

  initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 100;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Back to top
    this.backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =============================================
  // SCROLL EFFECTS
  // =============================================

  initScrollEffects() {
    let lastScrollY = 0;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;

      // Navbar state
      if (this.navbar) {
        if (this.scrollY > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }

      // Active section highlighting
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (this.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.classList.add('active');
        }
      });

      // Mobile nav indicator
      if (this.mobileNav) {
        const activeItem = this.mobileNav.querySelector('.active');
        const indicator = this.mobileNav.querySelector('.mobile-nav-indicator');
        if (activeItem && indicator) {
          const index = Array.from(this.mobileNav.querySelectorAll('.mobile-nav-item')).indexOf(activeItem);
          indicator.style.transform = `translateX(${index * 100}%)`;
        }
      }

      lastScrollY = this.scrollY;
    });
  }

  // =============================================
  // REVEAL ANIMATIONS
  // =============================================

  initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

  // =============================================
  // HERO ANIMATION
  // =============================================

  animateHero() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline();

    tl.from('.hero-badge', {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: 'power3.out'
    })
    .from('.hero-title > span', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.out'
    }, '-=0.3')
    .from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-actions .btn', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.stat-item', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.code-window', {
      opacity: 0,
      x: 100,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.6')
    .from('.floating-card', {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .from('.scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3');
  }

  // =============================================
  // TYPING EFFECT
  // =============================================

  initTypingEffect() {
    if (!this.typingText) return;

    const type = () => {
      const currentText = this.typingTexts[this.typingIndex];

      if (this.isDeleting) {
        this.typingText.textContent = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.typingText.textContent = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      let typeSpeed = this.isDeleting ? 50 : 100;

      if (!this.isDeleting && this.charIndex === currentText.length) {
        typeSpeed = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.typingIndex = (this.typingIndex + 1) % this.typingTexts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    setTimeout(type, 1500);
  }

  // =============================================
  // COUNTER ANIMATION
  // =============================================

  initCounterAnimation() {
    const statItems = document.querySelectorAll('.stat-item');

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count) || 0;
      const numberEl = el.querySelector('.stat-number');
      if (!numberEl) return;

      let current = 0;
      const increment = target / 50;
      const duration = 2000;
      const stepTime = duration / 50;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        numberEl.textContent = Math.floor(current) + '+';
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statItems.forEach(item => observer.observe(item));
  }

  // =============================================
  // SKILL BARS
  // =============================================

  initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.progress-fill');
          if (fill) {
            const width = fill.dataset.width;
            setTimeout(() => {
              fill.style.width = `${width}%`;
            }, 200);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillCards.forEach(card => observer.observe(card));
  }

  // =============================================
  // PROJECT FILTERS
  // =============================================

  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Filter projects
        projects.forEach(project => {
          const category = project.dataset.category;
          const shouldShow = filter === 'all' || category === filter;

          if (typeof gsap !== 'undefined') {
            gsap.to(project, {
              opacity: shouldShow ? 1 : 0.3,
              scale: shouldShow ? 1 : 0.95,
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            project.style.opacity = shouldShow ? 1 : 0.3;
            project.style.transform = shouldShow ? 'scale(1)' : 'scale(0.95)';
          }
        });
      });
    });
  }

  // =============================================
  // CONTACT FORM
  // =============================================

  initContactForm() {
    if (!this.contactForm) return;

    this.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = this.contactForm.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      
      // Loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      try {
        await this.delay(2000);
        
        // Success
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<span class="btn-text">Message Sent! ✓</span>';
        this.contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
        }, 3000);

      } catch (error) {
        // Error
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<span class="btn-text">Error! Try Again</span>';
        submitBtn.disabled = false;

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
        }, 3000);
      }
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // =============================================
  // MAGNETIC BUTTONS
  // =============================================

  initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave',
