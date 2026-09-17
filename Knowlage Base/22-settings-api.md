# Developer API Keys & Webhooks
**Route:** `/settings?tab=api`

Integrate AI Botflow CRM into your proprietary backend, mobile apps, or custom CRM.

### REST API Capabilities:
- Base URL: `https://dash.aibotflow.in/api/v1`
- **Authentication**: Include header `Authorization: Bearer <YOUR_API_KEY>`.
- **Endpoints**:
  - `POST /api/v1/messages`: Send text, media, or template messages.
  - `GET /api/v1/contacts`: Search and retrieve contact profiles.
  - `POST /api/v1/broadcasts`: Trigger programmatic bulk campaigns.
  - `GET /api/v1/conversations`: Fetch message histories.
