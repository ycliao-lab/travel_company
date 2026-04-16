// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== Mobile Menu ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== Stat Counter Animation ==========
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// ========== Scroll Animations (Intersection Observer) ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll(
    '.about-grid, .destination-card, .service-card, .testimonial-slider, .contact-grid, .section-header'
).forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Counter animation trigger
const heroStats = document.querySelector('.hero-stats');
let counterStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            counterStarted = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (heroStats) {
    counterObserver.observe(heroStats);
}

// ========== Testimonial Slider ==========
const track = document.getElementById('testimonial-track');
const dotsContainer = document.getElementById('testimonial-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = track.querySelectorAll('.testimonial-card');
let currentSlide = 0;
const totalSlides = cards.length;

// Create dots
cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
});

// Auto-play slider
let autoPlay = setInterval(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
}, 5000);

// Pause on hover
const sliderEl = document.querySelector('.testimonial-slider');
sliderEl.addEventListener('mouseenter', () => clearInterval(autoPlay));
sliderEl.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    }, 5000);
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email) {
        alert('請填寫姓名與電子信箱');
        return;
    }

    // Simulate form submission
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '送出中...';
    btn.disabled = true;

    setTimeout(() => {
        alert('感謝您的諮詢！我們將盡快與您聯繫。');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1000);
});

// ========== Active Nav Link on Scroll ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});
