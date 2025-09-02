// Mobile Navigation Toggle with improved error handling
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced typing effect for hero section
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const words = ['Quantitative Researcher', 'Financial Engineer', 'Algorithmic Trader', 'Risk Analyst', 'Data Scientist'];
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
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect with initial delay
    setTimeout(typeEffect, 1000);
}

// Enhanced Project Code Snippets Cycling
function initializeProjectCycling() {
    const projectFilename = document.getElementById('project-filename');
    const codeSnippet = document.getElementById('code-snippet');
    
    if (!projectFilename || !codeSnippet) return;
    
    const quantProjects = [
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
            filename: 'heston_model.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>',
                '<span class="keyword">from</span> <span class="variable">scipy.integrate</span> <span class="keyword">import</span> <span class="variable">quad</span>',
                '&nbsp;',
                '<span class="keyword">def</span> <span class="function">heston_price</span>(<span class="variable">S0, K, T, r, v0, kappa</span>):',
                '&nbsp;&nbsp;<span class="property">char_func</span> = <span class="function">heston_char_func</span>(<span class="variable">params</span>)',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="function">integrate_price</span>(<span class="variable">char_func</span>)'
            ]
        },
        {
            filename: 'monte_carlo.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>',
                '<span class="keyword">from</span> <span class="variable">numba</span> <span class="keyword">import</span> <span class="variable">jit</span>',
                '&nbsp;',
                '<span class="variable">@jit</span>(<span class="property">nopython=True</span>)',
                '<span class="keyword">def</span> <span class="function">monte_carlo_option</span>(<span class="variable">S0, K, T, r, sigma</span>):',
                '&nbsp;&nbsp;<span class="property">paths</span> = <span class="function">simulate_gbm</span>(<span class="variable">S0, r, sigma, T</span>)',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="function">np.exp</span>(<span class="variable">-r * T</span>) * <span class="function">np.mean</span>(<span class="variable">payoffs</span>)'
            ]
        },
        {
            filename: 'volatility_surface.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">pandas</span> <span class="keyword">as</span> <span class="variable">pd</span>',
                '<span class="keyword">from</span> <span class="variable">scipy.interpolate</span> <span class="keyword">import</span> <span class="variable">RBFInterpolator</span>',
                '&nbsp;',
                '<span class="keyword">def</span> <span class="function">build_vol_surface</span>(<span class="variable">market_data</span>):',
                '&nbsp;&nbsp;<span class="property">surface</span> = <span class="function">RBFInterpolator</span>(<span class="variable">strikes, expiries, vols</span>)',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="function">surface</span>(<span class="variable">grid_points</span>)'
            ]
        },
        {
            filename: 'algo_trading.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">backtrader</span> <span class="keyword">as</span> <span class="variable">bt</span>',
                '<span class="keyword">import</span> <span class="variable">pandas</span> <span class="keyword">as</span> <span class="variable">pd</span>',
                '&nbsp;',
                '<span class="keyword">class</span> <span class="function">QuantStrategy</span>(<span class="variable">bt.Strategy</span>):',
                '&nbsp;&nbsp;<span class="keyword">def</span> <span class="function">next</span>(<span class="variable">self</span>):',
                '&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">signal</span> = <span class="function">self.calculate_signal</span>()',
                '&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">if</span> <span class="variable">signal</span> > <span class="string">0.8</span>: <span class="function">self.buy</span>()'
            ]
        },
        {
            filename: 'risk_analytics.py',
            code: [
                '<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>',
                '<span class="keyword">from</span> <span class="variable">scipy</span> <span class="keyword">import</span> <span class="variable">stats</span>',
                '&nbsp;',
                '<span class="keyword">def</span> <span class="function">calculate_var</span>(<span class="variable">returns, confidence=0.95</span>):',
                '&nbsp;&nbsp;<span class="property">sorted_returns</span> = <span class="function">np.sort</span>(<span class="variable">returns</span>)',
                '&nbsp;&nbsp;<span class="property">index</span> = <span class="function">int</span>((<span class="string">1</span> - <span class="variable">confidence</span>) * <span class="function">len</span>(<span class="variable">returns</span>))',
                '&nbsp;&nbsp;<span class="keyword">return</span> <span class="variable">sorted_returns</span>[<span class="variable">index</span>]'
            ]
        }
    ];
    
    let currentProjectIndex = 0;
    
    function cycleProjects() {
        const project = quantProjects[currentProjectIndex];
        
        // Add fade out effect
        projectFilename.style.opacity = '0';
        codeSnippet.style.opacity = '0';
        
        setTimeout(() => {
            // Update filename
            projectFilename.textContent = project.filename;
            
            // Update code content
            codeSnippet.innerHTML = project.code.map(line => `<p>${line}</p>`).join('');
            
            // Fade back in
            projectFilename.style.opacity = '1';
            codeSnippet.style.opacity = '1';
        }, 300);
        
        // Move to next project
        currentProjectIndex = (currentProjectIndex + 1) % quantProjects.length;
    }
    
    // Start cycling after initial delay
    setTimeout(() => {
        setInterval(cycleProjects, 5000); // Change every 5 seconds
    }, 3000); // Initial 3 second delay
}

// Enhanced animated counter for stats
function animateCounter(element, target) {
    let current = 0;
    const suffix = element.textContent.replace(/[0-9]/g, '');
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Modal Functions for Connect Section
function openEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element
        const firstFocusable = modal.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element
        const firstFocusable = modal.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Enhanced scroll-based animations
function initializeScrollAnimations() {
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
                    if (numberElement && !numberElement.classList.contains('animated')) {
                        const targetText = numberElement.textContent;
                        const target = parseInt(targetText.replace(/\D/g, ''));
                        if (!isNaN(target)) {
                            numberElement.classList.add('animated');
                            animateCounter(numberElement, target);
                        }
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .stat-item, .achievement-card, .connect-card, .highlight-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Updated navbar background on scroll with new colors
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(79, 142, 247, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Enhanced hover effects for project cards with new colors
function initializeProjectHovers() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(79, 142, 247, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(79, 142, 247, 0.1)';
        });
    });
}

// Subtle parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (scrolled <= window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Initialize all functionality when DOM is loade
