document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        // Add animation class
        this.classList.add('animating');
        
        // Toggle dark mode
        body.classList.toggle('dark-mode');
        
        // Save preference
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('animating');
        }, 300);
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!event.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.classList.add('active');
            } else {
                answer.classList.remove('active');
            }
        });
    });
    
    // Form Submissions
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form type
            const isTrialForm = this.id === 'trialForm';
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                if (isTrialForm) {
                    // Show success modal
                    showSuccessModal();
                } else {
                    alert('Thank you for your message! We\'ll contact you within 1 business day.');
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 1500);
        });
    });
    
    // Success Modal
    function showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Free Trial Started!</h3>
                <p>Great decision! We've sent a confirmation email with:</p>
                <ul>
                    <li>Dashboard login details</li>
                    <li>Onboarding checklist</li>
                    <li>Our team's contact info</li>
                </ul>
                <p>Expect a call from your dedicated account manager within 24 hours.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.querySelector('.modal-content').style.cssText = `
            background: var(--card);
            padding: 40px;
            border-radius: var(--radius);
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: var(--shadow-xl);
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function (for inline onclick)
    window.closeModal = function() {
        const modal = document.querySelector('.success-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
            
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
    };
    
    // Add CSS animations for modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(20px); opacity: 0; }
        }
        
        .modal-icon {
            font-size: 4rem;
            color: var(--success);
            margin-bottom: 20px;
        }
        
        .modal-content h3 {
            margin-bottom: 16px;
            color: var(--text);
        }
        
        .modal-content p {
            color: var(--text-muted);
            margin-bottom: 16px;
        }
        
        .modal-content ul {
            list-style: none;
            margin: 20px 0;
            text-align: left;
            padding-left: 20px;
        }
        
        .modal-content li {
            margin-bottom: 8px;
            color: var(--text-muted);
        }
        
        .modal-content li:before {
            content: '✓';
            color: var(--success);
            margin-right: 10px;
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Animated counters for dashboard metrics
   // Replace the existing animateCounters function with this:

let countersAnimated = false; // Track if counters have been animated

function animateCounters() {
    if (countersAnimated) return; // Don't animate again
    
    const counters = document.querySelectorAll('.metric-value, .stat-value, .hero-features .stat-number');
    
    counters.forEach(counter => {
        // Get current text
        const originalText = counter.textContent;
        // Extract numbers and optional symbols
        const match = originalText.match(/(\d+)(.*)/);
        
        if (match) {
            const target = parseInt(match[1]);
            const suffix = match[2] || '';
            
            let current = 0;
            const duration = 1500; // 1.5 seconds
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        }
    });
    
    countersAnimated = true; // Mark as animated
}
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger counter animations when dashboard section is visible
                if (entry.target.id === 'dashboard') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky navigation with shadow on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Service card hover animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('.success-modal');
            if (modal) {
                closeModal();
            }
        }
    });
    
    // Initialize with some animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Add loaded class styles
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        body.loaded .hero-content {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        body.loaded .hero-image {
            animation: fadeInUp 0.6s ease 0.2s forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(loadedStyles);
});

// Interactive mobile flow steps
function initMobileFlow() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Add active state
            this.classList.toggle('active');
            
            // Animate icon on click
            const icon = this.querySelector('.step-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Optional: Show more info on click
            if (this.classList.contains('active')) {
                const description = this.querySelector('.step-description');
                if (description) {
                    description.style.maxHeight = description.scrollHeight + 'px';
                    description.style.opacity = '1';
                }
            }
        });
    });
    
    // Add intersection observer for step animations
    const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    flowSteps.forEach(step => flowObserver.observe(step));
}

// Call this in your DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    initMobileFlow();
});