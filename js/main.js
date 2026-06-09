/**
 * Hospital & Medical Center - Main JavaScript
 * Mobile menu toggle and navigation interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');

  // Toggle mobile menu open/close
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenuBtn.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenuBtn?.classList.remove('active');
      mainNav?.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideNav = mainNav?.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn?.contains(event.target);

    if (!isClickInsideNav && !isClickOnMenuBtn && mainNav?.classList.contains('active')) {
      mobileMenuBtn?.classList.remove('active');
      mainNav?.classList.remove('active');
    }
  });

  // Close menu on window resize if larger than mobile breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) {
      mobileMenuBtn?.classList.remove('active');
      mainNav?.classList.remove('active');
    }
  });

  // Page Loader
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    if (loader) {
      loader.classList.add('hide');
    }
  });

  // Scroll Reveal Animation (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section, .slide-hidden').forEach(section => {
    observer.observe(section);
  });

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
          const current = +counter.innerText;
          const inc = target / 50; // Adjust for speed
          if (current < target) {
            counter.innerText = Math.ceil(current + inc);
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
});
