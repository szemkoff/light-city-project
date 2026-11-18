# Visual Language

*How Light City looks in photos, diagrams, type and icons: Modern Organic, a blend of nature and technology*

![Homes and gardens of Light City: curved timber homes with green roofs, paths and wild planting](/img/home/homes-overview.webp)

*Modern Organic: curved timber, glass and earth, green roofs and wild land, people of many backgrounds in varied, natural clothing.*

## Purpose

This guide keeps every Light City image, diagram and page consistent and readable. It covers concept photos, technical diagrams, typography, icons and how to label visionary art.

## Core principles

- **Modern Organic.** Nature and technology together: curved glulam and CLT, gridshells, glass, rammed earth and clay, living walls, solar glazing, warm integrated light. Not medieval, not rustic cabins, not science fiction.
- **Buildable first.** Images of what we plan to build show Phase 1 facts: 30–45 m domes, a 60–120 m spire, 200 residents.
- **Honest labels.** Visionary archetype art (Delphin, the original vision images) is always captioned as "Visionary archetype art, not a real place or a design."
- **Readable.** If you cannot read a label on a phone, the diagram is not finished.
- **Respectful.** Sacred symbols from living traditions are shown with their context and are not used as decoration only.

## 3D reference model

Every illustration of the city as a whole starts from one shared 3D model, so the radial design never drifts. It is one model with three phases that grow from the same plan: every structure is tagged with the phase that builds it, and the phase switch turns later structures on or off ([compared in Architecture](/docs/design/architecture#phased-development--scale)). Phase 1 shows the spire on a round plaza, five rings, 12 paths that turn in a gentle spiral from the plaza, one temple and two learning pavilions, three 40 m domes on ring 3, earth homes on ring 4 and solar with meadow on ring 5, inside wild land. Phase 2 (village) and Phase 3 (town) keep all of that unchanged and add domes on reserved plots, sections on the same spire, and rings of homes and food and energy belts outward (build once, grow outward).

![3D reference model of the Phase 1 plan: top view and aerial view of the five rings and 12 radial paths](/img/diagrams/model-reference.webp)

*The Phase 1 model, top and aerial views. Open the interactive model to orbit it and switch phases: [Phase 1](pathname:///model/index.html?phase=1), [Phase 2](pathname:///model/index.html?phase=2), [Phase 3](pathname:///model/index.html?phase=3).*

- **How to use it.** Pick the phase the image shows, then render the closest named view (aerial, top, low aerial, radial path, homes ring, plaza or solar ring) with `PHASE=1|2|3 node scripts/render-model.cjs <view>`. Give that render to the image tool as the layout reference, with the current photo as a style reference.
- **Label the phase.** Any image of the whole city says which phase it shows, and must match the model at that phase: three domes in Phase 1, eight in Phase 2, eighteen in Phase 3. The spire is a flared lattice of stacked sections: three in Phase 1, five in Phase 2, eight in Phase 3.
- **What must match.** One central spire with a round deck and a solar ring at the top, rings and radial paths in the same places, domes only where the plan puts them, no extra towers or buildings outside the rings.
- **Changing the plan.** Update `static/model/city.js` and the plan diagram together, then re-render the views and the affected images.
- **Check the layout.** After any change to the plan, run `node scripts/audit-model.cjs` from `website/`. For each phase it reports buildings on paths or in water, overlapping buildings, path ends aimed at doors without a planted bed, straight runs over 80 m and trees on paths. All counts should be zero before a change is merged ([Planning principles](/docs/design/planning-principles#collisions-and-the-layout-audit)).

### What the model does not show yet

The model shows the plan, the main buildings, water, movement and the [infrastructure](/docs/design/infrastructure). These parts of the documented design are not in it yet:

| Missing from the model | Where it is described | Notes |
|---|---|---|
| Schools, a clinic and a library | [Architecture: learning centres](/docs/design/architecture#3-learning-centers), [Residency](/docs/project/contribution-based-residency) | The learning pavilions stand in for them; no separate buildings yet |
| Inside the spire | [Architecture: the central spire](/docs/design/architecture#the-central-spire) | The lattice and solar crown are shown; the observation deck, lifts and gathering levels are not |
| Plaza amphitheatre and fire circle | [Architecture: the central plaza](/docs/design/architecture#1-the-central-plaza) | The plaza is open paving round the ring pool |
| Creative studios and maker spaces in detail | [Architecture: creative studios](/docs/design/architecture#5-creative-studios) | Shown as simple ring 3 buildings and work hub workshops |
| Food processing, aquaponics, vertical farms and mushrooms | [Technology catalog](/docs/technical/technology-catalog#food-production) | Greenhouses and crop rows only |
| Food forests and orchards | [Technology catalog](/docs/technical/technology-catalog#3-agroforestry--food-forests) | Woodland and meadow, not planted as food forest |
| Guest and retreat housing | [Development stages](/docs/project/development-stages) | Retreat income is planned, but there is no guest building |
| Housing counts per dome and per terrace | [At a Glance](/docs/at-a-glance) | Terraced levels are shown, not individual homes |
| Pipes, cables and utility tunnels | [Infrastructure](/docs/design/infrastructure#utility-tunnels) | Underground, so not drawn |
| Rain cisterns, swales and pump stations | [Infrastructure](/docs/design/infrastructure#water-supply) | Only the reservoirs, filters and wetland are drawn |
| Micro-hydro and geothermal | [Energy systems](/docs/concepts/energy-systems#resilience-without-diesel) | Depend on the site |
| Sound, healing and float rooms | [Technology catalog](/docs/technical/technology-catalog#consciousness--wellness-tech) | Inside the temples and domes, not modelled |
| Sports fields, playgrounds and emergency services | Not yet described | Need a page before they go in the model |
| The real landform | [Site locations](/docs/project/site-locations) | The hills, river and slopes are schematic until a site is chosen |

## Concept photos (Modern Organic)

Use this style note at the end of every image prompt:

> Curved glulam and CLT, timber gridshells, glass, living walls, rammed earth and clay plaster, warm shielded lighting, local stone, and only occasionally a single vertical quartz point on a pedestal. People of many ethnicities, ages and body types in varied, natural clothing: linen and cotton trousers, skirts and dresses, tunics, knitwear, shawls and work wear in earthy tones with warm accents, almost no denim. Mixed daylight and weather, not always sunset. Realistic documentary photo of a place that could be built today. No text or logos. Avoid medieval, rustic cabins and fantasy.

- **Scale.** Domes 30–45 m across, 3–5 levels; the spire is a wide-based lattice tower (36 m base, 90 m in Phase 1), not a skyscraper.
- **People.** Diverse ages, ethnicities, body types and personal styles, doing ordinary things: cooking, working, building, resting.
- **Clothing.** Varied and organic-looking, never a uniform look: natural fibres, many cuts (trousers, skirts, dresses, tunics, overalls, knitwear), earthy colors with some warmth. Avoid a crowd in jeans, and avoid costumes, robes or matching outfits.
- **Technology.** Visible but calm: solar glazing, batteries in a timber room, sensors that look like furniture.
- **Radial plan.** Any image that shows more than a single building must agree with the [3D reference model](#3d-reference-model).
- **Reality check.** Before an image goes in, ask: could this be photographed in a real eco-village next year? No open fire indoors, no glowing ground lights or rows of candles, no uplit domes, handrails at every drop, bird-safe patterned glass on large glazing, plants at a believable size, wild land around the buildings rather than lawns. Crystals are occasional, at most one point in a scene, and most images have none.
- **Formats.** 16:9 for heroes, 4:3 for cards, 1:1 for tiles. Export as WebP or JPG at about 1,400–2,000 px wide.

Earth domes and printed-earth homes belong in the image library alongside timber domes; examples are in [Beyond the Box](/docs/design/organic-forms-and-materials).

## Diagrams

All diagrams in the library follow these rules:

- **Canvas.** Pearl background (`#FBF8F2`), rounded corners, width 1,100–1,300 px in SVG.
- **Type.** Title in serif at 44 px; labels and body in sans at 19–22 px minimum (at 1,300 px wide). Nothing smaller than 17 px.
- **Lines.** Ink for outlines, Gold for structure and the main flow, Terracotta for reference lines. 2–4 px strokes.
- **Labels never overlap** lines, shapes or other labels. Use leader lines with a dot at the anchor.
- **Facts.** Use the current numbers from [At a Glance](/docs/at-a-glance). Write the phase on the diagram.
- **One idea per diagram.** If a diagram needs a paragraph to explain, split it.
- **Geometry diagrams** pair the figure with two panels: "Traditional meaning" and "How Light City uses it."

A good example is the city plan in [Architecture → Circular form](/docs/design/architecture#circular-form): numbered rings, a short legend and plain-language labels.

## Typography

- **Display and headings:** Zodiak (serif), falling back to Iowan Old Style or Georgia.
- **Body and labels:** Switzer (sans), falling back to Inter or system sans.
- **Mono (technical):** JetBrains Mono or Fira Code.
- Line length 60–80 characters; body at 16 px or larger on the web.

## Iconography

- Stroke icons, 3 px ink lines with one gold accent, rounded joins, on a pearl disc.
- Icons describe real things: spire, dome, earth home, gridshell, microgrid, water, food, temple, learning, community, research, governance.

![Light City icon set](/img/diagrams/icon-set.svg)

*The Light City icon set.*

## Geometry library

- Circle, vesica piscis, Flower of Life, golden ratio, Platonic solids, star tetrahedron (Merkaba), Metatron's Cube, Sri Yantra.
- Geometry guides proportion, plans and ornament. We do not claim physical effects from shapes.

- The golden ratio is a proportion guide for rooms, windows and ring spacing; the star tetrahedron is a motif for the spire crown, screens and lattice nodes. The diagrams are in [Sacred Geometry](/docs/concepts/sacred-geometry).

## Accessibility

- Contrast at least AA (4.5:1 for body text).
- Do not use color alone to carry meaning; add labels or patterns.
- Every image has descriptive alt text.
- Keep motion and light effects subtle.

---

**Last reviewed**: November 2026  
**Related**: [Color and Light](/docs/design/color-and-light), [Architecture](/docs/design/architecture), [Beyond the Box](/docs/design/organic-forms-and-materials), [Sacred Geometry](/docs/concepts/sacred-geometry)
