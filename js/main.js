/* ════════════════════════════════════════════════════
   ACADEMIC PORTFOLIO  ·  main.js
   ─────────────────────────────────────────────────
   Fetches all JSON data files and dynamically renders
   every section of the portfolio page.
   ════════════════════════════════════════════════════ */

'use strict';

/* ── Inline SVG Icon Library ────────────────────────── */
const ICON = {
  document: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,

  external: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,

  arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,

  email: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,

  award: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,

  // Social brand icons
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,

  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  scholar: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm5 12.99L12 18l-5-2.01V13l5 2.73L17 13v2.99z"/></svg>`,

  bluesky: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>`,

  orcid: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>`,

  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
};

/* Social link config – order matters for display */
const SOCIALS = [
  { key: 'scholar',  label: 'Scholar',  icon: ICON.scholar  },
  { key: 'github',   label: 'GitHub',   icon: ICON.github   },
  { key: 'linkedin', label: 'LinkedIn', icon: ICON.linkedin  },
  { key: 'bluesky',  label: 'Bluesky',  icon: ICON.bluesky  },
  { key: 'twitter',  label: 'Twitter',  icon: ICON.twitter  },
  { key: 'orcid',    label: 'ORCID',    icon: ICON.orcid    },
];

/* ── Utility Helpers ─────────────────────────────────── */

/** Safely escape HTML to prevent XSS */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Format ISO date string → "Jan 18, 2025" */
function fmtDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ── Data Loading ────────────────────────────────────── */
async function loadAll() {
  const urls = {
    profile:    'data/profile.json',
    education:  'data/education.json',
    activities: 'data/activities.json',
    skills:     'data/skills.json',
  };
  const results = await Promise.all(
    Object.entries(urls).map(([key, url]) =>
      fetch(url)
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`); return r.json(); })
        .then(data => [key, data])
    )
  );
  return Object.fromEntries(results);
}

/* ════════════════════════════════════════════════════
   RENDER: PROFILE
   ════════════════════════════════════════════════════ */
function renderProfile(p) {
  // <title> + <meta description>
  document.title = p.name;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${p.name} — ${p.title}`;

  // Mobile header name
  const mobileLogoEl = document.getElementById('mobile-logo');
  if (mobileLogoEl) mobileLogoEl.textContent = p.name;

  // Sidebar avatar
  const avatarEl = document.getElementById('sidebar-avatar');
  if (avatarEl) {
    const img = new Image();
    img.src = p.photo;
    img.alt = p.name;
    img.addEventListener('error', () => {
      avatarEl.innerHTML = `<div class="avatar-initials">${esc(p.initials)}</div>`;
    });
    avatarEl.appendChild(img);
  }

  // Sidebar text fields
  setText('sidebar-name', p.name);
  setText('sidebar-title', p.title);
  setText('sidebar-affiliation', p.affiliation);

  // Sidebar: email click-to-copy
  const sidebarEmailEl = document.getElementById('sidebar-email');
  if (sidebarEmailEl) {
    sidebarEmailEl.innerHTML = p.links.email
      ? `<span class="social-chip btn-email-copy" data-email="${esc(p.links.email)}" role="button" tabindex="0" title="Click to copy email">${ICON.email} ${esc(p.links.email)}</span>`
      : '';
    wireEmailCopy(sidebarEmailEl.querySelector('.btn-email-copy'));
  }

  // Drawer (mobile)
  setText('drawer-name', p.name);
  setText('drawer-title', p.title);

  // Social chips (sidebar + drawer + contact)
  renderSocials(p.links, 'sidebar-social', 'chip');
  renderSocials(p.links, 'drawer-social', 'chip');
  renderSocials(p.links, 'contact-social', 'btn');

  // About: bio paragraphs
  const bioEl = document.getElementById('about-bio');
  if (bioEl) {
    const paras = Array.isArray(p.bio) ? p.bio : [p.bio];
    bioEl.innerHTML = `<div class="about-bio">${paras.map(t => `<p>${esc(t)}</p>`).join('')}</div>`;
  }

  // About: profile photo
  const photoEl = document.getElementById('about-photo-inner');
  if (photoEl) {
    const img = new Image();
    img.src = p.photo;
    img.alt = p.name;
    img.addEventListener('error', () => {
      photoEl.innerHTML = `<div class="photo-placeholder">${esc(p.initials)}</div>`;
    });
    photoEl.appendChild(img);
  }

  // About: CTA buttons
  const ctaEl = document.getElementById('about-cta');
  if (ctaEl) {
    ctaEl.innerHTML = [
      p.links.cv
        ? `<a href="${esc(p.links.cv)}" class="btn-primary" target="_blank" rel="noopener">${ICON.document} Resume</a>`
        : '',
      p.links.email
        ? `<span class="btn-secondary btn-email-copy" data-email="${esc(p.links.email)}" role="button" tabindex="0" title="Click to copy email">${ICON.email} ${esc(p.links.email)}</span>`
        : '',
    ].join('');

    wireEmailCopy(ctaEl.querySelector('.btn-email-copy'));
  }

  // Contact section
  const contactEl = document.getElementById('contact-content');
  if (contactEl) {
    contactEl.innerHTML = `
      <p class="contact-intro">
      </p>
      ${p.links.email
        ? `<span class="contact-email btn-email-copy" data-email="${esc(p.links.email)}" role="button" tabindex="0" title="Click to copy email">${ICON.email} ${esc(p.links.email)}</span>`
        : ''}
    `;
    wireEmailCopy(contactEl.querySelector('.btn-email-copy'));
  }

  // Footer
  setText('footer-copy', `© ${new Date().getFullYear()} ${p.name}`);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '';
}

function wireEmailCopy(copyEl) {
  if (!copyEl) return;
  const originalHTML = copyEl.innerHTML;
  const doCopy = () => {
    navigator.clipboard.writeText(copyEl.dataset.email).then(() => {
      copyEl.textContent = 'Copied!';
      setTimeout(() => { copyEl.innerHTML = originalHTML; }, 2000);
    });
  };
  copyEl.addEventListener('click', doCopy);
  copyEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') doCopy(); });
}

function renderSocials(links, containerId, style) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = SOCIALS
    .filter(s => links[s.key])
    .map(s =>
      style === 'btn'
        ? `<a href="${esc(links[s.key])}" class="btn-secondary" target="_blank" rel="noopener">${s.icon} ${s.label}</a>`
        : `<a href="${esc(links[s.key])}" class="social-chip" target="_blank" rel="noopener" title="${s.label}">${s.icon} ${s.label}</a>`
    )
    .join('');
}

/* ════════════════════════════════════════════════════
   RENDER: EDUCATION
   ════════════════════════════════════════════════════ */
function renderEducation(entries) {
  const el = document.getElementById('education-list');
  if (!el || !entries?.length) return;

  el.innerHTML = `<div class="edu-list">${entries.map(e => `
    <div class="edu-card">
      <div class="edu-main">
        <div class="edu-left">
          <div class="edu-institution">${esc(e.institution)}</div>
          <div class="edu-degree">${esc(e.degree)}</div>
          <div class="edu-detail">${esc(e.detail)}</div>
        </div>
        <div class="edu-right">
          <div class="edu-period">${esc(e.period)}</div>
          <div class="edu-location">${esc(e.location)}</div>
        </div>
      </div>
      ${e.awards?.length ? `
      <ul class="edu-awards">
        ${e.awards.map(a => `<li>${esc(a)}</li>`).join('')}
      </ul>` : ''}
    </div>
  `).join('')}</div>`;
}

/* ════════════════════════════════════════════════════
   RENDER: ACTIVITIES
   ════════════════════════════════════════════════════ */
function renderActivities(activities) {
  const el = document.getElementById('activities-container');
  if (!el || !activities?.length) return;

  el.innerHTML = activities.map(group => `
    <div class="activity-group">
      <div class="activity-group-header">
        <span class="activity-icon">${group.icon || ''}</span>
        <span class="activity-category">${esc(group.category)}</span>
      </div>
      <div class="activity-list">
        ${(group.items || []).map(item => `
          <div class="activity-card">
            <div class="activity-body">
              <div class="activity-title">${
                item.link
                  ? `<a href="${esc(item.link)}" target="_blank" rel="noopener">${esc(item.title)}</a>`
                  : esc(item.title)
              }</div>
              <div class="activity-org">${esc(item.organization)}</div>
              <p class="activity-desc">${esc(item.description)}</p>
            </div>
            <div class="activity-period">${esc(item.period)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════════
   RENDER: SKILLS & INTERESTS
   ════════════════════════════════════════════════════ */
function renderSkills(groups) {
  const el = document.getElementById('skills-grid');
  if (!el || !groups?.length) return;

  el.innerHTML = `<div class="skills-grid">${groups.map(g => `
    <div class="skill-group">
      <div class="skill-category">${esc(g.category)}</div>
      <ul class="skill-list">
        ${(g.items || []).map(item => `<li>${esc(item)}</li>`).join('')}
      </ul>
    </div>
  `).join('')}</div>`;
}

/* ════════════════════════════════════════════════════
   MOBILE NAV
   ════════════════════════════════════════════════════ */
function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const overlay   = document.getElementById('drawer-overlay');

  if (!hamburger || !drawer || !overlay) return;

  function open() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () =>
    drawer.classList.contains('open') ? close() : open()
  );
  overlay.addEventListener('click', close);

  document.querySelectorAll('.drawer-link').forEach(link =>
    link.addEventListener('click', close)
  );
}

/* ════════════════════════════════════════════════════
   SCROLL SPY  —  highlights the active nav link
   ════════════════════════════════════════════════════ */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.sidebar-link[data-section]');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l =>
          l.classList.toggle('is-active', l.dataset.section === entry.target.id)
        );
      }
    });
  }, { rootMargin: '-15% 0px -72% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ════════════════════════════════════════════════════
   ERROR BANNER
   ════════════════════════════════════════════════════ */
function showError(err) {
  console.error('[Portfolio]', err);
  const banner = document.createElement('div');
  banner.style.cssText = [
    'position:fixed;bottom:1rem;right:1rem;z-index:9999',
    'background:#FEF3C7;border:1px solid #FCD34D',
    'padding:.85rem 1.1rem;border-radius:8px',
    'font-family:monospace;font-size:.78rem;max-width:340px',
    'line-height:1.5;color:#92400E',
  ].join(';');
  banner.innerHTML = `
    <strong>⚠ Could not load data files.</strong><br>
    Serve this project from a local server instead of opening
    <code>index.html</code> directly.<br><br>
    Quick start: <code>npx serve .</code><br>
    Then visit: <a href="http://localhost:3000" style="color:#1d4ed8">localhost:3000</a>
  `;
  document.body.appendChild(banner);
}

/* ════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════ */
async function init() {
  try {
    const { profile, education, activities, skills } = await loadAll();

    renderProfile(profile);
    renderEducation(education);
    renderActivities(activities);
    renderSkills(skills);

    setupMobileNav();
    setupScrollSpy();
  } catch (err) {
    showError(err);
  }
}

document.addEventListener('DOMContentLoaded', init);
