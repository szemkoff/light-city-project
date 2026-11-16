# Light City Project

**A planned, regenerative community of light, timber and glass, built in livable steps from today's world toward a more conscious future.**

- **Website:** [szemkoff.github.io/light-city-project](https://szemkoff.github.io/light-city-project/)
- **Library (docs):** [Start Here](https://szemkoff.github.io/light-city-project/docs/START-HERE) · [Light City at a Glance](https://szemkoff.github.io/light-city-project/docs/at-a-glance) · [The Transition](https://szemkoff.github.io/light-city-project/docs/concepts/the-transition) · [Technology Horizon](https://szemkoff.github.io/light-city-project/docs/technical/technology-horizon)

> *"The city is in the sky until it is in your hands. To build it on Terra, begin building it in hearts. Structures follow spirit."*

## At a glance

| | |
|---|---|
| **Phase 1 — Pilot Hamlet** | 200 residents, 3 communosphere domes (30–45 m), 60–120 m solar spire, 2–5 MWp solar + 8–20 MWh storage |
| **Cost (target)** | ~$45M to opening (range $22–95M); $2.5M/yr operations; break-even at 180 residents |
| **Growth** | Village of 1,500 (mid-2030s) → Town of 8,000+ (2040s) |
| **Current stage** | S1 Foundation, finishing (Oct 2025 – Dec 2026). Next: S2 Design (Jan – Jun 2027). First residents targeted for 2031. |

The canonical numbers live in [`website/docs/at-a-glance.md`](website/docs/at-a-glance.md). Every other page must match them.

## Repository layout

```
light-city-project/
├── website/              Docusaurus site — the single source of truth
│   ├── docs/             The library (Start Here, At a Glance, concepts, design, technical, project, research)
│   ├── src/              Homepage, audience pages and shared components
│   ├── static/img/       Images and diagrams
│   └── sidebars.ts       Library reading order
├── research/             Source material (Delphin channeled info, inspirational buildings)
├── planning/             Stage task lists
├── assets/               Working media
├── archive/              Superseded docs, 2025 working notes and one-off scripts (kept for history)
├── CHANGELOG.md · CODE_OF_CONDUCT.md · LICENSE (MIT, code) · LICENSE-DOCS (CC BY-SA 4.0)
```

## Working on the library

```bash
cd website
npm ci --legacy-peer-deps
npm start          # local preview at http://localhost:3000/light-city-project/
npm run build      # must pass with no broken links
```

Conventions: label **archetype** vs **Earth build**, tag technologies **Proven / Scaling / Emerging / Frontier**, and take all figures from At a Glance. See [Contributing](website/docs/project/contributing.md).

## Branches and publishing

| Branch / tag | Purpose |
|---|---|
| `main` | Default branch and single source of truth. Site and library live in `website/`. |
| `gh-pages` | Built site, generated automatically. Do not edit. |
| `archive/emergent-app` (tag) | Snapshot of the earlier Emergent-generated React/FastAPI app. |
| `archive/luminous-prototype` (tag) | Snapshot of the single-page luminous design prototype. |

Every push to `main` runs `.github/workflows/deploy.yml`, which builds `website/` and publishes it to `gh-pages`. New work goes in short-lived branches off `main` and is reviewed via pull request.

## License

MIT for code, CC BY-SA 4.0 for documentation.

---

**Last updated**: November 2026
