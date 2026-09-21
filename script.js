/**
 * shono.fm — Official Landing Page Script
 * Matches reference UI interactions, download triggers, modal dialog, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDownloadModal();
  initSmoothScroll();
  initChecksumCopy();
});

/* ==========================================================================
   1. Navbar Scroll Effect & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      if (isVisible) {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#0c0c0d';
        navMenu.style.padding = '1.5rem 2rem';
        navMenu.style.borderBottom = '1px solid #27272f';
        navMenu.style.gap = '1.2rem';
      }
    });

    // Close menu when clicking any nav item
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   2. Download Modal System
   ========================================================================== */
function initDownloadModal() {
  const modal = document.getElementById('download-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  const triggers = document.querySelectorAll('.download-trigger');

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      // Let the browser download start, then show the helpful post-download modal
      setTimeout(openModal, 400);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3. Checksum & Link Copy Functionality
   ========================================================================== */
function initChecksumCopy() {
  const btnCopy = document.getElementById('btn-copy-url');
  const codeEl = document.getElementById('checksum-url');

  if (!btnCopy || !codeEl) return;

  btnCopy.addEventListener('click', () => {
    const textToCopy = codeEl.textContent.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = btnCopy.textContent;
      btnCopy.textContent = "Copied!";
      btnCopy.style.backgroundColor = "#ffc72c";
      btnCopy.style.color = "#000000";

      setTimeout(() => {
        btnCopy.textContent = originalText;
        btnCopy.style.backgroundColor = "";
        btnCopy.style.color = "";
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy download URL', err);
    });
  });
}

/* ==========================================================================
   4. Smooth Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.getElementById('navbar')?.offsetHeight || 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
