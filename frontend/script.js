/* ============================================================
   TEMPVS Watch Store — script.js
   ============================================================ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate bars
  const bars = hamburger.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.cssText = 'transform: translateY(6px) rotate(45deg)';
    bars[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    bars[2].style.cssText = 'transform: translateY(-6px) rotate(-45deg)';
  } else {
    bars.forEach(b => b.style.cssText = '');
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => b.style.cssText = '');
  });
});

/* ── Active nav on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[href^="#"]');
const observerOptions = { rootMargin: '-40% 0px -50% 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

/* ── Filter bar ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      if (match) {
        card.style.display = '';
        // Tiny delay trick so display:'' resolves before opacity transitions
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 340);
      }
    });
  });
});

/* ── Cart / Toast ── */
const cartToast  = document.getElementById('cartToast');
const cartMsg    = document.getElementById('cartToastMsg');
let   toastTimer = null;

function addToCart(btn, name, price) {
  // Visual feedback on button
  const orig = btn.textContent;
  btn.textContent = '✓ Added';
  btn.style.background = 'var(--gold)';
  btn.style.color = 'var(--bg)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.color = '';
  }, 1800);

  // Show toast
  cartMsg.textContent = `${name} added to cart — $${price.toLocaleString()}`;
  cartToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => cartToast.classList.remove('show'), 3200);
}

/* ── Modals ── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
  if (event.target === document.getElementById(id)) closeModal(id);
}

function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 200);
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

/* ── Scroll-reveal for cards ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transition = `opacity 0.6s ${i * 0.06}s ease, transform 0.6s ${i * 0.06}s ease`;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(28px)';
  revealObserver.observe(card);
});

/* ── Features reveal ── */
document.querySelectorAll('.feature').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      el.style.transition = `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(el);
});

/* ── Newsletter form ── */
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();
    if (!email || !email.includes('@')) {
      newsletterInput.style.borderColor = '#8b3a3a';
      setTimeout(() => newsletterInput.style.borderColor = '', 1500);
      return;
    }
    newsletterBtn.textContent = '✓';
    newsletterBtn.style.background = '#4a9e6e';
    newsletterInput.value = '';
    setTimeout(() => {
      newsletterBtn.textContent = '→';
      newsletterBtn.style.background = '';
    }, 3000);
  });
}

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
