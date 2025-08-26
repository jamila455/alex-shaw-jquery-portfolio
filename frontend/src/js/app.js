$(document).ready(function() {
    // Initialize Material Design Components
    initializeMDCComponents();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize modern interactions
    initializeModernFeatures();
    
    // Setup event handlers
    setupEventHandlers();
    
    // Add loading animations
    addLoadingAnimations();
});

function initializeMDCComponents() {
    // Initialize Top App Bar with dynamic behavior
    const topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    
    // Initialize all buttons with enhanced ripples
    $('.mdc-button').each(function() {
        const ripple = new mdc.ripple.MDCRipple(this);
        ripple.unbounded = false;
    });
    
    // Initialize all icon buttons
    $('.mdc-icon-button').each(function() {
        const ripple = new mdc.ripple.MDCRipple(this);
        ripple.unbounded = true;
    });
    
    // Initialize FAB with enhanced animation
    const fab = new mdc.ripple.MDCRipple(document.querySelector('.mdc-fab'));
    
    // Initialize all text fields with modern behavior
    $('.mdc-text-field').each(function() {
        const textField = new mdc.textField.MDCTextField(this);
        
        // Add focus/blur animations
        $(this).find('.mdc-text-field__input')
            .on('focus', function() {
                $(this).closest('.mdc-text-field').addClass('focused');
            })
            .on('blur', function() {
                $(this).closest('.mdc-text-field').removeClass('focused');
            });
    });
    
    // Initialize all cards with enhanced interactions
    $('.mdc-card__primary-action').each(function() {
        new mdc.ripple.MDCRipple(this);
    });
    
    // Initialize snackbar
    window.snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('#notification-snackbar'));
}

function initializeNavigation() {
    // Create section indicators
    createSectionIndicators();
    
    // Navigation click handlers
    $('.nav-item').on('click', function() {
        const section = $(this).data('section');
        navigateToSection(section);
        
        // Close mobile nav if open
        closeMobileNav();
    });
    
    // Mobile navigation handlers
    $('#mobile-menu-btn').on('click', function() {
        openMobileNav();
    });
    
    $('#close-mobile-nav').on('click', function() {
        closeMobileNav();
    });
    
    // Close mobile nav when clicking overlay
    $(document).on('click', '.mobile-nav-overlay', function() {
        closeMobileNav();
    });
    
    // Section indicators click handlers
    $(document).on('click', '.section-dot', function() {
        const section = $(this).data('section');
        navigateToSection(section);
    });
    
    // Update active navigation on scroll
    updateActiveNavigation();
}

function createSectionIndicators() {
    const sections = ['hero', 'skills', 'projects', 'contact'];
    const indicatorContainer = $('<div class="section-indicator"></div>');
    
    sections.forEach(section => {
        const dot = $(`<div class="section-dot" data-section="${section}"></div>`);
        indicatorContainer.append(dot);
    });
    
    $('body').append(indicatorContainer);
}

function navigateToSection(section) {
    let targetElement;
    
    switch(section) {
        case 'hero':
            targetElement = $('.hero-section');
            break;
        case 'skills':
            targetElement = $('.skills-section');
            break;
        case 'projects':
            targetElement = $('.projects-section');
            break;
        case 'contact':
            targetElement = $('.contact-section');
            break;
        default:
            targetElement = $('.hero-section');
    }
    
    if (targetElement.length) {
        const offset = section === 'hero' ? 0 : 80;
        $('html, body').animate({
            scrollTop: targetElement.offset().top - offset
        }, 800, 'easeInOutCubic');
    }
    
    // Update active state
    updateActiveNavItem(section);
}

function updateActiveNavItem(activeSection) {
    $('.nav-item').removeClass('active');
    $('.nav-item[data-section="' + activeSection + '"]').addClass('active');
    
    $('.section-dot').removeClass('active');
    $('.section-dot[data-section="' + activeSection + '"]').addClass('active');
}

function updateActiveNavigation() {
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(this).height();
        
        // Define sections with their positions
        const sections = [
            { name: 'hero', element: $('.hero-section') },
            { name: 'skills', element: $('.skills-section') },
            { name: 'projects', element: $('.projects-section') },
            { name: 'contact', element: $('.contact-section') }
        ];
        
        let activeSection = 'hero';
        
        sections.forEach(section => {
            if (section.element.length) {
                const elementTop = section.element.offset().top - 100;
                const elementBottom = elementTop + section.element.outerHeight();
                
                if (scrollTop >= elementTop && scrollTop < elementBottom) {
                    activeSection = section.name;
                }
            }
        });
        
        updateActiveNavItem(activeSection);
    });
}

function openMobileNav() {
    // Create overlay
    if (!$('.mobile-nav-overlay').length) {
        $('body').append('<div class="mobile-nav-overlay"></div>');
    }
    
    // Open drawer and overlay
    setTimeout(() => {
        $('#mobile-nav').addClass('open');
        $('.mobile-nav-overlay').addClass('open');
    }, 10);
    
    // Prevent body scroll
    $('body').css('overflow', 'hidden');
}

function closeMobileNav() {
    $('#mobile-nav').removeClass('open');
    $('.mobile-nav-overlay').removeClass('open');
    
    // Remove overlay after animation
    setTimeout(() => {
        $('.mobile-nav-overlay').remove();
    }, 300);
    
    // Restore body scroll
    $('body').css('overflow', '');
}

function initializeModernFeatures() {
    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const heroCard = $('.hero-card');
        
        if (heroCard.length) {
            const transform = scrolled * 0.3;
            heroCard.css('transform', `translateY(${transform}px)`);
        }
        
        // Dynamic top app bar
        const topAppBar = $('.mdc-top-app-bar');
        if (scrolled > 100) {
            topAppBar.addClass('scrolled');
        } else {
            topAppBar.removeClass('scrolled');
        }
        
        // Show/hide FAB
        if (scrolled > 300) {
            $('.demo-fab').addClass('visible');
        } else {
            $('.demo-fab').removeClass('visible');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('animate-in');
                
                // Stagger animations for grid items
                if ($(entry.target).hasClass('skill-card') || $(entry.target).hasClass('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        $(entry.target).addClass('animate-in');
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    $('.mdc-card, .section-title').each(function() {
        observer.observe(this);
    });
    
    // Typing animation for hero subtitle
    setTimeout(() => {
        typeWriter(document.querySelector('.hero-text .subtitle'), 'Full Stack Developer', 100);
    }, 1000);
    
    // Floating particles background (subtle)
    createFloatingParticles();
}

function setupEventHandlers() {
    // Enhanced contact form
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('.contact-submit');
        const originalText = submitBtn.find('.mdc-button__label').text();
        
        // Show loading state
        submitBtn.addClass('loading').find('.mdc-button__label').text('Sending...');
        
        const formData = {
            name: $('#contact-name').val(),
            email: $('#contact-email').val(),
            message: $('#contact-message').val()
        };
        
        // Simulate API call
        setTimeout(() => {
            showNotification(`Thank you ${formData.name}! Your message has been sent.`, 'success');
            form[0].reset();
            
            // Reset text fields
            $('.mdc-text-field').each(function() {
                const textField = mdc.textField.MDCTextField.attachTo(this);
                textField.value = '';
            });
            
            // Reset button
            submitBtn.removeClass('loading').find('.mdc-button__label').text(originalText);
        }, 1500);
    });
    
    // Enhanced project interactions
    $('.mdc-button[data-project]').on('click', function() {
        const project = $(this).data('project');
        const card = $(this).closest('.project-card');
        
        // Add click animation
        card.addClass('clicked');
        setTimeout(() => card.removeClass('clicked'), 200);
        
        showNotification(`Opening ${project} project...`, 'info');
        
        // In a real portfolio, you would navigate to the project
        setTimeout(() => {
            window.open('#', '_blank');
        }, 1000);
    });
    
    // Header navigation
    $('#contact-btn').on('click', function() {
        smoothScrollTo('.contact-section');
    });
    
    $('#resume-btn').on('click', function() {
        showNotification('Resume download starting...', 'info');
        // Trigger resume download
        downloadResume();
    });
    
    // Scroll to top FAB
    $('#scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutCubic');
    });
    
    // Enhanced card hover effects
    $('.mdc-card').each(function() {
        const card = $(this);
        
        card.on('mouseenter', function() {
            $(this).addClass('hovered');
        }).on('mouseleave', function() {
            $(this).removeClass('hovered');
        });
    });
}

function addLoadingAnimations() {
    // Initial page load animation
    $('body').addClass('loading');
    
    $(window).on('load', function() {
        setTimeout(() => {
            $('body').removeClass('loading');
            $('.hero-section').addClass('animate-in');
        }, 300);
    });
    
    // Stagger animation for skills and projects
    setTimeout(() => {
        $('.skill-card').each(function(index) {
            setTimeout(() => {
                $(this).addClass('animate-in');
            }, index * 150);
        });
    }, 1000);
}

// Utility functions
function showNotification(message, type = 'info') {
    const snackbar = window.snackbar;
    const snackbarElement = document.querySelector('#notification-snackbar');
    
    // Add type class for styling
    snackbarElement.className = `mdc-snackbar ${type}`;
    
    snackbar.labelText = message;
    snackbar.open();
}

function smoothScrollTo(target) {
    const targetElement = $(target);
    if (targetElement.length) {
        $('html, body').animate({
            scrollTop: targetElement.offset().top - 80
        }, 800, 'easeInOutCubic');
    }
}

function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function downloadResume() {
    // Create a dummy PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,'; // Add your resume PDF base64 here
    link.download = 'Alex_Shaw_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function createFloatingParticles() {
    const particlesContainer = $('<div class="particles-container"></div>');
    $('body').append(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = $('<div class="particle"></div>');
        particle.css({
            position: 'fixed',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: 'rgba(99, 102, 241, 0.3)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            pointerEvents: 'none',
            zIndex: 1
        });
        particlesContainer.append(particle);
    }
}

// Add easing function for smooth animations
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};

// CSS for particles animation
$('<style>')
    .prop('type', 'text/css')
    .html(`
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        body.loading {
            opacity: 0;
        }
        
        body {
            transition: opacity 0.5s ease;
        }
        
        .mdc-top-app-bar.scrolled {
            box-shadow: var(--shadow-lg);
        }
        
        .demo-fab {
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
        }
        
        .demo-fab.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card.clicked {
            transform: scale(0.98);
        }
        
        .mdc-card.hovered {
            z-index: 10;
        }
        
        #notification-snackbar.success {
            --mdc-theme-surface: #10b981;
        }
        
        #notification-snackbar.info {
            --mdc-theme-surface: #3b82f6;
        }
    `)
    .appendTo('head');
