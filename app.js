/* ===== Travio — Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {

  // Intersection Observer for scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Navbar scroll effect
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Subtle button press
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.97)'; });
    btn.addEventListener('mouseup', () => { btn.style.transform = ''; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // Smooth page fade transitions
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 300);
      });
    }
  });

  // Animate progress bars on scroll
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        if (fill) {
          const width = fill.style.width;
          fill.style.width = '0%';
          requestAnimationFrame(() => {
            setTimeout(() => { fill.style.width = width; }, 100);
          });
        }
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar').forEach(bar => progressObserver.observe(bar));

  // Stat counter animation
  document.querySelectorAll('.stat-value').forEach(stat => {
    const text = stat.textContent;
    const match = text.match(/[\d,.]+/);
    if (match) {
      const target = parseFloat(match[0].replace(/,/g, ''));
      const suffix = text.replace(match[0], '');
      const prefix = text.substring(0, text.indexOf(match[0]));
      let current = 0;
      const step = target / 40;
      const isDecimal = text.includes('.');

      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const interval = setInterval(() => {
              current += step;
              if (current >= target) { current = target; clearInterval(interval); }
              stat.textContent = isDecimal
                ? prefix + current.toFixed(1) + suffix
                : prefix + Math.floor(current).toLocaleString() + suffix;
            }, 30);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      statObserver.observe(stat);
    }
  });
});
