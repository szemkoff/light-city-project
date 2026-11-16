# Light City Homepage Redesign Plan
## Fluid, Interactive, Visual-Rich with Dark Theme

**Version**: 1.0  
**Date**: November 14, 2025  
**Goal**: Create a stunning, interactive homepage that rivals or exceeds the test site  
**Theme**: Dark mode default with light mode toggle

---

## 🎨 DESIGN VISION

### Overall Aesthetic
- **Dark, elegant, mysterious** - Like looking at a crystal city at night
- **Fluid animations** - Smooth transitions, parallax effects, fade-ins
- **Visual storytelling** - Images guide the user through the vision
- **Interactive elements** - Hover effects, animated stats, expandable sections
- **Sacred geometry** - Subtle patterns throughout

### Color Palette (Dark Theme)
```css
/* Background Layers */
--background-primary: #0a0a0a;      /* Deep black */
--background-secondary: #1a1a2e;    /* Dark blue-black */
--background-tertiary: #16213e;     /* Dark blue-gray */

/* Purple Gradient (Primary) */
--purple-light: #667eea;
--purple-dark: #764ba2;
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accents */
--gold: #FFD700;                    /* Sacred gold */
--sky-blue: #A0D8FF;                /* Trust, clarity */
--emerald: #90EE90;                 /* Growth, nature */
--coral: #F093FB;                   /* Warmth, community */

/* Text */
--text-primary: #e0e0e0;            /* Light gray */
--text-secondary: #b0b0b0;          /* Medium gray */
--text-muted: #808080;              /* Dark gray */

/* Overlays */
--overlay-dark: rgba(10, 10, 10, 0.8);
--overlay-purple: rgba(102, 126, 234, 0.1);
--glass-effect: rgba(255, 255, 255, 0.05);
```

---

## 📐 HOMEPAGE STRUCTURE (Section by Section)

### **SECTION 1: HERO** (Full Screen, Parallax)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [Background: Animated gradient + Flower of Life]      │
│                                                         │
│              ✨ Light City ✨                           │
│     Anchoring Higher-Consciousness Civilization        │
│                                                         │
│  A living blueprint for regenerative communities,      │
│  sacred architecture, and unity consciousness          │
│                                                         │
│     [Explore Vision]  [Documentation]  [Get Involved]  │
│                                                         │
│                      ↓ Scroll                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Background**: 
   - Animated gradient (purple → dark blue → purple, 20s loop)
   - Subtle Flower of Life pattern (5% opacity, slowly rotating)
   - Particle effect (floating light orbs)

2. **Typography**:
   - H1: 64px, gradient text (gold → purple), glow effect
   - Subtitle: 24px, light gray, fade-in animation
   - Buttons: Glass morphism effect, hover lift

3. **Animations**:
   - Text: Fade in + slide up (staggered, 0.3s delay each)
   - Buttons: Fade in + scale (0.5s delay)
   - Background: Continuous slow animation
   - Scroll indicator: Bounce animation

#### Interactive Elements
- **Hover on buttons**: Glow effect, slight scale (1.05x), shadow increase
- **Parallax scroll**: Background moves slower than foreground
- **Mouse move**: Subtle parallax effect on text (3D depth)

---

### **SECTION 2: VISION SNAPSHOT** (3 Cards, Image Backgrounds)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   IMAGE 1   │  │   IMAGE 2   │  │   IMAGE 3   │   │
│  │ [Geodesic]  │  │  [Merkaba]  │  │[Agroforest] │   │
│  │             │  │             │  │             │   │
│  │  Sacred     │  │   Unity     │  │Regenerative │   │
│  │Architecture │  │Consciousness│  │   Living    │   │
│  │             │  │             │  │             │   │
│  │ [Learn →]   │  │ [Learn →]   │  │ [Learn →]   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Card Images** (Background, with dark overlay):
   - **Card 1**: Geodesic dome (from `/img/technology/geodesic-dome.jpg`)
   - **Card 2**: Merkaba diagram (from `/img/diagrams/merkaba.svg`)
   - **Card 3**: Agroforestry/gardens (create or use placeholder)

2. **Card Style**:
   - Glass morphism (backdrop-blur, semi-transparent)
   - Gradient border (purple, 2px)
   - Hover: Lift effect, image zoom (1.1x), overlay fade

3. **Typography**:
   - Icon: Animated SVG (rotate on hover)
   - Title: 28px, bold, white
   - Description: 16px, light gray
   - Link: Gold, underline on hover

#### Animations
- **On scroll into view**: Cards slide up + fade in (staggered, 0.2s delay each)
- **Hover**: 
  - Card lifts (translateY -10px)
  - Image zooms (scale 1.1x)
  - Overlay lightens
  - Border glows (gold)

#### Images Needed
- ✅ geodesic-dome.jpg (exists)
- ✅ merkaba.svg (exists)
- 🆕 agroforestry.jpg (need to add or create)

---

### **SECTION 3: DELPHIN SHOWCASE** (Split Screen, Image + Content)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌────────────────────┐  ┌───────────────────────────┐ │
│  │                    │  │                           │ │
│  │   DELPHIN IMAGE    │  │  Inspired by Delphin      │ │
│  │   (Aerial View)    │  │  An Archetypal Crystal    │ │
│  │                    │  │  City                     │ │
│  │   [Parallax]       │  │                           │ │
│  │                    │  │  Delphin demonstrates...  │ │
│  │                    │  │                           │ │
│  │                    │  │  [Comparison Table]       │ │
│  │                    │  │  Delphin vs Earth         │ │
│  │                    │  │                           │ │
│  │                    │  │  [Learn More →]           │ │
│  └────────────────────┘  └───────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Left Side (50%)**:
   - Image: `/img/inspiration/delphin-aerial-view-2.png`
   - Parallax effect (moves slower on scroll)
   - Subtle glow effect around edges
   - Zoom on hover (1.05x)

2. **Right Side (50%)**:
   - Dark background with gradient overlay
   - Comparison table (styled with glass morphism)
   - Typography: White headings, light gray body
   - Gold accent for "Earth" column

3. **Comparison Table**:
   ```
   ┌──────────────┬─────────────┬─────────────┐
   │ Aspect       │ Delphin     │ Light City  │
   ├──────────────┼─────────────┼─────────────┤
   │ Spire        │ 40,000 ft   │ 60-300m     │
   │ Domes        │ 600-1,200ft │ 30-90m      │
   │ Residents    │ 10,000/dome │ 80-400/dome │
   │ Technology   │ Advanced    │ Proven      │
   └──────────────┴─────────────┴─────────────┘
   ```
   - Glass morphism style
   - Hover on rows: Highlight (purple glow)
   - Animated numbers (count up on scroll into view)

#### Animations
- **On scroll**: Image slides in from left, content from right
- **Parallax**: Image moves at 0.5x scroll speed
- **Hover on image**: Zoom (1.05x), glow effect
- **Table numbers**: Count up animation when visible

#### Images Needed
- ✅ delphin-aerial-view-2.png (exists)

---

### **SECTION 4: KEY HIGHLIGHTS** (Alternating Image/Text Rows)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Row 1: [Image Left] [Text Right]                      │
│  ┌──────────┐  Proven Technology                       │
│  │  CLT     │  Using commercially available...         │
│  │  Image   │  • CLT (TRL 8-9)                         │
│  └──────────┘  • Geodesic domes (TRL 7-8)              │
│                                                         │
│  Row 2: [Text Left] [Image Right]                      │
│  Phased Development    ┌──────────┐                    │
│  Start small...        │ Roadmap  │                    │
│  • Phase 1: 200        │  Image   │                    │
│  • Phase 2: 1,500      └──────────┘                    │
│                                                         │
│  Row 3: [Image Left] [Text Right]                      │
│  ┌──────────┐  Transparent Governance                  │
│  │Community │  Founder-led → Community...              │
│  │  Image   │  • Clear decision-making                 │
│  └──────────┘  • Consent-based (80%)                   │
│                                                         │
│  Row 4: [Text Left] [Image Right]                      │
│  Investor-Ready        ┌──────────┐                    │
│  Complete financial... │Financial │                    │
│  • 3 scenarios         │Dashboard │                    │
│  • 8-12% IRR           └──────────┘                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Images** (40% width, rounded corners, shadow):
   - **Row 1**: CLT construction (`/img/technology/clt-construction.jpg`)
   - **Row 2**: Development roadmap (`/img/diagrams/development-roadmap.svg`)
   - **Row 3**: Community circle (need to add or create)
   - **Row 4**: Financial dashboard (create visualization)

2. **Text** (60% width):
   - Headline: 36px, bold, white
   - Body: 18px, light gray
   - Bullet points: Gold bullets, 16px
   - Stats: Large numbers (48px), gold color

3. **Alternating Pattern**:
   - Odd rows: Image left, text right
   - Even rows: Text left, image right
   - Creates visual rhythm

#### Animations
- **On scroll into view**: 
  - Image: Slide in from side + fade (0.5s)
  - Text: Slide in from opposite side + fade (0.5s, 0.2s delay)
- **Hover on image**: Zoom (1.05x), shadow increase
- **Stats**: Count up animation when visible

#### Images Needed
- ✅ clt-construction.jpg (exists)
- ✅ development-roadmap.svg (exists)
- 🆕 community-circle.jpg (need to add)
- 🆕 financial-dashboard.png (need to create)

---

### **SECTION 5: STATS** (Full Width, Dark Background)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│         [Dark purple gradient background]              │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │   15+    │  │   85%    │  │    6     │  │ $22M-  ││
│  │ Visual   │  │ Stage 1  │  │  Stages  │  │ $95M   ││
│  │ Diagrams │  │ Complete │  │          │  │ Budget ││
│  └──────────┘  └──────────┘  └──────────┘  └────────┘│
│                                                         │
│         [Animated particles/stars background]          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Background**:
   - Dark purple gradient
   - Animated particle field (floating stars/orbs)
   - Subtle geometric pattern overlay

2. **Stat Cards**:
   - Glass morphism (semi-transparent)
   - Large number: 64px, bold, gold
   - Label: 18px, white
   - Icon above number (animated)

3. **Icons** (Animated SVG):
   - Diagrams: Document icon (pulse animation)
   - Progress: Circular progress bar (animated fill)
   - Stages: Staircase icon (step animation)
   - Budget: Dollar sign (glow animation)

#### Animations
- **On scroll into view**: 
  - Cards fade in + slide up (staggered, 0.15s delay)
  - Numbers count up from 0 (1s duration)
  - Icons animate (rotate, pulse, fill)
- **Continuous**: 
  - Particles float upward (slow, infinite)
  - Background gradient shifts (subtle, 30s loop)
- **Hover**: Card lifts, glow effect

#### Images/Graphics Needed
- 🆕 Animated SVG icons (create inline)
- 🆕 Particle effect (CSS/JS animation)

---

### **SECTION 6: VISUAL GALLERY** (Masonry Grid, Lightbox)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                  Visualizations                         │
│                                                         │
│  ┌────┐ ┌──────┐ ┌────┐                               │
│  │ 1  │ │  2   │ │ 3  │                               │
│  │    │ │      │ │    │                               │
│  └────┘ └──────┘ └────┘                               │
│  ┌──────┐ ┌────┐ ┌──────┐                             │
│  │  4   │ │ 5  │ │  6   │                             │
│  │      │ │    │ │      │                             │
│  └──────┘ └────┘ └──────┘                             │
│                                                         │
│           [View All Diagrams →]                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Masonry Grid** (Pinterest-style):
   - Images: Different heights (natural aspect ratios)
   - Responsive: 3 columns (desktop), 2 (tablet), 1 (mobile)
   - Gap: 20px between images

2. **Image Cards**:
   - Rounded corners (12px)
   - Hover: Zoom (1.05x), overlay with title
   - Click: Open lightbox (full-screen view)

3. **Featured Images** (6-8 showcase):
   - Light City Vision 1 & 2
   - Delphin Aerial Views
   - City Layout diagram
   - Energy Flow diagram
   - Communosphere Cross-Section
   - Central Spire diagram
   - Sacred Geometry (Flower of Life, Merkaba)

4. **Lightbox** (Click to expand):
   - Full-screen overlay (dark background)
   - Image centered, max 90% viewport
   - Caption below (title + description)
   - Navigation arrows (prev/next)
   - Close button (X, top-right)
   - Keyboard support (ESC, arrows)

#### Animations
- **On scroll**: Images fade in + scale (staggered, masonry order)
- **Hover**: 
  - Image zooms (1.05x)
  - Overlay slides up with title
  - Border glows (purple)
- **Click**: 
  - Lightbox fades in (0.3s)
  - Image scales from thumbnail position (0.5s)
- **Lightbox navigation**: Slide transition (0.3s)

#### Images Needed
- ✅ All exist in `/img/inspiration/` and `/img/diagrams/`
- Just need to curate best 6-8 for showcase

---

### **SECTION 7: TIMELINE** (Interactive, Horizontal Scroll)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                 Development Timeline                    │
│                                                         │
│  2025      2026       2027       2028-30      2031+    │
│    │         │         │           │           │       │
│    ●─────────●─────────●───────────●───────────●       │
│    │         │         │           │           │       │
│   S1        S2        S3-4        S5          S6       │
│  Found.   Design   Digital/   Physical    Operations  │
│           20 rend.  Commun.  $22M-$95M   Break-even   │
│                                                         │
│  [Scroll horizontally or click stages for details]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Timeline Line**:
   - Horizontal line (4px, gradient purple → gold)
   - Dots at each stage (24px circles)
   - Current stage (S1): Pulsing glow, 85% fill
   - Future stages: Outlined, fade in on scroll

2. **Stage Cards** (Appear on hover/click):
   - Glass morphism popup above timeline
   - Stage details: Duration, budget, deliverables
   - Progress bar for current stage
   - Icon for each stage

3. **Interactive**:
   - Horizontal scroll (mouse wheel or drag)
   - Click stage: Expand card with details
   - Hover: Highlight stage, show tooltip
   - Mobile: Swipe to navigate

#### Animations
- **On scroll into view**: Timeline draws from left to right (2s)
- **Dots**: Appear sequentially (0.3s delay each)
- **Current stage (S1)**: Pulsing glow (infinite)
- **Hover**: Dot scales (1.3x), card slides up
- **Click**: Card expands with details (0.3s)

#### Images/Graphics Needed
- 🆕 Stage icons (create inline SVG)
- 🆕 Progress indicator for S1 (85% circular)

---

### **SECTION 8: CALL-TO-ACTION** (3 Paths, Image Backgrounds)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                  Get Involved                           │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   [IMAGE]   │  │   [IMAGE]   │  │   [IMAGE]   │   │
│  │             │  │             │  │             │   │
│  │  Investors  │  │  Residents  │  │  Builders   │   │
│  │             │  │             │  │             │   │
│  │ Review      │  │ Explore     │  │ See Tech    │   │
│  │ Financial   │  │ Living      │  │ Specs       │   │
│  │ Model       │  │ Experience  │  │             │   │
│  │             │  │             │  │             │   │
│  │ 8-12% IRR   │  │ $500-$1.7K  │  │ TRL 7-9     │   │
│  │             │  │ /month      │  │             │   │
│  │             │  │             │  │             │   │
│  │ [Learn →]   │  │ [Apply →]   │  │ [Build →]   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Card Backgrounds** (Full card, with dark overlay):
   - **Investors**: Financial charts/dashboard
   - **Residents**: Communosphere interior (cozy, biophilic)
   - **Builders**: Construction site (CLT, geodesic)

2. **Card Style**:
   - Tall cards (400px height)
   - Glass morphism overlay
   - Gradient border (purple → gold)
   - Hover: Lift, image zoom, overlay fade

3. **Typography**:
   - Title: 32px, bold, white
   - Subtitle: 18px, light gray
   - Stat: 24px, gold, bold
   - Button: Glass morphism, gold text

#### Animations
- **On scroll**: Cards slide up + fade (staggered, 0.2s delay)
- **Hover**: 
  - Card lifts (translateY -15px)
  - Image zooms (1.15x)
  - Overlay fades (lighter)
  - Border glows (gold)
  - Button scales (1.05x)
- **Click**: Smooth scroll to target section or navigate to page

#### Images Needed
- 🆕 financial-dashboard.jpg (create or find)
- 🆕 communosphere-interior.jpg (create or find)
- ✅ clt-construction.jpg (exists, can reuse)

---

### **SECTION 9: EMAIL SIGNUP** (Minimal, Elegant)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Stay Updated on Light City                 │
│                                                         │
│     Join our community and receive progress updates    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [Email input]               [Subscribe Button] │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│         We respect your privacy. Unsubscribe anytime.  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Background**:
   - Dark gradient (purple → black)
   - Subtle particle animation

2. **Form**:
   - Glass morphism input (transparent, border glow)
   - Placeholder: "Enter your email"
   - Button: Gold gradient, white text
   - Focus state: Purple glow

3. **Typography**:
   - Headline: 36px, white
   - Subtitle: 18px, light gray
   - Privacy note: 14px, muted gray

#### Animations
- **On scroll**: Form fades in + slides up
- **Focus**: Input glows (purple border)
- **Hover button**: Glow effect, slight scale
- **Submit**: Button loading animation, success message

#### Integration
- Connect to Mailchimp, ConvertKit, or custom API
- Success message: "Thanks! Check your email."
- Error handling: "Please enter a valid email"

---

### **SECTION 10: FOOTER** (Comprehensive, Dark)

#### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ About    │  │ Explore  │  │ Get      │  │ Resour.││
│  │          │  │          │  │ Involved │  │        ││
│  │ Vision   │  │ Archit.  │  │ Investors│  │ Docs   ││
│  │ Mission  │  │ Energy   │  │ Residents│  │ FAQ    ││
│  │ Team     │  │ Stages   │  │ Builders │  │ Blog   ││
│  └──────────┘  └──────────┘  └──────────┘  └────────┘│
│                                                         │
│  ─────────────────────────────────────────────────────│
│                                                         │
│  © 2025 Light City Project  |  Built with Docusaurus  │
│  Privacy | Terms | Code of Conduct                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements
1. **Background**: Very dark (#0a0a0a), subtle gradient
2. **Logo**: Light City logo (white/gold version)
3. **Links**: Light gray, gold on hover
4. **Social Icons**: GitHub, Twitter/X (future), LinkedIn (future)
5. **Divider**: Thin line (1px, dark gray)

#### Animations
- **Hover on links**: Color change (gray → gold), underline slide
- **Social icons**: Rotate slightly on hover

---

## 🎬 ANIMATIONS & INTERACTIONS LIBRARY

### Scroll Animations (Intersection Observer)
```javascript
// Fade in + slide up
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

// Fade in + slide from left
.fade-in-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}

// Fade in + slide from right
.fade-in-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-right.visible {
  opacity: 1;
  transform: translateX(0);
}

// Scale in
.scale-in {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.scale-in.visible {
  opacity: 1;
  transform: scale(1);
}
```

### Hover Effects
```css
/* Card lift */
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

/* Image zoom */
.image-zoom img {
  transition: transform 0.5s ease;
}
.image-zoom:hover img {
  transform: scale(1.1);
}

/* Glow effect */
.glow-on-hover {
  transition: box-shadow 0.3s ease;
}
.glow-on-hover:hover {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Parallax Effects
```javascript
// Simple parallax on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.speed || 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
```

### Count-Up Animation
```javascript
// Animate numbers counting up
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}
```

### Particle Background
```javascript
// Simple particle system
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.init();
  }
  
  init() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    this.animate();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      
      // Draw particle
      this.ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
```css
/* Mobile First */
:root {
  --mobile: 0px;
  --tablet: 768px;
  --desktop: 1024px;
  --large: 1440px;
}

/* Mobile (default) */
.hero h1 { font-size: 36px; }
.section { padding: 60px 20px; }
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
  .hero h1 { font-size: 48px; }
  .section { padding: 80px 40px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero h1 { font-size: 64px; }
  .section { padding: 120px 60px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .section { padding: 120px auto; max-width: 1440px; }
}
```

### Mobile Optimizations
- **Touch targets**: Minimum 44x44px for buttons/links
- **Font sizes**: 14-16px body, 24-32px headings
- **Images**: Lazy loading, responsive srcset
- **Animations**: Reduced motion for performance
- **Navigation**: Hamburger menu, full-screen overlay
- **Sections**: Stack vertically, full-width

---

## 🖼️ IMAGE REQUIREMENTS

### Images We Have ✅
1. `/img/inspiration/light-city-vision-1.jpg`
2. `/img/inspiration/light-city-vision-2.jpg`
3. `/img/inspiration/delphin-aerial-view-1.png`
4. `/img/inspiration/delphin-aerial-view-2.png`
5. `/img/technology/geodesic-dome.jpg`
6. `/img/technology/clt-construction.jpg`
7. `/img/diagrams/merkaba.svg`
8. `/img/diagrams/development-roadmap.svg`
9. `/img/diagrams/city-layout.svg`
10. `/img/diagrams/energy-flow-detailed.svg`
11. `/img/diagrams/communosphere-cross-section.svg`
12. `/img/diagrams/central-spire-cross-section.svg`

### Images We Need 🆕
1. **Agroforestry/Gardens** (for Vision Snapshot card 3)
   - Option A: Find from Unsplash/Pexels (permaculture, food forest)
   - Option B: Create visualization with Midjourney/DALL-E
   - Option C: Use existing diagram (daily-life-timeline.svg)

2. **Community Circle** (for Highlights section)
   - Option A: Find stock photo (diverse group, circle, community)
   - Option B: Create illustration
   - Option C: Use placeholder with text overlay

3. **Financial Dashboard** (for Highlights + CTA sections)
   - Option A: Create custom visualization (charts, graphs)
   - Option B: Screenshot from Excel/Google Sheets
   - Option C: Use diagram (stage-progress.svg)

4. **Communosphere Interior** (for CTA section)
   - Option A: Find biophilic interior (lots of plants, natural light)
   - Option B: Create 3D render
   - Option C: Use exterior image with overlay

### Image Optimization
- **Format**: WebP for photos (fallback to JPG), SVG for diagrams
- **Sizes**: Multiple sizes for responsive (400w, 800w, 1200w, 1600w)
- **Lazy Loading**: Load images as user scrolls
- **Compression**: TinyPNG or similar (80-85% quality)
- **Alt Text**: Descriptive for accessibility and SEO

---

## 🌙 DARK THEME CONFIGURATION

### Docusaurus Config (`docusaurus.config.ts`)
```typescript
export default {
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // ... rest of config
  },
};
```

### Custom CSS (`src/css/custom.css`)
```css
/* Dark Theme Colors */
[data-theme='dark'] {
  --ifm-color-primary: #667eea;
  --ifm-color-primary-dark: #4c5ed4;
  --ifm-color-primary-darker: #3d4fc7;
  --ifm-color-primary-darkest: #2f3fa3;
  --ifm-color-primary-light: #8098f0;
  --ifm-color-primary-lighter: #96a8f3;
  --ifm-color-primary-lightest: #c1ccf9;
  
  --ifm-background-color: #0a0a0a;
  --ifm-background-surface-color: #1a1a2e;
  
  --ifm-font-color-base: #e0e0e0;
  --ifm-font-color-secondary: #b0b0b0;
  
  --ifm-heading-color: #ffffff;
  
  --ifm-link-color: #FFD700;
  --ifm-link-hover-color: #FFA500;
  
  --ifm-code-background: #16213e;
  
  --ifm-navbar-background-color: rgba(10, 10, 10, 0.95);
  --ifm-navbar-shadow: 0 1px 0 rgba(102, 126, 234, 0.1);
  
  --ifm-footer-background-color: #0a0a0a;
}

/* Light Theme (optional) */
[data-theme='light'] {
  /* Keep existing light theme colors */
}
```

---

## ⚡ PERFORMANCE OPTIMIZATIONS

### Image Loading
```javascript
// Lazy loading with Intersection Observer
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

### Animation Performance
```css
/* Use transform and opacity for 60fps animations */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Enable GPU acceleration */
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Code Splitting
```javascript
// Lazy load heavy components
const Lightbox = React.lazy(() => import('./Lightbox'));
const ParticleBackground = React.lazy(() => import('./ParticleBackground'));
```

---

## 📊 SUCCESS METRICS

### Performance Targets
- **Lighthouse Score**: 90+ (all categories)
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.5s
- **Cumulative Layout Shift**: <0.1

### User Engagement
- **Bounce Rate**: <40%
- **Avg. Session Duration**: 2+ minutes
- **Pages per Session**: 3+
- **Scroll Depth**: 60%+ reach bottom
- **CTA Click Rate**: 5-10%

---

## 🚀 IMPLEMENTATION TIMELINE

### Phase 1: Dark Theme + Basic Structure (2-3 hours)
- ✅ Configure dark theme as default
- ✅ Set up custom CSS with dark theme colors
- ✅ Create basic section structure
- ✅ Add theme toggle to navbar

### Phase 2: Hero + Core Sections (3-4 hours)
- ✅ Build hero section with gradient + animations
- ✅ Create Vision Snapshot cards
- ✅ Build Delphin showcase section
- ✅ Add Key Highlights (alternating rows)

### Phase 3: Interactive Elements (2-3 hours)
- ✅ Implement Stats section with count-up
- ✅ Build Visual Gallery with lightbox
- ✅ Create Timeline (horizontal scroll)
- ✅ Add CTA section

### Phase 4: Polish + Optimization (2-3 hours)
- ✅ Add all animations (scroll, hover, parallax)
- ✅ Implement particle background
- ✅ Optimize images (lazy loading, WebP)
- ✅ Test responsive design
- ✅ Performance optimization

### Phase 5: Testing + Deployment (1-2 hours)
- ✅ Cross-browser testing
- ✅ Mobile testing
- ✅ Accessibility audit
- ✅ Performance audit (Lighthouse)
- ✅ Deploy to GitHub Pages

**Total Time**: 10-15 hours

---

## 🎯 NEXT STEPS

### Option A: Full Implementation (10-15 hours)
I can build the entire redesigned homepage with:
- Dark theme as default
- All 10 sections with fluid animations
- Interactive elements (lightbox, timeline, stats)
- Particle backgrounds and parallax effects
- Full responsive design
- Optimized performance

### Option B: Phased Approach (3-5 hours per phase)
Start with essentials, add features incrementally:
- **Week 1**: Dark theme + Hero + Vision Snapshot
- **Week 2**: Delphin + Highlights + Stats
- **Week 3**: Gallery + Timeline + CTA
- **Week 4**: Polish + optimization

### Option C: Quick Win (2-3 hours)
Just the most impactful changes:
- Dark theme configuration
- Enhanced hero section
- Stats section with animations
- Basic responsive design

---

## 💡 MY RECOMMENDATION

**Start with Option C (Quick Win), then expand**:

1. **Today** (2-3 hours):
   - Set up dark theme as default ✨
   - Enhance hero section (gradient, animations)
   - Add animated stats section
   - Test on mobile

2. **This Week** (5-7 hours):
   - Add Delphin showcase
   - Build Key Highlights section
   - Create Visual Gallery
   - Add CTA section

3. **Next Week** (3-5 hours):
   - Add Timeline
   - Implement all animations
   - Particle backgrounds
   - Final polish

**Result**: Professional, fluid, interactive homepage that exceeds the test site, built incrementally with testing at each stage.

---

**Ready to start?** I can begin with the dark theme setup and hero section enhancement right now! 🌙✨

**Or would you like me to**:
- Create mockups/wireframes first?
- Focus on specific sections?
- Gather/create the missing images first?

Let me know how you'd like to proceed! 🚀

