---
name: Admin dashboard auth pattern
description: Lightweight password protection pattern for internal admin dashboards in fullstack JS apps using MemStorage.
---

When a project needs a simple internal admin dashboard (e.g. viewing leads/messages) but has no real user/auth system, protect it with:

- `express-session` (check if already installed/available before adding) backed by the existing `SESSION_SECRET` if present, else a dev fallback string.
- A single `ADMIN_PASSWORD` secret requested from the user via `requestEnvVar` (never hardcoded, never invented by the agent) — this is a real credential even though it's app-level, not a third-party API key.
- A `req.session.isAdmin` boolean flag set on successful `POST /api/admin/login`; a `requireAdmin` middleware gates all admin-only routes (list/export/status-update endpoints).
- Frontend: a `/admin/login` page and a `/admin` page that checks a `GET /api/admin/session` query and redirects to login if not authenticated.

**Why:** Keeps scope minimal (no user table, no roles) while still avoiding an unprotected internal dashboard — appropriate default when the user says "do it at your best judgment" without specifying an auth mechanism.

**How to apply:** Reuse this pattern for any future "protect this internal page" request in small MemStorage-based apps instead of building a full auth system.
