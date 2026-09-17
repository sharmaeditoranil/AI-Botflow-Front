# Meta WhatsApp Templates & Variable Mapping
**Route:** `/settings?tab=templates`

WhatsApp requires pre-approved templates for initiating conversations or sending broadcasts outside the 24-hour customer service window.

### Syncing Existing Templates from Meta
- Click the **"Sync with Meta"** button.
- The CRM automatically pulls all approved templates, languages, categories (Marketing, Utility, Authentication), and button configurations from your WABA account.
- Synced templates display an approval status badge (`APPROVED`, `REJECTED`, or `PENDING`).

### Creating a New Template Inside CRM
1. Click **"+ Create New Template"**.
2. Choose **Category**: Marketing, Utility, or Authentication.
3. Enter **Template Name** (lowercase letters and underscores only, e.g., `festive_discount_offer`).
4. Select **Language** (e.g., `English (US)` or `Hindi`).
5. **Header Type (Optional)**:
   - **Text Header**: Static text or dynamic customer name.
   - **Media Header**: Image, Document (PDF), or Video.
6. **Body Text with Dynamic Variable Insertion**:
   - Use the **Quick Variable Toolbar** above the editor:
     - `+ Customer Name ({{1}})`
     - `+ First Name ({{1}})`
     - `+ Today's Date ({{2}})`
     - `+ Phone Number ({{3}})`
     - `+ Custom Variable ({{N}})`
   - The toolbar ensures strictly contiguous variables (`{{1}}`, `{{2}}`, `{{3}}`) compliant with Meta requirements.
7. **Buttons**: Add Quick Reply buttons (e.g., "Interested", "Stop") or Call-to-Action buttons (Website link or Phone number).
8. Click **"Submit to Meta for Approval"**. Approvals typically take between 2 minutes to 24 hours.

### Custom Variable Data Mapping & Fallbacks
When a template contains variables (`{{1}}`, `{{2}}`), it must be mapped to CRM contact data for broadcasting:
1. Find any template with the amber **`⚠ Needs Mapping`** badge and click **"Map Variables"**.
2. For each variable:
   - Select **Source Field**: Full Name, First Name, Phone, Email, Company, Today's Date, or a Custom Field.
   - Enter **Fallback Value**: The default text if the customer's profile is missing that field (e.g., "Valued Customer").
3. View the **Live WhatsApp Bubble Preview** on the right to verify how the message looks in real time.
4. Click **"Save Variable Mapping"**. The template turns into a green **`✓ Data Mapped`** badge and is ready for broadcast.
