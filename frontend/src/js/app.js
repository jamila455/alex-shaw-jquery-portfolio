/*
    This file contains all the interactive logic for the portfolio.
    It uses jQuery for DOM manipulation and event handling.
    Material Design Components (MDC) are initialized for UI elements.
    Features include navigation, animations, notifications, and more.
*/

$(document).ready(function() {
    // Initialize Material Design Components (buttons, cards, text fields, etc.)
    initializeMDCComponents();
    
    // Set up navigation (section indicators, mobile nav, scroll tracking)
    initializeNavigation();
    
    // Add modern UI features (parallax, animations, particles)
    initializeModernFeatures();
    
    // Set up event handlers for user interactions (form, buttons, etc.)
    setupEventHandlers();
    
    // Add loading animations for page transitions
    addLoadingAnimations();

    // Dark mode toggle button logic
    $('#dark-mode-toggle').on('click', function() {
        const body = $('body');
        body.toggleClass('light-mode');
        // Change icon
        const icon = $('#dark-mode-icon');
        if (body.hasClass('light-mode')) {
            icon.text('light_mode');
        } else {
            icon.text('dark_mode');
        }
        // Optionally, save preference to localStorage
        localStorage.setItem('theme', body.hasClass('light-mode') ? 'light' : 'dark');
    });

    // On page load, set theme from localStorage
    if (localStorage.getItem('theme') === 'light') {
        $('body').addClass('light-mode');
        $('#dark-mode-icon').text('light_mode');
    }
});

/**
 * Initializes Material Design Components (MDC) for enhanced UI.
 */
function initializeMDCComponents() {
    // Top App Bar with scroll behavior
    const topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    
    // Add ripple effect to all MDC buttons
    $('.mdc-button').each(function() {
        const ripple = new mdc.ripple.MDCRipple(this);
        ripple.unbounded = false;
    });
    
    // Ripple effect for icon buttons
    $('.mdc-icon-button').each(function() {
        const ripple = new mdc.ripple.MDCRipple(this);
        ripple.unbounded = true;
    });
    
    // Ripple for Floating Action Button (FAB)
    const fab = new mdc.ripple.MDCRipple(document.querySelector('.mdc-fab'));
    
    // Initialize MDC text fields with focus/blur animations
    $('.mdc-text-field').each(function() {
        const textField = new mdc.textField.MDCTextField(this);
        $(this).find('.mdc-text-field__input')
            .on('focus', function() {
                $(this).closest('.mdc-text-field').addClass('focused');
            })
            .on('blur', function() {
                $(this).closest('.mdc-text-field').removeClass('focused');
            });
    });
    
    // Ripple for card primary actions
    $('.mdc-card__primary-action').each(function() {
        new mdc.ripple.MDCRipple(this);
    });
    
    // Snackbar for notifications
    window.snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('#notification-snackbar'));
}

/**
 * Sets up navigation: section indicators, mobile nav, scroll tracking.
 */
function initializeNavigation() {
    // Create clickable dots for each section (right side of screen)
    createSectionIndicators();
    
    // Navigation bar click: scroll to section
    $('.nav-item').on('click', function() {
        const section = $(this).data('section');
        navigateToSection(section);
        closeMobileNav();
    });
    
    // Mobile menu button opens drawer
    $('#mobile-menu-btn').on('click', function() {
        openMobileNav();
    });
    
    // Close mobile nav drawer
    $('#close-mobile-nav').on('click', function() {
        closeMobileNav();
    });
    
    // Clicking overlay closes mobile nav
    $(document).on('click', '.mobile-nav-overlay', function() {
        closeMobileNav();
    });
    
    // Section indicator dot click: scroll to section
    $(document).on('click', '.section-dot', function() {
        const section = $(this).data('section');
        navigateToSection(section);
    });
    
    // Track scroll position to update active nav item
    updateActiveNavigation();
}

/**
 * Creates section indicator dots for quick navigation.
 */
function createSectionIndicators() {
    const sections = ['hero', 'skills', 'projects', 'contact'];
    const indicatorContainer = $('<div class="section-indicator"></div>');
    sections.forEach(section => {
        const dot = $(`<div class="section-dot" data-section="${section}"></div>`);
        indicatorContainer.append(dot);
    });
    $('body').append(indicatorContainer);
}

/**
 * Scrolls smoothly to the selected section.
 */
function navigateToSection(section) {
    let targetElement;
    switch(section) {
        case 'hero': targetElement = $('.hero-section'); break;
        case 'skills': targetElement = $('.skills-section'); break;
        case 'projects': targetElement = $('.projects-section'); break;
        case 'contact': targetElement = $('.contact-section'); break;
        default: targetElement = $('.hero-section');
    }
    if (targetElement.length) {
        const offset = section === 'hero' ? 0 : 80;
        $('html, body').animate({
            scrollTop: targetElement.offset().top - offset
        }, 800, 'easeInOutCubic');
    }
    updateActiveNavItem(section);
}

/**
 * Highlights the active navigation item and section dot.
 */
function updateActiveNavItem(activeSection) {
    $('.nav-item').removeClass('active');
    $('.nav-item[data-section="' + activeSection + '"]').addClass('active');
    $('.section-dot').removeClass('active');
    $('.section-dot[data-section="' + activeSection + '"]').addClass('active');
}

/**
 * Tracks scroll position to update active navigation.
 */
function updateActiveNavigation() {
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(this).height();
        // List of sections and their positions
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

/**
 * Opens the mobile navigation drawer and overlay.
 */
function openMobileNav() {
    if (!$('.mobile-nav-overlay').length) {
        $('body').append('<div class="mobile-nav-overlay"></div>');
    }
    setTimeout(() => {
        $('#mobile-nav').addClass('open');
        $('.mobile-nav-overlay').addClass('open');
    }, 10);
    $('body').css('overflow', 'hidden');
}

/**
 * Closes the mobile navigation drawer and overlay.
 */
function closeMobileNav() {
    $('#mobile-nav').removeClass('open');
    $('.mobile-nav-overlay').removeClass('open');
    setTimeout(() => {
        $('.mobile-nav-overlay').remove();
    }, 300);
    $('body').css('overflow', '');
}

/**
 * Adds modern UI features: parallax, animations, particles.
 */
function initializeModernFeatures() {
    // Parallax effect for hero card on scroll
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const heroCard = $('.hero-card');
        if (heroCard.length) {
            const transform = scrolled * 0.3;
            heroCard.css('transform', `translateY(${transform}px)`);
        }
        // Top app bar changes style when scrolled
        const topAppBar = $('.mdc-top-app-bar');
        if (scrolled > 100) {
            topAppBar.addClass('scrolled');
        } else {
            topAppBar.removeClass('scrolled');
        }
        // Show/hide Floating Action Button (FAB)
        if (scrolled > 300) {
            $('.demo-fab').addClass('visible');
        } else {
            $('.demo-fab').removeClass('visible');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('animate-in');
                // Stagger animation for grid items
                if ($(entry.target).hasClass('skill-card') || $(entry.target).hasClass('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        $(entry.target).addClass('animate-in');
                    }, delay);
                }
            }
        });
    }, observerOptions);
    // Observe cards and section titles
    $('.mdc-card, .section-title').each(function() {
        observer.observe(this);
    });

    // Typing animation for hero subtitle
    setTimeout(() => {
        typeWriter(document.querySelector('.hero-text .subtitle'), 'Full Stack Developer', 100);
    }, 1000);

    // Floating particles background for visual effect
    createFloatingParticles();
}

/**
 * Sets up event handlers for forms, buttons, and cards.
 */
function setupEventHandlers() {
    // Contact form submission with loading animation and notification
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('.contact-submit');
        const originalText = submitBtn.find('.mdc-button__label').text();
        submitBtn.addClass('loading').find('.mdc-button__label').text('Sending...');
        const formData = {
            name: $('#contact-name').val(),
            email: $('#contact-email').val(),
            message: $('#contact-message').val()
        };
        // Simulate sending message
        setTimeout(() => {
            showNotification(`Thank you ${formData.name}! Your message has been sent.`, 'success');
            form[0].reset();
            // Reset MDC text fields
            $('.mdc-text-field').each(function() {
                const textField = mdc.textField.MDCTextField.attachTo(this);
                textField.value = '';
            });
            submitBtn.removeClass('loading').find('.mdc-button__label').text(originalText);
        }, 1500);
    });

    // Project card button click: show notification and open project (simulated)
    $('.mdc-button[data-project]').on('click', function() {
        const project = $(this).data('project');
        const card = $(this).closest('.project-card');
        card.addClass('clicked');
        setTimeout(() => card.removeClass('clicked'), 200);
        showNotification(`Opening ${project} project...`, 'info');
        setTimeout(() => {
            window.open('#', '_blank');
        }, 1000);
    });

    // Header navigation buttons
    $('#contact-btn').on('click', function() {
        smoothScrollTo('.contact-section');
    });
    $('#resume-btn').on('click', function() {
        showNotification('Resume download starting...', 'info');
        downloadResume();
    });

    // Scroll to top FAB
    $('#scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutCubic');
    });

    // Card hover effects for visual feedback
    $('.mdc-card').each(function() {
        const card = $(this);
        card.on('mouseenter', function() {
            $(this).addClass('hovered');
        }).on('mouseleave', function() {
            $(this).removeClass('hovered');
        });
    });
}

/**
 * Adds loading animations for initial page load and section cards.
 */
function addLoadingAnimations() {
    $('body').addClass('loading');
    $(window).on('load', function() {
        setTimeout(() => {
            $('body').removeClass('loading');
            $('.hero-section').addClass('animate-in');
        }, 300);
    });
    // Staggered animation for skill cards
    setTimeout(() => {
        $('.skill-card').each(function(index) {
            setTimeout(() => {
                $(this).addClass('animate-in');
            }, index * 150);
        });
    }, 1000);
}

// --- Utility Functions ---

/**
 * Shows a notification using MDC Snackbar.
 * @param {string} message - The message to display.
 * @param {string} type - Type of notification ('info', 'success').
 */
function showNotification(message, type = 'info') {
    const snackbar = window.snackbar;
    const snackbarElement = document.querySelector('#notification-snackbar');
    snackbarElement.className = `mdc-snackbar ${type}`;
    snackbar.labelText = message;
    snackbar.open();
}

/**
 * Smoothly scrolls to a target element.
 */
function smoothScrollTo(target) {
    const targetElement = $(target);
    if (targetElement.length) {
        $('html, body').animate({
            scrollTop: targetElement.offset().top - 80
        }, 800, 'easeInOutCubic');
    }
}

/**
 * Typing animation for text (used in hero subtitle).
 */
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

/**
 * Simulates resume download (replace with actual PDF for production).
 */
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,'; // Add your resume PDF base64 here
    link.download = 'Alex_Shaw_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Creates floating particles for a subtle animated background.
 */
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

// --- Extra: Custom easing function for smooth animations ---
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};

// --- Injects extra CSS for animations and effects ---
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
