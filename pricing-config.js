/**
 * AiBotFlow — Centralized Pricing Configuration & Dynamic Sync Module
 * Single Source of Truth for Pricing, Quotas, Features, and Messaging Rates.
 * 
 * Automatically synchronizes with Admin API (/api/billing/plans) when available,
 * with instantaneous static fallback to guarantee zero-flicker rendering.
 */

(function (window) {
  'use strict';

  // 1. Static Source of Truth (Matching Database & Admin Configuration)
  const PRICING_CONFIG = {
    plans: [
      {
        id: "trial",
        name: "Free Trial",
        badge: "14-DAY EVALUATION",
        isPopular: false,
        desc: "Explore core WhatsApp CRM capabilities and build your first automation workflow.",
        priceMonthly: 0,
        priceYearly: 0,
        contacts: "100",
        broadcasts: "100 /mo",
        teamMembers: "2 Seats",
        automations: "3 Flows",
        channels: {
          whatsapp: true,
          instagramFb: false,
          aiAgents: false,
          gmbSuite: "Magic QR Only",
          restApi: false
        },
        cardFeatures: [
          "Official WhatsApp Cloud API Number",
          "Visual Drag & Drop Flow Builder",
          "2 Team Seats in Shared Inbox",
          "Google Business Profile Magic QR"
        ],
        features: [
          "1 Official WhatsApp Business Number",
          "Google Business Profile Magic QR",
          "Visual Drag & Drop Flow Builder",
          "2 Team Seats in Shared Inbox",
          "Community & Documentation Support"
        ],
        ctaText: "Start 14-Day Free Trial",
        ctaUrl: "https://dash.aibotflow.in/signup?plan=free",
        ctaClass: "btn-secondary"
      },
      {
        id: "starter",
        name: "Starter",
        badge: "ESSENTIAL AUTOMATION",
        isPopular: false,
        desc: "Ideal for growing businesses automating WhatsApp chats, Instagram DMs and reviews.",
        priceMonthly: 799,
        priceYearly: 7999,
        contacts: "2,500",
        broadcasts: "15,000 /mo",
        teamMembers: "3 Seats",
        automations: "10 Flows",
        channels: {
          whatsapp: true,
          instagramFb: true,
          aiAgents: false,
          gmbSuite: "Magic QR Only",
          restApi: false
        },
        cardFeatures: [
          "WhatsApp + Instagram + FB Messenger",
          "15,000 Monthly Broadcasts Capacity",
          "10 Active Visual Automation Flows",
          "3 Team Seats with Notes & Tagging"
        ],
        features: [
          "Official WhatsApp Cloud API Number",
          "Instagram Direct & Facebook Messenger",
          "Google Business Profile Magic QR",
          "3 Team Seats with Notes & Tagging",
          "10 Active Visual Automation Flows",
          "Standard Email & WhatsApp Support"
        ],
        ctaText: "Start 14-Day Free Trial",
        ctaUrl: "https://dash.aibotflow.in/signup?plan=starter",
        ctaClass: "btn-secondary"
      },
      {
        id: "growth",
        name: "Growth",
        badge: "MOST POPULAR",
        isPopular: true,
        desc: "Complete omnichannel CRM with autonomous AI agents, full GMB suite, and REST API.",
        priceMonthly: 1499,
        priceYearly: 14999,
        contacts: "10,000",
        broadcasts: "60,000 /mo",
        teamMembers: "10 Seats",
        automations: "30 Flows",
        channels: {
          whatsapp: true,
          instagramFb: true,
          aiAgents: true,
          gmbSuite: "Full Suite (3 Profiles)",
          restApi: true
        },
        cardFeatures: [
          "Autonomous AI Agent with Vector Memory",
          "Full GMB Suite (3 Locations + AI Replies)",
          "60,000 Broadcasts & 10 Multi-Agent Seats",
          "Developer REST API & Webhook Integrations"
        ],
        features: [
          "WhatsApp + Instagram + FB Messenger",
          "Autonomous Generative AI Agent with Vector Memory",
          "Full GMB Suite (3 Locations + Review AI Responder)",
          "10 Multi-Agent Team Seats & Assignment Rules",
          "30 Visual Automation Flows & Cart Recovery",
          "Developer REST API & Webhook Integrations",
          "Priority 24/7 WhatsApp & Email Support"
        ],
        ctaText: "Start 14-Day Free Trial",
        ctaUrl: "https://dash.aibotflow.in/signup?plan=growth",
        ctaClass: "btn-primary"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "HIGH VOLUME SCALE",
        isPopular: false,
        desc: "For high-volume brands, multi-location franchises, and agencies needing dedicated power.",
        priceMonthly: 2999,
        priceYearly: 29999,
        contacts: "75,000",
        broadcasts: "250,000 /mo",
        teamMembers: "30 Seats",
        automations: "100 Flows",
        channels: {
          whatsapp: true,
          instagramFb: true,
          aiAgents: true,
          gmbSuite: "Full Suite (10 Profiles)",
          restApi: true
        },
        cardFeatures: [
          "Multi-Number WhatsApp & Multi-Agent AI",
          "Full GMB Suite (10 Locations + Geo-Grid)",
          "250,000 Broadcasts & 30 Team Seats",
          "100 Flows & Dedicated Account Manager"
        ],
        features: [
          "Full Omnichannel Hub (Multi-Number WhatsApp + Social)",
          "Advanced Multi-Agent AI Workflows & RAG Catalog",
          "Full GMB Suite (10 Locations, Geo-Grid Heatmap)",
          "30 Team Seats with Custom Permission Hierarchy",
          "100 Automation Flows & Highest Throughput TPS",
          "High TPS REST API, Webhooks & Custom Connectors",
          "Dedicated Account Manager & 1-on-1 Onboarding"
        ],
        ctaText: "Start 14-Day Free Trial",
        ctaUrl: "https://dash.aibotflow.in/signup?plan=enterprise",
        ctaClass: "btn-secondary"
      },
      {
        id: "unlimited",
        name: "Unlimited",
        badge: "ULTIMATE SCALE",
        isPopular: false,
        desc: "For enterprise powerhouses requiring unlimited conversations, highest throughput, and no limits.",
        priceMonthly: 4999,
        priceYearly: 49999,
        contacts: "Unlimited*",
        broadcasts: "1,000,000+ /mo",
        teamMembers: "100 Seats",
        automations: "Unlimited Flows",
        channels: {
          whatsapp: true,
          instagramFb: true,
          aiAgents: true,
          gmbSuite: "Full Suite (Unlimited Profiles)",
          restApi: true
        },
        cardFeatures: [
          "Unlimited WhatsApp Chats & High TPS Engine",
          "Unlimited Autonomous AI Agents & Vectors",
          "Full GMB Suite (Unlimited Locations + Geo Grid)",
          "100 Seats & VIP 1-Hour SLA Guarantee"
        ],
        features: [
          "Unlimited WhatsApp Conversations & High TPS Engine",
          "Unlimited Autonomous AI Agents & Vector Memories",
          "Full GMB Suite (Unlimited Locations + Geo Grid)",
          "100 Team Seats with Enterprise Role Controls",
          "Unlimited Visual Automation Flows & Drips",
          "High TPS Dedicated Webhooks & Developer API",
          "VIP Priority Support with 1-Hour SLA Guarantee"
        ],
        ctaText: "Start 14-Day Free Trial",
        ctaUrl: "https://dash.aibotflow.in/signup?plan=unlimited",
        ctaClass: "btn-primary"
      },
      {
        id: "custom",
        name: "Custom Enterprise",
        badge: "BESPOKE SOLUTION",
        isPopular: false,
        desc: "Tailored infrastructure, private cloud deployment, custom LLM fine-tuning, and bespoke integrations.",
        priceMonthly: "Custom",
        priceYearly: "Custom",
        contacts: "Custom Quota",
        broadcasts: "Custom Volume",
        teamMembers: "Unlimited Seats",
        automations: "Custom Workflows",
        channels: {
          whatsapp: true,
          instagramFb: true,
          aiAgents: true,
          gmbSuite: "Custom Multi-Brand",
          restApi: true
        },
        cardFeatures: [
          "Dedicated Private Cloud / On-Premise Cluster",
          "Custom LLM Fine-Tuning on Brand Data",
          "Custom ERP, SAP & Internal Connectors",
          "99.99% Uptime SLA & 24/7 Dedicated Line"
        ],
        features: [
          "Dedicated Private Cloud or On-Premise Cluster",
          "Custom LLM Fine-Tuning on Proprietary Enterprise Data",
          "Custom ERP, SAP, Oracle & Internal CRM Connectors",
          "99.99% Enterprise Uptime SLA Agreement",
          "Custom Security, SOC-2, HIPAA & ISO Compliance",
          "Unlimited Team Seats & Multi-Tenant Organization",
          "Dedicated Solutions Architect & 24/7 Dedicated Line"
        ],
        ctaText: "Talk to Sales",
        ctaUrl: "contact.html?plan=custom",
        ctaClass: "btn-secondary"
      }
    ],

    // 2. Messaging Usage Rates (Configured Platform Rates)
    messagingRates: [
      {
        id: "marketing",
        category: "Marketing",
        icon: "fa-bullhorn",
        theme: "purple",
        badge: "Broadcasts",
        rate: "₹0.88",
        unit: "per message",
        desc: "Promotional campaigns, offers, product launches, newsletters, and abandoned cart re-engagement.",
        bullets: [
          "Promotional & festive offers",
          "Abandoned cart re-engagement"
        ]
      },
      {
        id: "utility",
        category: "Utility / Orders",
        icon: "fa-receipt",
        theme: "cyan",
        badge: "Transactional",
        rate: "₹0.15",
        unit: "per message",
        desc: "Order confirmations, shipping updates, payment links, appointment reminders, and billing receipts.",
        bullets: [
          "Order & shipping alerts",
          "Payment links & invoice PDFs"
        ]
      },
      {
        id: "authentication",
        category: "Authentication / OTP",
        icon: "fa-shield-halved",
        theme: "amber",
        badge: "Security OTP",
        rate: "₹0.15",
        unit: "per message",
        desc: "One-time passwords (OTP), account verification, password resets, and multi-factor login security.",
        bullets: [
          "Sub-second OTP delivery",
          "Two-factor login & 2FA"
        ]
      },
      {
        id: "service",
        category: "Service Chat",
        icon: "fa-headset",
        theme: "emerald",
        badge: "🎁 1,000 Free / Mo",
        badgeHighlight: true,
        rate: "₹0.35",
        unit: "per message",
        desc: "Inbound customer support, user-initiated inquiries, and conversational resolutions.",
        bullets: [
          "Inbound queries & support",
          "AI + Human Agent handoff"
        ],
        specialNote: "First 1,000 Service Chat messages every month are FREE."
      }
    ],

    // State
    isAnnual: false
  };

  /**
   * Fetch live pricing from backend API if available, merging changes seamlessly.
   */
  async function fetchLivePlans() {
    try {
      const res = await fetch('/api/billing/plans', { cache: 'no-cache' });
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !Array.isArray(data.plans)) return;

      data.plans.forEach(remotePlan => {
        // Find matching local plan by slug or id
        const target = PRICING_CONFIG.plans.find(p => 
          p.id === remotePlan.slug || 
          p.id === remotePlan.id || 
          (remotePlan.slug === 'trial' && p.id === 'trial')
        );

        if (target) {
          if (typeof remotePlan.price_monthly === 'number') target.priceMonthly = remotePlan.price_monthly;
          if (typeof remotePlan.price_yearly === 'number') target.priceYearly = remotePlan.price_yearly;
          if (remotePlan.max_contacts) target.contacts = Number(remotePlan.max_contacts).toLocaleString('en-IN');
          if (remotePlan.max_broadcasts_monthly) target.broadcasts = Number(remotePlan.max_broadcasts_monthly).toLocaleString('en-IN') + ' /mo';
          if (remotePlan.max_team_members) target.teamMembers = remotePlan.max_team_members + ' Seats';
          if (remotePlan.max_automations) target.automations = remotePlan.max_automations + ' Flows';
          if (remotePlan.name) target.name = remotePlan.name;
        }
      });

      // Notify any listeners that pricing updated
      window.dispatchEvent(new CustomEvent('aibotflow:pricing-updated', { detail: PRICING_CONFIG }));
    } catch (err) {
      // Quietly fall back to static source of truth
      console.warn('[AiBotFlow Pricing] Using cached source of truth plans.');
    }
  }

  /**
   * Render Pricing Carousel System
   * Desktop: 3 cards visible with left/right arrow sliding
   * Mobile: 1 card visible with touch swipe and arrow navigation
   */
  function renderPricingCards(container, isAnnual) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;

    const oldViewport = document.getElementById('pricingCarouselViewport');
    const savedScrollLeft = oldViewport ? oldViewport.scrollLeft : 0;

    PRICING_CONFIG.isAnnual = !!isAnnual;

    let cardsHtml = '';

    PRICING_CONFIG.plans.forEach(plan => {
      const isCustom = plan.priceMonthly === 'Custom' || isNaN(plan.priceMonthly);
      
      let priceBoxHtml = '';
      if (isCustom) {
        priceBoxHtml = `
          <div class="abf-price-box">
            <div class="abf-price-main">
              <span class="abf-amount abf-amount-custom">Custom</span>
            </div>
            <div class="abf-price-sub">Tailored to your enterprise scale</div>
          </div>
        `;
      } else {
        const price = PRICING_CONFIG.isAnnual ? plan.priceYearly : plan.priceMonthly;
        const period = PRICING_CONFIG.isAnnual ? '/yr' : '/mo';
        const formattedPrice = Number(price).toLocaleString('en-IN');
        const annualSub = PRICING_CONFIG.isAnnual 
          ? (plan.priceMonthly === 0 ? '(Forever Free)' : `Billed ₹${Number(plan.priceYearly).toLocaleString('en-IN')} annually (~17% OFF)`)
          : (plan.priceMonthly === 0 ? '(Forever Free)' : `(₹${Number(plan.priceYearly).toLocaleString('en-IN')}/yr billed annually)`);

        priceBoxHtml = `
          <div class="abf-price-box">
            <div class="abf-price-main">
              <span class="abf-currency">₹</span>
              <span class="abf-amount" data-plan="${plan.id}">${formattedPrice}</span>
              <span class="abf-period">${period}</span>
            </div>
            <div class="abf-price-sub">${annualSub}</div>
          </div>
        `;
      }

      const popularClass = plan.isPopular ? ' featured-plan' : '';
      const customClass = isCustom ? ' custom-plan-card' : '';
      const unlimitedClass = plan.id === 'unlimited' ? ' unlimited-plan-card' : '';
      const displayFeatures = plan.cardFeatures || plan.features.slice(0, 4);

      cardsHtml += `
        <div class="abf-plan-card glass-card${popularClass}${customClass}${unlimitedClass}" id="plan-card-${plan.id}">
          ${plan.isPopular ? '<div class="abf-plan-badge-popular"><i class="fa-solid fa-star"></i> MOST POPULAR</div>' : ''}
          ${plan.id === 'unlimited' ? '<div class="abf-plan-badge-unlimited"><i class="fa-solid fa-bolt"></i> UNLIMITED POWER</div>' : ''}
          ${isCustom ? '<div class="abf-plan-badge-custom"><i class="fa-solid fa-crown"></i> ENTERPRISE</div>' : ''}
          
          <div class="abf-card-header">
            <div class="abf-card-top-row">
              <h3 class="abf-plan-title">${plan.name}</h3>
              <span class="abf-plan-category-badge">${plan.badge}</span>
            </div>
            <p class="abf-plan-desc">${plan.desc}</p>
          </div>

          ${priceBoxHtml}

          <div class="abf-quota-grid">
            <div class="abf-quota-item" title="Audience Contact Capacity">
              <span class="abf-quota-lbl"><i class="fa-solid fa-users"></i> Contacts:</span>
              <span class="abf-quota-val">${plan.contacts}</span>
            </div>
            <div class="abf-quota-item" title="Monthly Broadcast Limit">
              <span class="abf-quota-lbl"><i class="fa-solid fa-bullhorn"></i> Broadcasts:</span>
              <span class="abf-quota-val">${plan.broadcasts}</span>
            </div>
            <div class="abf-quota-item" title="Team Agent Seats">
              <span class="abf-quota-lbl"><i class="fa-solid fa-user-group"></i> Team Seats:</span>
              <span class="abf-quota-val">${plan.teamMembers}</span>
            </div>
            <div class="abf-quota-item" title="Active Workflow Automations">
              <span class="abf-quota-lbl"><i class="fa-solid fa-bolt"></i> Automations:</span>
              <span class="abf-quota-val">${plan.automations}</span>
            </div>
          </div>

          <!-- Channel Access Badges -->
          <div class="abf-channel-badges-wrap">
            <span class="abf-ch-pill ${plan.channels.whatsapp ? 'active' : 'disabled'}" title="Official WhatsApp Cloud API">
              <i class="fa-brands fa-whatsapp"></i> WA
            </span>
            <span class="abf-ch-pill ${plan.channels.instagramFb ? 'active' : 'disabled'}" title="Instagram Direct & FB Messenger">
              <i class="fa-brands fa-instagram"></i> IG &amp; FB
            </span>
            <span class="abf-ch-pill ${plan.channels.aiAgents ? 'active' : 'disabled'}" title="Autonomous AI Agents">
              <i class="fa-solid fa-brain"></i> AI Agent
            </span>
            <span class="abf-ch-pill ${plan.channels.gmbSuite !== false ? 'active' : 'disabled'}" title="Google Business Profile Suite">
              <i class="fa-brands fa-google"></i> ${typeof plan.channels.gmbSuite === 'string' && plan.channels.gmbSuite.includes('Full') ? 'Full GMB' : (plan.channels.gmbSuite === 'Custom Multi-Brand' ? 'Custom GMB' : 'GMB QR')}
            </span>
            <span class="abf-ch-pill ${plan.channels.restApi ? 'active' : 'disabled'}" title="Developer REST API & Webhooks">
              <i class="fa-solid fa-code"></i> API
            </span>
          </div>

          <div class="abf-card-features">
            <div class="abf-features-title">Core Highlights:</div>
            <ul class="abf-feature-list">
              ${displayFeatures.map(f => `
                <li>
                  <i class="fa-solid fa-check abf-check-icon"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="abf-card-action">
            <a href="${plan.ctaUrl}" class="btn ${plan.ctaClass} abf-plan-btn" ${plan.ctaUrl.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
              <span>${plan.ctaText}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
            <div class="abf-card-trial-hint">${isCustom ? 'Dedicated Account Manager · Custom SLA' : 'No credit card required · Instant setup'}</div>
          </div>
        </div>
      `;
    });

    const carouselHtml = `
      <div class="pricing-carousel-container">
        <div class="pricing-carousel-wrapper">
          <button type="button" class="pricing-carousel-arrow pricing-arrow-prev desktop-arrow" id="pricingPrevBtn" aria-label="Previous plans">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          
          <div class="pricing-carousel-viewport" id="pricingCarouselViewport">
            <div class="pricing-carousel-track" id="pricingCarouselTrack">
              ${cardsHtml}
            </div>
          </div>

          <button type="button" class="pricing-carousel-arrow pricing-arrow-next desktop-arrow" id="pricingNextBtn" aria-label="Next plans">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div class="pricing-carousel-nav">
          <div class="pricing-mobile-arrow-dock">
            <button type="button" class="pricing-mob-nav-btn pricing-mob-prev" id="pricingPrevBtnMob" aria-label="Previous plan">
              <i class="fa-solid fa-chevron-left"></i>
              <span>Prev</span>
            </button>
            <div class="pricing-carousel-dots" id="pricingCarouselDots"></div>
            <button type="button" class="pricing-mob-nav-btn pricing-mob-next" id="pricingNextBtnMob" aria-label="Next plan">
              <span>Next</span>
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div class="pricing-carousel-hint">
            <i class="fa-solid fa-arrows-left-right"></i>
            <span>Swipe or tap arrows to explore all 6 plans</span>
          </div>
        </div>
      </div>
    `;

    el.innerHTML = carouselHtml;

    initCarouselControls(savedScrollLeft);
  }

  function initCarouselControls(savedScrollLeft) {
    const viewport = document.getElementById('pricingCarouselViewport');
    const prevBtn = document.getElementById('pricingPrevBtn');
    const nextBtn = document.getElementById('pricingNextBtn');
    const prevBtnMob = document.getElementById('pricingPrevBtnMob');
    const nextBtnMob = document.getElementById('pricingNextBtnMob');
    const dotsContainer = document.getElementById('pricingCarouselDots');
    if (!viewport) return;

    const cards = viewport.querySelectorAll('.abf-plan-card');
    const totalCards = cards.length;
    if (totalCards === 0) return;

    if (typeof savedScrollLeft === 'number' && savedScrollLeft > 0) {
      viewport.scrollLeft = savedScrollLeft;
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((card, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `pricing-dot ${idx === 0 ? 'active' : ''}`;
        const title = card.querySelector('.abf-plan-title')?.textContent || `Plan ${idx + 1}`;
        dot.setAttribute('aria-label', `Navigate to ${title}`);
        dot.addEventListener('click', () => {
          scrollToCard(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function getScrollStep() {
      const firstCard = cards[0];
      if (!firstCard) return 360;
      const track = viewport.querySelector('.pricing-carousel-track');
      let gap = 22;
      if (track) {
        const computed = window.getComputedStyle(track);
        gap = parseFloat(computed.gap) || 22;
      }
      return firstCard.offsetWidth + gap;
    }

    function scrollToCard(idx) {
      const step = getScrollStep();
      viewport.scrollTo({
        left: idx * step,
        behavior: 'smooth'
      });
    }

    function updateCarouselState() {
      const step = getScrollStep();
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const currentScroll = viewport.scrollLeft;

      const isStart = currentScroll <= 6;
      const isEnd = currentScroll >= maxScroll - 6;

      if (prevBtn) prevBtn.disabled = isStart;
      if (nextBtn) nextBtn.disabled = isEnd;
      if (prevBtnMob) prevBtnMob.disabled = isStart;
      if (nextBtnMob) nextBtnMob.disabled = isEnd;

      const activeIdx = Math.min(totalCards - 1, Math.max(0, Math.round(currentScroll / step)));
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.pricing-dot');
        dots.forEach((dot, i) => {
          if (i === activeIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }

    const handlePrev = (e) => {
      e.preventDefault();
      const step = getScrollStep();
      viewport.scrollBy({ left: -step, behavior: 'smooth' });
    };

    const handleNext = (e) => {
      e.preventDefault();
      const step = getScrollStep();
      viewport.scrollBy({ left: step, behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.onclick = handlePrev;
    if (nextBtn) nextBtn.onclick = handleNext;
    if (prevBtnMob) prevBtnMob.onclick = handlePrev;
    if (nextBtnMob) nextBtnMob.onclick = handleNext;

    let isTicking = false;
    viewport.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateCarouselState();
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      updateCarouselState();
    }, { passive: true });

    setTimeout(updateCarouselState, 60);
  }

  /**
   * Render Premium 4-Card Messaging Usage Rates Section
   * @param {string|HTMLElement} container
   */
  function renderMessagingRates(container) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;

    let html = `
      <div class="abf-messaging-section-inner">
        <div class="abf-messaging-header">
          <div class="section-tag">
            <span class="pill-badge pill-cyan"><i class="fa-brands fa-whatsapp"></i> Official Meta Cloud API Rates</span>
          </div>
          <h2 class="section-title">Current Messaging Rates</h2>
          <p class="section-subtitle">
            Transparent per-message rates billed with <strong>Zero Platform Markup</strong>. Billed strictly as per Meta conversation type.
          </p>
        </div>

        <div class="abf-messaging-grid-4">
    `;

    PRICING_CONFIG.messagingRates.forEach(item => {
      const isService = item.badgeHighlight;
      const theme = item.theme || 'cyan';
      const cleanRate = item.rate.replace('₹', '');

      html += `
        <div class="abf-msg-card abf-msg-${theme} ${isService ? 'highlight-msg-card' : ''}">
          <div class="abf-msg-card-top">
            <div class="abf-msg-icon abf-icon-${theme}">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <span class="abf-cat-badge abf-badge-${theme}">${item.badge}</span>
          </div>

          <h3 class="abf-msg-title">${item.category}</h3>

          <div class="abf-msg-rate-box">
            <span class="abf-msg-currency">₹</span>
            <span class="abf-msg-rate">${cleanRate}</span>
            <span class="abf-msg-unit">/ message</span>
          </div>

          <p class="abf-msg-desc">${item.desc}</p>

          <div class="abf-msg-bullets">
            ${item.bullets ? item.bullets.map(b => `
              <div class="abf-bullet-row">
                <i class="fa-solid fa-check abf-check-${theme}"></i>
                <span>${b}</span>
              </div>
            `).join('') : ''}
          </div>

          <div class="abf-msg-card-bottom">
            ${isService ? `
              <div class="abf-service-pill">
                <i class="fa-solid fa-gift text-emerald"></i>
                <span><strong>1,000 Free Chats</strong> / Month</span>
              </div>
            ` : `
              <div class="abf-meta-pill">
                <i class="fa-solid fa-bolt text-${theme}"></i>
                <span>0% Markup · Direct Meta Rate</span>
              </div>
            `}
          </div>
        </div>
      `;
    });

    html += `
        </div>
        <div class="abf-messaging-footer-strip">
          <div class="abf-mf-item">
            <i class="fa-solid fa-shield-check text-emerald"></i>
            <span><strong>Zero Platform Markup:</strong> Exact Meta wholesale rates passed through.</span>
          </div>
          <div class="abf-mf-item">
            <i class="fa-solid fa-wallet text-cyan"></i>
            <span><strong>Prepaid Balance Ledger:</strong> Instant transparent per-message tracking.</span>
          </div>
          <div class="abf-mf-item">
            <i class="fa-solid fa-file-invoice text-purple"></i>
            <span><strong>GST Invoices:</strong> Official tax compliant receipts for all wallet top-ups.</span>
          </div>
        </div>
      </div>
    `;

    el.innerHTML = html;
  }

  /**
   * Render Clean 4-Column Feature Comparison Table
   * @param {string|HTMLElement} container
   */
  function renderFeatureMatrix(container) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;

    const matrixHtml = `
      <div class="table-scroll-hint">
        <i class="fa-solid fa-arrows-left-right"></i>
        <span>Swipe horizontally to compare all plans</span>
      </div>
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th style="width: 22%;">Plan Capabilities</th>
              <th style="width: 13%; text-align: center;">
                <div class="matrix-th-name">Free Trial</div>
                <div class="matrix-th-price">₹0 /mo</div>
              </th>
              <th style="width: 13%; text-align: center;">
                <div class="matrix-th-name">Starter</div>
                <div class="matrix-th-price">₹799 /mo</div>
              </th>
              <th class="highlight-col" style="width: 13%; text-align: center;">
                <div class="matrix-th-name" style="color:#60a5fa;">Growth ★</div>
                <div class="matrix-th-price" style="color:#93c5fd;">₹1,499 /mo</div>
              </th>
              <th style="width: 13%; text-align: center;">
                <div class="matrix-th-name">Enterprise</div>
                <div class="matrix-th-price">₹2,999 /mo</div>
              </th>
              <th style="width: 13%; text-align: center;">
                <div class="matrix-th-name" style="color:#38bdf8;">Unlimited</div>
                <div class="matrix-th-price" style="color:#7dd3fc;">₹4,999 /mo</div>
              </th>
              <th style="width: 13%; text-align: center;">
                <div class="matrix-th-name" style="color:#c084fc;">Custom</div>
                <div class="matrix-th-price" style="color:#d8b4fe;">Tailored</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Category: Quotas -->
            <tr class="matrix-category-row">
              <td colspan="7"><i class="fa-solid fa-database"></i> Quotas &amp; Core Limits</td>
            </tr>
            <tr>
              <td><strong>Audience Contact Limit</strong><br><small class="text-secondary">Saved customer leads with tags &amp; attributes</small></td>
              <td class="text-center"><span class="matrix-val">100</span></td>
              <td class="text-center"><span class="matrix-val">2,500</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">10,000</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">75,000</span></td>
              <td class="text-center"><span class="matrix-val" style="color:#38bdf8; font-weight:700;">Unlimited*</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Custom Quota</span></td>
            </tr>
            <tr>
              <td><strong>Monthly Broadcast Messages</strong><br><small class="text-secondary">Official WhatsApp bulk campaigns</small></td>
              <td class="text-center"><span class="matrix-val">100 /mo</span></td>
              <td class="text-center"><span class="matrix-val">15,000 /mo</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">60,000 /mo</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">250,000 /mo</span></td>
              <td class="text-center"><span class="matrix-val" style="color:#38bdf8; font-weight:700;">1,000,000+ /mo</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Custom Volume</span></td>
            </tr>
            <tr>
              <td><strong>Team Member Seats</strong><br><small class="text-secondary">Simultaneous agents in shared inbox</small></td>
              <td class="text-center"><span class="matrix-val">2 Seats</span></td>
              <td class="text-center"><span class="matrix-val">3 Seats</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">10 Seats</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">30 Seats</span></td>
              <td class="text-center"><span class="matrix-val" style="color:#38bdf8; font-weight:700;">100 Seats</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Unlimited Seats</span></td>
            </tr>
            <tr>
              <td><strong>Active Automation Flows</strong><br><small class="text-secondary">Visual drag-and-drop chatbots &amp; triggers</small></td>
              <td class="text-center"><span class="matrix-val">3 Flows</span></td>
              <td class="text-center"><span class="matrix-val">10 Flows</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">30 Flows</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">100 Flows</span></td>
              <td class="text-center"><span class="matrix-val" style="color:#38bdf8; font-weight:700;">Unlimited Flows</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Custom Workflows</span></td>
            </tr>

            <!-- Category: Channels -->
            <tr class="matrix-category-row">
              <td colspan="7"><i class="fa-solid fa-share-nodes"></i> Connected Channels</td>
            </tr>
            <tr>
              <td><strong>Official WhatsApp Cloud API</strong><br><small class="text-secondary">High deliverability, verified sender</small></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>
            <tr>
              <td><strong>Instagram Direct &amp; FB Messenger</strong><br><small class="text-secondary">Story mentions, reels DMs, comment auto-reply</small></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>
            <tr>
              <td><strong>Autonomous AI Agents</strong><br><small class="text-secondary">Vector-trained on your documents &amp; catalog</small></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>
            <tr>
              <td><strong>Google Business Profile (GMB)</strong><br><small class="text-secondary">Review automation, rank tracking, magic QR</small></td>
              <td class="text-center"><span class="matrix-val">Magic QR</span></td>
              <td class="text-center"><span class="matrix-val">Magic QR</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">Full Suite (3 Profiles)</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Full Suite (10 Profiles)</span></td>
              <td class="text-center"><span class="matrix-val" style="color:#38bdf8; font-weight:700;">Full Suite (Unlimited)</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Custom Multi-Brand</span></td>
            </tr>
            <tr>
              <td><strong>Developer REST API &amp; Webhooks</strong><br><small class="text-secondary">Connect Shopify, WooCommerce, CRM, Zapier</small></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>

            <!-- Category: Support -->
            <tr class="matrix-category-row">
              <td colspan="7"><i class="fa-solid fa-headset"></i> Support &amp; SLA</td>
            </tr>
            <tr>
              <td><strong>Support Level</strong></td>
              <td class="text-center"><span class="matrix-val">Community &amp; Docs</span></td>
              <td class="text-center"><span class="matrix-val">WhatsApp &amp; Email</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd;">Priority 24/7 WhatsApp</span></td>
              <td class="text-center"><span class="matrix-val">Dedicated Manager &amp; Phone</span></td>
              <td class="text-center"><span class="matrix-val" style="color:#38bdf8; font-weight:700;">VIP 1-Hour SLA &amp; Phone</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Dedicated Architect &amp; 24/7 SLA</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    el.innerHTML = matrixHtml;
  }

  // Expose to window
  window.AIBOTFLOW_PRICING = {
    config: PRICING_CONFIG,
    fetchLivePlans: fetchLivePlans,
    renderPricingCards: renderPricingCards,
    renderMessagingRates: renderMessagingRates,
    renderFeatureMatrix: renderFeatureMatrix
  };

  // Auto-run on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    fetchLivePlans();
  });

})(window);
