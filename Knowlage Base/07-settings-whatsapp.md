# WhatsApp Official Cloud API Configuration
**Route:** `/settings?tab=whatsapp`

To send and receive WhatsApp messages, you connect your Meta Developer WhatsApp Cloud API account.

### Step-by-Step Setup:
1. **Create a Meta Developer App**:
   - Go to [developers.facebook.com](https://developers.facebook.com) and create a **Business App**.
   - Add the **WhatsApp** product to your app.
2. **Retrieve API Credentials**:
   - Navigate to **WhatsApp > API Setup** in your Meta App Dashboard.
   - **Phone Number ID**: Copy your 15-digit Phone Number ID.
   - **WhatsApp Business Account (WABA) ID**: Copy your 15-digit WABA ID.
   - **Permanent Access Token**: Generate a System User Access Token in Meta Business Manager with permissions:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`
3. **Save in AI Botflow CRM**:
   - Paste the **Phone Number ID**, **WABA ID**, and **Access Token** into the fields.
   - Click **"Save WhatsApp Credentials"**.
4. **Configure Meta Webhook**:
   - Copy the **Webhook Callback URL** provided in your CRM settings:
     `https://dash.aibotflow.in/api/whatsapp/webhook`
   - Copy the **Webhook Verify Token** displayed on the screen.
   - In your Meta Developer App, go to **WhatsApp > Configuration > Edit Webhook**.
   - Paste the Callback URL and Verify Token, then click **"Verify and Save"**.
   - Under Webhook fields, click **"Manage"** and subscribe to **`messages`**.
5. **Verify Live Connection**:
   - Click **"Test Connection"** in your CRM. A green `✓ Connected` status badge will appear.
