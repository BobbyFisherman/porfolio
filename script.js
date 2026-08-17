// ══════════════════════════════════════════
// BASIL ADAM - RESUME SCRIPTS
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── Download Resume Button ──
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // ── Cursor Glow Effect ──
    const cursorGlow = document.getElementById('cursorGlow');

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ── Scroll Reveal Sections ──
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const bars = entry.target.querySelectorAll('.lang-bar-fill');
                bars.forEach((bar) => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // ── Staggered Animation for Cards ──
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll(
                    '.project-card, .skill-card, .activity-row, .lang-card, .interest-tag'
                );
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'all 0.4s ease ' + (index * 0.08) + 's';
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
        staggerObserver.observe(section);
    });

    // ── Typing Effect for Tagline ──
    const tagline = document.getElementById('tagline');
    if (tagline) {
        const taglineText = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';

        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                tagline.textContent += taglineText[i];
                i++;
                if (i >= taglineText.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 1000);
    }

    // ── Parallax Ambient Glows ──
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const glow1 = document.querySelector('.ambient-glow-1');
        const glow2 = document.querySelector('.ambient-glow-2');

        if (glow1) {
            glow1.style.transform = 'translate(' + (scrollY * 0.05) + 'px, ' + (scrollY * 0.02) + 'px)';
        }
        if (glow2) {
            glow2.style.transform = 'translate(-' + (scrollY * 0.03) + 'px, -' + (scrollY * 0.04) + 'px)';
        }
    });

    // ── Initialize Language Bars at 0 ──
    document.querySelectorAll('.lang-bar-fill').forEach((bar) => {
        bar.style.width = '0%';
    });

    // ── Active Nav Link on Scroll ──
    const navLinks = document.querySelectorAll('.nav-link');
    const navSections = document.querySelectorAll('.section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        navSections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.borderBottomColor = '#2d1b69';
            } else {
                nav.style.borderBottomColor = '#1a1a2e';
            }
        }
    });

    // ── Fallback: Show sections if observer fails ──
    setTimeout(() => {
        document.querySelectorAll('.section').forEach((section) => {
            if (!section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }, 2000);

});
