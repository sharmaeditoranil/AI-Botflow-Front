# Visual Chatbot Flows (Drag & Drop Builder)
**Route:** `/flows`

Build automated 24/7 conversational funnels without code.

### Node Types Available:
1. **Trigger Node**: Initiates the flow when:
   - Customer sends a specific keyword (e.g., `START`, `MENU`, `PRICE`).
   - Customer messages for the first time (Welcome Bot).
   - Inbound webhook or campaign reply occurs.
2. **Send Message Node**:
   - Send text messages with dynamic placeholders (`{{contact.name}}`).
   - Add **Interactive Buttons** (up to 3 clickable buttons).
   - Add **List Menus** (up to 10 categorized menu items).
3. **Send Media Node**: Send Images, PDFs, or Video brochures automatically.
4. **Condition / Branching Node**: Route customers based on:
   - Contact tags (e.g., if tag contains `VIP`, route to Priority Support).
   - Button selected by user.
   - Specific keywords in customer reply.
5. **Update Contact Node**: Automatically assign tags, update custom fields, or create a sales deal.
6. **Assign Agent / Human Handoff**: Transfer the conversation to a human agent and pause chatbot replies.
7. **Delay Node**: Wait for X minutes/hours before sending the next follow-up message.
