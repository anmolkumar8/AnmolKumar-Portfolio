// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const typingText = document.getElementById('typing-text');
const skillProgress = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contact-form');

// Typing Animation
const typingPhrases = [
    "Software Developer",
    "Java Developer", 
    "Problem Solver",
    "Tech Enthusiast",
    "Quick Learner"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
        typeSpeed = 500; // Pause before typing new phrase
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth Scrolling for Navigation Links
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Scroll to Top Button
function handleScrollTopButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

// Animate Elements on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fadeIn, .slideInLeft, .slideInRight');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Animate Skill Bars
function animateSkillBars() {
    skillProgress.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--width', width);
            bar.classList.add('animated');
        }
    });
}

// Animate Counter Numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !counter.classList.contains('animated')) {
            const target = parseFloat(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = current.toFixed(target % 1 === 0 ? 0 : 2);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toString();
                }
            };
            
            counter.classList.add('animated');
            updateCounter();
        }
    });
}

// Contact Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Clear previous error states
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => input.style.borderColor = '#eee');
    
    let hasErrors = false;
    
    // Validate name
    if (name.length < 2) {
        document.getElementById('name').style.borderColor = '#ff4757';
        hasErrors = true;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('email').style.borderColor = '#ff4757';
        hasErrors = true;
    }
    
    // Validate subject
    if (subject.length < 5) {
        document.getElementById('subject').style.borderColor = '#ff4757';
        hasErrors = true;
    }
    
    // Validate message
    if (message.length < 10) {
        document.getElementById('message').style.borderColor = '#ff4757';
        hasErrors = true;
    }
    
    if (hasErrors) {
        showNotification('Please fill in all fields correctly.', 'error');
        return;
    }
    
    // Show success message
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    contactForm.reset();
}

// Show Notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '10000',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Particle Effect for Hero Section
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.querySelector('.hero-particles');
    
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `floatParticle ${Math.random() * 20 + 10}s infinite linear`
        });
        
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Loading Screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <h3>Loading Portfolio...</h3>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// Project Filter (if needed later)
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Parallax Effect
function handleParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '3px',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        zIndex: '9999',
        transition: 'width 0.3s ease'
    });
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fadeIn, .slideInLeft, .slideInRight');
    animatedElements.forEach(el => observer.observe(el));
}

// Add animation classes to elements
function addAnimationClasses() {
    // Add fade in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fadeIn');
        } else {
            section.classList.add('slideInLeft');
        }
    });
    
    // Add slide animations to cards
    const cards = document.querySelectorAll('.project-card, .cert-item, .skill-item');
    cards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('slideInLeft');
        } else {
            card.classList.add('slideInRight');
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    showLoadingScreen();
    
    // Add animation classes
    addAnimationClasses();
    
    // Start typing animation
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
    
    // Mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
            closeMobileNav();
        });
    });
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Initialize other features
    createParticleEffect();
    initIntersectionObserver();
    initScrollProgress();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleScrollTopButton();
        updateActiveNavLink();
        animateSkillBars();
        animateCounters();
        handleParallax();
    }, { passive: true });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Close mobile nav on resize
        closeMobileNav();
    });
});

// Smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Easter egg - Konami code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
        showNotification('🎉 Easter egg activated! You found the secret code!', 'success');
        // Add some fun effect
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
        
        konamiCode = [];
    }
});

// Performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
const debouncedScrollHandler = debounce(() => {
    handleNavbarScroll();
    handleScrollTopButton();
    updateActiveNavLink();
    animateSkillBars();
    animateCounters();
    revealOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
