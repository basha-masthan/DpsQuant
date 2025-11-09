// Navigation Toggle for Mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right');
    animateElements.forEach(el => observer.observe(el));

    // Enhanced Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init('7SV2Z2LgC1GENjNY_');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            // Get form data for validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;

            // Send email using EmailJS sendForm method
            emailjs.sendForm('service_ifj3zce', 'template_vu8msan', this)
                .then(() => {
                    // Reset loading state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;

                    // Success message
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    contactForm.reset();
                }, (err) => {
                    // Reset loading state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;

                    // Error message
                    alert('Sorry, there was an error sending your message. Please try again later or contact us directly.');
                    console.error('EmailJS Error:', err);
                });
        });
    }

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(120, 119, 198, 0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });

        button.addEventListener('click', function() {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            if (this.href && this.href !== '#') {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    const rate2 = scrolled * 0.3;
                    hero.style.transform = `translateY(${rate}px)`;
                    const heroImage = hero.querySelector('.hero-illustration');
                    if (heroImage) {
                        heroImage.style.transform = `translateY(${rate2}px) scale(${1 + scrolled * 0.0005})`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Mouse follow effect for hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const heroImage = heroSection.querySelector('.hero-illustration');
            if (heroImage) {
                heroImage.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px) scale(1.05)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            const heroImage = heroSection.querySelector('.hero-illustration');
            if (heroImage) {
                heroImage.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    }

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Uncomment to enable typing effect
        // setTimeout(typeWriter, 1000);
    }

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Initialize counter animations when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Hover effects for cards
    const cards = document.querySelectorAll('.overview-card, .service-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.filter = 'drop-shadow(0 0 20px rgba(120, 119, 198, 0.6))';
        });
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.filter = 'none';
        });

        // Add magnetic effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        });
    });

    // Testimonial slider (if testimonials are added later)
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;

        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }
        
        setInterval(nextTestimonial, 5000);
        showTestimonial(currentIndex);
    }

    // Initialize testimonial slider
    initTestimonialSlider();

    // Enhanced back to top button with animations
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(120, 119, 198, 0.9), rgba(255, 119, 198, 0.9));
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(120, 119, 198, 0.4);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 1rem;
    `;

    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.transform = 'scale(1.1) rotate(360deg)';
        backToTopButton.style.boxShadow = '0 15px 35px rgba(120, 119, 198, 0.6)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.transform = 'scale(1) rotate(0deg)';
        backToTopButton.style.boxShadow = '0 8px 25px rgba(120, 119, 198, 0.4)';
    });

    backToTopButton.addEventListener('click', () => {
        // Instant scroll to top
        window.scrollTo(0, 0);

        // Add click animation
        backToTopButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTopButton.style.transform = 'scale(1)';
        }, 150);
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
            backToTopButton.style.transform = 'scale(1) translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            backToTopButton.style.transform = 'scale(0.8) translateY(20px)';
        }
    });

    // Preloader with logo (only for home page)
    if (document.title.includes('DpsQuant') && document.title.includes('Career Training')) {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;

        const logoImg = document.createElement('img');
        logoImg.src = 'assets/logo.png';
        logoImg.className = 'preloader-logo';
        logoImg.alt = 'DpsQuant Logo';
        logoImg.onerror = function() {
            // Fallback if logo doesn't load
            this.style.display = 'none';
            const fallbackText = document.createElement('div');
            fallbackText.textContent = 'DpsQuant';
            fallbackText.style.cssText = `
                color: white;
                font-size: 2rem;
                font-weight: bold;
                animation: logoPulse 2s ease-in-out infinite;
            `;
            preloader.insertBefore(fallbackText, loadingText);
        };

        const loadingText = document.createElement('div');
        loadingText.textContent = 'Loading...';
        loadingText.style.cssText = `
            color: white;
            font-size: 1.2rem;
            margin-top: 20px;
            opacity: 0.8;
        `;

        preloader.appendChild(logoImg);
        preloader.appendChild(loadingText);
        document.body.insertBefore(preloader, document.body.firstChild);

        // Force hide preloader after 3 seconds as fallback
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 500);
            }
        }, 3000);
    }
    
    window.addEventListener('load', () => {
        // Only hide preloader if it exists (home page only)
        const existingPreloader = document.querySelector('.preloader');
        if (existingPreloader) {
            setTimeout(() => {
                existingPreloader.style.opacity = '0';
                existingPreloader.style.visibility = 'hidden';
                setTimeout(() => {
                    if (existingPreloader.parentNode) {
                        existingPreloader.parentNode.removeChild(existingPreloader);
                    }
                }, 500);
            }, 500);
        }
    });

    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
});

// Scroll-triggered Card Animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.overview-card, .service-card, .mission-card, .vision-card, .apart-item, .faq-item');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation class when entering viewport (scrolling down)
                setTimeout(() => {
                    entry.target.classList.add('scroll-animate');
                }, index * 300); // Increased stagger for more dramatic effect
            } else {
                // Remove animation class when exiting viewport (scrolling up)
                // This makes them animate out to their edge positions
                entry.target.classList.remove('scroll-animate');
            }
        });
    }, {
        threshold: 0.2, // Lower threshold for earlier animation trigger
        rootMargin: '0px 0px -50px 0px' // Trigger animation slightly earlier
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Enhanced utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Particle effect for background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(120, 119, 198, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);

    // Add particle animation
    const particleAnimation = document.createElement('style');
    particleAnimation.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleAnimation);
}

// Initialize particles
createParticles();

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Service Worker registration (for PWA capabilities - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}