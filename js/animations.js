// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== CURSOR ANIMATION ====================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            gsap.to(cursorDot, {
                x: mouseX - 4,
                y: mouseY - 4,
                duration: 0.1
            });
        });
        
        // Smooth outline follow
        gsap.ticker.add(() => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            gsap.set(cursorOutline, {
                x: outlineX - 15,
                y: outlineY - 15
            });
        });
        
        // Cursor hover effects
        document.querySelectorAll('a, button, .service-tab').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
                gsap.to(cursorDot, { scale: 0.5, duration: 0.3 });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
                gsap.to(cursorDot, { scale: 1, duration: 0.3 });
            });
        });
    }
    
    // ==================== HERO SECTION ANIMATION ====================
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    heroTimeline
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: 0.3
        })
        .from('.hero-text', {
            opacity: 0,
            y: 30,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-btn', {
            opacity: 0,
            scale: 0.9,
            duration: 0.5
        }, '-=0.3');
    
    // ==================== SCROLL ANIMATIONS ====================
    
    // Animate quality cards - faster trigger
    gsap.utils.toArray('.quality-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%', // Trigger earlier
                end: 'top 30%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6, // Faster animation
            delay: index * 0.05, // Less delay between cards
            ease: 'power2.out'
        });
    });
    
    // Animate sections on scroll - faster
    const sections = ['#services', '#contact'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            gsap.from(section.querySelector('h2'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%', // Earlier trigger
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
    });
    
    // Animate CTA section
    const ctaSection = document.querySelector('section:has(.magnetic-btn)');
    if (ctaSection && ctaSection.querySelector('h2')) {
        gsap.from(ctaSection.querySelector('h2'), {
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.from(ctaSection.querySelectorAll('a'), {
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
    
    // ==================== MAGNETIC BUTTON EFFECT ====================
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
    
    // ==================== IMAGE ANIMATIONS (Parallax Removed) ====================
    // Simple fade-in and scale on scroll
    const parallaxBgImages = document.querySelectorAll('.parallax-bg');
    
    parallaxBgImages.forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 1.1,
            duration: 1.2,
            ease: 'power2.out'
        });
    });
    
    // Animate images on scroll
    const imageContainers = document.querySelectorAll('.image-overlay');
    imageContainers.forEach(container => {
        gsap.from(container, {
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // ==================== SCROLL ANIMATIONS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== 'javascript:void(0)') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });
    
    // ==================== ICON ROTATION ON HOVER ====================
    document.querySelectorAll('.quality-card i, footer i').forEach(icon => {
        const parent = icon.closest('a, div');
        
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    rotation: 360,
                    duration: 0.6,
                    ease: 'back.out(1.7)'
                });
            });
            
            parent.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    });
    
    // ==================== FORM INPUT ANIMATIONS ====================
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // ==================== SCROLL PROGRESS INDICATOR ====================
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
    
    console.log('🎨 GSAP Animations loaded successfully!');
});
