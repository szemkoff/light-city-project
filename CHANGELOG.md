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
- 3D model: four home types on the same plots (earth-sheltered, earthbag twin domes, ribbed 3D-printed earth and timber with hempcrete on a stone plinth), mixed round ring 4 and one method per courtyard cluster, each with its own info card, plus "Four ways to build a home" and "Courtyard clusters" views
- 3D model: every communosphere now has timber entrance vaults and paved forecourts on its inner and outer sides, and the radial paths run through the domes instead of stopping at them; the planted beds that blocked the doors are gone, paths cross the Phase 1 nursery plots, Phase 2 hubs have footpaths to the city, and a new "Dome entrances" view; the audit now counts paths that arrive at a dome entrance separately from screened path ends
- Similar Movements: a sourced comparison of visionary cities, ecovillages, intentional communities and planned towns, with lessons for Light City
- The Venus Project added to the "What others teach us" table in Economy and Migration
- Infrastructure: a sourced design page on water supply, sewage, waste and power, with a utility campus in the northern woods and a treatment wetland at the water mouth
- Layout audit script (`website/scripts/audit-model.cjs`) and a list of what the 3D model does not show yet
- Planning principles: a sourced design page on walking distance, movement (car-free core, mobility hubs, morning and evening flows), scattered work, water, what goes inside a communosphere and a feng shui check of the plan

### Changed
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

