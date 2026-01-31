/* ========================================
   LI ZHOUJIAN - Portfolio JavaScript
   Interactive Features & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initBackToTop();
});

/* ========================================
   Navigation
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   Typing Effect
   ======================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Postgraduate Student',
        'AI Researcher',
        'Robotics Enthusiast',
        'Autonomous Driving',
        'Reinforcement Learning'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.about-content, .timeline-item, .experience-card, .skills-category, .award-card, .contact-content'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   Skill Bars Animation
   ======================================== */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animate skill item
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                
                // Animate progress bar
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, index * 100 + 300);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

/* ========================================
   Back to Top Button
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   Smooth Scroll for anchor links
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

/* ========================================
   Parallax Effect for Hero
   ======================================== */
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

/* ========================================
   Console Easter Egg
   ======================================== */
console.log('%c👋 Hello there!', 'font-size: 24px; font-weight: bold;');
console.log('%cWelcome to my portfolio. Built with ❤️ by LI ZHOUJIAN', 'font-size: 14px; color: #0891b2;');
console.log('%cInterested in collaboration? Email me at E1539341@u.nus.edu', 'font-size: 12px; color: #94a3b8;');
