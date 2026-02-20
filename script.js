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
            window.scrollTo({
                top: target.offsetTop - 80, // Header height offset
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   Drag & Drop Image Replacement
   =================================== */
(function () {
    const dropTargets = document.querySelectorAll('img[data-img-key]');
    const PERSIST_KEY = 'lumina_lp_images';

    // Check for persistence flag in URL
    const urlParams = new URLSearchParams(window.location.search);
    const shouldPersist = urlParams.get('persist') === '1';

    // Load persisted images if enabled
    if (shouldPersist) {
        try {
            const savedImages = JSON.parse(localStorage.getItem(PERSIST_KEY)) || {};
            Object.keys(savedImages).forEach(key => {
                const img = document.querySelector(`img[data-img-key="${key}"]`);
                if (img) {
                    img.src = savedImages[key];
                    // Ensure placeholder is hidden if image loads successfully
                    img.onload = function () {
                        img.style.display = 'block';

                        // Hide Empty State UI if inside Rotator or Preset Gallery
                        const emptyState = img.parentElement?.querySelector('.studio-empty-state');
                        if (emptyState) {
                            emptyState.style.opacity = '0';
                        }

                        // Hide Kive Feature Empty State
                        const kiveEmpty = img.parentElement?.querySelector('.kive-empty');
                        if (kiveEmpty) {
                            kiveEmpty.classList.add('is-hidden');
                        }

                        // Hide Kive Thumb Empty State
                        const kiveThumbEmpty = img.parentElement?.querySelector('.kive-thumb-empty');
                        if (kiveThumbEmpty) {
                            kiveThumbEmpty.style.opacity = '0';
                        }

                        if (img.nextElementSibling && img.nextElementSibling.classList.contains('tile-placeholder')) {
                            img.nextElementSibling.style.display = 'none';
                        }
                    };
                }
            });
        } catch (e) {
            console.error('Failed to load images from localStorage', e);
        }
    }

    const initializedTargets = new Set();

    function ddLog(...args) {
        if (window.__ddDebug) console.log('[D&D]', ...args);
    }

    dropTargets.forEach(img => {
        let target = img.closest('a.tile') || img.closest('.sample-placeholder');

        // For hero rotator, bind to the stage container
        const rotatorStage = img.closest('.studio-hero-stage');
        const kiveViewport = img.closest('.kive-ui-viewport');
        const kiveThumb = img.closest('.kive-thumb');

        if (rotatorStage) {
            target = rotatorStage;
        } else if (kiveViewport) {
            target = kiveViewport;
        } else if (kiveThumb) {
            target = kiveThumb;
        } else if (!target) {
            target = img.parentElement;
        }

        // Prevent duplicate listener bindings if multiple images share the same target
        if (initializedTargets.has(target)) return;
        initializedTargets.add(target);

        function getActiveImg() {
            if (rotatorStage) {
                return target.querySelector('.studio-hero-img.is-active') || img;
            }
            if (kiveViewport) {
                return target.querySelector('.kive-viewport-img.is-active') || img;
            }
            return img;
        }

        // Drag Enter
        target.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.stopPropagation();
            getActiveImg().classList.add('is-drop-target');
            ddLog('dragenter', target);
        });

        // Drag Over
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            getActiveImg().classList.add('is-drop-target');
        });

        // Drag Leave
        target.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            getActiveImg().classList.remove('is-drop-target');
        });

        // Drop
        target.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const activeImg = getActiveImg();
            activeImg.classList.remove('is-drop-target');

            let file = null;
            const dt = e.dataTransfer;
            if (dt) {
                if (dt.files && dt.files.length > 0) {
                    file = dt.files[0];
                } else if (dt.items && dt.items.length > 0) {
                    for (const item of dt.items) {
                        if (item.kind === 'file') {
                            file = item.getAsFile();
                            if (file) break;
                        }
                    }
                }
            }

            if (file) {
                ddLog('drop file', file.name, 'target', activeImg.getAttribute('data-img-key'));
                handleImageUpload(activeImg, file);
            }
        });

        // Click to Upload
        target.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const activeImg = getActiveImg();
            ddLog('click upload target', activeImg.getAttribute('data-img-key'));

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg, image/png, image/webp, image/jpg';
            input.onchange = (e) => {
                if (e.target.files.length > 0) {
                    handleImageUpload(activeImg, e.target.files[0]);
                }
            };
            input.click();
        });

        // Add Hover Overlay Hint if it doesn't already have one
        if (target && !target.querySelector('.dd-hover-overlay')) {
            target.style.position = 'relative';
            const overlay = document.createElement('div');
            overlay.className = 'dd-hover-overlay';

            const key = img.getAttribute('data-img-key');
            let ratio = '4:5 (or any)';
            if (key === 'hero-ads') ratio = '16:9';
            if (key === 'hero-editorial') ratio = '9:16 (縦長)';
            if (key === 'hero-close') ratio = '1:1 or 4:5';
            if (key === 'preset_gallery') ratio = '21:9';

            overlay.innerHTML = `<div style="text-align:center;">Click or Drop to replace<br><span style="font-size:0.65rem; opacity:0.8; margin-top:4px; display:block;">推奨サイズ: ${ratio}</span></div>`;
            target.appendChild(overlay);
        }
    });

    // Global Drop Prevention (prevent browser from opening file if dropped outside)
    window.addEventListener("dragover", (e) => { e.preventDefault(); }, false);
    window.addEventListener("drop", (e) => { e.preventDefault(); }, false);

    // Shift + R to clear persisted images
    window.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key.toLowerCase() === 'r') {
            localStorage.removeItem(PERSIST_KEY);
            alert('Persisted images cleared. Reloading page...');
            window.location.reload();
        }
    });

    // ---- ObjectURL cache to avoid leaks ----
    const __imgObjectUrlMap = new Map(); // key -> objectURL

    async function handleImageUpload(imgElement, file) {
        const key = imgElement.getAttribute("data-img-key") || "";
        const type = (file && file.type) ? file.type.toLowerCase() : "";

        // Relaxed validation: Allow if type is empty (Mac drag bug) or starts with 'image/'
        if (type !== "" && !type.startsWith("image/")) {
            ddLog('Invalid file type ignored:', type);
            return;
        }

        // revoke previous
        if (key && __imgObjectUrlMap.has(key)) {
            try { URL.revokeObjectURL(__imgObjectUrlMap.get(key)); } catch (_) { }
            __imgObjectUrlMap.delete(key);
        }

        const url = URL.createObjectURL(file);
        if (key) __imgObjectUrlMap.set(key, url);

        imgElement.src = url;
        imgElement.style.display = 'block';

        // decode for reliable paint timing
        try { if (imgElement.decode) await imgElement.decode(); } catch (_) { }

        // Hide Empty State UI if inside Rotator or Preset Gallery
        const emptyState = imgElement.parentElement?.querySelector('.studio-empty-state');
        if (emptyState) {
            emptyState.style.opacity = '0';
        }

        // Hide Kive Feature Empty State
        const kiveEmpty = imgElement.parentElement?.querySelector('.kive-empty');
        if (kiveEmpty) {
            kiveEmpty.classList.add('is-hidden');
        }

        // Hide Kive Thumb Empty State
        const kiveThumbEmpty = imgElement.parentElement?.querySelector('.kive-thumb-empty');
        if (kiveThumbEmpty) {
            kiveThumbEmpty.style.opacity = '0';
        }

        // Hide placeholder if sibling exists
        if (imgElement.nextElementSibling && imgElement.nextElementSibling.classList.contains('tile-placeholder')) {
            imgElement.nextElementSibling.style.display = 'none';
        }

        // Persist logic (using FileReader as before)
        if (shouldPersist) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const savedImages = JSON.parse(localStorage.getItem(PERSIST_KEY)) || {};
                    savedImages[key] = e.target.result;
                    localStorage.setItem(PERSIST_KEY, JSON.stringify(savedImages));
                } catch (err) {
                    console.error('Failed to save image to localStorage', err);
                    if (err.name === 'QuotaExceededError') {
                        alert('Local Storage full. Cannot save image permanently.');
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }
})();

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.fade-up');
animateElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// iOS Safari Fixes
// ===================================
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

function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 100), { passive: true });
window.addEventListener('orientationchange', debounce(setVH, 100), { passive: true });

// ===================================
// Analytics & Tracking
// ===================================
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-light, .btn-secondary-light').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        console.log('CTA Clicked:', buttonText);
    });
});

// ===================================
// Console Welcome
// ===================================
console.log('%cLUMINA STUDIO', 'font-size: 24px; font-weight: bold; color: #18181b;');
console.log('%cAI-powered fashion studio for D2C brands', 'font-size: 14px; color: #71717a;');

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = '送信中...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const formData = new FormData(contactForm);
            const data = {
                company: formData.get('company'),
                name: formData.get('name'),
                email: formData.get('email'),
                contact_type: formData.get('contact_type'),
                message: formData.get('message'),
                honeypot: formData.get('honeypot') || ''
            };

            if (data.honeypot) {
                console.log('Spam detected - blocking submission');
                setTimeout(() => {
                    window.location.href = 'thanks.html';
                }, 500);
                return;
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.ok) {
                formMessage.textContent = 'お問い合わせを受け付けました。ありがとうございます。';
                formMessage.className = 'form-message success';

                setTimeout(() => {
                    window.location.href = 'thanks.html';
                }, 1000);
            } else {
                formMessage.textContent = result.error || 'エラーが発生しました。もう一度お試しください。';
                formMessage.className = 'form-message error';
                submitBtn.disabled = false;
                submitBtn.textContent = '送信する';
            }

        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = '通信エラーが発生しました。インターネット接続を確認してください。';
            formMessage.className = 'form-message error';
            submitBtn.disabled = false;
            submitBtn.textContent = '送信する';
        }
    });
}

// ===================================
// Hero Rotator Animation
// ===================================
(function () {
    const ROTATE_MS = 3200;

    const rotator = document.getElementById("heroRotator");
    const bar = document.getElementById("heroRotatorBar");
    if (!rotator || !bar) return;

    const imgEC = rotator.querySelector('img[data-img-key="hero-rotator-ec"]');
    const imgCP = rotator.querySelector('img[data-img-key="hero-rotator-campaign"]');
    const tabEC = rotator.querySelector('[data-rotator-tab="ec"]');
    const tabCP = rotator.querySelector('[data-rotator-tab="campaign"]');

    if (!imgEC || !imgCP || !tabEC || !tabCP) return;

    let state = "ec"; // ec | campaign
    let timer = null;
    let raf = null;
    let start = 0;
    let paused = false;
    let pinned = false; // user clicked tab => pin

    const setActive = (next) => {
        state = next;
        imgEC.classList.toggle("is-active", state === "ec");
        imgCP.classList.toggle("is-active", state === "campaign");
        tabEC.classList.toggle("is-active", state === "ec");
        tabCP.classList.toggle("is-active", state === "campaign");
        rotator.classList.toggle("is-ec", state === "ec");
        rotator.classList.toggle("is-campaign", state === "campaign");
    };

    const tick = (t) => {
        if (paused) return;
        if (!start) start = t;
        const elapsed = t - start;
        const p = Math.min(elapsed / ROTATE_MS, 1);
        bar.style.width = (p * 100).toFixed(2) + "%";

        if (p >= 1) {
            start = t;
            if (!pinned) setActive(state === "ec" ? "campaign" : "ec");
            bar.style.width = "0%";
        }
        raf = requestAnimationFrame(tick);
    };

    const play = () => {
        if (raf) cancelAnimationFrame(raf);
        paused = false;
        start = 0;
        raf = requestAnimationFrame(tick);
    };

    const pause = () => {
        paused = true;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
    };

    // Hover pause (for viewing + D&D)
    rotator.addEventListener("mouseenter", () => pause());
    rotator.addEventListener("mouseleave", () => play());

    // Tabs pin
    tabEC.addEventListener("click", () => {
        pinned = true;
        setActive("ec");
        bar.style.width = "0%";
    });
    tabCP.addEventListener("click", () => {
        pinned = true;
        setActive("campaign");
        bar.style.width = "0%";
    });

    // If user starts dragging over the page: pause rotator (prevents fighting)
    document.addEventListener("dragenter", () => pause(), true);

    // Start
    setActive("ec");
    play();
})();

// ===================================
// Kive Features Section Logic
// ===================================
(function () {
    const featureSection = document.getElementById("features");
    if (!featureSection) return;

    const steps = document.querySelectorAll(".kive-step");
    const viewportImgs = document.querySelectorAll(".kive-viewport-img");
    const kiveEmpty = document.getElementById("kiveEmpty");
    const pillA = document.getElementById("kivePillA");
    const pillB = document.getElementById("kivePillB");
    const pillC = document.getElementById("kivePillC");

    const pillData = [
        { a: "Preset", b: "Library", c: "Locked" },
        { a: "Outputs", b: "EC • 3:4", c: "IG • 1:1" },
        { a: "Queue", b: "Live", c: "HD" },
        { a: "Brand", b: "Consistency", c: "Stable" }
    ];

    const EMPTY_SRC = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    function applyStep(index) {
        // Update Buttons
        steps.forEach((s, idx) => {
            s.classList.toggle("is-active", idx === index);
        });

        // Update Viewport Image
        viewportImgs.forEach((img, idx) => {
            img.classList.toggle("is-active", idx === index);
        });

        // Update Pills
        const data = pillData[index] || pillData[0];
        if (pillA) pillA.textContent = data.a;
        if (pillB) pillB.textContent = data.b;
        if (pillC) pillC.textContent = data.c;

        // Check Empty State visibility
        const currentImg = document.querySelector(`.kive-viewport-img[data-img-key="feature_ui_${index}"]`);
        if (currentImg && currentImg.src.includes(EMPTY_SRC.substring(20))) {
            kiveEmpty.classList.remove("is-hidden");
        } else {
            kiveEmpty.classList.add("is-hidden");
        }
    }

    // Scroll Detection via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                const idx = parseInt(entry.target.getAttribute("data-kive-step"), 10);
                if (!isNaN(idx)) applyStep(idx);
            }
        });
    }, {
        root: null,
        rootMargin: "-20% 0px -40% 0px", // triggers when element is roughly in middle
        threshold: 0.5
    });

    steps.forEach(step => observer.observe(step));

    // Click overrides
    steps.forEach((step, idx) => {
        step.addEventListener("click", () => {
            applyStep(idx);
            step.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });

    // Initial check for Data Object Empty Overlays (invoked once files restore from LS)
    setTimeout(() => applyStep(0), 100);
})();

/* ============================================================
   KIVE-LEVEL POLISH — added 2026-02-20
   Appended below existing code; no existing events overwritten
   ============================================================ */

// A-2 (3): Studio-hero-card mouse-parallax tilt (max 3deg)
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = document.getElementById('heroRotator');
    if (!card) return;
    const wrap = card.closest('.studio-hero-wrap');
    if (!wrap) return;

    function onMove(e) {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rx = -dy * 3;
        const ry = dx * 3;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }

    function onLeave() {
        card.style.transform = '';
    }

    // Mobile: skip
    if (window.innerWidth > 768) {
        wrap.addEventListener('mousemove', onMove, { passive: true });
        wrap.addEventListener('mouseleave', onLeave);
    }
})();

// C-2: Add scale to kive image crossfade via CSS class toggle
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // When kive steps switch, images fade+scale via CSS. We inject the class hook.
    const style = document.createElement('style');
    style.textContent = `
        .kive-ui-viewport .studio-hero-img,
        .kive-viewport-img {
            transition: opacity 0.4s ease, transform 0.4s ease !important;
        }
        .kive-ui-viewport .studio-hero-img:not(.is-active),
        .kive-viewport-img:not(.is-active) {
            transform: scale(1.01);
        }
        .kive-ui-viewport .studio-hero-img.is-active,
        .kive-viewport-img.is-active {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
})();


/* ============================================================
   OFGALLERY — drag-and-drop / click-to-replace (2026-02-20)
   Scoped to [data-dd-slot] within .ofgallery
   ============================================================ */
(function () {
    function loadImageIntoWrap(wrap, file) {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            let img = wrap.querySelector('.ofgallery-img');
            if (!img) {
                img = document.createElement('img');
                img.className = 'ofgallery-img';
                img.draggable = false;
                wrap.prepend(img);
            }
            img.src = e.target.result;
            img.alt = 'Custom image';
        };
        reader.readAsDataURL(file);
    }

    document.querySelectorAll('.ofgallery-img-wrap').forEach(function (wrap) {
        // File input (click)
        const input = wrap.querySelector('.ofgallery-file-input');
        if (input) {
            input.addEventListener('change', function () {
                if (this.files && this.files[0]) loadImageIntoWrap(wrap, this.files[0]);
                this.value = '';
            });
        }

        // Drag & Drop
        wrap.addEventListener('dragover', function (e) {
            e.preventDefault();
            wrap.classList.add('is-over');
        });
        wrap.addEventListener('dragleave', function (e) {
            if (!wrap.contains(e.relatedTarget)) wrap.classList.remove('is-over');
        });
        wrap.addEventListener('drop', function (e) {
            e.preventDefault();
            wrap.classList.remove('is-over');
            const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
            if (file) loadImageIntoWrap(wrap, file);
        });
    });
})();


/* ============================================================
   EC CAROUSEL — 4-slide (Front/Back/Side/Close-up) 2026-02-21
   ============================================================ */
(function () {
    const carousel = document.getElementById('ecCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.ofgallery-slide');
    const dots   = carousel.querySelectorAll('.ofc-dot');
    const labels = carousel.querySelectorAll('.ofc-label');
    const total  = slides.length;
    let current  = 0;

    function goTo(n) {
        slides[current].classList.remove('is-active');
        dots[current].classList.remove('is-active');
        labels[current].classList.remove('is-active');
        current = (n + total) % total;
        slides[current].classList.add('is-active');
        dots[current].classList.add('is-active');
        labels[current].classList.add('is-active');
    }

    // Activate first slide
    slides[0].classList.add('is-active');

    carousel.querySelector('.ofc-prev').addEventListener('click', () => goTo(current - 1));
    carousel.querySelector('.ofc-next').addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    // Touch swipe
    let touchStartX = 0;
    const track = carousel.querySelector('.ofgallery-carousel-track');
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
})();

