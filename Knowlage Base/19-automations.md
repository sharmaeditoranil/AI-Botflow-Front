# Webhook Bots & E-Commerce / Lead Integrations
**Route:** `/automations`

Automatically trigger personalized WhatsApp messages from external software (Shopify, WooCommerce, Webflow, Razorpay, Google Sheets, or Zapier).

### Setup Example: Shopify / WooCommerce Abandoned Cart or New Order
1. Click **"+ Create Webhook Trigger"**.
2. Name your trigger (e.g., `Shopify New Order Alert`).
3. Copy your unique **Webhook Ingestion URL**:
   `https://dash.aibotflow.in/api/webhooks/incoming/[trigger_id]`
4. Paste this URL into your external application (e.g., Shopify Webhooks > Order Creation).
5. **Send a Test Payload**: Fire a test event from Shopify.
6. **Data Mapping**:
   - In AI Botflow, view the captured JSON payload.
   - Select the target phone number field (e.g., `payload.customer.phone`).
   - Select the WhatsApp Template to dispatch (e.g., `order_confirmation`).
   - Map template variables:
     - `{{1}}` -> `payload.customer.first_name`
     - `{{2}}` -> `payload.order.order_number`
     - `{{3}}` -> `payload.order.total_price`
7. Click **"Activate Webhook Bot"**. Every new order now receives an automated instant WhatsApp message.
