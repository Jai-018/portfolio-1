document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor Implementation
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        // Create particle trail
        if (Math.random() < 0.2) {
            createParticleTrail(mouseX, mouseY);
        }
    });
    
    // Create particle trail effect
    function createParticleTrail(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(0, 255, 136, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: particleFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
    
    // Add particle animation
    if (!document.getElementById('particle-style')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-style';
        particleStyle.textContent = `
            @keyframes particleFade {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
    
    // Smooth trail animation
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Enhanced Cursor hover effects with magnetic behavior
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .social-link, .nav-link, .highlight-item, .cert-card, .education-card, .timeline-content');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            
            // Special effects for different elements
            if (element.classList.contains('project-card')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'VIEW';
            } else if (element.classList.contains('social-link')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'CONNECT';
            } else if (element.classList.contains('nav-link')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'GO';
            } else if (element.classList.contains('skill-item')) {
                const proficiency = element.dataset.proficiency;
                if (proficiency) {
                    cursor.classList.add('cursor-text');
                    cursorTrail.textContent = proficiency + '%';
                }
            } else if (element.classList.contains('project-link')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'OPEN';
            } else if (element.classList.contains('cert-card')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'CERT';
            } else if (element.classList.contains('education-card')) {
                cursor.classList.add('cursor-text');
                cursorTrail.textContent = 'EDU';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover', 'cursor-text');
            cursorTrail.textContent = '';
        });
        
        // Magnetic effect for buttons and links
        if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 40;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.2;
                    const moveY = y * force * 0.2;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        }
    });
    
    // Click ripple effect with green accent
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            background: rgba(0, 255, 136, 0.4);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.clientX - 15}px;
            top: ${e.clientY - 15}px;
            width: 30px;
            height: 30px;
            z-index: 9999;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    });
    
    // Add ripple animation keyframes
    if (!document.getElementById('ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // FIXED: Enhanced smooth scroll navigation
    function smoothScrollTo(targetId) {
        const element = document.querySelector(targetId);
        if (element) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const offsetTop = element.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
            
            return true;
        }
        return false;
    }
    
    // FIXED: Navigation click handlers - completely rewritten for better reliability
    document.addEventListener('click', function(e) {
        // Check if clicked element is a navigation link
        if (e.target.classList.contains('nav-link') || e.target.closest('.nav-link')) {
            e.preventDefault();
            e.stopPropagation();
            
            const navLink = e.target.classList.contains('nav-link') ? e.target : e.target.closest('.nav-link');
            const href = navLink.getAttribute('href');
            
            console.log('Navigation clicked:', href);
            
            if (href && href.startsWith('#')) {
                const success = smoothScrollTo(href);
                if (success) {
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                    
                    showNotification(`Navigating to ${href.substring(1)} section`, 'success');
                }
            }
        }
        
        // Check if clicked element is the CTA button
        if (e.target.classList.contains('cta-btn') || e.target.closest('.cta-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('CTA button clicked');
            const success = smoothScrollTo('#projects');
            if (success) {
                showNotification('Viewing my featured projects', 'success');
            }
        }
        
        // Handle project links
        if (e.target.classList.contains('project-link') || e.target.closest('.project-link')) {
            e.preventDefault();
            e.stopPropagation();
            
            const projectLink = e.target.classList.contains('project-link') ? e.target : e.target.closest('.project-link');
            const href = projectLink.getAttribute('href');
            
            console.log('Project link clicked:', href);
            
            if (href) {
                // Add click feedback animation
                projectLink.style.transform = 'scale(0.95)';
                projectLink.style.filter = 'brightness(1.2)';
                
                setTimeout(() => {
                    projectLink.style.transform = '';
                    projectLink.style.filter = '';
                }, 150);
                
                // Open link in new tab
                window.open(href, '_blank');
                showNotification('Opening project in new tab', 'success');
            }
        }
        
        // Handle social links
        if (e.target.classList.contains('social-link') || e.target.closest('.social-link')) {
            e.preventDefault();
            e.stopPropagation();
            
            const socialLink = e.target.classList.contains('social-link') ? e.target : e.target.closest('.social-link');
            const href = socialLink.getAttribute('href');
            
            console.log('Social link clicked:', href);
            
            if (href) {
                // Add click animation
                socialLink.style.transform = 'scale(0.9) rotateZ(-10deg)';
                
                setTimeout(() => {
                    socialLink.style.transform = '';
                }, 200);
                
                if (href.startsWith('mailto:')) {
                    window.location.href = href;
                    showNotification('Opening email client', 'success');
                } else {
                    window.open(href, '_blank');
                    showNotification('Opening social profile', 'success');
                }
            }
        }
    });
    
    // Enhanced navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 16));
    
    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different sections
                if (entry.target.id === 'about') {
                    animateAboutSection();
                } else if (entry.target.id === 'education') {
                    animateEducationSection();
                } else if (entry.target.id === 'certifications') {
                    animateCertificationsSection();
                } else if (entry.target.classList.contains('skill-category')) {
                    animateSkillItems(entry.target);
                } else if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.section-header, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form');
    const sections = document.querySelectorAll('#about, #education, #certifications');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Enhanced About Section Animations
    function animateAboutSection() {
        console.log('Animating about section');
        
        // Typewriter effect for main text
        const typewriterText = document.querySelector('.typewriter-text');
        if (typewriterText && !typewriterText.dataset.animated) {
            typewriterText.dataset.animated = 'true';
            typewriterEffect(typewriterText, 50);
        }
        
        // Counter animation for experience number
        const experienceNumber = document.querySelector('.highlight-number');
        if (experienceNumber && !experienceNumber.dataset.animated) {
            experienceNumber.dataset.animated = 'true';
            animateCounter(experienceNumber, 0, 1, 1500);
        }
        
        // Staggered slide-in animation for highlights
        const highlights = document.querySelectorAll('.highlight-item');
        highlights.forEach((item, index) => {
            if (!item.dataset.animated) {
                item.dataset.animated = 'true';
                setTimeout(() => {
                    item.classList.add('slide-in-left', 'visible');
                }, index * 200);
            }
        });
    }
    
    // Enhanced Education Section Animations
    function animateEducationSection() {
        console.log('Animating education section');
        
        // Animate education timeline line
        const educationLine = document.querySelector('.education-line');
        if (educationLine && !educationLine.dataset.animated) {
            educationLine.dataset.animated = 'true';
            educationLine.style.animation = 'lineGrow 2s ease-in-out';
        }
        
        // Animate education cards with flip effect
        const educationCards = document.querySelectorAll('.education-card');
        educationCards.forEach((card, index) => {
            if (!card.dataset.animated) {
                card.dataset.animated = 'true';
                setTimeout(() => {
                    card.classList.add('flip-card', 'visible');
                }, index * 300);
            }
        });
        
        // Counter animations for CGPA and scores
        setTimeout(() => {
            const cgpaCounter = document.querySelector('.cgpa-counter');
            if (cgpaCounter && !cgpaCounter.dataset.animated) {
                cgpaCounter.dataset.animated = 'true';
                animateCounter(cgpaCounter, 0, 7.5, 2000, 1);
            }
            
            const scoreCounters = document.querySelectorAll('.score-counter');
            scoreCounters.forEach((counter, index) => {
                if (!counter.dataset.animated) {
                    counter.dataset.animated = 'true';
                    const target = parseInt(counter.dataset.target);
                    setTimeout(() => {
                        animateCounter(counter, 0, target, 1500);
                    }, index * 500);
                }
            });
        }, 1000);
        
        // Animate progress bars
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach((bar, index) => {
                if (!bar.dataset.animated) {
                    bar.dataset.animated = 'true';
                    setTimeout(() => {
                        bar.classList.add('animated');
                        if (bar.classList.contains('hsc-progress')) {
                            bar.style.width = '81%';
                        } else if (bar.classList.contains('sslc-progress')) {
                            bar.style.width = '84%';
                        } else {
                            bar.style.width = '75%'; // For CGPA (7.5/10 = 75%)
                        }
                    }, index * 300);
                }
            });
        }, 1500);
    }
    
    // Enhanced Certifications Section Animations
    function animateCertificationsSection() {
        console.log('Animating certifications section');
        
        const certCards = document.querySelectorAll('.cert-card');
        
        certCards.forEach((card, index) => {
            if (!card.dataset.animated) {
                card.dataset.animated = 'true';
                setTimeout(() => {
                    card.classList.add('cert-fly-in', 'visible');
                }, index * 150);
            }
        });
        
        // Show achievement popup after all certificates are animated
        setTimeout(() => {
            showAchievementPopup();
        }, certCards.length * 150 + 1000);
    }
    
    // Achievement popup for certifications
    function showAchievementPopup() {
        const popup = document.querySelector('.cert-achievement-popup');
        if (popup && !popup.dataset.shown) {
            popup.dataset.shown = 'true';
            popup.classList.add('show');
            
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }
    }
    
    // Typewriter effect function
    function typewriterEffect(element, speed = 50) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed + Math.random() * 30);
            } else {
                // Add blinking cursor effect
                element.style.borderRight = '2px solid #00ff88';
                element.style.animation = 'blink 1s infinite';
                
                setTimeout(() => {
                    element.style.borderRight = '';
                    element.style.animation = '';
                }, 2000);
            }
        }
        type();
    }
    
    // Counter animation function
    function animateCounter(element, start, end, duration, decimals = 0) {
        const startTime = Date.now();
        const range = end - start;
        
        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (range * easeOutCubic);
            
            element.textContent = decimals > 0 ? 
                currentValue.toFixed(decimals) : 
                Math.floor(currentValue).toString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = decimals > 0 ? 
                    end.toFixed(decimals) : 
                    end.toString();
            }
        }
        
        updateCounter();
    }
    
    // Enhanced skill item animations with proficiency display
    function animateSkillItems(category) {
        const skillItems = category.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.opacity = '1';
                
                // Add floating animation
                item.style.animation = `skillFloat 3s ease-in-out ${index * 0.2}s infinite alternate`;
            }, index * 100);
        });
    }
    
    // Add skill floating animation
    if (!document.getElementById('skill-float-style')) {
        const skillFloatStyle = document.createElement('style');
        skillFloatStyle.id = 'skill-float-style';
        skillFloatStyle.textContent = `
            @keyframes skillFloat {
                0% { transform: translateY(0px); }
                100% { transform: translateY(-8px); }
            }
            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: #00ff88; }
            }
        `;
        document.head.appendChild(skillFloatStyle);
    }
    
    // FIXED: Enhanced 3D hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const proficiency = item.dataset.proficiency;
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) translateZ(20px) rotateX(10deg)';
            item.style.boxShadow = '0 15px 30px rgba(0, 255, 136, 0.2)';
            
            // Show actual proficiency percentage
            if (proficiency) {
                showSkillTooltip(item, proficiency);
                animateProgressBar(item, proficiency);
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
            hideSkillTooltip(item);
            removeProgressBar(item);
        });
        
        // Enhanced 3D mouse move effect
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) translateY(-8px)`;
        });
    });
    
    function showSkillTooltip(item, proficiency) {
        // Remove existing tooltip
        const existingTooltip = item.querySelector('.skill-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 255, 136, 0.95);
            color: #0a0a0a;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
            margin-bottom: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 255, 136, 0.4);
            pointer-events: none;
        `;
        tooltip.textContent = `${proficiency}% Proficiency`;
        item.appendChild(tooltip);
        
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
        });
    }
    
    function hideSkillTooltip(item) {
        const tooltip = item.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 300);
        }
    }
    
    function animateProgressBar(item, proficiency) {
        // Remove existing progress bar
        const existingBar = item.querySelector('.skill-progress-bar');
        if (existingBar) {
            existingBar.remove();
        }
        
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress-bar';
        progressBar.style.cssText = `
            position: absolute;
            bottom: -8px;
            left: 10%;
            width: 80%;
            height: 4px;
            background: rgba(0, 255, 136, 0.2);
            border-radius: 2px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
            pointer-events: none;
        `;
        
        const progress = document.createElement('div');
        progress.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #00ff88, rgba(0, 255, 136, 0.8));
            border-radius: 2px;
            width: 0%;
            transition: width 1.2s ease;
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        `;
        
        progressBar.appendChild(progress);
        item.appendChild(progressBar);
        
        requestAnimationFrame(() => {
            progress.style.width = proficiency + '%';
        });
    }
    
    function removeProgressBar(item) {
        const progressBar = item.querySelector('.skill-progress-bar');
        if (progressBar) {
            progressBar.remove();
        }
    }
    
    // Enhanced project card animations
    function animateProjectCard(card) {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        card.style.opacity = '1';
    }
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateX(8deg) rotateY(5deg) translateZ(30px)';
            card.style.boxShadow = '0 25px 50px rgba(0, 255, 136, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // Enhanced 3D mouse tracking
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) translateY(-15px)`;
        });
    });
    
    // FIXED: Contact form handling with enhanced animations
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Enhanced validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Enhanced loading animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Add pulsing effect
            if (!document.getElementById('pulse-style')) {
                const pulseStyle = document.createElement('style');
                pulseStyle.id = 'pulse-style';
                pulseStyle.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(pulseStyle);
            }
            
            submitBtn.style.animation = 'pulse 1s infinite';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc6a)';
                submitBtn.style.opacity = '1';
                submitBtn.style.animation = 'none';
                
                // Reset form with animation
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        input.value = '';
                        input.style.transform = 'scale(1)';
                    }, 200);
                });
                
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset button
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(45deg, #00ff88, rgba(0, 255, 136, 0.8))';
                }, 3000);
                
            }, 2000);
        });
        
        // Enhanced form input animations
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.style.boxShadow = '';
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Typing animation effect
            input.addEventListener('input', () => {
                input.style.borderColor = '#00ff88';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 300);
            });
        });
    }
    
    // Enhanced notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'linear-gradient(45deg, #00ff88, #00cc6a)' : 
                        type === 'error' ? 'linear-gradient(45deg, #ff4444, #cc3333)' : 
                        'linear-gradient(45deg, #00ff88, rgba(0, 255, 136, 0.8))';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: -350px;
            background: ${bgColor};
            color: #0a0a0a;
            padding: 16px 20px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 320px;
            font-size: 14px;
            border: 2px solid ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00ff88'};
            cursor: pointer;
        `;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        notification.innerHTML = `${icon} ${message}`;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.right = '20px';
        });
        
        // Auto remove
        const autoRemove = setTimeout(() => {
            notification.style.right = '-350px';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 4000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.style.right = '-350px';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Enhanced typing animation for hero text
    function typeWriter(element, text, speed = 80) {
        element.textContent = '';
        element.style.opacity = '1';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 40);
            } else {
                // Add blinking cursor effect
                if (!document.getElementById('blink-style')) {
                    const blinkStyle = document.createElement('style');
                    blinkStyle.id = 'blink-style';
                    blinkStyle.textContent = `
                        @keyframes blink {
                            0%, 50% { border-color: transparent; }
                            51%, 100% { border-color: #00ff88; }
                        }
                    `;
                    document.head.appendChild(blinkStyle);
                }
                
                element.style.borderRight = '2px solid #00ff88';
                element.style.animation = 'blink 1s infinite';
                
                setTimeout(() => {
                    element.style.borderRight = '';
                    element.style.animation = '';
                }, 3000);
            }
        }
        
        type();
    }
    
    // Initialize typing animation
    const heroGreeting = document.querySelector('.hero-title .greeting');
    if (heroGreeting) {
        setTimeout(() => {
            typeWriter(heroGreeting, "Hello, I'm Jayakumar", 100);
        }, 1000);
    }
    
    // Performance optimization: Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Certificate and education card enhanced hover animations
    const certCards = document.querySelectorAll('.cert-card');
    const educationCards = document.querySelectorAll('.education-card');
    
    [...certCards, ...educationCards].forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Timeline content enhanced animations
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
    
    // Add parallax effect to floating icons
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        const floatingIcons = document.querySelectorAll('.floating-icon');
        const aboutElements = document.querySelectorAll('.floating-element');
        
        [...floatingIcons, ...aboutElements].forEach((icon, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrollY * speed;
            const rotation = scrollY * 0.05 * (index + 1);
            icon.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    }, 16));
    
    // FIXED: Profile photo enhanced animations and loading
    const profilePhoto = document.querySelector('.profile-photo');
    const profileImage = document.getElementById('profile-img');
    const profileFallback = document.getElementById('profile-fallback');
    
    if (profilePhoto && profileImage && profileFallback) {
        // Initially hide fallback
        profileFallback.style.display = 'none';
        
        // Add hover effects to profile photo
        profilePhoto.addEventListener('mouseenter', () => {
            profilePhoto.style.transform = 'scale(1.05) rotateY(10deg)';
            profilePhoto.style.boxShadow = '0 30px 60px rgba(0, 255, 136, 0.4), inset 0 0 40px rgba(0, 255, 136, 0.2)';
            
            // Add particles around photo on hover
            createPhotoParticles();
        });
        
        profilePhoto.addEventListener('mouseleave', () => {
            profilePhoto.style.transform = '';
            profilePhoto.style.boxShadow = '';
        });
        
        // // Handle successful image load
        // profileImage.addEventListener('load', () => {
        //     console.log('Profile image loaded successfully');
        //     profileImage.style.opacity = '0';
        //     profileImage.style.transform = 'scale(0.8)';
        //     profileFallback.style.display = 'none';
            
        //     // Smooth fade in animation
        //     setTimeout(() => {
        //         profileImage.style.transition = 'all 0.8s ease';
        //         profileImage.style.opacity = '1';
        //         profileImage.style.transform = 'scale(1)';
        //     }, 100);
            
        //     showNotification('Profile photo loaded with beautiful animations!', 'success');
        // });
        
        // Handle image error
        profileImage.addEventListener('error', () => {
            console.log('Profile image failed to load, showing fallback');
            profileImage.style.display = 'none';
            profileFallback.style.display = 'flex';
            profileFallback.style.animation = 'fadeInUp 0.8s ease forwards';
            
            showNotification('Using stylized profile display', 'info');
        });
        
        // Try to load the image immediately
        if (profileImage.complete && profileImage.naturalHeight !== 0) {
            // Image already loaded
            profileImage.dispatchEvent(new Event('load'));
        } else if (profileImage.complete) {
            // Image failed to load
            profileImage.dispatchEvent(new Event('error'));
        }
    }
    
    function createPhotoParticles() {
        const photoRect = profilePhoto.getBoundingClientRect();
        const centerX = photoRect.left + photoRect.width / 2;
        const centerY = photoRect.top + photoRect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const radius = 150;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: rgba(0, 255, 136, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${x}px;
                top: ${y}px;
                animation: photoParticle 2s ease-out forwards;
                box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 2000);
        }
        
        // Add photo particle animation
        if (!document.getElementById('photo-particle-style')) {
            const photoParticleStyle = document.createElement('style');
            photoParticleStyle.id = 'photo-particle-style';
            photoParticleStyle.textContent = `
                @keyframes photoParticle {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.2);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0) translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(photoParticleStyle);
        }
    } 
    // Initialize welcome message with enhanced text
    // setTimeout(() => {
    //     showNotification('Welcome to my enhanced AI portfolio! 🚀✨', 'success');
    // }, 2000);
    
    // Additional enhanced animations on load
    setTimeout(() => {
        // Trigger initial animations for visible elements
        const visibleElements = document.querySelectorAll('.hero, .profile-frame');
        visibleElements.forEach(element => {
            if (element.classList.contains('profile-frame')) {
                element.style.animation = 'profileFloat 6s ease-in-out infinite';
            }
        });
        
        console.log('Initial animations triggered');
    }, 1000);
    
    // Debug information
    console.log('🚀 Enhanced Jayakumar\'s Portfolio loaded successfully!');
    console.log('💫 All enhanced animations and interactions are now active!');
    console.log('🔧 Navigation system: FIXED and operational');
    console.log('📸 Profile image: Enhanced loading with fallback');
    console.log('🎯 Chennai-based Software Engineer specialized in AI & Flutter');
    console.log('📧 Contact: ajk001128@gmail.com | 📱 +91 7639186334');
    console.log('🌟 Ready for user interaction!');
});
