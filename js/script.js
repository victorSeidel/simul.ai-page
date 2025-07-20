// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() 
{
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');

    mobileMenuBtn.addEventListener('click', function() 
    {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) 
        {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        } 
        else 
            {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');
        }
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => 
    {
        link.addEventListener('click', function() 
        {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) 
    {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) 
        {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => 
{
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = 
{
    threshold: 0.2,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver(function(entries) 
{
    entries.forEach(entry => 
    {
        if (entry.isIntersecting) 
        {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() 
{
    const animateElements = document.querySelectorAll( `.feature-card, .btn-comparison, .benefit-item, .pricing-card, .pricing-cta, .pricing-note, .testimonial-card, 
        .faq-item, .section-header, .btn-benefit, .btn-testimonial`);
    
    animateElements.forEach(el => 
    {
        observer.observe(el);
    });
});

// Header background opacity on scroll
window.addEventListener('scroll', function() 
{
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) 
    {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } 
    else 
    {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() 
{
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => 
    {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('svg');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', function() 
        {
            const isOpen = answer.style.display !== 'none';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => 
            {
                if (otherItem !== item) 
                {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question svg');
                    otherAnswer.style.display = 'none';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isOpen) 
            {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } 
            else 
            {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});

// Form handling for CTA buttons
document.addEventListener('DOMContentLoaded', function() 
{
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => 
    {
        if (button.textContent.includes('Começar Grátis') || 
            button.textContent.includes('Assinar Agora') ||
            button.textContent.includes('Experimente Grátis')) 
        {
            
            button.addEventListener('click', function(e) 
            {
                e.preventDefault();
                
                // Simple analytics tracking (replace with your analytics code)
                if (typeof gtag !== 'undefined') 
                {
                    gtag('event', 'click', 
                    {
                        event_category: 'CTA',
                        event_label: button.textContent.trim()
                    });
                }              
            });
        }
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() 
{
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Performance optimization: Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload hero image
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && heroImg.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImg.src;
        document.head.appendChild(link);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide image on error
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = mobileMenuBtn.querySelector('.close-icon');
        
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        }
    }
});

// Analytics and tracking (replace with your actual analytics code)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Alternative: send to your own analytics endpoint
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ category, action, label })
    // });
}

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll milestones
        if (maxScroll >= 25 && maxScroll < 50) {
            trackEvent('Scroll', '25%', 'Page Scroll');
        } else if (maxScroll >= 50 && maxScroll < 75) {
            trackEvent('Scroll', '50%', 'Page Scroll');
        } else if (maxScroll >= 75 && maxScroll < 100) {
            trackEvent('Scroll', '75%', 'Page Scroll');
        } else if (maxScroll >= 100) {
            trackEvent('Scroll', '100%', 'Page Scroll');
        }
    }
});

// Track time on page
let startTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent('Engagement', 'Time on Page', `${timeOnPage} seconds`);
});
