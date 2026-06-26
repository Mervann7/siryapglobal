// ============================================
// SİRYAP İnşaat - Ana JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // 1. HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 2. HERO SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length > 0) {
    startSlider();

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(parseInt(dot.dataset.index));
        startSlider();
      });
    });
  }

  // ==========================================
  // 3. MOBILE MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileKurumsalBtn = document.getElementById('mobile-kurumsal-btn');
  const mobileSub = document.getElementById('mobile-sub-kurumsal');

  function openMobileMenu() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Mobile kurumsal dropdown
  if (mobileKurumsalBtn && mobileSub) {
    mobileKurumsalBtn.addEventListener('click', () => {
      const isOpen = mobileSub.classList.contains('open');
      if (isOpen) {
        mobileSub.classList.remove('open');
        mobileKurumsalBtn.classList.remove('open');
      } else {
        mobileSub.classList.add('open');
        mobileKurumsalBtn.classList.add('open');
      }
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle), .mobile-sub-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ==========================================
  // 4. ACTIVE NAV LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ==========================================
  // 5. STATS COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  // ==========================================
  // 6. PROJECT FILTERS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================
  // 7. CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const originalText = btn.innerHTML;

      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;animation:spin 1s linear infinite">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Gönderiliyor...
      `;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Mesajınız Gönderildi!
        `;
        btn.style.background = '#4CAF50';
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ==========================================
  // 8. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.project-card, .about-content, .about-image-wrapper, .contact-info, .contact-form, .ref-inner, .team-card, .hr-feature-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // ==========================================
  // 9. SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

});

// Spin animation for loading
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinStyle);
