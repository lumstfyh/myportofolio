// AOS Initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.dataset.theme = savedTheme;
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Scroll Animation for Elements
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeElements.forEach(fadeElement => {
    appearOnScroll.observe(fadeElement);
});

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');

const skillBarObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = `${progress}%`;
            
            // Add percentage counter animation
            const percentElement = entry.target.closest('.skill-item').querySelector('.skill-percent');
            if (percentElement) {
                animateCounter(percentElement, 0, parseInt(progress), 1500);
            }
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(skillBar => {
    skillBarObserver.observe(skillBar);
});

// Counter Animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        successMessage.classList.add('show');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds - PERBAIKAN
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

    }, 2000);
});

// Close mobile menu when clicking on a link
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Floating Shapes Animation
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        // Randomize initial positions and animations
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 3 + 3;
        
        shape.style.left = `${randomX}%`;
        shape.style.top = `${randomY}%`;
        shape.style.animationDuration = `${randomDuration}s`;
        shape.style.animationDelay = `${randomDelay}s`;
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const titles = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    const titleElement = document.querySelector('.title-sub');
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const fullText = titles[currentIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }
        
        titleElement.textContent = currentText;
        
        let typeSpeed = typingSpeed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && currentText === fullText) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// Particle-like Background Effect
function initParticleEffect() {
    const heroSection = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    `;
    heroSection.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.3;
        animation: floatParticle 6s ease-in-out infinite;
    `;
    
    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 3 + Math.random() * 3;
    
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -20px);
            opacity: 0.6;
        }
        50% {
            transform: translate(-15px, 15px);
            opacity: 0.8;
        }
        75% {
            transform: translate(10px, -10px);
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Cursor Effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background 0.2s;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: transform 0.1s;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .certificate-card, .floating-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'var(--primary-color)';
            cursor.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'transparent';
            cursor.style.opacity = '1';
        });
    });
}

// Page Load Animations
function initPageLoadAnimations() {
    // Add loading screen
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid var(--bg-secondary);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    `;
    
    const loaderText = document.createElement('p');
    loaderText.textContent = 'Loading Portfolio...';
    loaderText.style.color = 'var(--text-color)';
    
    loaderContent.appendChild(spinner);
    loaderContent.appendChild(loaderText);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    // Remove loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingShapes();
    initTypingEffect();
    initParticleEffect();
    initCursorEffect();
    initPageLoadAnimations();
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
});

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            updateActiveNav();
        }, 10);
    }
});

// Add CSS for loader animation
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);

console.log('🚀 Portfolio loaded successfully!');