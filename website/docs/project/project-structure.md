# Project Structure

This document explains the organization and purpose of each directory in the Light City project.

## Directory Overview

```
light-city-project/
├── README.md                 # Project overview and entry point
├── website/                  # Docusaurus site (single source of truth)
│   ├── docs/                 # The library
│   │   ├── START-HERE.md     # Orientation and reading paths
│   │   ├── at-a-glance.md    # Canonical numbers
│   │   ├── glossary.md
│   │   ├── concepts/         # Vision, philosophy, the transition, communospheres, energy
│   │   ├── design/           # Architecture, visual language, color and light, diagrams
│   │   ├── technical/        # Technology horizon, catalog, urban retrofit
│   │   ├── project/          # Stages, governance, residency, contributing
│   │   └── research/         # Open questions, bibliography
│   ├── src/                  # Homepage, audience pages, components
│   ├── static/img/           # Images and diagrams
│   └── sidebars.ts           # Library reading order
├── research/                 # Source material (spiritual, architectural)
├── planning/                 # Stage task lists
├── assets/                   # Working media
└── archive/                  # Superseded docs, notes and scripts
```

## Documentation Structure (`website/docs/`)

### Concepts (`website/docs/concepts/`)

Core philosophical, spiritual, and conceptual documentation:

- `core-concepts.md` - Foundational principles and ideas
- `philosophy.md` - Philosophical underpinnings
- `sacred-geometry.md` - Geometric principles
- `energy-systems.md` - Energetic concepts
- `consciousness.md` - Consciousness and awareness
- `purpose-and-mission.md` - Project purpose

### Design (`website/docs/design/`)

Visual, architectural, and aesthetic documentation:

- `architecture.md` - Architectural concepts and principles
- `visual-language.md` - Visual design system
- `layout.md` - City layout and planning
- `materials.md` - Materials and construction
- `symbolism.md` - Symbolic elements
- `color-and-light.md` - Color theory and light principles

### Technical (`website/docs/technical/`)

Development, implementation, and technical guides:

- `technology-stack.md` - Tools and technologies
- `development-guide.md` - Development practices
- `api-documentation.md` - API references (if applicable)
- `deployment.md` - Deployment processes
- `tools-setup.md` - Tool installation and setup

### Community (`website/docs/community/`)

Community engagement, collaboration, and governance:

- `community-guidelines.md` - Guidelines and code of conduct
- `contribution-guide.md` - How to contribute
- `governance.md` - Decision-making processes
- `events.md` - Community events and gatherings
- `resources.md` - Community resources

### Project (`website/docs/project/`)

Project management, planning, and meta-documentation:

- `development-stages.md` - Project stages and roadmap
- `project-structure.md` - This document
- `contributing.md` - Contribution guidelines
- `tools-and-workflows.md` - Project tools and processes
- `changelog.md` - Project history and changes

## Assets Structure (`assets/`)

### Images (`assets/images/`)

- `concept-art/` - Conceptual artwork
- `architecture/` - Architectural renderings
- `diagrams/` - Diagrams and infographics
- `inspiration/` - Inspirational references
- `photos/` - Photographs

### Models (`assets/models/`)

- `buildings/` - 3D building models
- `city/` - City-scale models
- `elements/` - Individual elements

### Audio (`assets/audio/`)

- `music/` - Musical compositions
- `soundscapes/` - Ambient sounds
- `spoken/` - Spoken word content

### Video (`assets/video/`)

- `presentations/` - Presentation videos
- `tours/` - Virtual tours
- `explanations/` - Explanatory content

## Source Code (`src/`)

*Note: This directory is created when technical development begins (Stage 3+)*

### Web (`src/web/`)

Website or web application code:
- Frontend application
- Backend services
- Static site generators

### Tools (`src/tools/`)

Utility scripts and tools:
- Documentation generators
- Image processors
- Data converters

### Experiences (`src/experiences/`)

Interactive experiences:
- VR/AR experiences
- Interactive visualizations
- Games or simulations

## Research (`research/`)

### Spiritual (`research/spiritual/`)

- Sacred architecture studies
- Metaphysical concepts
- Spiritual traditions
- Consciousness research

### Architectural (`research/architectural/`)

- Architectural precedents
- Sustainable design
- Sacred spaces
- Urban planning

### Technological (`research/technological/`)

- Emerging technologies
- Digital tools
- Implementation approaches

### Community (`research/community/`)

- Community building models
- Intentional communities
- Governance systems
- Collaboration frameworks

## Planning (`planning/`)

### Roadmaps (`planning/roadmaps/`)

- Long-term vision
- Phase planning
- Milestone tracking

### Tasks (`planning/tasks/`)

- Active tasks
- Backlogs
- Sprint planning (if using agile)

### Notes (`planning/notes/`)

- Brainstorming sessions
- Meeting notes
- Ideas and insights

## File Naming Conventions

### Documentation Files
- Use lowercase with hyphens: `core-concepts.md`
- Be descriptive: `sacred-geometry-principles.md`
- Use `.md` for markdown files

### Asset Files
- Use lowercase with hyphens or underscores
- Include version or date when relevant: `city-concept-v1.png`
- Keep names meaningful: `central-spire-architecture.jpg`

### Code Files
- Follow language conventions
- Use consistent naming patterns
- Include clear module/component names

## Documentation Standards

### Markdown Files

All documentation should include:

1. **Title** (H1) - Clear, descriptive title
2. **Overview** - Brief introduction
3. **Content** - Well-organized sections
4. **Links** - Cross-references to related docs
5. **Metadata** - Last updated date

Example structure:
```markdown
# Document Title

Brief overview of what this document covers.

## Section 1

Content...

## Section 2

Content...

---

**Last Updated**: Date
**Related**: [Link to related doc](path)
```

### Version Control

- Use meaningful commit messages
- Document significant changes in `website/docs/project/changelog.md`
- Tag major versions

## Navigation

### Key Entry Points

1. **Project Overview**: `/README.md`
2. **Getting Started**: `website/docs/concepts/core-concepts.md`
3. **Development Plan**: `website/docs/project/development-stages.md`
4. **Contributing**: `website/docs/project/contributing.md`

### Finding Information

- Use descriptive file names for easy searching
- Maintain an index in each section's README
- Cross-link related documents
- Keep a site map in `website/docs/site-map.md`

---

**Last reviewed**: November 2026

