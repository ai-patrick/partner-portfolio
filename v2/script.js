    document.addEventListener('DOMContentLoaded', () => {

      /* ─── Fade-up Entrance (IntersectionObserver) ─── */
      const fadeElements = document.querySelectorAll('.fade-up');
      const entranceObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      fadeElements.forEach(el => entranceObserver.observe(el));

      /* ─── Mobile Menu ─── */
      const mobileToggle = document.getElementById('mobileToggle');
      const mobileNav = document.getElementById('mobileNav');
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('is-open');
        mobileNav.classList.toggle('is-open');
      });
      mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileToggle.classList.remove('is-open');
          mobileNav.classList.remove('is-open');
        });
      });

      /* ─── Breath Guide Phase Cycler ─── */
      const breathGuide = document.getElementById('breathGuide');
      const breathPhase = document.getElementById('breathPhase');
      setTimeout(() => { if (breathGuide) breathGuide.classList.add('is-in'); }, 1000);

      const phases = [
        { text: 'Compiling Layer...', duration: 2000 },
        { text: 'Syncing Threads...', duration: 2000 },
        { text: 'Purging Cache...', duration: 2000 },
        { text: 'System Deterministic', duration: 2000 }
      ];
      let phaseIdx = 0;
      function cyclePhase() {
        if (breathPhase) breathPhase.textContent = phases[phaseIdx].text;
        phaseIdx = (phaseIdx + 1) % phases.length;
        setTimeout(cyclePhase, phases[phaseIdx - 1 < 0 ? phases.length - 1 : phaseIdx - 1].duration);
      }
      cyclePhase();

      /* ─── Typewriter on Operator Cards ─── */
      document.querySelectorAll('.teacher').forEach(card => {
        const quoteWrap = card.querySelector('.teacher__quote-wrap');
        const txtEl = card.querySelector('.teacher__quote');
        const promptEl = card.querySelector('.teacher__prompt');
        if (!quoteWrap || !txtEl) return;

        const fullText = quoteWrap.getAttribute('data-quote') || card.getAttribute('data-quote');
        let timer = null;
        let typed = false;

        card.addEventListener('mouseenter', () => {
          card.classList.add('is-typing');
          if (!typed) {
            typed = true;
            let i = 0;
            txtEl.innerHTML = '';
            const cursor = document.createElement('span');
            cursor.className = 'teacher__quote-cursor';
            txtEl.appendChild(cursor);

            clearInterval(timer);
            timer = setInterval(() => {
              if (i < fullText.length) {
                txtEl.insertBefore(document.createTextNode(fullText.charAt(i)), cursor);
                i++;
              } else {
                clearInterval(timer);
                // Remove cursor after typing completes
                setTimeout(() => { if (cursor.parentNode) cursor.remove(); }, 1200);
              }
            }, 14);
          }
        });

        card.addEventListener('mouseleave', () => {
          card.classList.remove('is-typing');
          clearInterval(timer);
          typed = false;
          txtEl.innerHTML = '';
        });
      });

      /* ─── Telemetry Row Expand / Collapse ─── */
      document.querySelectorAll('.sched-row').forEach(row => {
        row.querySelector('.sched-row__main').addEventListener('click', () => {
          const wasOpen = row.classList.contains('is-open');
          document.querySelectorAll('.sched-row.is-open').forEach(r => r.classList.remove('is-open'));
          if (!wasOpen) row.classList.add('is-open');
        });
      });

      /* ─── Telemetry Toggle + Toast ─── */
      const tglBtn = document.getElementById('telemetryToggle');
      const tglLabel = document.getElementById('telemetryLabel');
      const toast = document.getElementById('telemetryToast');
      const btnAccept = document.getElementById('toastAccept');
      const btnDecline = document.getElementById('toastDecline');

      function activateTelemetry() {
        if (tglBtn) tglBtn.classList.add('is-on');
        if (tglLabel) tglLabel.textContent = 'Matrix · Live';
        if (toast) toast.classList.remove('is-shown');
      }

      tglBtn.addEventListener('click', () => {
        if (tglBtn.classList.contains('is-on')) {
          tglBtn.classList.remove('is-on');
          tglLabel.textContent = 'Matrix · Idle';
        } else {
          activateTelemetry();
        }
      });

      let toastFired = false;
      window.addEventListener('scroll', () => {
        if (!toastFired && window.scrollY > 200) {
          toastFired = true;
          if (toast && !tglBtn.classList.contains('is-on')) {
            toast.classList.add('is-shown');
          }
        }
      }, { passive: true });

      if (btnAccept) btnAccept.addEventListener('click', activateTelemetry);
      if (btnDecline) btnDecline.addEventListener('click', () => {
        if (toast) toast.classList.remove('is-shown');
      });

      /* ─── Intake Form Submission (inline success, no alert) ─── */
      const intakeForm = document.getElementById('intakeForm');
      const intakeSuccess = document.getElementById('intakeSuccess');
      const submitBtn = document.getElementById('submitBtn');

      intakeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button loading state
        submitBtn.innerHTML = '<span style="display:inline-block;width:12px;height:12px;border:1.5px solid rgba(250,245,236,0.3);border-top-color:var(--cream-bright);border-radius:50%;animation:spin 600ms linear infinite;"></span>';
        submitBtn.style.pointerEvents = 'none';

        // Inject spin keyframe if not present
        if (!document.getElementById('spinStyle')) {
          const s = document.createElement('style');
          s.id = 'spinStyle';
          s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
          document.head.appendChild(s);
        }

        setTimeout(() => {
          intakeForm.classList.add('is-sent');
          intakeSuccess.classList.add('is-shown');
        }, 1200);
      });

      /* ─── Nav background shift on scroll ─── */
      const topbar = document.querySelector('.topbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
          topbar.style.background = 'rgba(239,230,212,0.95)';
        } else {
          topbar.style.background = 'rgba(239,230,212,0.88)';
        }
      }, { passive: true });

    });
