// @ts-nocheck
/* final script.js - plain JavaScript, validated */

/* -----------------------------
   PROJECT DATA
--------------------------------*/
const projectsData = {
  project1: {
    title: 'Organizational Network using Cisco Packet Tracer',
    description:
      'Designed and simulated a secure, efficient multi-department network using VLANs, routing protocols, and network segmentation.',
    features: [
      'Multi-VLAN implementation (HR, IT, Sales)',
      'Router & switch configuration (CLI)',
      'Security configuration & ACL policies',
      'Optimized IP addressing for scalability'
    ],
    github: 'https://github.com/KarthickJ/Organizational-Network-Sim'
  },
  project2: {
    title: 'Smart Home Automation using Hardware',
    description:
      'A complete IoT-based home automation prototype allowing remote control of lights, sensors, and electrical appliances.',
    features: [
      'Temperature sensors & relay usage',
      'Mobile app for real-time control',
      'Simulated voice command support',
      'Live device status monitoring'
    ],
    github: 'https://github.com/KarthickJ/Smart-Home-IoT-Solution'
  },
  project3: {
    title: 'Farmconnect - E-Commerce Business',
    description:
      'A mobile app built to connect farmers directly with consumers, eliminating middlemen and improving produce accessibility.',
    features: [
      'Farmer & buyer separate dashboards',
      'Order management with tracking',
      'Simulated secure payments',
      'Inventory & product listing system'
    ],
    github: 'https://github.com/KarthickJ/Farmconnect-E-Commerce-App'
  }
};

/* -----------------------------
   RESUME MODAL
--------------------------------*/
function showResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) modal.classList.remove('hidden');
}
function hideResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) modal.classList.add('hidden');
}
window.showResumeModal = showResumeModal;
window.hideResumeModal = hideResumeModal;

/* -----------------------------
   PROJECT MODAL
--------------------------------*/
function showProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;
  const titleEl = document.getElementById('projectModalTitle');
  const descEl = document.getElementById('projectModalDescription');
  const featuresEl = document.getElementById('projectModalFeatures');
  const githubEl = document.getElementById('projectModalGithubLink');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.description;
  if (githubEl) githubEl.href = data.github || '#';

  if (featuresEl) {
    featuresEl.innerHTML = '';
    (data.features || []).forEach(function (f) {
      const li = document.createElement('li');
      li.textContent = f;
      featuresEl.appendChild(li);
    });
  }

  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('hidden');
}
function hideProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.add('hidden');
}
window.showProjectModal = showProjectModal;
window.hideProjectModal = hideProjectModal;

/* -----------------------------
   IMAGE PREVIEW MODAL
--------------------------------*/
function initImagePreview() {
  const imgs = document.querySelectorAll('img.image-gallery-item, img.headshot, img');
  imgs.forEach(function (img) {
    img.addEventListener('click', function (e) {
      // avoid opening preview when clicking UI icons (safeguard)
      const src = img.getAttribute('src');
      if (!src) return;
      const modal = document.getElementById('imagePreviewModal');
      const preview = document.getElementById('previewImg');
      if (!modal || !preview) return;
      preview.src = src;
      modal.classList.remove('hidden');
    });
  });

  const imageModal = document.getElementById('imagePreviewModal');
  if (imageModal) {
    imageModal.addEventListener('click', function () {
      imageModal.classList.add('hidden');
    });
  }
}

/* -----------------------------
   CONTACT FORM (WHATSAPP + EMAIL)
--------------------------------*/
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';
    const status = document.getElementById('formStatus');
    if (status) status.innerHTML = '<span class="text-blue-400">Sending...</span>';

    const wpMsg = 'Hello, this is ' + (name || 'Guest') + '. Email: ' + (email || 'N/A') + '. Message: ' + (message || 'N/A');
    const wpNumber = '917904567988';

    // open whatsapp and mailto (new tabs)
    try {
      window.open('https://wa.me/' + wpNumber + '?text=' + encodeURIComponent(wpMsg), '_blank');
      window.open('mailto:karthickjayavelu5@gmail.com?subject=' + encodeURIComponent('Portfolio Message from ' + (name || 'Guest')) + '&body=' + encodeURIComponent(wpMsg), '_blank');
    } catch (err) {
      console.warn('open failed', err);
    }

    setTimeout(function () {
      if (status) status.innerHTML = '<span class="text-gold-400">Thank you ' + (name || '') + '! Message initiated.</span>';
      form.reset();
    }, 900);
  });
}

/* -----------------------------
   SKILL BAR ANIMATION
--------------------------------*/
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-inner');
  bars.forEach(function (bar) {
    let percent = bar.style.getPropertyValue('--skill-percent') || '';
    if (!percent) percent = getComputedStyle(bar).getPropertyValue('--skill-percent') || '';
    percent = percent.trim();
    if (percent) {
      if (percent.indexOf('%') === -1) percent = percent + '%';
      requestAnimationFrame(function () {
        bar.style.width = percent;
      });
      // accessible attributes
      const numeric = parseFloat(percent);
      if (!isNaN(numeric)) {
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', '100');
        bar.setAttribute('aria-valuenow', String(Math.round(numeric)));
      }
    } else {
      bar.style.width = '0%';
    }
  });
}

/* -----------------------------
   TOOLTIP TAP-TOGGLE (mobile)
--------------------------------*/
function initTooltipTap() {
  document.querySelectorAll('.skill-item').forEach(function (item) {
    item.addEventListener('click', function (ev) {
      // only on small screens toggle tooltip on tap
      if (window.innerWidth <= 768) {
        const tip = item.querySelector('.tooltip');
        if (!tip) return;
        const visible = tip.style.visibility === 'visible' || getComputedStyle(tip).visibility === 'visible';
        if (visible) {
          tip.style.visibility = 'hidden';
          tip.style.opacity = '0';
        } else {
          tip.style.visibility = 'visible';
          tip.style.opacity = '1';
          tip.style.transform = 'translateX(-50%) translateY(0)';
        }
        // prevent click bubbling to parent links (if any)
        ev.stopPropagation();
      }
    });
  });
}

/* -----------------------------
   SMOOTH SCROLL & ICONS
--------------------------------*/
function initSmoothScrollAndIcons() {
  try {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') lucide.createIcons();
  } catch (e) { /* ignore */ }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* -----------------------------
   DOM READY
--------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
  initSmoothScrollAndIcons();
  initImagePreview();
  initContactForm();
  initSkillBars();
  initTooltipTap();

  // close modals on Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideResumeModal();
      hideProjectModal();
      const im = document.getElementById('imagePreviewModal');
      if (im) im.classList.add('hidden');
    }
  });

  // click outside resume/project modals to close
  const resumeModal = document.getElementById('resumeModal');
  if (resumeModal) resumeModal.addEventListener('click', function (ev) { if (ev.target === resumeModal) hideResumeModal(); });

  const projectModal = document.getElementById('projectModal');
  if (projectModal) projectModal.addEventListener('click', function (ev) { if (ev.target === projectModal) hideProjectModal(); });
});