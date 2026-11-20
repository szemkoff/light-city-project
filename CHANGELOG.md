# Changelog

All notable changes to the Light City project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### To Be Added
- Building cross-section diagrams
- Material science documentation
- Consciousness transfer mechanism details
- Interactive 3D city model
- Prototype communosphere designs

### Added
- City page: a "Life in the city" section with photo cards for the Spire Park, Council House, festival meadow and event hall, care farm and stables, water sports, woods, learning and fire and rescue, each linking to the model or the growth plan
- Photos in the documentation: each section that an info card links to now shows that card's picture
- Model: a "Fire station (Phase 2)" view
- 3D model: a Spire Park of lawns and groves round the spire, natural boulder waterfalls in the park and at the lake outlet, woods on the north and the flanks and open hay meadows to the south, a care farm (goats, sheep, hens, ducks, bees), dog parks in every phase, and in Phase 2 a Council House, a festival meadow and stage, stables for about ten horses and a lake boathouse, with a covered event hall in Phase 3. Each has an info card and a view in the "Life in the city" menu
- Photo guide: a concept picture for every structure type, shown at the top of each info card in the model and large on the new "Structures of Light City" page; How the city grows gains sections on the park and woods, events, animals, water sports and the Council House
- 3D model: the places of daily life now grow with the phases. Phase 1 adds a plaza amphitheatre and fire circle, a base hall, lift core and gathering level in the spire, a village green and playground, a natural swimming pond, six retreat cabins, an orchard and food forest and a fire shed. Phase 2 adds a primary school, a health centre, a sports field, aquaponics tunnels and a food hall, a fire station, a second pond and a retreat lodge. Phase 3 adds a secondary school, a town health centre, a vertical farm, a sports park with a wellness centre and a fire and ambulance station. Each has an info card, and there is a new "Life in the city" view menu
- How the city grows: a new design page that grows homes, water, sewage, food, health, learning, wellness, parks, sport and emergency services together, phase by phase, with sourced sizing for each
- 3D model: utilities now grow with the phases. A water yard (well, earth-covered tank, sand filters, compost) sits just behind the Phase 1 hamlet and a treatment garden (settling tank and two reed beds) just downhill of it. Phase 2 adds a larger tank, a biogas digester, a compact treatment hall and four more reed beds beside them. Every dome has two rain cisterns. The north campus and the water-mouth plant now arrive with Phase 3. There are new "Water yard" and "Treatment garden" views
- 3D model: the communospheres moved to the middle of each sector so the 12 radial paths pass between them instead of into them; main doors face the plaza and the outer rings and open onto forecourts on the ring paths, with side doors onto the radials; Phase 2 and 3 ring domes are 44 m (was 52 m) to leave room for the paths, and the sector at 255° is left to the heart rill, so there are 11 ring domes
- 3D model: four home types on the same plots (earth-sheltered, earthbag twin domes, ribbed 3D-printed earth and timber with hempcrete on a stone plinth), mixed round ring 4 and one method per courtyard cluster, each with its own info card, plus "Four ways to build a home" and "Courtyard clusters" views
- 3D model: every communosphere now has timber entrance vaults and paved forecourts on its inner and outer sides, and the radial paths run through the domes instead of stopping at them; the planted beds that blocked the doors are gone, paths cross the Phase 1 nursery plots, Phase 2 hubs have footpaths to the city, and a new "Dome entrances" view; the audit now counts paths that arrive at a dome entrance separately from screened path ends
- Similar Movements: a sourced comparison of visionary cities, ecovillages, intentional communities and planned towns, with lessons for Light City
- The Venus Project added to the "What others teach us" table in Economy and Migration
- Infrastructure: a sourced design page on water supply, sewage, waste and power, with a utility campus in the northern woods and a treatment wetland at the water mouth
- Layout audit script (`website/scripts/audit-model.cjs`) and a list of what the 3D model does not show yet
- Planning principles: a sourced design page on walking distance, movement (car-free core, mobility hubs, morning and evening flows), scattered work, water, what goes inside a communosphere and a feng shui check of the plan

### Changed
- Crystal Point spire remodelled after the favourite reference render: twelve sides, 61 m across at the foot, a gentle cone to 44 m at 150 m, shoulders curving in to a blunt 26 m faceted glass point at 230 m, with its mast reaching 240 m. The diagrid now carries tall staggered diamonds, each cut into four facets (blue and violet above, amber and clear below). In Phase 3 the glass climbs on a slant into an open white lattice with slim members and a fine ring in every other open diamond, where six larger turbines (9 m across, 18 m tall) turn round a central mast; a mirrored globe room sits at 82 m and the star room moves into the point. Plaza widened to 44 m. Docs, diagrams, info cards and the spire and wind crown photos updated to match
- Crystal Point spire reshaped after the favourite concept render: still six flat faces with sharp corners, but now 42 m across at the foot, a little fuller (46 m) at about 55 m, then narrowing in one long curve to a sharp point at 240 m. Every face is cut into tall diamonds of rainbow-tinted dichroic solar glass with pale glass between them on a white steel diagrid. The wind crown moves to 150–186 m behind near-clear glass louvres, so the crystal keeps one outline; the six helical turbines are now 7 m across. Star room at 190 m. New model geometry, section and crown plan, spire and crown photos, and updated text
- The Light Spire is now the Crystal Point spire, a highlight of the project: a six-sided prism of milky solar glass on a slender steel diagrid, a little wider at the foot than at the top, with a faceted glass point cut like a gem. It grows in 30 m sections (90 m, 150 m, 240 m) with a short temporary point until Phase 3 adds the wind crown: six helical turbines, three per level, the upper row turned 60 degrees. Inside: base hall, gathering level, water tank, enclosed observatory at 72 m, learning level, prism hall and star room. New model views (Crystal spire, Wind crown), a wind crown card, a section and crown plan, a home page feature, and new hero, phase and spire photos made on top of the model. Power is stated honestly as a supplement (very roughly 0.5–1 GWh a year)
- Landscaping in the 3D model: the wild woodland is now natural groves with shrub edges, woods have an understorey, reeds, willows and alders line the river, creek and lake, and path bends and ring paths get small trees, shrubs, hedges and lavender. Trees include autumn tints and flowering trees near the centre. The triangle count stays within the previous budget.
- Model made much lighter: trees thin out from 400 m past each phase's edge and stop 900 m out (the wild woodland no longer runs 2 km into the countryside), tree shapes use fewer faces, trees beyond the final town edge drop their trunks, and hidden zero-size tree parts are no longer drawn. About 5.3 million triangles fall to 0.6 million in Phase 1, 5.6 to 1.2 million in Phase 2 and 6.7 to 2.4 million in Phase 3
- Structure photos re-staged scene by scene: realistic numbers of people for each place (a full class in the learning pavilion, busy market and food hall, lighter parks), clothing that suits the activity, and the fire station photos now match the curved model
- Fire stations in Phases 2 and 3 turned so their bays open toward the ring road, with a short curved drive; the Phase 2 fire station view now shows the doors and stone end
- Structure photos made calmer: a few people in each instead of crowds (crowds kept only at the festival meadow and event hall), and utility sites show only one or two staff at work
- Fire stations in the model rebuilt to match their photo: a curved glulam vault with a green roof, exposed arches, glass gables and clerestory, a stone end wall, a living wall and red bay doors
- All structure photos regenerated with people in a mix of modern everyday, smart, sporty and fashionable clothing
- Phase images on the City page regenerated from the current model layout (curving rings, lake, canal, river and woods)
- Phase card texts, the phase table and the daily timeline mention the new parks, gathering places, animals and water sports
- 3D model: the Phase 2 ring road now starts and ends in the two southern mobility hubs instead of stopping in a field south-west of the city
- 3D model: fly across the ground with the arrow keys or WASD (Shift for faster), keeping height and view direction; menus hand the keys back after a choice
- 3D model: click or tap any building, dome, utility or waterway to open a card that says what it is, the phase it arrives in and a link to its full description in the docs
- 3D model: the phase note at the bottom is now foldable, showing one line by default with a More / Less toggle
- 3D model: procedural textures (grass, crop rows, gravel paths, stone paving, water, timber, rammed earth, solar cells, glazing, facades and foliage), a sky gradient with reflections on glass, water and solar panels, and per-tree leaf colour
- 3D model: Day / Night toggle (`?time=night`) with street lamps, lit home windows and terraces, glowing domes, an uplit spire with LED rings and aviation lights, greenhouse grow-lights, stars and a moon
- 3D model: no more flicker on the ground when zooming (wider layer spacing and a logarithmic depth buffer); conifers in the woodland, gardens inside the domes, windows on the earth homes, natural hill shapes and softer tone mapping
- 3D model: Phase 3 terraces redesigned from boxy blocks into flowing curved buildings with rolling green roofs, glass skylights, full-height glazing, thin-shell concrete floor and balcony bands, timber roof edges, living-wall ends, stone plinths and planted beds
- 3D model: waterways and boat transport: a meandering river and a lake with a wooded island and a boat landing (Phase 1), a canal ring (Phase 2), an outer canal ring and S-curved canals through the town (Phase 3), stone and concrete quays with lamps, arched timber footbridges with landings, and solar-roofed electric boats lit at night; new views `?view=lake`, `?view=water` and `?view=canal`
- 3D model replanned against the planning principles: the river now bends round the south of the town with the city inside its curve, the heart lake sits south-west and reaches the plaza by a canal, harbour and rill, low hills shelter the north, radial paths turn gently beyond the core, cars stop at solar mobility hubs on a north road, an arc road and an outer ring road, work hubs (market halls and workshop vaults) sit near every home, and communosphere domes now show terraced homes round a small garden atrium with a rain pool under an open oculus; new views `?view=heart`, `?view=dome`, `?view=hub` and `?view=work`
- 3D model, feng shui and collisions: no straight lines (the 12 paths turn in a spiral from the plaza and the outer paths and roads meander), planted beds wherever a path meets a door, ring paths bent round dome forecourts, a crescent harbour, a water-mouth grove, pavilion and bridge, and feng shui woods behind the city; all building collisions and trees on paths fixed
- 3D model controls: phase, view and time of day are now three drop-down menus; the view menu lists every view, grouped into Overview, Centre, Water and boats, Living and work, and Infrastructure, and a view from a later phase switches the phase to match
- 3D model, infrastructure: earth-covered reservoirs, sand filters, a recycling hall, compost, biogas digesters, a battery bank and substation on a north utility campus; a treatment hall and wetland at the water mouth; batteries at every mobility hub; new views `?view=utilities`, `?view=watermouth` and `?view=harbour`

## [0.5.0] - 2026-11-16

### Added
- Light City at a Glance: a single canonical fact sheet for scale, costs, homes, timeline and readiness
- The Transition: five movements from present-day life to the Light City future, mapped to the stages
- Technology Horizon: Proven / Scaling / Emerging / Frontier technologies with sourced 2026 status
- Glossary, an expanded research agenda and a graded bibliography

### Changed
- Library reorganized into a narrative reading order (Why → Transition → City → Technology → Living → Roadmap → Research)
- Numbers harmonized across all documents; horizon tags added to every Technology Catalog entry
- Catalog roadmap aligned with stage dates; solid-state and vertical-farming entries updated for 2026 realities
- Start Here and README rewritten

### Removed
- Stale root `docs/` copy, root working notes and scripts moved to `archive/`

## [0.4.0] - 2025-11-06

### Added - Comprehensive Visual Documentation System

#### Sacred Geometry Visualization Suite
- **10 Custom SVG Diagrams** - Professional, detailed sacred geometry illustrations:
  - **Flower of Life** - Creation pattern with overlapping circles
  - **Merkaba** - Light body vehicle showing masculine/feminine balance
  - **Golden Ratio Spiral** - Divine proportion with Fibonacci sequence
  - **Platonic Solids** - All 5 elemental building blocks with applications
  - **Vesica Piscis** - Sacred intersection and portal geometry
  - **Metatron's Cube** - Complete blueprint containing all Platonic solids
  - **Sri Yantra** - 9 interlocking triangles for manifestation
  - **City Layout** - Top-down concentric ring design with communospheres
  - **Energy Flow System** - Cosmic source to city infrastructure flow
  - **Development Roadmap** - Complete 6-stage visual timeline

#### Interactive Diagrams
- **5 Mermaid Diagrams** integrated into documentation:
  - Light City Dimensions (Core Concepts)
  - City Layout Structure (Architecture)
  - Energy Flow & Resonance Systems (Energy Systems)
  - Communosphere Structure (Communospheres)
  - Sacred Geometry Reference (Sacred Geometry)

#### Visual Content Integration
- **Architectural Inspirations**: Added Borobudur Temple and Angkor Wat with detailed images
- **Vision References**: Integrated user's AI-generated Light City visions throughout docs
- **Delphin Examples**: Aerial views of real crystal city from another world
- All major concept pages now include contextual imagery and diagrams

#### Documentation Guides
- **`CURATED-IMAGE-RECOMMENDATIONS.md`** - Direct links to 60+ free stock photo sources
  - Organized by documentation page
  - Specific search terms for crystals, meditation, sacred architecture
  - Priority image recommendations with exact URLs
- **`ADDING-IMAGES-GUIDE.md`** - Complete visual content creation guide
  - AI image generation prompts and tools
  - Free stock photo site recommendations
  - SVG diagram creation guidelines
  - Image optimization and workflow
- **`DIAGRAM-INVENTORY.md`** - Complete catalog of all visual assets
  - Detailed diagram descriptions and locations
  - Visual style guide and color palette
  - Usage guidelines and modification instructions

### Enhanced Content

#### Sacred Geometry Page
- Expanded from basic descriptions to fully illustrated sacred forms
- Added detailed explanations for each geometric pattern
- Integrated visual examples showing real-world applications
- Connected geometry to Light City architectural elements

#### Architecture Page
- Added comprehensive city layout visualization
- Integrated historical sacred architecture examples
- Visual comparison between vision and real-world inspirations
- Detailed structural diagrams with legends

#### Energy Systems Page
- Complete energy flow visualization from cosmic to practical
- Detailed distribution network diagram
- Visual representation of resonance technology
- Crystal spire energy conversion illustrations

#### Development Stages Page
- Full 6-stage visual roadmap with timeline
- Current progress indicator (Stage 1 - 60%)
- Color-coded stage progression
- Estimated timeline with flexibility notes

### Significance
This update transforms Light City documentation from text-based to richly visual, making complex spiritual and architectural concepts immediately graspable. The comprehensive diagram suite provides professional-quality visualizations that can be used for presentations, teaching, and future development. The project now has a complete visual language that matches its visionary scope.

## [0.3.0] - 2025-10-15

### Added - GitHub & Documentation Site
- **GitHub Repository**: Published project at https://github.com/szemkoff/light-city-project
- **Docusaurus Documentation Site**: Live at https://szemkoff.github.io/light-city-project/
- **Visual Design System**:
  - `docs/design/visual-language.md` - Design principles and tokens
  - `docs/design/color-and-light.md` - Color palette and lighting rules
  - `docs/design/layout-diagrams.md` - Placeholder for diagrams
- **Research Infrastructure**:
  - `docs/research/bibliography.md` - Research sources compilation
  - `docs/research/open-questions.md` - Open research questions log
- **Governance Documents**:
  - `CODE_OF_CONDUCT.md` - Community guidelines
  - `LICENSE` - MIT License for code
  - `LICENSE-DOCS` - CC BY-SA 4.0 for documentation
- **Technical Documentation**:
  - `docs/technical/github-docusaurus-setup.md` - Deployment guide
- **Assets Organization**:
  - `assets/images/diagrams/README.md` - Diagrams folder structure
  - Saved 4 inspiration images (Delphin aerial views + AI-generated visions)

### Updated
- **README.md**: Updated last modified date, clarified current stage
- **START-HERE.md**: Updated version to 0.3.0
- **.gitignore**: Added Docusaurus build exclusions
- **website/docusaurus.config.ts**: Configured for GitHub Pages deployment
- **Documentation links**: Fixed all internal links for Docusaurus routing

### Infrastructure
- Initialized Git repository with full project history
- Set up GitHub Pages deployment on `gh-pages` branch
- Configured Docusaurus with custom theme and navigation
- Established version control workflow

### Significance
This update represents the project's public launch and technical infrastructure setup. Light City now has professional version control, a beautiful documentation site, and is ready for public visibility and collaboration. The foundation is complete for Stage 2 work.

## [0.2.0] - 2025-10-10

### Added - Delphin Integration
- **Delphin Channeled Information** document in research/spiritual/
- **Communospheres** concept document with complete specifications
- **Energy Systems** document detailing crystal technology and resonance

### Updated
- **Architecture.md**: 
  - Added Delphin-inspired model section
  - Updated central spire with 40,000-foot scale and crystal technology
  - Completely rewrote living spaces section with communosphere details
  - Added resonance technology specifications
- **Core Concepts.md**:
  - Added Delphin as validation of Light City archetype
  - Updated "Where Does It Exist" to include other worlds
  - Added Delphin section explaining the connection
- **Documentation Index**: Updated with new documents and research section

### Significance
This update represents a major advancement—integrating concrete information from an existing crystal city on another planet. Light City now has a proven model to reference and adapt, moving from pure vision to documented technology.

## [0.1.0] - 2025-10-10

### Added
- Initial project structure and organization
- Core documentation framework:
  - README.md with project overview
  - Development Stages document outlining 6-phase roadmap
  - Project Structure document explaining organization
  - Tools and Workflows guide for all stages
  - Contributing guidelines for collaborators
  - Quick Start Guide for newcomers
- Concept documentation:
  - Core Concepts exploring Light City fundamentals
  - Philosophy document (foundation)
  - Purpose and Mission statement
- Design documentation:
  - Architecture document with initial vision
- Project management files:
  - .gitignore for version control
  - CHANGELOG.md (this file)
- Folder structure for:
  - Documentation (docs/)
  - Assets (to be populated)
  - Source code (to be populated)
  - Research (to be populated)
  - Planning (to be populated)

### Status
- Project Status: Stage 1 - Foundation & Vision
- Documentation: ~30% complete for Stage 1
- Design: Conceptual stage
- Technical: Planning stage
- Community: Not yet established

### Notes
- This represents the initial framework for the Light City project
- All documentation is considered "living" and will evolve
- Focus is on establishing solid foundation before expanding

---

## Version History

- **0.4.0** - Comprehensive visual documentation system with 15+ diagrams and guides (2025-11-06)
- **0.3.0** - GitHub repository and Docusaurus site launch (2025-10-15)
- **0.2.0** - Delphin integration and energy systems documentation (2025-10-10)
- **0.1.0** - Initial project structure and core documentation (2025-10-10)

---

**Maintained by**: Project Contributors  
**Last Updated**: November 6, 2025

