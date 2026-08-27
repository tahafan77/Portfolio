/* ==========================================================================
   Muhammad Taha — Frontend Developer Portfolio
   script.js — Preloader, typing effects, scroll reveal, counters, form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     Footer year
  ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     1. PRELOADER
     Small typed "boot" line, then fade the preloader out.
  ------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const loaderText = document.getElementById('loaderText');
  const bootMessage = 'loading portfolio...';

  const typeLoader = (text, el, i = 0) => {
    if (!el) return;
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      setTimeout(() => typeLoader(text, el, i + 1), 35);
    }
  };
  typeLoader(bootMessage, loaderText);

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 700);
      }
    }, 500);
  });

  /* ------------------------------------------------------------------
     2. STICKY NAVBAR — solid background on scroll
  ------------------------------------------------------------------ */
  const nav = document.getElementById('mainNav');
  const toggleNavBg = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  toggleNavBg();
  window.addEventListener('scroll', toggleNavBg, { passive: true });

  // Close mobile menu after tapping a link
  const navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }
    });
  });

  /* ------------------------------------------------------------------
     3. TYPED ROLE ROTATOR (Hero)
  ------------------------------------------------------------------ */
  const roles = [
    'Frontend Developer',
    'Software Engineering Student',
    'Bootstrap 5 Enthusiast',
    'Future React.js Developer'
  ];
  const typedRoleEl = document.getElementById('typedRole');

  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeRoleLoop() {
    if (!typedRoleEl) return;
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedRoleEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeRoleLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedRoleEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeRoleLoop, deleting ? 35 : 65);
  }
  typeRoleLoop();

  /* ------------------------------------------------------------------
     4. TERMINAL CODE TYPING (Hero visual)
  ------------------------------------------------------------------ */
  const terminalLines = [
    'const developer = {',
    '  name: "Muhammad Taha",',
    '  role: "Frontend Developer",',
    '  skills: [',
    '    "HTML5", "CSS3",',
    '    "JavaScript", "Bootstrap5"',
    '  ],',
    '  learning: [',
    '    "React.js", "Laravel", "UI/UX"',
    '  ],',
    '  hireable: true',
    '};'
  ];
  const terminalCode = document.getElementById('terminalCode');

  function typeTerminal(lineIndex = 0, charIdx = 0) {
    if (!terminalCode) return;
    if (lineIndex >= terminalLines.length) {
      // brief pause, then restart the typing loop for ambience
      setTimeout(() => {
        terminalCode.textContent = '';
        typeTerminal(0, 0);
      }, 3200);
      return;
    }
    const line = terminalLines[lineIndex];
    if (charIdx <= line.length) {
      const typedSoFar = terminalLines.slice(0, lineIndex).join('\n') +
        (lineIndex > 0 ? '\n' : '') + line.slice(0, charIdx);
      terminalCode.textContent = typedSoFar;
      setTimeout(() => typeTerminal(lineIndex, charIdx + 1), 22);
    } else {
      setTimeout(() => typeTerminal(lineIndex + 1, 0), 90);
    }
  }
  typeTerminal();

  /* ------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     6. ANIMATED COUNTERS (About section)
  ------------------------------------------------------------------ */
  const counters = document.querySelectorAll('.counter-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  /* ------------------------------------------------------------------
     7. ANIMATED SKILL PROGRESS BARS
  ------------------------------------------------------------------ */
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || 0;
        requestAnimationFrame(() => { bar.style.width = width + '%'; });
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  progressBars.forEach(bar => progressObserver.observe(bar));

  /* ------------------------------------------------------------------
     8. BACK TO TOP BUTTON
  ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 480) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     9. CONTACT FORM — JS validation + FormSubmit (https://formsubmit.co/)
     The form posts to FormSubmit's AJAX endpoint so the page never
     reloads. Swap the address below (and the form's `action` attribute
     in index.html) for your real email — FormSubmit will send a
     one-time confirmation link the first time you receive a submission;
     click it to activate delivery.
  ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const formErrorText = document.getElementById('formErrorText');
  const FORMSUBMIT_EMAIL = 'muhammadtaha.dev@gmail.com';

  const fieldValidators = {
    name: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    subject: (value) => value.trim().length >= 3,
    message: (value) => value.trim().length >= 10,
  };

  function validateField(input) {
    const isValid = fieldValidators[input.name] ? fieldValidators[input.name](input.value) : true;
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
    return isValid;
  }

  function validateForm(form) {
    let allValid = true;
    ['name', 'email', 'subject', 'message'].forEach((fieldName) => {
      const input = form.elements[fieldName];
      if (input && !validateField(input)) allValid = false;
    });
    return allValid;
  }

  if (contactForm) {
    // Live validation as the user types / leaves a field
    ['name', 'email', 'subject', 'message'].forEach((fieldName) => {
      const input = contactForm.elements[fieldName];
      if (!input) return;
      input.addEventListener('input', () => validateField(input));
      input.addEventListener('blur', () => validateField(input));
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      formSuccess.classList.add('d-none');
      formError.classList.add('d-none');

      // Honeypot check — if this hidden field has a value, silently drop it (bot).
      const honeypot = contactForm.elements['_honey'];
      if (honeypot && honeypot.value) return;

      if (!validateForm(contactForm)) {
        contactForm.classList.add('was-validated');
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const btnLabel = submitBtn.querySelector('.btn-label');
      const originalHTML = btnLabel.innerHTML;
      submitBtn.disabled = true;
      btnLabel.innerHTML = '<i class="bi bi-arrow-repeat"></i> Sending...';

      try {
        const formData = new FormData(contactForm);
        const payload = {};
        formData.forEach((value, key) => { payload[key] = value; });

        const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Request failed');

        // Success: clear the form and show the confirmation message.
        formSuccess.classList.remove('d-none');
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        ['name', 'email', 'subject', 'message'].forEach((fieldName) => {
          const input = contactForm.elements[fieldName];
          if (input) input.classList.remove('is-valid', 'is-invalid');
        });
        setTimeout(() => formSuccess.classList.add('d-none'), 6000);
      } catch (err) {
        formErrorText.textContent = "Something went wrong and your message wasn't sent. Please try again or email me directly.";
        formError.classList.remove('d-none');
      } finally {
        submitBtn.disabled = false;
        btnLabel.innerHTML = originalHTML;
      }
    });
  }

});
document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    let form = this;
    let button = document.getElementById("submitBtn");

    button.innerHTML = "Sending...";
    button.disabled = true;

setTimeout(function(){
    formSuccess.classList.add("d-none");
}, 3000);

const formSuccess = document.getElementById("formSuccess");

formSuccess.classList.remove("d-none");

// 3 second baad hide
setTimeout(() => {
    formSuccess.classList.add("d-none");
}, 3000);
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {

        if(response.ok){

            document.getElementById("formSuccess").classList.remove("d-none");
            document.getElementById("formError").classList.add("d-none");

            form.reset();

        }else{
            throw new Error("Error");
        }

    })
    .catch(error => {

        document.getElementById("formError").classList.remove("d-none");
        document.getElementById("formSuccess").classList.add("d-none");

    })
    .finally(()=>{

        button.innerHTML = `
        <span class="btn-label">
        <i class="bi bi-send-fill"></i> Send Message
        </span>`;

        button.disabled = false;

    });

});

