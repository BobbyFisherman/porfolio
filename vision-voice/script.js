// ══════════════════════════════════════════
// VISION VOICE — PROJECT PAGE SCRIPTS
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ── Cursor Glow Effect ──
    var cursorGlow = document.getElementById('cursorGlow');

    document.addEventListener('mousemove', function (e) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ── Scroll Reveal Sections ──
    var sections = document.querySelectorAll('.section');

    var observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        observer.observe(section);
    });

    // ── Staggered Animation for Cards ──
    var staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var children = entry.target.querySelectorAll(
                    '.overview-card, .system-card, .skill-card, .activity-row, .timeline-item, .pipeline-step'
                );
                children.forEach(function (child, index) {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'all 0.4s ease ' + (index * 0.08) + 's';
                    setTimeout(function () {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(function (section) {
        staggerObserver.observe(section);
    });

    // ── Typing Effect for Tagline ──
    var tagline = document.getElementById('tagline');
    if (tagline) {
        var taglineText = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';

        setTimeout(function () {
            var i = 0;
            var typeInterval = setInterval(function () {
                tagline.textContent += taglineText[i];
                i++;
                if (i >= taglineText.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 1000);
    }

    // ── Parallax Ambient Glows ──
    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        var glow1 = document.querySelector('.ambient-glow-1');
        var glow2 = document.querySelector('.ambient-glow-2');
        var glow3 = document.querySelector('.ambient-glow-3');

        if (glow1) {
            glow1.style.transform = 'translate(' + (scrollY * 0.05) + 'px, ' + (scrollY * 0.02) + 'px)';
        }
        if (glow2) {
            glow2.style.transform = 'translate(-' + (scrollY * 0.03) + 'px, -' + (scrollY * 0.04) + 'px)';
        }
        if (glow3) {
            glow3.style.transform = 'translateX(-50%) translateY(' + (scrollY * 0.02) + 'px)';
        }
    });

    // ── Active Nav Link on Scroll ──
    var navLinks = document.querySelectorAll('.nav-link');
    var navSections = document.querySelectorAll('.section[id]');

    window.addEventListener('scroll', function () {
        var current = '';

        navSections.forEach(function (section) {
            var sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Nav border glow on scroll
        var nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.borderBottomColor = '#2d1b69';
            } else {
                nav.style.borderBottomColor = '#1a1a2e';
            }
        }
    });

    // ── Fallback: Show sections if observer fails ──
    setTimeout(function () {
        document.querySelectorAll('.section').forEach(function (section) {
            if (!section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }, 2000);

});
