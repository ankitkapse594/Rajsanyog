---
name: Free-tier chatbot integrations
description: How to build multilingual support chat widgets without paid third-party APIs on Replit's free tier.
---

On the free tier, third-party connectors (real LLM APIs, Google Calendar/Gmail, SMTP, Maps embed API) are not available. For a multilingual (or any) customer-support chat widget, use these substitutes instead of blocking on API keys:

- FAQ/answers: pre-written keyword-matched Q&A content per language, not a real LLM call.
- Voice input/output: browser-native Web Speech API (`SpeechRecognition` / `speechSynthesis`) — no key needed, works per-language via `lang` codes like `hi-IN`, `mr-IN`.
- WhatsApp: `https://wa.me/<number>` click-to-chat link.
- Email: `mailto:` link.
- Phone: `tel:` link.
- Maps: `https://www.google.com/maps/search/?api=1&query=<text>` (plain search link) instead of the embeddable Maps iframe API, which requires a key.

**Why:** Avoids blocking the whole build on third-party credentials the user may not have/want on the free tier, while still shipping a fully functional experience.

**How to apply:** Default to this approach for support/contact widgets unless the user explicitly asks for and provides credentials for a real AI/CRM/calendar integration.
