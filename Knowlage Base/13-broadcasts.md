# Broadcast Campaigns (Direct Media & Personalization)
**Route:** `/broadcasts`, `/broadcasts/new`

Send bulk WhatsApp campaigns to thousands of opt-in customers with high delivery rates and detailed analytics.

### 4-Step Broadcast Wizard:

#### Step 1: Select Approved Template
- Search templates by name or content.
- Filter by category: **Marketing**, **Utility**, or **Authentication**.
- Media badges indicate whether the template requires an Image, Video, or Document.
- View variable status: Templates already mapped show `Ready`, while unmapped templates show `Needs Mapping`.

#### Step 2: Choose Audience
- **Targeting Options**:
  - **All Contacts**: Send to your entire CRM database.
  - **Filter by Tags**: Select one or multiple tags (e.g., `Diwali Lead` + `VIP`).
  - **Filter by Custom Fields**: Target specific cities, plans, or categories.
  - **Upload Fresh CSV**: Upload a new recipient CSV specifically for this broadcast.
- The system displays the live estimated audience count.

#### Step 3: Direct Media Upload & Personalization
- **Direct Drag & Drop File Uploads (No external hosting needed!)**:
  - **Image Templates**: Upload JPEG or PNG directly (up to 5MB) with instant thumbnail preview.
  - **Document Templates**: Upload PDF or Word files (up to 16MB).
  - **Video Templates**: Upload MP4 videos (up to 16MB).
- **Variable Personalization**:
  - The pre-configured mapping for variables (`{{1}}`, `{{2}}`) is automatically loaded.
  - You can adjust CRM field mapping and fallback values for this specific campaign.
  - Check the **"Save as template default mapping"** box to reuse these settings for future broadcasts.
  - Inspect the **Live WhatsApp Chat Bubble** to verify the finalized message preview.

#### Step 4: Schedule & Launch
- **Delivery Options**:
  - **Send Immediately**: Begins dispatching immediately.
  - **Schedule for Later**: Select a future date and time for automatic dispatch.
- **Delivery Pacing (Smart Throttling)**: Automatically spreads messages across safe intervals to protect your Meta phone number quality rating.

For post-send results, see Broadcast Analytics (`/broadcasts/[id]`).
