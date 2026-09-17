/**
 * AI BOTFLOW WHATSAPP CRM - INTERACTIVE LOGIC & CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWorkbenchTabs();
  initPricingToggle();
  initFAQAccordion();
  initChatSimulator();
  initSmoothScroll();
  initKBHubSection();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('siteHeader') || document.querySelector('.om-header-wrap');
  const burgerBtn = document.getElementById('omBurgerBtn') || document.getElementById('mobileMenuBtn');
  const burgerIcon = document.getElementById('omBurgerIcon');
  const drawer = document.getElementById('omMobileDrawer') || document.getElementById('mobileDrawer');

  // Dynamic header height measurement & sync for sticky header and mobile drawer
  const updateHeaderHeight = () => {
    if (header) {
      const h = header.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty('--site-header-height', `${h}px`);
      }
    }
  };
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight, { passive: true });
  window.addEventListener('orientationchange', updateHeaderHeight, { passive: true });

  // Scroll effect on header for enhanced glassmorphism
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      updateHeaderHeight();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Drawer Toggle logic
  if (burgerBtn && drawer) {
    const toggleDrawer = (forceOpen) => {
      const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !drawer.classList.contains('active');
      if (shouldOpen) {
        updateHeaderHeight();
        drawer.classList.add('active');
        burgerBtn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        if (burgerIcon) {
          burgerIcon.classList.remove('fa-bars');
          burgerIcon.classList.add('fa-xmark');
        }
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        if (burgerIcon) {
          burgerIcon.classList.remove('fa-xmark');
          burgerIcon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      }
    };

    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    // Close mobile drawer when any link clicked
    drawer.querySelectorAll('a, .om-mob-link, .mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });

    // Close automatically when viewport resized past 1024px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && drawer.classList.contains('active')) {
        toggleDrawer(false);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Interactive Product Workbench Tabs
   -------------------------------------------------------------------------- */
function initWorkbenchTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.workbench-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Pricing Monthly vs Annual Switcher
   -------------------------------------------------------------------------- */
function initPricingToggle() {
  const toggle = document.getElementById('pricingToggle');
  const lblMonthly = document.getElementById('lblMonthly');
  const lblAnnual = document.getElementById('lblAnnual');
  const amounts = document.querySelectorAll('.pricing-card .amount');
  const periods = document.querySelectorAll('.pricing-card .period');
  
  const subStarter = document.getElementById('annual-sub-starter');
  const subGrowth = document.getElementById('annual-sub-growth');
  const subEnterprise = document.getElementById('annual-sub-enterprise');

  if (!toggle) return;

  function updatePrices(isAnnual) {
    if (isAnnual) {
      lblAnnual.classList.add('active');
      lblMonthly.classList.remove('active');
      
      periods.forEach(p => p.textContent = '/yr');
      if (subStarter) subStarter.textContent = 'Billed ₹5,999 annually (Save 17%)';
      if (subGrowth) subGrowth.textContent = 'Billed ₹14,999 annually (Save 17%)';
      if (subEnterprise) subEnterprise.textContent = 'Billed ₹24,999 annually (Save 17%)';
    } else {
      lblMonthly.classList.add('active');
      lblAnnual.classList.remove('active');
      
      periods.forEach(p => p.textContent = '/mo');
      if (subStarter) subStarter.textContent = '(₹5999/yr)';
      if (subGrowth) subGrowth.textContent = '(₹14999/yr)';
      if (subEnterprise) subEnterprise.textContent = '(₹24999/yr)';
    }

    amounts.forEach(amountEl => {
      const val = isAnnual ? amountEl.getAttribute('data-annual') : amountEl.getAttribute('data-monthly');
      if (val) {
        amountEl.textContent = val;
      }
    });
  }

  toggle.addEventListener('change', (e) => {
    updatePrices(e.target.checked);
  });

  lblMonthly.addEventListener('click', () => {
    toggle.checked = false;
    updatePrices(false);
  });

  lblAnnual.addEventListener('click', () => {
    toggle.checked = true;
    updatePrices(true);
  });
}

/* --------------------------------------------------------------------------
   4. FAQ Accordion (Collapsible)
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Live Interactive Chat Simulator
   -------------------------------------------------------------------------- */
function initChatSimulator() {
  const chatBox = document.getElementById('simChatBox');
  const promptBtns = document.querySelectorAll('.sim-prompt-btn');
  const customInput = document.getElementById('simCustomInput');
  const sendBtn = document.getElementById('simSendBtn');

  if (!chatBox) return;

  const responses = {
    "Will our WhatsApp number ever get blocked?": 
      "Guaranteed NO! AI Botflow connects 100% via the Official Meta WhatsApp Cloud API. We never use unauthorized browser scrapers, rooted Android phones, or QR-scanning hacks that get numbers flagged. Your business phone number is completely safe.",

    "Can I upload PDFs directly in bulk broadcasts without external URLs?": 
      "Yes, absolutely! Unlike older platforms that force you to host your brochures or videos on public CDNs, AI Botflow provides direct drag & drop uploads inside the campaign wizard for PNG/JPEG (up to 5MB) and PDF/MP4 files (up to 16MB).",

    "How does Shopify or WooCommerce webhook integration work?": 
      "Super simple! In AI Botflow, generate your unique Webhook URL and paste it into your Shopify/WooCommerce admin. Whenever a customer places an order or abandons a checkout cart, AI Botflow captures the payload, maps customer details ({{1}} = First Name), and fires instant WhatsApp alerts in < 1 second.",

    "What are your plans and pricing?": 
      "We have 3 simple tiers with ZERO per-message platform markup:\n• Starter (₹599/mo): 3 Team Seats, 2k Contacts, 10k Monthly Broadcasts, Drag & Drop Flows.\n• Growth (₹1,499/mo): Most Popular! Autonomous Generative AI Agents, 10 Team Seats, 10k Contacts, 50k Broadcasts.\n• Enterprise (₹2,499/mo): 50 Team Seats, 50k Contacts, 2 Lakh Broadcasts & High TPS."
  };

  function addMessage(text, isCustomer = false) {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement('div');
    
    if (isCustomer) {
      bubble.className = 'chat-bubble customer';
      bubble.innerHTML = `
        ${escapeHTML(text)}
        <div class="bubble-meta">${timeNow}</div>
      `;
    } else {
      bubble.className = 'chat-bubble agent-ai';
      bubble.innerHTML = `
        <div class="agent-header-row">
          <div>✦ AI Agent <span>· Instant 0.3s response</span></div>
        </div>
        ${escapeHTML(text).replace(/\n/g, '<br>')}
        <div class="agent-meta">
          <span>${timeNow} · Sent</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a7f3d0" stroke-width="2.5"><polyline points="18 6 9 15 4 10"></polyline><polyline points="22 10 13 19 11 17"></polyline></svg>
        </div>
      `;
    }

    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function handleQuery(queryText) {
    if (!queryText || !queryText.trim()) return;
    
    // Add customer message
    addMessage(queryText, true);

    // Show temporary typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble agent-ai';
    typingBubble.style.opacity = '0.7';
    typingBubble.innerHTML = `<em>✦ AI Agent is retrieving knowledge base...</em>`;
    chatBox.appendChild(typingBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Sub-second response
    setTimeout(() => {
      typingBubble.remove();
      const matched = responses[queryText];
      if (matched) {
        addMessage(matched, false);
      } else {
        addMessage(
          `Thank you for asking about "${queryText}". AI Botflow natively handles this through our Meta Cloud API, automated visual flows, and custom document RAG memory. You can test your full dataset live in the 14-day free trial!`, 
          false
        );
      }
    }, 450);
  }

  promptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      handleQuery(q);
    });
  });

  if (sendBtn && customInput) {
    sendBtn.addEventListener('click', () => {
      const val = customInput.value;
      if (val.trim()) {
        handleQuery(val);
        customInput.value = '';
      }
    });

    customInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = customInput.value;
        if (val.trim()) {
          handleQuery(val);
          customInput.value = '';
        }
      }
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

/* --------------------------------------------------------------------------
   6. Smooth Anchor Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Homepage Knowledge Base Filter & Live Search
   -------------------------------------------------------------------------- */
function initKBHubSection() {
  const tabs = document.querySelectorAll('#kbHubTabs .kb-hub-tab-btn');
  const featuredCards = document.querySelectorAll('#kbHubFeaturedGrid .kb-hub-card');
  const dirItems = document.querySelectorAll('#kbHubDirectoryGrid .kb-dir-item');
  const searchInput = document.getElementById('kbHubSearchInput');

  if (!tabs.length && !searchInput) return;

  // Category Tab Filter
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      // Filter featured cards
      featuredCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter directory grid
      dirItems.forEach(item => {
        const cat = item.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      featuredCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
      });

      dirItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `knowledgebase.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}
