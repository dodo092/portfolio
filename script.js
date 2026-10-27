/**
 * ROSTOM JADE MOSQUEDA - PERSONAL PORTFOLIO JAVASCRIPT
 * Bento & Flagship Showcase Architecture
 * 
 * Features:
 * - Floating Dock Navigation with active section tracker
 * - Mobile drawer toggle with auto-close
 * - Dark / Light mode switcher with localStorage persistence
 * - Interactive Project Details Modal Viewer (All 4 Projects)
 * - Category filter for activity projects
 * - One-click Email copy with feedback toast
 * - Interactive mailto generator form
 * - Back to top smooth scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Project Detailed Data Dictionary ---
  const projectsData = {
    smartcane: {
      title: 'SmartCane: Assistive Mobility Innovation',
      type: 'Capstone Project',
      typeClass: 'badge-capstone-lead',
      media: 'images/project-smartcane.svg',
      tech: ['Figma', 'JavaScript', 'Antigravity AI', 'Tailwindcss', 'IoT Ultrasonic Sensor'],
      overview: 'SmartCane is an assistive mobility platform engineered to aid visually impaired individuals with real-time navigational awareness, physical obstacle alerts, and intelligent feedback.',
      problem: 'Visually impaired commuters face constant navigation obstacles such as low-hanging fixtures, pavement hazards, and sudden terrain shifts that conventional white canes cannot identify in advance.',
      solution: 'Integrating ultrasonic distance sensors and tactile feedback with the Antigravity AI engine allows the SmartCane to calculate safe trajectories and warn users via haptic vibrations and paired voice feedback.',
      contribution: [
        'Designed interactive user personas and high-fidelity mobile application flows using Figma.',
        'Developed the companion mobile telemetry dashboard using JavaScript and Tailwind CSS.',
        'Integrated sensor logic and state communication with the Antigravity framework for responsive obstacle classification.'
      ],
      codeUrl: 'https://github.com/dodo092'
    },
    safedrive: {
      title: 'SafeDrive: Records Management System',
      type: 'Activity Project',
      typeClass: 'mini-badge',
      media: 'images/project-safedrive.svg',
      tech: ['JavaScript (ES6+)', 'Figma', 'Tailwindcss', 'Local Storage / Mock API'],
      overview: 'SafeDrive is a centralized vehicular incident logbook and driver compliance platform designed to track road safety metrics, license statuses, and incident history.',
      problem: 'Transportation operators and administrative coordinators often rely on disorganized paper logs or rigid spreadsheets to review vehicle incidents and driver certifications.',
      solution: 'SafeDrive provides an intuitive, high-speed web dashboard featuring searchable driver records, instant status indicators (Valid, Pending, Expired), and fleet compliance grading.',
      contribution: [
        'Conducted user flow analysis and crafted the dashboard interface in Figma.',
        'Implemented client-side search, real-time filtering, and modal detail views using modern JavaScript.',
        'Styled responsive cards and tabular data layouts cleanly with Tailwind CSS utility classes.'
      ],
      codeUrl: 'https://github.com/dodo092'
    },
    cuepoint: {
      title: 'CuePoint: AI Prompt-Assisted Productivity Tool',
      type: 'Activity Project',
      typeClass: 'mini-badge',
      media: 'images/project-cuepoint.png',
      tech: ['OpenGPT-4o', 'Node.js', 'JavaScript', 'REST API', 'Prompt Engineering'],
      overview: 'CuePoint is an AI-powered developer and student productivity companion that distills complex technical documentation and queries into concise contextual cues and action steps.',
      problem: 'Students and engineers frequently waste valuable hours sifting through dense documentation when they need immediate, accurate syntax reminders or system architecture cues.',
      solution: 'Using tailored system prompts and OpenGPT-4o streaming APIs, CuePoint quickly synthesizes targeted instructions, architectural best practices, and code snippets.',
      contribution: [
        'Built Node.js server routes connecting securely to the OpenGPT-4o API.',
        'Engineered specialized system prompts for concise, hallucination-resistant summaries.',
        'Programmed asynchronous front-end token stream rendering for real-time response generation.'
      ],
      codeUrl: 'https://github.com/dodo092'
    },
    qrcode: {
      title: 'QR Code-Based Attendance & Verification System',
      type: 'Activity Project',
      typeClass: 'mini-badge',
      media: 'images/project-qrcode.jpg',
      tech: ['Python', 'Django', 'JavaScript', 'HTML5 Camera API', 'PostgreSQL / SQLite', 'UI/UX Design'],
      overview: 'A robust, database-driven verification platform enabling instant user check-in via personalized dynamic QR codes and browser-based camera scanning.',
      problem: 'Traditional attendance logs and manual identity checks in academic or corporate venues are slow, error-prone, and prone to proxy sign-ins.',
      solution: 'Automated QR generation linked to encrypted student IDs allows real-time timestamping, instant camera decoding in the browser, and automated database logging with zero specialized scanner hardware required.',
      contribution: [
        'Developed the backend architecture and relational database schema using Django ORM.',
        'Integrated HTML5 video camera capture with JavaScript QR decoding libraries for cross-device mobile scanning.',
        'Designed an intuitive administrative management panel for reviewing daily attendance records and exporting audit logs.'
      ],
      codeUrl: 'https://github.com/dodo092'
    }
  };

  // --- Element Selectors ---
  const themeToggle = document.getElementById('themeToggle');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const dockLinks = document.querySelectorAll('.dock-link, .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterChips = document.querySelectorAll('.filter-chip, .filter-btn');
  const activityCards = document.querySelectorAll('.activity-card, .project-card');
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const toastNotice = document.getElementById('toastNotice');
  const backToTopBtn = document.getElementById('backToTop');

  // --- 1. Theme Switcher (Dark / Light) ---
  const currentTheme = localStorage.getItem('portfolio-theme') || 'light';
  document.body.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.body.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }

  // --- 2. Mobile Dock Drawer Navigation ---
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking any nav link
    dockLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. ScrollSpy: Highlight Active Nav Link & Back to Top ---
  const handleScrollSpy = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        dockLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Back to top button visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy(); // Initial execution

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 4. Activity Projects Filtering ---
  if (filterChips.length > 0 && activityCards.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.getAttribute('data-filter');

        activityCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- 5. Interactive Project Modal Dialog ---
  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !modal || !modalContent) return;

    // Dynamically retrieve image from the card on the page so any user image updates are automatically inherited
    const cardImg = document.querySelector(`[data-project="${projectId}"]`)?.closest('article')?.querySelector('img');
    const mediaSrc = (cardImg && cardImg.getAttribute('src')) ? cardImg.getAttribute('src') : data.media;

    const techPills = data.tech.map(t => `<span class="tech-pill">${t}</span>`).join(' ');
    const contributionList = data.contribution.map(c => `<li>${c}</li>`).join('');

    modalContent.innerHTML = `
      <img src="${mediaSrc}" alt="${data.title}" class="modal-header-img" loading="eager" decoding="async" onerror="if(this.src!=='${data.media}'){this.src='${data.media}';}">
      <div class="modal-body">
        <div class="badge-row">
          <span class="editorial-tag">${data.type}</span>
        </div>
        <h3 id="modalTitle">${data.title}</h3>
        <p class="modal-sub">Rostom Jade Mosqueda &bull; Academic Portfolio Project</p>

        <div class="modal-section">
          <h4>Technologies Used</h4>
          <div class="tech-pill-rack" style="margin-top: 0.5rem;">
            ${techPills}
          </div>
        </div>

        <div class="modal-section">
          <h4>Project Overview</h4>
          <p>${data.overview}</p>
        </div>

        <div class="modal-section">
          <h4>Problem &amp; Motivation</h4>
          <p>${data.problem}</p>
        </div>

        <div class="modal-section">
          <h4>The Solution</h4>
          <p>${data.solution}</p>
        </div>

        <div class="modal-section">
          <h4>My Key Contributions</h4>
          <ul>
            ${contributionList}
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-pill-outline" id="modalDismissBtn">Close</button>
        <a href="${data.codeUrl}" target="_blank" rel="noopener" class="btn btn-pill-solid">
          <span>View on GitHub ↗</span>
        </a>
      </div>
    `;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const dismissBtn = document.getElementById('modalDismissBtn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', closeModal);
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach modal trigger buttons across both Capstone card and Activity cards
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // --- 6. Quick Copy Email with Toast ---
  const myEmail = 'Rostomjademosqueda02@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(myEmail);
        const span = copyEmailBtn.querySelector('span');
        if (span) span.textContent = 'Copied!';
        showToast('Email copied to clipboard! (Rostomjademosqueda02@gmail.com)');
        setTimeout(() => {
          if (span) span.textContent = 'Copy Email';
        }, 2500);
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = myEmail;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email copied to clipboard!');
      }
    });
  }

  // --- 7. Contact Form Handling (Generates Mailto Link Per Guide) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const subject = document.getElementById('userSubject').value.trim();
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      const formattedBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Rostom Jade Mosqueda Portfolio`;
      const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

      // Launch email client
      window.location.href = mailtoUrl;

      // Inline feedback
      if (formFeedback) {
        formFeedback.className = 'form-feedback-notice success';
        formFeedback.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your default email application has been launched with your prefilled message. You can also email me directly at <a href="mailto:${myEmail}"><strong>${myEmail}</strong></a>.
        `;
      }

      showToast('Opening your email client...');
      contactForm.reset();
    });
  }

  // --- Toast Notification Helper ---
  let toastTimer;
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }
});
