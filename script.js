document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('ri-menu-line')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                let offset = 80; // Default offset for header
                
                // Special offset for Team and Products sections
                if(targetId === '#team') {
                    offset = 120; // Increased offset for Team section
                }
                if(targetId === '#products') {
                    offset = 120; // Increased offset for Products section
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Reveal animations on scroll
    const animatedElements = document.querySelectorAll('.animated:not(.delay-1):not(.delay-2):not(.delay-3):not(.delay-4)');
    const animatedElementsDelay1 = document.querySelectorAll('.animated.delay-1');
    const animatedElementsDelay2 = document.querySelectorAll('.animated.delay-2');
    const animatedElementsDelay3 = document.querySelectorAll('.animated.delay-3');
    const animatedElementsDelay4 = document.querySelectorAll('.animated.delay-4');
    
    function checkInView(elements, offset = 0.8) {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * offset) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        });
    }
    
    // Initialize styles for animations
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animatedElementsDelay1.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s';
    });
    
    animatedElementsDelay2.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
    });
    
    animatedElementsDelay3.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s';
    });
    
    animatedElementsDelay4.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s';
    });
    
    // Run initially
    setTimeout(() => {
        checkInView(animatedElements);
        checkInView(animatedElementsDelay1);
        checkInView(animatedElementsDelay2);
        checkInView(animatedElementsDelay3);
        checkInView(animatedElementsDelay4);
    }, 300);
    
    // Run on scroll
    window.addEventListener('scroll', function() {
        checkInView(animatedElements);
        checkInView(animatedElementsDelay1);
        checkInView(animatedElementsDelay2);
        checkInView(animatedElementsDelay3);
        checkInView(animatedElementsDelay4);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.team-member, .product-card, .platform-logo');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add microinteractions to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-enhance, .btn-purchase');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                companyName: document.getElementById('companyName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            
            try {
                // Display loading state
                formStatus.textContent = 'Sending your information...';
                formStatus.className = 'form-status';
                
                // Production Webhook URL
                const webhookUrl = 'https://harryfoster.app.n8n.cloud/webhook/26888968-5747-473f-b388-3786a20e1c3d';
                
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Thank you! We\'ll be in touch soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    // Error
                    formStatus.textContent = 'Something went wrong. Please try again later.';
                    formStatus.className = 'form-status error';
                }
                
            } catch (error) {
                console.error('Error submitting form:', error);
                formStatus.textContent = 'Something went wrong. Please try again later.';
                formStatus.className = 'form-status error';
            }
        });
    }
});
