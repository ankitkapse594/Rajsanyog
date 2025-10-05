# Design Guidelines for राजsanyog Startup Website

## Design Approach
**Reference-Based with Indian Startup Identity**
Drawing inspiration from professional Indian startup websites like Zoho, Freshworks, and government-certified service providers. The design balances modern professionalism with cultural authenticity through Hindi-English bilingual branding.

## Core Design Principles
1. **Credibility First**: Emphasize government registration and professional legitimacy
2. **Cultural Fusion**: Seamlessly blend Hindi and English typography
3. **Service Clarity**: Clear, straightforward service presentation
4. **Professional Warmth**: Approachable yet authoritative tone

## Color Palette

**Primary Colors (Light Mode):**
- Primary Blue: 210 95% 45% (trust, technology, professionalism)
- Deep Blue: 215 90% 25% (headers, emphasis)
- White: 0 0% 100% (backgrounds, breathing room)
- Light Gray: 210 15% 96% (section backgrounds)

**Accent Colors:**
- Gold Accent: 45 100% 50% (sparingly for certification badges, highlighting Udyam registration)
- Success Green: 145 65% 45% (CTAs, form success states)

**Text Colors:**
- Primary Text: 215 25% 15%
- Secondary Text: 215 15% 45%
- Muted Text: 215 10% 60%

## Typography

**Font Families:**
- English: 'Poppins' (weights: 400, 500, 600, 700)
- Hindi: 'Noto Sans Devanagari' (weights: 400, 500, 600, 700)

**Type Scale:**
- Hero Heading: 3.5rem (56px) / 2.5rem mobile - Bold (700)
- Section Headings: 2.5rem (40px) / 2rem mobile - Semibold (600)
- Subsection Headings: 1.75rem (28px) - Semibold (600)
- Body Large: 1.125rem (18px) - Regular (400)
- Body: 1rem (16px) - Regular (400)
- Small: 0.875rem (14px) - Regular (400)

**Logo Treatment:** राजsanyog in Noto Sans Devanagari at 2rem, weight 700, letterSpacing: -0.5px

## Layout System

**Spacing Primitives:** Use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Consistent section padding: py-20 (desktop) / py-12 (mobile)
- Component spacing: gap-8 (desktop) / gap-6 (mobile)
- Card padding: p-8 (desktop) / p-6 (mobile)

**Container Widths:**
- Max container: max-w-7xl (1280px)
- Content sections: max-w-6xl
- Text content: max-w-4xl
- Form containers: max-w-2xl

**Grid System:**
- Services: 3 columns (lg) → 2 columns (md) → 1 column (mobile)
- Founders: 2 columns (lg) → 1 column (mobile)
- Footer: 4 columns (lg) → 2 columns (md) → 1 column (mobile)

## Component Library

### Navigation
- Sticky header with subtle shadow on scroll
- Logo left, navigation center-right
- Mobile: Hamburger menu with smooth slide-in
- Active state: Bottom border (3px, primary blue)
- Link hover: Color transition to deep blue

### Hero Section
- Height: 90vh minimum
- Background: Subtle gradient (white to light gray)
- Large hero image: Modern office workspace or digital innovation illustration (right side, 50% width on desktop)
- Content left-aligned with CTA buttons
- Primary CTA: Solid blue button
- Secondary CTA: Outline button with backdrop-blur

### Service Cards
- White background with subtle shadow
- Border radius: 12px
- Icon at top (64px, primary blue)
- Hover: Lift effect (translateY -4px) + shadow increase
- Padding: p-8

### Certification Badge
- Prominent display of Udyam logo/seal
- Gold border (2px)
- Details in structured format (badge-style)
- Download button for certificate PDF

### Founder Profiles
- Circular profile images (200px diameter)
- Name, designation, contact below
- LinkedIn/social icons
- Card style with subtle border

### Contact Form
- Clean, spacious layout
- Input fields: Border (2px, light gray), focus state (primary blue)
- Required field indicators (asterisk, red)
- Large textarea for message (min-height: 150px)
- Submit button: Full width on mobile, auto on desktop

### Footer
- Three-column layout: About/Services/Contact
- Social media icons (24px, gray → blue on hover)
- Copyright centered at bottom
- Background: Deep blue with white text

## Animations

**Use Sparingly:**
- Fade-in on scroll for sections (0.6s ease)
- Smooth scroll behavior for navigation
- Button hover: Scale(1.02) + shadow transition (0.2s)
- Card hover: TranslateY + shadow (0.3s)
- NO complex animations, parallax, or scroll-driven effects

## Images

### Hero Section
- Large hero image: Professional workspace, laptop with code/designs, or abstract digital network illustration
- Placement: Right 50% on desktop, full-width background on mobile
- Style: Modern, bright, professional photography or flat illustration
- Overlay: None needed due to content separation

### Services Section
- Icon-based (no photos needed)
- Optional: Small supporting illustrations for each service

### Founders Section
- Professional headshots (circular crops)
- Consistent lighting and background treatment

### Certification Section
- Udyam certificate preview (as image)
- Government logo/seal

## Responsive Breakpoints
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

## Accessibility
- WCAG 2.1 AA compliance
- Minimum contrast ratio: 4.5:1 for text
- Focus indicators: 2px outline, primary blue
- Alt text for all images
- Semantic HTML5 structure
- Keyboard navigation support

## Key Differentiators
- Bilingual elegance in logo and headings
- Certification prominence (trust builder)
- Dual-founder visibility (personal connection)
- Clean, government-approved aesthetic (no flashy trends)
- Service-focused, not product-focused layout