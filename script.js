(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav scroll state ---------- */
  var nav = document.getElementById('nav');
  var lastScroll = -1;
  function onScroll() {
    var y = window.scrollY;
    if (y === lastScroll) return;
    lastScroll = y;
    if (nav) nav.classList.toggle('is-scrolled', y > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  var burger = document.querySelector('.nav__burger');
  var mobileMenu = document.getElementById('m-menu');
  if (burger && mobileMenu) {
    var setMenuOpen = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        mobileMenu.hidden = false;
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      }
    };
    burger.addEventListener('click', function () {
      setMenuOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenuOpen(false); });
    });
    var mq = window.matchMedia('(min-width: 980px)');
    var onMq = function () { if (mq.matches) setMenuOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else mq.addListener(onMq);
  }

  /* ---------- Sticky mobile CTA visibility ---------- */
  var fab = document.getElementById('cta-fab');
  var hero = document.querySelector('.hero');
  var leadSection = document.getElementById('lead');

  if (fab && hero && 'IntersectionObserver' in window) {
    // Show after hero leaves view; hide when reaching the lead form (CTA there is in-page already)
    var heroObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) {
          if (entry.isIntersecting) hideFab();
          else showFab();
        }
      });
    }, { threshold: 0, rootMargin: '-40% 0px 0px 0px' });
    heroObs.observe(hero);

    if (leadSection) {
      var leadObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) hideFab();
        });
      }, { threshold: 0.15 });
      leadObs.observe(leadSection);
    }

    function showFab() {
      fab.classList.add('is-visible');
      fab.setAttribute('aria-hidden', 'false');
      fab.removeAttribute('tabindex');
    }
    function hideFab() {
      fab.classList.remove('is-visible');
      fab.setAttribute('aria-hidden', 'true');
      fab.setAttribute('tabindex', '-1');
    }
  }

  /* ---------- Form handling ---------- */
  var form = document.getElementById('lead-form');
  var success = document.getElementById('form-success');
  var errorBox = document.getElementById('form-error');

  function setFieldError(input, message) {
    var field = input.closest('.field');
    if (!field) return;
    var errEl = form.querySelector('[data-error-for="' + input.id + '"]');
    if (message) {
      field.classList.add('field--invalid');
      if (errEl) errEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('field--invalid');
      if (errEl) errEl.textContent = '';
      input.removeAttribute('aria-invalid');
    }
  }

  function validateField(input) {
    var v = input.value.trim();
    if (input.required && !v) {
      setFieldError(input, 'שדה חובה');
      return false;
    }
    if (input.type === 'email' && v) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        setFieldError(input, 'כתובת דוא״ל לא תקינה');
        return false;
      }
    }
    if (input.type === 'tel' && v) {
      var digits = v.replace(/[^\d]/g, '');
      if (digits.length < 9 || digits.length > 15) {
        setFieldError(input, 'מספר טלפון לא תקין');
        return false;
      }
    }
    if (input.minLength > 0 && v.length < input.minLength) {
      setFieldError(input, 'קצר מדי');
      return false;
    }
    setFieldError(input, '');
    return true;
  }

  if (form) {
    var inputs = form.querySelectorAll('input[required]');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorBox) errorBox.hidden = true;
      if (success) success.hidden = true;

      var allValid = true;
      inputs.forEach(function (input) {
        if (!validateField(input)) allValid = false;
      });
      if (!allValid) {
        var firstInvalid = form.querySelector('.field--invalid input');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>שולח...</span>';
      }

      var data = new FormData(form);

      // Guard: friendly error if Formspree endpoint isn't configured yet.
      if (form.action.indexOf('REPLACE_WITH_YOUR_FORMSPREE_ID') !== -1) {
        if (errorBox) {
          errorBox.textContent = 'הטופס עדיין לא חובר ל-Formspree. עדכנו את ה-action בקובץ index.html.';
          errorBox.hidden = false;
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }
        return;
      }

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (success) {
              success.hidden = false;
              success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            return res.json().then(function (j) {
              throw new Error(j && j.error ? j.error : 'submit_failed');
            });
          }
        })
        .catch(function () {
          if (errorBox) errorBox.hidden = false;
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
          }
        });
    });
  }

  /* ---------- Section reveal on scroll (subtle) ---------- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealEls = document.querySelectorAll('.section__head, .prop, .module, .testimonial, .faq__q, .hero__copy, .hero__media');
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 600ms cubic-bezier(0.2,0.7,0.2,1), transform 600ms cubic-bezier(0.2,0.7,0.2,1)';
    });
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.transitionDelay = (Math.min(i, 3) * 60) + 'ms';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }
})();
