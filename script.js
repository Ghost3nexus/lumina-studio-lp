// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===================================
// FAQ Accordion
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
// Select all elements with the .fade-up class (added to HTML)
// AND keep legacy support for specific classes if we haven't updated HTML yet (optional, but better to migrate)
const animateElements = document.querySelectorAll('.fade-up');

animateElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// Image Lazy Loading Enhancement
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
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

// ===================================
// Analytics & Tracking (Placeholder)
// ===================================
// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        console.log('CTA Clicked:', buttonText);

        // Add your analytics tracking here
        // Example: gtag('event', 'cta_click', { button_text: buttonText });
    });
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%cLUMINA STUDIO', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #C084FC 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cAIファッションフォト生成 × クリエイティブ制作サービス', 'font-size: 14px; color: #a0a0a0;');
console.log('お問い合わせ: info@lumina-studio.com');

// ===================================
// Dev Mode - Sample Number Overlay
// ===================================
(function () {
    let devModeActive = false;

    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev') === 'true') {
        devModeActive = true;
    }

    // Add data attributes to gallery items
    function addSampleNumbers() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            // Calculate sample number (1-20, repeating)
            const sampleNumber = (index % 20) + 1;
            item.setAttribute('data-sample-number', `Sample ${sampleNumber}`);
        });
    }

    // Toggle dev mode
    function toggleDevMode() {
        devModeActive = !devModeActive;

        if (devModeActive) {
            document.body.classList.add('dev-mode');
            console.log('%c🔧 Dev Mode: ON', 'font-size: 14px; font-weight: bold; color: #9F7AEA;');
            console.log('Sample numbers are now visible on gallery images.');
        } else {
            document.body.classList.remove('dev-mode');
            console.log('%c🔧 Dev Mode: OFF', 'font-size: 14px; font-weight: bold; color: #888;');
        }

        // Update URL parameter
        const url = new URL(window.location);
        if (devModeActive) {
            url.searchParams.set('dev', 'true');
        } else {
            url.searchParams.delete('dev');
        }
        window.history.replaceState({}, '', url);
    }

    // Create dev mode indicator
    function createDevModeIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'dev-mode-indicator';
        indicator.textContent = '🔧 Dev Mode: ON (Ctrl+Shift+D to toggle)';
        document.body.appendChild(indicator);
    }

    // Initialize
    addSampleNumbers();
    createDevModeIndicator();

    // Apply dev mode if enabled
    if (devModeActive) {
        document.body.classList.add('dev-mode');
        console.log('%c🔧 Dev Mode: ON', 'font-size: 14px; font-weight: bold; color: #9F7AEA;');
        console.log('Sample numbers are visible. Press Ctrl+Shift+D to toggle.');
    }

    // Keyboard shortcut: Ctrl+Shift+D (or Cmd+Shift+D on Mac)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleDevMode();
        }
    });

    console.log('%c💡 Tip: Press Ctrl+Shift+D to toggle dev mode and see sample numbers', 'font-size: 12px; color: #888;');
})();
