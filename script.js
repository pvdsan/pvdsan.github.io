// Modern B2B SaaS Portfolio - JavaScript
// ======================================

// ==================== //
// Navigation
// ==================== //

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navLinksContainer?.classList.remove('active');
    });
});

// Navbar scroll effect (guarded if navbar exists)
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== //
// Active Navigation Link
// ==================== //

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==================== //
// Smooth Scroll
// ==================== //

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// Intersection Observer for Animations
// ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll(`
    .hero-content-wrapper,
    .quick-links,
    .about-grid,
    .timeline-item,
    .achievement-card,
    .publication-item,
    .project-card,
    .skill-category,
    .education-card,
    .certification-card,
    .gallery-item,
    .contact-grid
`);

animateElements.forEach(el => {
    observer.observe(el);
});

// ==================== //
// Form Handling
// ==================== //

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification('success', 'Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // In production, replace the setTimeout with actual API call:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('success', 'Message sent successfully!');
                contactForm.reset();
            } else {
                showNotification('error', 'Failed to send message. Please try again.');
            }
        } catch (error) {
            showNotification('error', 'An error occurred. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        */
    });
}

// ==================== //
// Notification System
// ==================== //

function showNotification(type, message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                ${type === 'success' 
                    ? '<path d="M16 6L7.5 14.5L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                    : '<path d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'}
            </svg>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(12px);
            min-width: 300px;
            color: var(--bg-primary);
        }
        
        .notification-success .notification-content {
            background: rgba(0, 255, 0, 0.1);
            border-color: rgba(0, 255, 0, 0.3);
            color: #00ff00;
        }
        
        .notification-error .notification-content {
            background: rgba(255, 0, 0, 0.1);
            border-color: rgba(255, 0, 0, 0.3);
            color: #ff0000;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
            }
            
            .notification-content {
                min-width: unset;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================== //
// Cursor Trail Effect
// ==================== //

const cursor = document.createElement('div');
cursor.className = 'cursor-trail';
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        mix-blend-mode: difference;
        display: none;
    }
    
    @media (min-width: 1024px) {
        .cursor-trail {
            display: block;
        }
    }
`;
document.head.appendChild(cursorStyle);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
    });
});

// ==================== //
// Stats Counter Animation
// ==================== //

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                const isK = text.includes('K');
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const target = isK ? number : number;
                
                animateValue(stat, 0, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==================== //
// Keyboard Navigation
// ==================== //

document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinksContainer?.classList.contains('active')) {
        navToggle?.classList.remove('active');
        navLinksContainer?.classList.remove('active');
    }
});

// ==================== //
// Lazy Loading Images
// ==================== //

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==================== //
// Copy Email on Click
// ==================== //

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const email = link.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showNotification('success', `Email copied to clipboard: ${email}`);
            });
        }
    });
});

// ==================== //
// Parallax Effect on Hero
// ==================== //

const heroBackground = document.querySelector('.hero-background');

if (heroBackground && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${parallax}px)`;
    });
}

// ==================== //
// Print Optimization
// ==================== //

window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ==================== //
// Performance Monitoring
// ==================== //

if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log('Performance:', entry);
        });
    });
    
    // Observe paint timing
    perfObserver.observe({ entryTypes: ['paint'] });
}

// ==================== //
// Service Worker (Optional)
// ==================== //

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker for offline support
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
    */
}

// ==================== //
// Console Easter Egg
// ==================== //

console.log('%c👋 Hello Developer!', 'font-size: 24px; font-weight: bold; color: #ffffff;');
console.log('%cInterested in the code? Check it out on GitHub!', 'font-size: 14px; color: #a0a0a0;');
console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'font-size: 12px; color: #606060;');

// ==================== //
// Initialize
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize AOS or other libraries here if needed
    console.log('Portfolio initialized successfully');
});

// ==================== //
// Handle External Links
// ==================== //

const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach(link => {
    // Ensure security attributes
    if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ==================== //
// Analytics (Optional)
// ==================== //

function trackEvent(category, action, label) {
    // Replace with your analytics code (Google Analytics, Plausible, etc.)
    console.log('Event:', { category, action, label });
    
    // Example for Google Analytics:
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    */
}

// Track button clicks
const ctaButtons = document.querySelectorAll('.btn-primary');

ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'click', btn.textContent.trim());
    });
});

// Track project views
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', () => {
        const projectTitle = link.closest('.project-card').querySelector('.project-title').textContent;
        trackEvent('Project', 'view', projectTitle);
    });
});

// ==================== //
// Timeline Card Expansion
// ==================== //

const timelineItems = document.querySelectorAll('.timeline-item');
const timeline = document.querySelector('.timeline');

timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    
    if (content) {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Check if clicking on an already expanded item
            const isExpanded = item.classList.contains('expanded');
            
            // Close all other expanded items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('expanded');
            });
            
            // Toggle current item
            if (!isExpanded) {
                item.classList.add('expanded');
                timeline.classList.add('has-expanded');
            } else {
                timeline.classList.remove('has-expanded');
            }
        });
    }
});

// Close expanded card when clicking backdrop
if (timeline) {
    timeline.addEventListener('click', (e) => {
        if (e.target === timeline || e.target.classList.contains('timeline')) {
            timelineItems.forEach(item => {
                item.classList.remove('expanded');
            });
            timeline.classList.remove('has-expanded');
        }
    });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        timelineItems.forEach(item => {
            item.classList.remove('expanded');
        });
        timeline?.classList.remove('has-expanded');
    }
});

// ==================== //
// Contact Card Modal
// ==================== //

const getInTouchBtn = document.getElementById('getInTouchBtn');
const contactCardOverlay = document.getElementById('contactCardOverlay');
const contactCard = document.getElementById('contactCard');
const closeContactCard = document.getElementById('closeContactCard');

// Open contact card
if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get button position for transform origin
        const btnRect = getInTouchBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        // Set transform origin to button center
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        
        const originX = ((btnCenterX / window.innerWidth) * 100);
        const originY = ((btnCenterY / window.innerHeight) * 100);
        
        contactCard.style.transformOrigin = `${originX}% ${originY}%`;
        
        // Show overlay and card
        contactCardOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track event
        trackEvent('Contact', 'open', 'Get In Touch Button');
    });
}

// Close contact card
function closeContactCardModal() {
    contactCardOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Track event
    trackEvent('Contact', 'close', 'Contact Card');
}

if (closeContactCard) {
    closeContactCard.addEventListener('click', closeContactCardModal);
}

// Close on overlay click
if (contactCardOverlay) {
    contactCardOverlay.addEventListener('click', (e) => {
        if (e.target === contactCardOverlay) {
            closeContactCardModal();
        }
    });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactCardOverlay.classList.contains('active')) {
        closeContactCardModal();
    }
});

// Track contact card link clicks
const contactCardLinks = document.querySelectorAll('.contact-card-link');
contactCardLinks.forEach(link => {
    link.addEventListener('click', () => {
        const label = link.querySelector('.contact-card-label')?.textContent || 'Unknown';
        trackEvent('Contact', 'click', label);
    });
});

// Copy to clipboard functionality
const copyButtons = document.querySelectorAll('.contact-copy-btn');
copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const textToCopy = btn.getAttribute('data-copy');
        const label = btn.closest('.contact-card-item')?.querySelector('.contact-card-label')?.textContent || 'Unknown';
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Visual feedback
            const originalHTML = btn.innerHTML;
            btn.classList.add('copied');
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            
            // Show notification
            showNotification('success', `${label} copied to clipboard!`);
            
            // Track event
            trackEvent('Contact', 'copy', label);
            
            // Reset after 2 seconds
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalHTML;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy:', err);
            showNotification('error', 'Failed to copy to clipboard');
        }
    });
});

// ==================== //
// Project Category Tabs
// ==================== //

const projectTabs = document.querySelectorAll('.project-tab');
const projectCards = document.querySelectorAll('.project-card');

if (projectTabs.length > 0 && projectCards.length > 0) {
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Update active tab
            projectTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    // Show card
                    card.classList.remove('fade-out', 'hidden');
                    card.classList.add('fade-in');
                } else {
                    // Hide card
                    card.classList.add('fade-out');
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.classList.remove('fade-in');
                    }, 250);
                }
            });
            
            // Track event
            trackEvent('Projects', 'filter', category);
        });
    });
}
