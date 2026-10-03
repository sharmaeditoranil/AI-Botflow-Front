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
      }
    ],

    // 2. Messaging Usage Rates (Configured Platform Rates)
    messagingRates: [
      {
        category: "Marketing",
        icon: "fa-bullhorn",
        rate: "₹0.88",
        unit: "per message",
        desc: "Promotional campaigns, offers, product launches, newsletters, and abandoned cart re-engagement.",
        badge: null
      },
      {
        category: "Utility / Orders",
        icon: "fa-receipt",
        rate: "₹0.15",
        unit: "per message",
        desc: "Order confirmations, shipping updates, payment links, appointment reminders, and billing receipts.",
        badge: null
      },
      {
        category: "Authentication / OTP",
        icon: "fa-shield-halved",
        rate: "₹0.15",
        unit: "per message",
        desc: "One-time passwords (OTP), account verification, password resets, and multi-factor login security.",
        badge: null
      },
      {
        category: "Service Chat",
        icon: "fa-headset",
        rate: "₹0.35",
        unit: "per message",
        desc: "Inbound customer support, user-initiated inquiries, and conversational resolutions.",
        badge: "First 1,000 Messages / Month FREE",
        badgeHighlight: true,
        specialNote: "First 1,000 Service Chat messages every month are FREE. After 1,000 messages: ₹0.35/message. After the monthly free allowance, standard Service Chat rates apply."
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
   * Render Clean 4-Card Pricing Grid
   * @param {string|HTMLElement} container
   * @param {boolean} isAnnual
   */
  function renderPricingCards(container, isAnnual) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;

    PRICING_CONFIG.isAnnual = !!isAnnual;

    let html = '<div class="abf-pricing-grid-4">';

    PRICING_CONFIG.plans.forEach(plan => {
      const price = PRICING_CONFIG.isAnnual ? plan.priceYearly : plan.priceMonthly;
      const period = PRICING_CONFIG.isAnnual ? '/yr' : '/mo';
      const formattedPrice = Number(price).toLocaleString('en-IN');
      const annualSub = PRICING_CONFIG.isAnnual 
        ? (plan.priceMonthly === 0 ? '(Forever Free)' : `Billed ₹${Number(plan.priceYearly).toLocaleString('en-IN')} annually (~17% OFF)`)
        : (plan.priceMonthly === 0 ? '(Forever Free)' : `(₹${Number(plan.priceYearly).toLocaleString('en-IN')}/yr billed annually)`);

      const popularClass = plan.isPopular ? ' featured-plan' : '';

      html += `
        <div class="abf-plan-card glass-card${popularClass}" id="plan-card-${plan.id}">
          ${plan.isPopular ? '<div class="abf-plan-badge-popular"><i class="fa-solid fa-star"></i> MOST POPULAR</div>' : ''}
          
          <div class="abf-card-header">
            <div class="abf-card-top-row">
              <h3 class="abf-plan-title">${plan.name}</h3>
              <span class="abf-plan-category-badge">${plan.badge}</span>
            </div>
            <p class="abf-plan-desc">${plan.desc}</p>
          </div>

          <div class="abf-price-box">
            <div class="abf-price-main">
              <span class="abf-currency">₹</span>
              <span class="abf-amount" data-plan="${plan.id}">${formattedPrice}</span>
              <span class="abf-period">${period}</span>
            </div>
            <div class="abf-price-sub">${annualSub}</div>
          </div>

          <div class="abf-quota-grid">
            <div class="abf-quota-item" title="Audience Contact Capacity">
              <span class="abf-quota-lbl"><i class="fa-solid fa-users"></i> Contacts</span>
              <span class="abf-quota-val">${plan.contacts}</span>
            </div>
            <div class="abf-quota-item" title="Monthly Broadcast Limit">
              <span class="abf-quota-lbl"><i class="fa-solid fa-bullhorn"></i> Broadcasts</span>
              <span class="abf-quota-val">${plan.broadcasts}</span>
            </div>
            <div class="abf-quota-item" title="Team Agent Seats">
              <span class="abf-quota-lbl"><i class="fa-solid fa-user-group"></i> Team Seats</span>
              <span class="abf-quota-val">${plan.teamMembers}</span>
            </div>
            <div class="abf-quota-item" title="Active Workflow Automations">
              <span class="abf-quota-lbl"><i class="fa-solid fa-bolt"></i> Automations</span>
              <span class="abf-quota-val">${plan.automations}</span>
            </div>
          </div>

          <!-- Channel Access Badges -->
          <div class="abf-channel-badges-wrap">
            <span class="abf-ch-pill ${plan.channels.whatsapp ? 'active' : 'disabled'}" title="Official WhatsApp Cloud API">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </span>
            <span class="abf-ch-pill ${plan.channels.instagramFb ? 'active' : 'disabled'}" title="Instagram Direct & FB Messenger">
              <i class="fa-brands fa-instagram"></i> IG &amp; FB
            </span>
            <span class="abf-ch-pill ${plan.channels.aiAgents ? 'active' : 'disabled'}" title="Autonomous AI Agents">
              <i class="fa-solid fa-brain"></i> AI Agents
            </span>
            <span class="abf-ch-pill ${plan.channels.gmbSuite !== false ? 'active' : 'disabled'}" title="Google Business Profile Suite">
              <i class="fa-brands fa-google"></i> ${typeof plan.channels.gmbSuite === 'string' && plan.channels.gmbSuite.includes('Full') ? 'Full GMB' : 'GMB QR'}
            </span>
            <span class="abf-ch-pill ${plan.channels.restApi ? 'active' : 'disabled'}" title="Developer REST API & Webhooks">
              <i class="fa-solid fa-code"></i> REST API
            </span>
          </div>

          <div class="abf-card-features">
            <div class="abf-features-title">What's Included:</div>
            <ul class="abf-feature-list">
              ${plan.features.map(f => `
                <li>
                  <i class="fa-solid fa-check abf-check-icon"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="abf-card-action">
            <a href="${plan.ctaUrl}" class="btn ${plan.ctaClass} abf-plan-btn" target="_blank" rel="noopener">
              <span>${plan.ctaText}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
            <div class="abf-card-trial-hint">No credit card required · Instant setup</div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    el.innerHTML = html;
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
            <span class="pill-badge pill-cyan"><i class="fa-solid fa-comments"></i> Consumption Pricing</span>
          </div>
          <h2 class="section-title">Current Messaging Rates</h2>
          <p class="section-subtitle">
            Transparent per-message rates billed with <strong>Zero Platform Markup</strong>. Billed strictly as per conversation type.
          </p>
        </div>

        <div class="abf-messaging-grid-4">
    `;

    PRICING_CONFIG.messagingRates.forEach(item => {
      const isService = item.badgeHighlight;
      html += `
        <div class="abf-msg-card glass-card ${isService ? 'highlight-msg-card' : ''}">
          ${item.badge ? `<div class="abf-msg-free-badge"><i class="fa-solid fa-gift"></i> ${item.badge}</div>` : ''}
          <div class="abf-msg-icon-row">
            <div class="abf-msg-icon"><i class="fa-solid ${item.icon}"></i></div>
            <h3 class="abf-msg-title">${item.category}</h3>
          </div>
          <div class="abf-msg-rate-box">
            <div class="abf-msg-rate">${item.rate}</div>
            <div class="abf-msg-unit">${item.unit}</div>
          </div>
          <p class="abf-msg-desc">${item.desc}</p>
          ${item.specialNote ? `
            <div class="abf-msg-note-box">
              <i class="fa-solid fa-circle-check text-emerald"></i>
              <span class="abf-msg-note-text">
                <strong>First 1,000 Service Chat messages every month are FREE.</strong><br>
                <small class="text-secondary">After the monthly free allowance, standard Service Chat rates apply (₹0.35/message).</small>
              </span>
            </div>
          ` : ''}
        </div>
      `;
    });

    html += `
        </div>
        <div class="abf-messaging-footer-strip">
          <div class="abf-mf-item">
            <i class="fa-solid fa-shield-check text-emerald"></i>
            <span><strong>Zero Platform Markup:</strong> Direct API pass-through rates.</span>
          </div>
          <div class="abf-mf-item">
            <i class="fa-solid fa-wallet text-cyan"></i>
            <span>Prepaid wallet model with instant transparent balance ledger.</span>
          </div>
          <div class="abf-mf-item">
            <i class="fa-solid fa-file-invoice text-purple"></i>
            <span>GST invoices generated automatically for all wallet recharges.</span>
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
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th style="width: 28%;">Plan Capabilities</th>
              <th style="width: 18%; text-align: center;">
                <div class="matrix-th-name">Free Trial</div>
                <div class="matrix-th-price">₹0 /mo</div>
              </th>
              <th style="width: 18%; text-align: center;">
                <div class="matrix-th-name">Starter</div>
                <div class="matrix-th-price">₹799 /mo</div>
              </th>
              <th class="highlight-col" style="width: 18%; text-align: center;">
                <div class="matrix-th-name" style="color:#60a5fa;">Growth ★</div>
                <div class="matrix-th-price" style="color:#93c5fd;">₹1,499 /mo</div>
              </th>
              <th style="width: 18%; text-align: center;">
                <div class="matrix-th-name">Enterprise</div>
                <div class="matrix-th-price">₹2,999 /mo</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Category: Quotas -->
            <tr class="matrix-category-row">
              <td colspan="5"><i class="fa-solid fa-database"></i> Quotas &amp; Core Limits</td>
            </tr>
            <tr>
              <td><strong>Audience Contact Limit</strong><br><small class="text-secondary">Saved customer leads with tags &amp; attributes</small></td>
              <td class="text-center"><span class="matrix-val">100</span></td>
              <td class="text-center"><span class="matrix-val">2,500</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">10,000</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">75,000</span></td>
            </tr>
            <tr>
              <td><strong>Monthly Broadcast Messages</strong><br><small class="text-secondary">Official WhatsApp bulk campaigns</small></td>
              <td class="text-center"><span class="matrix-val">100 /mo</span></td>
              <td class="text-center"><span class="matrix-val">15,000 /mo</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">60,000 /mo</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">250,000 /mo</span></td>
            </tr>
            <tr>
              <td><strong>Team Member Seats</strong><br><small class="text-secondary">Simultaneous agents in shared inbox</small></td>
              <td class="text-center"><span class="matrix-val">2 Seats</span></td>
              <td class="text-center"><span class="matrix-val">3 Seats</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">10 Seats</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">30 Seats</span></td>
            </tr>
            <tr>
              <td><strong>Active Automation Flows</strong><br><small class="text-secondary">Visual drag-and-drop chatbots &amp; triggers</small></td>
              <td class="text-center"><span class="matrix-val">3 Flows</span></td>
              <td class="text-center"><span class="matrix-val">10 Flows</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">30 Flows</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">100 Flows</span></td>
            </tr>

            <!-- Category: Channels -->
            <tr class="matrix-category-row">
              <td colspan="5"><i class="fa-solid fa-share-nodes"></i> Connected Channels</td>
            </tr>
            <tr>
              <td><strong>Official WhatsApp Cloud API</strong><br><small class="text-secondary">High deliverability, verified sender</small></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>
            <tr>
              <td><strong>Instagram Direct &amp; FB Messenger</strong><br><small class="text-secondary">Story mentions, reels DMs, comment auto-reply</small></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>
            <tr>
              <td><strong>Autonomous AI Agents</strong><br><small class="text-secondary">Vector-trained on your documents &amp; catalog</small></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>
            <tr>
              <td><strong>Google Business Profile (GMB)</strong><br><small class="text-secondary">Review automation, rank tracking, magic QR</small></td>
              <td class="text-center"><span class="matrix-val">Magic QR</span></td>
              <td class="text-center"><span class="matrix-val">Magic QR</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd; font-weight:700;">Full Suite (3 Profiles)</span></td>
              <td class="text-center"><span class="matrix-val" style="font-weight:700;">Full Suite (10 Profiles)</span></td>
            </tr>
            <tr>
              <td><strong>Developer REST API &amp; Webhooks</strong><br><small class="text-secondary">Connect Shopify, WooCommerce, CRM, Zapier</small></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center"><i class="fa-solid fa-minus matrix-cross"></i></td>
              <td class="text-center highlight-col"><i class="fa-solid fa-check matrix-check"></i></td>
              <td class="text-center"><i class="fa-solid fa-check matrix-check"></i></td>
            </tr>

            <!-- Category: Support -->
            <tr class="matrix-category-row">
              <td colspan="5"><i class="fa-solid fa-headset"></i> Support &amp; SLA</td>
            </tr>
            <tr>
              <td><strong>Support Level</strong></td>
              <td class="text-center"><span class="matrix-val">Community &amp; Docs</span></td>
              <td class="text-center"><span class="matrix-val">WhatsApp &amp; Email</span></td>
              <td class="text-center highlight-col"><span class="matrix-val" style="color:#93c5fd;">Priority 24/7 WhatsApp</span></td>
              <td class="text-center"><span class="matrix-val">Dedicated Manager &amp; Phone</span></td>
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
