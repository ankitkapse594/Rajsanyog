# राजsanyog — Official Website

> **Be Better. Achieve Greater.**

A modern, responsive website for **राजsanyog** — a government-registered digital innovation startup (UDYAM-MH-20-0234334) based in Nagpur, Maharashtra, India.

---

## About

राजsanyog is a micro-enterprise in the services sector, officially registered under the Government of India's Udyam initiative. The company specializes in information service activities, web portals, and online platforms that transform businesses.

---

## Features

- Bilingual branding (Hindi + English)
- Animated hero section with cyberpunk-inspired black & cyan design
- Services showcase (6 core services)
- Founder profiles with LinkedIn links
- Udyam certification display
- Contact form
- Smooth scroll animations and scroll-reveal effects
- Fully responsive (mobile, tablet, desktop)
- Dark mode by default

---

## Services

| Service | Description |
|---|---|
| Web Portal Development | Custom scalable web portals and enterprise platforms |
| Digital Consulting | Strategic digital transformation guidance |
| Startup Tech Solutions | End-to-end tech support for new ventures |
| Creative Content & Media Management | Content creation and media strategy |
| Political Campaign & Social Media Support | Data-driven digital campaign management |
| Research & Small Institution Support | Digital support for NGOs, research bodies, and educational orgs |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Routing | Wouter |
| Forms | React Hook Form + Zod |
| Animations | CSS Keyframes + Intersection Observer API |
| Icons | Lucide React |
| Fonts | Poppins, Noto Sans Devanagari |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5000`

### Production Build

```bash
npm run build
```

Output is generated in `dist/public/`

---

## Deployment (Netlify)

This project is pre-configured for Netlify deployment.

1. Push the repository to GitHub
2. Connect the repo on [netlify.com](https://netlify.com)
3. Netlify auto-detects `netlify.toml` — no manual settings required
4. Click **Deploy**

**Build settings (auto-configured via `netlify.toml`):**

```
Build command:   npx vite build
Publish dir:     dist/public
```

SPA redirects are handled via both `netlify.toml` and `client/public/_redirects`.

---

## Project Structure

```
├── client/
│   ├── public/
│   │   └── _redirects          # Netlify SPA redirect
│   └── src/
│       ├── components/
│       │   ├── Navigation.tsx
│       │   ├── Hero.tsx
│       │   ├── About.tsx
│       │   ├── Services.tsx
│       │   ├── Founders.tsx
│       │   ├── Certification.tsx
│       │   ├── ContactForm.tsx
│       │   └── Footer.tsx
│       ├── hooks/
│       │   └── use-scroll-reveal.ts
│       ├── pages/
│       │   └── Home.tsx
│       ├── App.tsx
│       └── index.css
├── server/
│   ├── index.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/
│   └── schema.ts
├── netlify.toml
└── README.md
```

---

## Founders

| Name | Role | LinkedIn |
|---|---|---|
| Ganesh Chondekar | Co-Founder | [Profile](https://www.linkedin.com/in/ganesh-chondekar-46a09859/) |
| Ankit Kapse | Co-Founder | [Profile](https://www.linkedin.com/in/ankit-kapse-444a382a0) |

---

## Contact

- **Email:** rajsanyog40@gmail.com
- **Phone:** 7499039470 / 9423245297
- **Address:** Flat No. A3/38, Forest Coop Bag Society, Katol Road, Nagpur, Maharashtra - 440013

---

## Certification

**Udyam Registration Number:** UDYAM-MH-20-0234334  
**Type:** Micro Enterprise — Services Sector  
**Activity:** Information Service Activities  
**Incorporated:** 12 February 2024

---

## License

© 2025 राजsanyog. All rights reserved.
