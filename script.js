// Performance optimization - Critical CSS loading
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load non-critical CSS
    const nonCriticalCSS = document.createElement('link');
    nonCriticalCSS.rel = 'stylesheet';
    nonCriticalCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    nonCriticalCSS.media = 'print';
    nonCriticalCSS.onload = function() {
        this.media = 'all';
    };
    document.head.appendChild(nonCriticalCSS);
});

// Mobile Navigation Toggle
class MobileNavigation {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on links
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.updateMenuState();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.updateMenuState();
    }
    
    updateMenuState() {
        if (this.isOpen) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '100%';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.background = 'rgba(10, 10, 10, 0.98)';
            this.navMenu.style.padding = '1rem';
            this.navMenu.style.borderTop = '1px solid #333';
            this.navToggle.classList.add('active');
        } else {
            this.navMenu.style.display = 'none';
            this.navToggle.classList.remove('active');
        }
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form Handling with Validation
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = this.form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearErrors(input));
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing errors
        this.clearErrors(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo é obrigatório';
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, insira um e-mail válido';
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Por favor, insira um telefone válido';
                isValid = false;
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showError(field, message) {
        field.style.borderColor = '#ff6b35';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b35';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearErrors(field) {
        field.style.borderColor = '#333333';
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    async submitForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateSubmission();
            
            // Success state
            this.showSuccess();
            this.form.reset();
            
        } catch (error) {
            this.showError(this.form, 'Erro ao enviar formulário. Tente novamente.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
    
    showSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Formulário enviado com sucesso! Entraremos em contato em breve.';
        successMessage.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
        successMessage.style.color = '#0a0a0a';
        successMessage.style.padding = '1rem';
        successMessage.style.borderRadius = '0.75rem';
        successMessage.style.marginTop = '1rem';
        successMessage.style.fontWeight = '600';
        successMessage.style.textAlign = 'center';
        
        this.form.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );
            
            const animatedElements = document.querySelectorAll(
                '.stat-item, .service-card, .case-card, .hero-content'
            );
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);
            });
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor Core Web Vitals
        if ('web-vitals' in window) {
            this.measureWebVitals();
        }
        
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }
    
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    preloadCriticalResources() {
        // Preload hero section background if needed
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const computedStyle = window.getComputedStyle(heroSection);
            const backgroundImage = computedStyle.backgroundImage;
            
            if (backgroundImage && backgroundImage !== 'none') {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = backgroundImage.slice(5, -2); // Remove url(" and ")
                document.head.appendChild(link);
            }
        }
    }
}

// Analytics and Tracking
class Analytics {
    constructor() {
        this.init();
    }
    
    init() {
        // Track form interactions
        this.trackFormInteractions();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track CTA clicks
        this.trackCTAClicks();
    }
    
    trackFormInteractions() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', () => {
                this.sendEvent('form_submit', 'contact_form');
            });
            
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    this.sendEvent('form_field_focus', input.name || input.type);
                });
            });
        }
    }
    
    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && maxScroll < milestone + 5) {
                        this.sendEvent('scroll_depth', `${milestone}%`);
                    }
                });
            }
        });
    }
    
    trackCTAClicks() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.sendEvent('cta_click', button.textContent.trim());
            });
        });
    }
    
    sendEvent(eventName, eventValue) {
        // Replace with actual analytics implementation
        console.log(`Analytics Event: ${eventName} - ${eventValue}`);
        
        // Example Google Analytics 4 implementation:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, {
        //         event_category: 'engagement',
        //         event_label: eventValue
        //     });
        // }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    new MobileNavigation();
    new SmoothScroll();
    new ContactForm();
    new ScrollAnimations();
    new PerformanceMonitor();
    new Analytics();
    
    // Add loading complete class for CSS animations
    document.body.classList.add('loaded');
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}