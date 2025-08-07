// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Typing effect for hero section - Updated for Quant focus
const typingText = document.querySelector('.typing-text');
const words = ['Quantitative Researcher', 'Financial Modeler', 'Algorithmic Trader', 'Risk Analyst'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(typeEffect, typingSpeed);
}

// Animated counter for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// Dashboard iframe handling
function initializeDashboard() {
    const dashboardEmbed = document.querySelector('.dashboard-embed');
    const iframe = document.querySelector('.dashboard-embed iframe');
    
    if (iframe && dashboardEmbed) {
        // Add loading state
        dashboardEmbed.classList.add('loading');
        
        // Remove loading state when iframe loads
        iframe.addEventListener('load', function() {
            setTimeout(() => {
                dashboardEmbed.classList.remove('loading');
            }, 500);
        });
        
        // Handle iframe interaction for better UX
        iframe.addEventListener('mouseenter', function() {
            // Temporarily disable body scroll when interacting with iframe
            document.body.style.pointerEvents = 'none';
            iframe.style.pointerEvents = 'auto';
        });
        
        iframe.addEventListener('mouseleave', function() {
            // Re-enable body scroll
            document.body.style.pointerEvents = 'auto';
        });
        
        // Add click handler to focus iframe
        iframe.addEventListener('click', function() {
            this.focus();
        });
    }
}

// Dashboard overlay interactions
function initializeDashboardOverlay() {
    const dashboardPreview = document.querySelector('.dashboard-preview');
    const overlay = document.querySelector('.dashboard-overlay');
    
    if (dashboardPreview && overlay) {
        // Click overlay to launch dashboard in new tab
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target.closest('.overlay-content')) {
                window.open('https://quant-finance-dashboard-cxatahokgdtcs9vm8yjmlg.streamlit.app', '_blank');
            }
        });
        
        // Add keyboard accessibility
        overlay.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open('https://quant-finance-dashboard-cxatahokgdtcs9vm8yjmlg.streamlit.app', '_blank');
            }
        });
        
        // Make overlay focusable
        overlay.setAttribute('tabindex', '0');
        overlay.setAttribute('role', 'button');
        overlay.setAttribute('aria-label', 'Launch Interactive Dashboard');
    }
}

// Enhanced scroll-based animations for dashboard section
function initializeDashboardAnimations() {
    const dashboardSection = document.querySelector('#live-models');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (dashboardSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate feature cards with stagger effect
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(dashboardSection);
    }
}

// Performance optimization for iframe lazy loading
function optimizeIframeLoading() {
    const iframe = document.querySelector('.dashboard-embed iframe');
    if (iframe) {
        // Store original src
        const originalSrc = iframe.getAttribute('src');
        iframe.removeAttribute('src');
        
        // Intersection Observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load iframe when it comes into view
                    iframe.setAttribute('src', originalSrc);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '100px' });
        
        observer.observe(iframe);
    }
}

// Dashboard button hover effects
function initializeDashboardButtons() {
    const dashboardBtns = document.querySelectorAll('.dashboard-btn');
    
    dashboardBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Start animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing functionality
    typeEffect();
    
    // Initialize new dashboard functionality
    initializeDashboard();
    initializeDashboardOverlay();
    initializeDashboardAnimations();
    optimizeIframeLoading();
    initializeDashboardButtons();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters for stats
                if (entry.target.classList.contains('stat-item')) {
                    const numberElement = entry.target.querySelector('h3');
                    const target = parseInt(numberElement.textContent);
                    animateCounter(numberElement, target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations (including new dashboard elements)
    document.querySelectorAll('.project-card, .skill-category, .stat-item, .achievement-card, .dashboard-preview').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar background on scroll with financial theme
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:contact@arnavsharma.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Opening your email client... Looking forward to discussing quantitative finance with you!');
    
    // Reset form
    this.reset();
});

// Enhanced hover effects for project cards with financial animations
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        // Add subtle glow effect
        this.style.boxShadow = '0 15px 35px rgba(0, 255, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 15px 35px rgba(0, 255, 255, 0.1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Enhanced code block animation with financial formulas rotation
function updateCodeBlock() {
    const codeContent = document.querySelector('.code-content');
    if (!codeContent) return;
    
    const financialFormulas = [
        {
            filename: 'black_scholes.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>',
                '<span class="keyword">from</span> <span class="variable">scipy.stats</span> <span class="keyword">import</span> <span class="variable">norm</span>',
                '&nbsp;',
                '<span class="keyword">def</span> <span class="function">black_scholes</span>(<span class="variable">S, K, T, r, sigma</span>):',
                '&nbsp;&nbsp;<span class="property">d1</span> = <span class="function">calculate_d1</span>(<span class="variable">S, K, T, r, sigma</span>)',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="variable">S</span> * <span class="function">norm.cdf</span>(<span class="variable">d1</span>)'
            ]
        },
        {
            filename: 'monte_carlo.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>',
                '&nbsp;',
                '<span class="keyword">def</span> <span class="function">monte_carlo_price</span>(<span class="variable">S0, K, T, r, sigma, N</span>):',
                '&nbsp;&nbsp;<span class="property">z</span> = <span class="variable">np</span>.<span class="function">random.normal</span>(<span class="variable">0, 1, N</span>)',
                '&nbsp;&nbsp;<span class="property">ST</span> = <span class="variable">S0</span> * <span class="function">np.exp</span>(<span class="variable">drift * z</span>)',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="function">np.mean</span>(<span class="function">np.maximum</span>(<span class="variable">ST - K, 0</span>))'
            ]
        },
        {
            filename: 'heston_model.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>',
                '&nbsp;',
                '<span class="keyword">def</span> <span class="function">heston_simulation</span>(<span class="variable">kappa, theta, xi, rho</span>):',
                '&nbsp;&nbsp;<span class="property">v_next</span> = <span class="variable">v</span> + <span class="variable">kappa</span> * (<span class="variable">theta</span> - <span class="variable">v</span>) * <span class="variable">dt</span>',
                '&nbsp;&nbsp;<span class="property">S_next</span> = <span class="variable">S</span> * <span class="function">np.exp</span>(<span class="variable">mu * dt</span> + <span class="function">np.sqrt</span>(<span class="variable">v * dt</span>) * <span class="variable">dW</span>)',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="variable">S_next, v_next</span>'
            ]
        }
    ];
    
    let currentFormulaIndex = 0;
    
    // Rotate through different financial formulas every 10 seconds
    setInterval(() => {
        const formula = financialFormulas[currentFormulaIndex];
        const header = document.querySelector('.code-header span');
        
        if (header) {
            // Update filename
            header.textContent = formula.filename;
            
            // Update code content with fade effect
            codeContent.style.opacity = '0';
            
            setTimeout(() => {
                codeContent.innerHTML = formula.code.map(line => `<p>${line}</p>`).join('');
                codeContent.style.opacity = '1';
            }, 300);
        }
        
        currentFormulaIndex = (currentFormulaIndex + 1) % financialFormulas.length;
    }, 8000);
}

// Initialize code block rotation
document.addEventListener('DOMContentLoaded', () => {
    // Start code block rotation after a delay
    setTimeout(updateCodeBlock, 5000);
});

// Add smooth transition for dashboard iframe loading
window.addEventListener('load', () => {
    const dashboardEmbed = document.querySelector('.dashboard-embed');
    if (dashboardEmbed) {
        dashboardEmbed.style.opacity = '1';
    }
});

// Add error handling for iframe loading
function handleIframeError() {
    const iframe = document.querySelector('.dashboard-embed iframe');
    if (iframe) {
        iframe.addEventListener('error', function() {
            const errorMsg = document.createElement('div');
            errorMsg.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 400px; color: var(--text-gray); text-align: center; flex-direction: column;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: var(--cyan-primary); margin-bottom: 1rem;"></i>
                    <h3>Dashboard Temporarily Unavailable</h3>
                    <p style="margin-bottom: 1rem;">The interactive dashboard is currently loading or unavailable.</p>
                    <a href="https://quant-finance-dashboard-cxatahokgdtcs9vm8yjmlg.streamlit.app" target="_blank" class="btn primary">
                        Launch Dashboard Directly
                    </a>
                </div>
            `;
            this.parentNode.replaceChild(errorMsg, this);
        });
    }
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleIframeError);
