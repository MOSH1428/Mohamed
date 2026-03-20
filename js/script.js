document.addEventListener('DOMContentLoaded', () => {

    // --- Background Particles Configuration ---
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 40,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": ["#00f2fe", "#4facfe", "#8e2de2"] },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4facfe",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // --- Cursor Blob Logic ---
    const cursorBlob = document.getElementById('cursor-blob');
    if (cursorBlob) {
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother performance if needed, but this is simple enough
            cursorBlob.style.left = `${e.clientX}px`;
            cursorBlob.style.top = `${e.clientY}px`;
        });
    }

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('langToggle');
    let currentLang = 'ar';

    langToggleBtn.addEventListener('click', () => {
        if (currentLang === 'ar') {
            setLanguage('en');
        } else {
            setLanguage('ar');
        }
    });

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.className = `lang-${lang}`;
        
        langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';

        // Update all elements with data-en and data-ar attributes
        const textElements = document.querySelectorAll('[data-en][data-ar]');
        
        textElements.forEach(el => {
            // Check if it's an input or a normal element
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute(`data-${lang}`);
            } else {
                // Keep the innerHTML structure if required (for icons) but change the text
                // Since this might overwrite child nodes like icons, we need to be careful.
                // For this layout, spans inner text is safer.
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });
        
        // Fix for specific icons inside elements like location
        updateComplexElements(lang);
    }
    
    function updateComplexElements(lang) {
        // Find elements where we replaced text but they had icons
        const locationSpan = document.querySelector('.location-info span:first-child');
        if(locationSpan) {
            const locText = lang === 'ar' ? 'الدقهلية، مصر' : 'Dakahlia, Egypt';
            locationSpan.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span data-en="Dakahlia, Egypt" data-ar="الدقهلية، مصر">${locText}</span>`;
        }
        
        const remoteBadge = document.querySelector('.remote-badge');
        if(remoteBadge) {
            const remText = lang === 'ar' ? 'العمل عن بعد فقط' : 'Remote Work Only';
            remoteBadge.innerHTML = `<i class="fas fa-globe"></i> <span data-en="Remote Work Only" data-ar="العمل عن بعد فقط">${remText}</span>`;
        }
    }


    // --- Scroll Magic (Intersection Observer for animations) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add floating animation after entrance
                setTimeout(() => {
                    entry.target.classList.add('animate-float');
                    // Stagger the floats so they don't look uniform
                    entry.target.style.animationDelay = `${(Math.random() * 2).toFixed(1)}s`;
                }, 600);
                
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    // Initial styles for animation
    const glassPanels = document.querySelectorAll('.glass-panel');
    glassPanels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(30px)';
        panel.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s, border-color 0.3s';
        
        // Add floating animation setup
        // It will be added after it appears to not conflict with the entrance transform
        scrollObserver.observe(panel);
        
        // Give each panel a slight floating staggered animation once it's in view
        setTimeout(() => {
             if(panel.style.opacity === '1') {
                 panel.classList.add('animate-float');
                 panel.style.animationDelay = `${index * 0.2}s`;
             }
        }, 1000);
    });

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
