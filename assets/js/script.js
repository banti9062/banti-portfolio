/* ─── THEME TOGGLE ────────────────────────────────────── */
const themeBtn = document.getElementById('themeBtn');
let isDark = true;
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

/* ─── NAV SCROLL & ACTIVE STATE ───────────────────────── */
const navbar = document.getElementById('navbar');
const bttBtn = document.getElementById('btt');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Navbar blur effect
  navbar.classList.toggle('scrolled', scrollY > 20);
  // Back to top button
  bttBtn.classList.toggle('show', scrollY > 500);
  
  // Highlight navigation links
  let current = '';
  sections.forEach(s => { 
    if (scrollY >= s.offsetTop - 140) current = s.id; 
  });
  
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if(a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}, { passive: true });

/* ─── HAMBURGER MENU ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

function closeNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}

/* ─── TYPED ANIMATION ─────────────────────────────────── */
const roles = [
  'Salesforce Developer',
  'LWC Specialist',
  'Apex Engineer',
  'OmniStudio Expert',
  'Integration Architect',
  'Flow Automation Pro'
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function typeEffect() {
  const currentRole = roles[roleIdx];
  
  if (!isDeleting) {
    typedEl.textContent = currentRole.slice(0, ++charIdx);
    if (charIdx === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000); // Wait before deleting
      return;
    }
  } else {
    typedEl.textContent = currentRole.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  
  // Typing speed vs Deleting speed
  const speed = isDeleting ? 40 : 80;
  setTimeout(typeEffect, speed);
}
// Start typing
setTimeout(typeEffect, 1000);

/* ─── INTERSECTION OBSERVER FOR FADE & SKILLS ─────────── */
const fadeEls = document.querySelectorAll('.fade-up');
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class to trigger CSS animation
      entry.target.classList.add('visible');
      
      // Animate skill bars if they exist inside this target
      const skillBars = entry.target.querySelectorAll('.skill-fill');
      if (skillBars.length > 0) {
        // slight delay for smoother visual staggering
        setTimeout(() => {
          skillBars.forEach(bar => {
            bar.style.width = bar.dataset.pct + '%';
          });
        }, 300);
      }
      
      // Stop observing once animated
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));

/* ─── CSS VARIABLE STAGGER INIT ───────────────────────── */
document.querySelectorAll('.stagger').forEach(container => {
  [...container.children].forEach((child, i) => {
    child.style.setProperty('--i', i);
  });
});

/* ─── CONTACT FORM HANDLING ───────────────────────────── */
function handleSubmit() {
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!fname || !email || !message) { 
    alert('Please fill in required fields: First Name, Email, and Message.'); 
    return; 
  }
  
  // Simulate successful send
  const status = document.getElementById('sendStatus');
  status.classList.add('active');
  
  // Clear fields
  ['fname','lname','email','message'].forEach(id => {
    document.getElementById(id).value = '';
  });
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    status.classList.remove('active');
  }, 5000);
}
