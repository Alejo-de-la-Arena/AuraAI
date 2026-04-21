# AURA AI — Landing Page

Landing page institucional de **AURA AI**, plataforma enterprise de integración de IA.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS** con tokens de diseño customizados
- **GSAP + ScrollTrigger** para animaciones scroll-driven
- **Framer Motion** para hover states e interacciones discretas
- **Canvas 2D** para el particle field del hero
- **Geist Variable** como fuente principal

## Setup

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fuentes, metadata
│   ├── page.tsx          # Página principal (ensambla todas las secciones)
│   └── globals.css       # Tokens, tipografía, utilidades globales
├── components/
│   ├── ui/
│   │   ├── button.tsx    # Botón (primary / secondary)
│   │   └── eyebrow.tsx   # Eyebrow pill
│   ├── layout/
│   │   ├── nav.tsx       # Nav fija con drawer mobile
│   │   └── footer.tsx    # Footer con 4 columnas de links
│   └── sections/
│       ├── hero.tsx               # Hero con canvas + typewriter
│       ├── hero-canvas.tsx        # Particle field (Canvas 2D)
│       ├── typewriter-demo.tsx    # Demo de typewriter con respuesta AURA
│       ├── problem.tsx            # 4 pain points
│       ├── how-it-works.tsx       # 3 steps con conectores
│       ├── features.tsx           # 6 feature cards con 3D tilt
│       ├── metrics.tsx            # 4 métricas con CountUp
│       ├── testimonials.tsx       # 3 quotes + logos
│       ├── pricing.tsx            # 3 tiers con toggle monthly/annual
│       └── cta-final.tsx          # CTA con glow pulsante
├── hooks/
│   └── use-reduced-motion.ts      # Respeta prefers-reduced-motion
└── lib/
    └── utils.ts                   # cn() helper
```

## Secciones

1. **Hero** — Canvas particle field reactivo al mouse, copy en dos columnas, typewriter demo
2. **Problem** — 4 pain points con data points, grid responsive
3. **How It Works** — 3 pasos con conectores dashed
4. **Features** — 6 cards con hover tilt 3D (GSAP quickTo)
5. **Metrics** — 4 números con CountUp animado al scroll
6. **Testimonials** — 3 quotes con border-left cyan + logos section
7. **Pricing** — 3 tiers con toggle monthly/annual (Framer Motion layoutId)
8. **CTA Final** — Headline grande + glow orb pulsante
9. **Footer** — 4 columnas + socials + copyright

## Accesibilidad

- `prefers-reduced-motion` respetado en todas las animaciones GSAP, canvas y CSS
- Focus-visible en todos los botones e interacciones
- `aria-label` en iconos sin texto
- Semántica HTML correcta (section, nav, footer, h1-h3, blockquote, ul)
