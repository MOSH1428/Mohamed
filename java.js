// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Update background grid position
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});

document.querySelectorAll('a, button, .glass').forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    const visual = document.querySelector('.hero-visual');
    if (visual) {
        visual.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Intersection Observer for Fade-in effects
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .tiktok-content, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Dynamic Navbar Background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.padding = '1rem 0';
        nav.style.background = 'rgba(5, 5, 7, 0.95)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.background = 'rgba(5, 5, 7, 0.7)';
    }
});
