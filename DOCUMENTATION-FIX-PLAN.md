# Documentation Fix Plan

**Created**: November 14, 2025  
**Status**: Ready for Execution  
**Estimated Total Time**: 4-6 hours  
**Priority**: HIGH (Critical issues block investor presentations)

---

## 📊 EXECUTION STRATEGY

### Approach
1. **Sequential fixes** (not parallel) to avoid merge conflicts
2. **Test after each fix** to ensure no broken links
3. **Commit after each major fix** for clean rollback if needed
4. **Final consistency check** after all fixes applied

### Quality Gates
- ✅ All cross-references work
- ✅ No contradictory statements
- ✅ Consistent terminology
- ✅ All dates current (Nov 14, 2025)
- ✅ Financial model internally consistent

---

## 🔴 PHASE 1: CRITICAL FIXES (Must Do - 2-3 hours)

### Fix 1.1: Communosphere Scale Standardization ⚠️⚠️⚠️
**Priority**: CRITICAL  
**Time**: 45 minutes  
**Files**: 3 files

**Changes Required**:

#### A. Update `communospheres.md` (Lines 239-250, 326-376)
```markdown
BEFORE:
**Size**: 
- Large enough for complete communities (example: 10,000 people)
- Self-contained living environment

AFTER:
### 🔮 Vision Source (Off-World Reference)

**Delphin Communospheres**: 600-1,200 ft diameter mega-spheres
- Each houses 10,000 people
- Complete self-contained cities within spheres
- Demonstrates far-future pavilion scale with advanced consciousness-matter technology
- Serves as aspirational model and proportional guide

### 🌍 Terrestrial Prototype (Earth Implementation)

**Phase 1 (18-24 months)**: 3 geodesic domes
- **Size**: 30-45 m diameter (100-150 ft)
- **Height**: 3-5 levels, 15-25 m tall
- **Capacity**: 80-120 residents per dome
- **Total Phase 1**: 240-360 residents (target: 200)
- **Structure**: CLT (cross-laminated timber) + steel nodes, or tensegrity geodesic
- **Glazing**: BIPV (building-integrated photovoltaics) + insulated panels

**Phase 2 (36-48 months)**: 6-12 domes expansion
- **Size**: 45-60 m diameter (150-200 ft)
- **Capacity**: 120-200 residents per dome
- **Total**: 720-2,400 residents
- **Clustered**: Outer ring arrangement, connected by covered walkways

**Phase 3 (Long-term vision)**: 12+ domes
- **Size**: 60-90 m diameter (200-300 ft)
- **Capacity**: 200-400 residents per dome
- **Total**: 2,400-4,800+ residents
```

#### B. Update `communospheres.md` (Lines 165-169)
```markdown
BEFORE:
**Number**: 
- Depends on total intended population
- 12 spheres for sacred number alignment?
- Each housing 5,000-10,000 people
- Total city population: 60,000-120,000

AFTER:
**Number** (Phased Approach):
- **Phase 1**: 3 domes (200 residents target, 150-300 range)
- **Phase 2**: 6-12 domes (720-2,400 residents)
- **Phase 3**: 12+ domes (2,400-4,800+ residents)
- **Long-term Vision**: Inspired by Delphin's 12 mega-spheres (60,000-120,000 people)
```

#### C. Add Disclaimer to `communospheres.md` (After Line 17)
```markdown
:::info Scale Clarification
**Delphin Scale** (Off-World Reference): 600-1,200 ft diameter spheres housing 10,000 people each represent advanced off-world technology and serve as inspirational reference.

**Light City Scale** (Earth Implementation): 30-90 m (100-300 ft) diameter domes housing 80-400 residents each, using proven technologies (CLT, geodesic structures, BIPV). See [Architecture](/docs/design/architecture) for detailed specifications.
:::
```

#### D. Update `communospheres.md` metadata (Line 404-406)
```markdown
BEFORE:
**Status**: New concept document based on Delphin information  
**Created**: October 10, 2025  
**Priority**: High - Core architectural component  

AFTER:
**Status**: Scale-clarified, investor-ready framework  
**Version**: 2.0 (Scale Separation)  
**Last Updated**: November 14, 2025  
**Last Reviewed**: November 14, 2025  
**Priority**: High - Core architectural component  
```

**Success Criteria**:
- ✅ Clear separation between Delphin (inspirational) and Earth (buildable)
- ✅ Consistent population targets across all documents
- ✅ No confusion about 10,000 vs. 80-120 people per dome

---

### Fix 1.2: Spire Function Clarification ⚠️⚠️
**Priority**: CRITICAL  
**Time**: 30 minutes  
**Files**: 2 files

**Changes Required**:

#### A. Update `architecture.md` (Lines 411-432)
```markdown
DELETE:
**Consciousness Energy**:
- Collective intention shapes the field
- Regular ceremonies maintain coherence
- The city "learns" and adapts energetically
- Consciousness of inhabitants is primary power source  ❌ DELETE THIS LINE

REPLACE WITH:
**Consciousness Energy** (Visionary Layer):
- Collective intention shapes the experiential field
- Regular ceremonies maintain community coherence
- **Role**: Enhances human consciousness and community well-being
- **Not a power source**: Physical electricity comes from microgrid (solar + batteries)
- **Research status**: TRL 1-3 (exploratory, not relied on for operations)
```

#### B. Update `communospheres.md` (Lines 66-70)
```markdown
BEFORE:
**How It Works**:
1. Central city spire generates/holds base frequency
2. Communospheres receive and maintain this frequency

AFTER:
**How It Works** (Research Hypothesis, TRL 1-3):
1. Central city spire generates/holds base RESONANCE frequency (acoustic/consciousness)
2. Communospheres receive and maintain this acoustic resonance
3. **Note**: This is experiential/acoustic resonance, NOT electrical power
4. **Physical power**: Provided by microgrid (solar PV + batteries)
```

**Success Criteria**:
- ✅ No statements claiming consciousness generates electrical power
- ✅ Clear distinction between resonance (acoustic) and power (electrical)
- ✅ Research status clearly labeled (TRL 1-3)

---

### Fix 1.3: Timeline Alignment ⚠️
**Priority**: CRITICAL  
**Time**: 20 minutes  
**Files**: 1 file

**Changes Required**:

#### Update `purpose-and-mission.md` (Lines 38-87)
```markdown
BEFORE:
### Short-Term (Stage 1-2: Next 6 months)

AFTER:
### Short-Term (Q4 2025 - Q2 2026: Stages 1-2)

**Timeline**: October 2025 - June 2026 (8 months)
**Current Status**: 85% through Stage 1 (as of Nov 14, 2025)

BEFORE:
### Medium-Term (Stage 3-4: 6-18 months)

AFTER:
### Medium-Term (Q3 2026 - Q4 2027: Stages 3-4)

**Timeline**: July 2026 - November 2027 (17 months)

BEFORE:
### Long-Term (Stage 5-6: 2+ years)

AFTER:
### Long-Term (2028-2031+: Stages 5-6)

**Timeline**: December 2027 - 2031+ (3+ years)
**Stage 5**: Physical manifestation (18-36 months)
**Stage 6**: Operations and evolution (ongoing)
```

#### Update metadata (Lines 217-219)
```markdown
BEFORE:
**Last Updated**: October 10, 2025  
**Related**: [Core Concepts](core-concepts.md), [Philosophy](philosophy.md)

AFTER:
**Version**: 2.0 (Timeline Aligned)  
**Last Updated**: November 14, 2025  
**Last Reviewed**: November 14, 2025  
**Related**: [Core Concepts](core-concepts.md), [Philosophy](philosophy.md), [Development Stages](../project/development-stages.md)
```

**Success Criteria**:
- ✅ All timeline references match Development-Stages.md
- ✅ No outdated "next 6 months" language
- ✅ Current status clearly indicated

---

### Fix 1.4: Financial Model Clarification ⚠️
**Priority**: CRITICAL  
**Time**: 30 minutes  
**Files**: 1 file

**Changes Required**:

#### Add section to `development-stages.md` (After Line 558)
```markdown
## Financial Model Notes & Assumptions

### Cross-Subsidy Structure

**Unit Economics**:
| Unit Type | Monthly Fee | Annual | Per-Resident Cost | Margin |
|-----------|-------------|--------|-------------------|---------|
| Tiny Home | $500-$700 | $6K-$8.4K | $8.7K-$18K | ❌ Loss leader |
| Studio | $700-$950 | $8.4K-$11.4K | $8.7K-$18K | ≈ Break-even |
| 1-Bedroom | $950-$1,300 | $11.4K-$15.6K | $8.7K-$18K | ✅ Profitable |
| 2-Bedroom | $1,300-$1,700 | $15.6K-$20.4K | $8.7K-$18K | ✅ Profitable |

**Cross-Subsidy Strategy**:
1. **Tiny homes** (25% of units) operate at loss, subsidized by larger units + retreat revenue
2. **Studios** (40% of units) approximately break-even
3. **1-BR and 2-BR** (35% of units) generate profit margin
4. **Retreat revenue** ($400K-$900K/year) is **essential**, not optional

### Critical Success Factors

**Revenue Dependencies**:
- **Occupancy**: 90%+ required for break-even (80% occupancy = operating loss)
- **Retreat Revenue**: Must achieve 800-1,500 guests/year @ $500-$600/guest
- **Unit Mix**: Cannot exceed 25% tiny homes without increasing fees
- **Pricing Power**: Must maintain fees within $500-$1,700 range (market competitive)

### Sensitivity Analysis

**10% Revenue Drop Scenarios**:
| Scenario | Impact | Mitigation |
|----------|--------|------------|
| Occupancy drops to 80% | -$185K-$252K/year | Increase marketing, improve retention |
| Retreat bookings -10% | -$40K-$90K/year | Diversify retreat offerings, partnerships |
| Fee resistance (5% discount) | -$93K-$126K/year | Value-add services, improve experience |
| **Combined worst case** | -$318K-$468K/year | Draw from reserves, cut discretionary costs |

**Risk Mitigation**:
1. **Build 12-18 month operating reserve** ($1.8M-$4.5M) before opening
2. **Guarantee minimum retreat bookings** (pre-sell 50% of Year 1 capacity)
3. **Dynamic pricing** (adjust fees based on demand, +/- 10%)
4. **Limit tiny homes** to 25% of total units (currently appropriate)
5. **Diversify revenue** (events, agritourism, licensing)

### Break-Even Analysis

**Base Case** (Mid Scenario):
- **Residents**: 180 @ average $925/month = $2.0M/year
- **Retreats**: 1,000 guests @ $550 = $550K/year
- **Other**: Events, agritourism, licensing = $300K/year
- **Total Revenue**: $2.85M/year
- **Total OPEX**: $2.5M/year
- **Margin**: $350K/year (12% margin)

**Conservative Case** (Low Scenario):
- **Residents**: 160 @ average $800/month = $1.54M/year
- **Retreats**: 800 guests @ $500 = $400K/year
- **Other**: $200K/year
- **Total Revenue**: $2.14M/year
- **Total OPEX**: $1.8M/year
- **Margin**: $340K/year (16% margin)

**Optimistic Case** (High Scenario):
- **Residents**: 220 @ average $1,100/month = $2.9M/year
- **Retreats**: 1,500 guests @ $600 = $900K/year
- **Other**: $450K/year
- **Total Revenue**: $4.25M/year
- **Total OPEX**: $3.6M/year
- **Margin**: $650K/year (15% margin)
```

**Success Criteria**:
- ✅ Cross-subsidy model clearly explained
- ✅ Retreat revenue identified as critical (not optional)
- ✅ Sensitivity analysis shows risks
- ✅ Mitigation strategies defined

---

### Fix 1.5: Create Governance Framework ⚠️
**Priority**: CRITICAL  
**Time**: 45 minutes  
**Files**: 1 new file + updates to 4 existing files

**Changes Required**:

#### A. Create new file: `website/docs/project/governance.md`
```markdown
---
id: governance
title: Governance Framework
sidebar_label: Governance
---

# Governance Framework

*Decision-making, authority, and community structure for Light City*

**Version**: 1.0  
**Last Updated**: November 14, 2025  
**Status**: Foundational Framework  
**Related**: [Development Stages](/docs/project/development-stages), [Core Concepts](/docs/concepts/core-concepts)

---

## Overview

Light City's governance evolves through development stages, transitioning from founder-led (Stages 1-4) to community-governed (Stages 5-6) while maintaining vision integrity and operational effectiveness.

### Governance Principles

1. **Transparency**: All decisions documented and accessible
2. **Participation**: Residents have voice in decisions affecting them
3. **Accountability**: Clear authority and responsibility
4. **Evolution**: Structure adapts as community grows
5. **Unity + Autonomy**: Collective alignment with individual sovereignty

---

## Legal Structure

### Stage 1-4: Development Phase

**Entity**: Light City Development, LLC (Delaware)

**Structure**:
- **Managing Member**: Founder (Stan Zemskoff)
- **Advisory Board**: 3-5 advisors (strategic guidance, no voting power)
- **Purpose**: Develop vision, raise capital, design, build community

**Authority**:
- Founder has final decision-making authority
- Advisory board provides input on major decisions
- Community feedback welcomed but not binding

**Rationale**: Agility and speed required during development; single point of accountability for investors

### Stage 5-6: Operational Phase

**Entity Transition** (Year 3-5):
- **Option A**: Convert to Co-op (resident ownership)
- **Option B**: Create dual structure (LLC + Community Association)
- **Option C**: Benefit Corporation (mission + profit)

**Structure** (Post-Transition):
- **Community Council**: Elected representatives (1 per 50 residents)
- **Founder**: Vision Keeper (advisory role, veto on core principles only)
- **Executive Director**: Day-to-day operations (hired by council)
- **Committees**: Finance, Facilities, Programs, Conflict Resolution

**Authority**:
- Community Council makes operational decisions (budget, policies, staffing)
- Founder retains veto on core principles (see below)
- Major decisions require consent-based approval (80% threshold)

---

## Decision-Making Framework

### Decision Types & Authority

| Decision Type | Stage 1-4 | Stage 5-6 | Threshold |
|---------------|-----------|-----------|-----------|
| **Vision/Principles** | Founder | Founder (veto only) | N/A |
| **Strategic Direction** | Founder + Advisory | Community Council | 80% consent |
| **Annual Budget** | Founder | Community Council | 80% consent |
| **Major Capital** (&gt;$100K) | Founder | Community Council | 80% consent |
| **Policies** | Founder | Community Council | 66% majority |
| **Operations** | Founder/Staff | Executive Director | N/A |
| **Conflict Resolution** | Founder | Conflict Committee | Case-by-case |

### Core Principles (Founder Veto Rights)

**Immutable Principles** (require founder consent to change):
1. Unity consciousness and higher ethics as foundational values
2. Sacred geometry and biophilic design in all structures
3. Commitment to regenerative practices (zero waste, renewable energy)
4. Consent-based participation (no coercion in consciousness practices)
5. Transparency and open documentation

**Rationale**: Protects vision integrity while allowing operational flexibility

---

## Community Council

### Structure (Stage 5-6)

**Composition**:
- 1 elected representative per 50 residents
- Phase 1 (200 residents): 4 council members
- Phase 2 (1,500 residents): 30 council members
- Phase 3 (8,000 residents): 160 council members (may delegate to committees)

**Terms**:
- 2-year terms, staggered (50% elected each year)
- Maximum 3 consecutive terms (6 years)
- Recall process available (66% resident vote)

**Meetings**:
- Monthly regular meetings (open to all residents)
- Quarterly town halls (full community participation)
- Emergency meetings as needed

**Responsibilities**:
- Approve annual budget and major expenditures
- Set policies and community guidelines
- Hire/evaluate Executive Director
- Oversee committees
- Resolve escalated conflicts

---

## Committees (Stage 5-6)

### Standing Committees

**Finance Committee**:
- Budget preparation and monitoring
- Financial reporting and transparency
- Investment oversight
- Fundraising strategy

**Facilities Committee**:
- Maintenance and repairs
- Capital improvements
- Energy and resource management
- Safety and security

**Programs Committee**:
- Retreat and event programming
- Education and workshops
- Community celebrations
- Guest services

**Conflict Resolution Committee**:
- Mediation and arbitration
- Policy interpretation
- Grievance process
- Restorative justice

**Membership Committee**:
- Application review
- Onboarding and orientation
- Exit process
- Community agreements

### Ad Hoc Committees

Created as needed for specific projects or issues (e.g., expansion planning, technology research, urban retrofit consulting)

---

## Decision-Making Processes

### Consent-Based Decision-Making

**Used for**: Major decisions affecting entire community

**Process**:
1. **Proposal**: Presented with rationale, impacts, alternatives
2. **Clarifying Questions**: Understanding before objections
3. **Reactions**: Initial thoughts and concerns
4. **Objections**: Principled objections only (not preferences)
5. **Integration**: Modify proposal to address objections
6. **Consent**: Proceed if no remaining principled objections

**Threshold**: 80% consent (20% can object, but must have principled reason)

**Principled Objection** = "This will harm the community or violate core principles"  
**Not Principled** = "I don't like it" or "I prefer a different approach"

### Majority Vote

**Used for**: Policies, operational decisions, committee elections

**Threshold**: 66% majority for policies, 50%+1 for elections

### Advice Process

**Used for**: Day-to-day operations, tactical decisions

**Process**:
1. Decision-maker identifies stakeholders
2. Seeks advice from affected parties and experts
3. Makes decision considering advice (not bound by it)
4. Communicates decision and rationale

**Authority**: Executive Director, committee chairs, department leads

---

## Conflict Resolution

### Four-Stage Process

**Stage 1: Direct Conversation** (Peer-to-Peer)
- Parties meet directly to resolve issue
- Use nonviolent communication (NVC) framework
- Document agreement if reached
- **Timeline**: Resolve within 7 days

**Stage 2: Mediation** (Facilitated)
- Trained mediator facilitates conversation
- Voluntary participation
- Confidential process
- **Timeline**: Resolve within 14 days

**Stage 3: Arbitration** (Conflict Committee)
- Conflict Resolution Committee hears case
- Binding decision with written rationale
- Appeal process available
- **Timeline**: Resolve within 30 days

**Stage 4: Exit Process** (Last Resort)
- If conflict unresolvable, exit process initiated
- Buyout terms per membership agreement
- 90-day transition period
- Exit interview and feedback

### Conflict Prevention

- **Community Agreements**: Clear expectations and norms
- **Regular Check-ins**: Monthly community circles
- **Training**: NVC, active listening, restorative justice
- **Early Intervention**: Address issues before escalation

---

## Membership & Residency

### Application Process (Stage 5-6)

**Steps**:
1. **Inquiry**: Attend retreat or info session
2. **Application**: Submit written application + references
3. **Interview**: Meet with Membership Committee
4. **Trial Stay**: 1-4 week trial residency
5. **Decision**: Committee recommendation → Council approval
6. **Onboarding**: 3-month integration period

**Criteria**:
- Alignment with core principles and values
- Financial capacity (income verification, credit check)
- Community fit (references, interview, trial stay)
- Skills/contributions (diversity of talents valued)
- Commitment (minimum 2-year residency)

### Membership Agreement

**Includes**:
- Monthly fee structure and payment terms
- Community agreements and expectations
- Governance participation requirements
- Conflict resolution process
- Exit terms and buyout formula
- Liability and insurance

### Exit Process

**Voluntary Exit**:
- 90-day notice required
- Prorated refund of deposits (minus damages)
- Exit interview (feedback for improvement)
- Transition support (housing search, moving assistance)

**Involuntary Exit** (Rare):
- Violation of community agreements
- Failure to pay fees (90 days delinquent)
- Unresolved conflict (after Stage 3 arbitration)
- **Process**: 30-day notice, appeal to Community Council, 60-day transition

**Buyout Formula** (for equity holders):
- Appraised value of equity stake
- Minus outstanding obligations
- Paid over 12-24 months
- Right of first refusal to community

---

## Financial Governance

### Budget Process

**Annual Cycle**:
1. **Aug-Sep**: Department budget requests
2. **Oct**: Finance Committee draft budget
3. **Nov**: Community review and feedback
4. **Dec**: Council approval (80% consent)
5. **Jan**: Implementation

**Transparency**:
- Monthly financial reports (revenue, expenses, reserves)
- Quarterly town halls with financial review
- Annual audit (third-party CPA)
- All reports publicly accessible (website)

### Reserve Funds

**Operating Reserve**: 12-18 months OPEX ($1.8M-$4.5M)
- Covers cash flow gaps, emergencies, revenue shortfalls

**Capital Reserve**: $200K-$500K/year
- Replacement of major systems (roof, HVAC, etc.)
- Planned capital improvements

**Expansion Fund**: Variable
- Phase 2/3 development
- New communospheres, facilities

### Investment Policy

**Principles**:
- Impact-first (mission alignment over returns)
- Diversified (no single investment &gt;10% of reserves)
- Liquid (50% accessible within 30 days)
- Transparent (quarterly reporting)

**Allowed Investments**:
- ESG funds, green bonds, community development
- Real estate (mission-aligned properties)
- Social enterprises (aligned with values)

**Prohibited**:
- Fossil fuels, weapons, tobacco, private prisons
- Speculative derivatives, cryptocurrencies (except stablecoins)

---

## Accountability & Transparency

### Reporting

**Monthly** (to residents):
- Financial summary (1-page dashboard)
- Operational updates (facilities, programs, community)
- Upcoming decisions and opportunities for input

**Quarterly** (to residents + investors):
- Detailed financial statements
- KPI dashboard (occupancy, satisfaction, sustainability metrics)
- Strategic progress update

**Annual** (public):
- Impact report (environmental, social, economic)
- Audited financial statements
- Community survey results
- Lessons learned and future plans

### Open Documentation

**Public Access** (website):
- Governance framework and policies
- Community agreements and expectations
- Financial reports (summary level)
- Meeting minutes (Community Council)
- Impact reports

**Resident Access** (member portal):
- Detailed financial statements
- Vendor contracts and agreements
- Conflict resolution case summaries (anonymized)
- Strategic plans and roadmaps

---

## Evolution & Amendments

### Framework Updates

**Minor Changes** (policies, procedures):
- Community Council approval (66% majority)
- 30-day notice to residents
- Effective immediately upon approval

**Major Changes** (structure, core principles):
- Proposal with 60-day review period
- Community feedback and dialogue
- Council approval (80% consent)
- Founder consent (if core principle affected)
- 90-day implementation period

### Constitutional Convention

**Trigger**: Every 5 years or upon 66% resident petition

**Process**:
- 6-month process with full community participation
- Review and update governance framework
- Propose amendments
- Ratification by 80% consent vote

---

## Frequently Asked Questions

**Q: Who really has control—founder or community?**  
A: Founder during development (Stages 1-4) for agility and investor accountability. Community during operations (Stages 5-6) with founder retaining veto on core principles only.

**Q: What if the founder and community disagree?**  
A: Founder veto limited to 5 core principles (listed above). All other decisions are community-governed in Stage 5-6. Conflict resolution process applies.

**Q: Can I be kicked out?**  
A: Only for serious violations (non-payment, violence, unresolved conflict). Process includes notice, appeal, and 60-90 day transition. Exit interview ensures fairness.

**Q: How much voice do I have as a resident?**  
A: Stage 5-6: Vote for council representatives, participate in town halls, serve on committees, use advice process for proposals. Direct democracy on major decisions (80% consent).

**Q: What if governance isn't working?**  
A: Constitutional convention every 5 years (or upon 66% petition) allows full framework review and amendment.

---

**Status**: Foundational framework, will evolve with community input  
**Next Steps**: 
1. Review by legal counsel (Stage 2)
2. Advisory board feedback (Stage 2)
3. Community input process (Stage 4)
4. Formal adoption (Stage 5 launch)

**Related Documents**: 
- [Development Stages](/docs/project/development-stages) - Timeline and implementation
- [Core Concepts](/docs/concepts/core-concepts) - Vision and principles
- [Purpose and Mission](/docs/concepts/purpose-and-mission) - Project goals

---

**📝 [Edit this page on GitHub](https://github.com/szemkoff/light-city-project/edit/main/website/docs/project/governance.md)** | **📊 [View Updates](/blog)**
```

#### B. Update `sidebars.ts` to include governance.md
```typescript
// Add under "Development" category
{
  type: 'category',
  label: 'Development',
  items: [
    'project/development-stages',
    'project/governance',  // ADD THIS LINE
    'project/quick-start-guide',
    'project/project-structure',
    'project/contributing',
    'project/tools-and-workflows',
  ],
},
```

#### C. Add references in other documents
- `development-stages.md`: Add link to governance.md in Stage 4
- `core-concepts.md`: Add link in "Collective Co-Creation" section
- `architecture.md`: Add link in "Social Organization" section
- `energy-systems.md`: Add link in "Ethics Review" section

**Success Criteria**:
- ✅ Clear legal structure defined (LLC → Co-op transition)
- ✅ Decision-making authority specified for each stage
- ✅ Conflict resolution process documented
- ✅ Financial governance framework established
- ✅ Membership and exit processes defined

---

## 🟡 PHASE 2: MODERATE FIXES (Should Do - 1-2 hours)

### Fix 2.1: Standardize Delphin Framing
**Priority**: MODERATE  
**Time**: 30 minutes  
**Files**: 4 files

**Standard Language** (use everywhere):
```markdown
**Delphin** is described in channeled/contact information as a crystal city on planet Israel (another star system). We treat this as **inspirational reference and design archetype** rather than empirical evidence. The principles (central spire, communospheres, sacred geometry) align with Light City's vision and provide a coherent design pattern, whether Delphin is literal or archetypal.
```

**Files to Update**:
1. `core-concepts.md` (Lines 275-291)
2. `architecture.md` (Line 28)
3. `communospheres.md` (Lines 391-400)
4. `purpose-and-mission.md` (Line 3 caption)

---

### Fix 2.2: Fix Knowledge Transfer Claims
**Priority**: MODERATE  
**Time**: 20 minutes  
**Files**: 1 file

**Update** `communospheres.md` (Lines 148-152):
- Add research framing (same as energy-systems.md)
- Clarify as testable hypothesis (TRL 1-2)
- Add link to Energy Systems for protocols

---

### Fix 2.3: Update All "Last Updated" Dates
**Priority**: MODERATE  
**Time**: 10 minutes  
**Files**: 8 files

**Update to**: November 14, 2025

**Files**:
1. core-concepts.md
2. architecture.md
3. energy-systems.md
4. communospheres.md
5. purpose-and-mission.md
6. sacred-geometry.md
7. technology-catalog.md
8. urban-retrofit-guide.md

---

### Fix 2.4: Create Glossary
**Priority**: MODERATE  
**Time**: 30 minutes  
**Files**: 1 new file

**Create**: `website/docs/project/glossary.md`

**Include**:
- Standardized terminology (see Issue #13 in analysis)
- Cross-references to detailed explanations
- Acronyms (TRL, CAPEX, OPEX, BIPV, CLT, etc.)

---

### Fix 2.5: Add Stakeholder Entry Points
**Priority**: MODERATE  
**Time**: 30 minutes  
**Files**: 4 new files

**Create**:
1. `website/docs/for-investors.md`
2. `website/docs/for-residents.md`
3. `website/docs/for-builders.md`
4. `website/docs/for-researchers.md`

---

## 🟢 PHASE 3: MINOR FIXES (Nice to Have - 1 hour)

### Fix 3.1: Reduce Content Duplication
**Priority**: MINOR  
**Time**: 20 minutes

**Strategy**: Make architecture.md single source of truth for specs
- Other docs reference, don't duplicate

---

### Fix 3.2: Add Cross-References
**Priority**: MINOR  
**Time**: 15 minutes

**Add** "Related Documents" section to all pages with consistent format

---

### Fix 3.3: Add Image Alt Text
**Priority**: MINOR  
**Time**: 15 minutes

**Update** all images with descriptive alt text (accessibility + SEO)

---

### Fix 3.4: Create FAQ Document
**Priority**: MINOR  
**Time**: 30 minutes

**Create**: `website/docs/faq.md`

**Include** 10 most common questions (see Issue #18 in analysis)

---

## 📋 EXECUTION CHECKLIST

### Pre-Execution
- [ ] Backup current state (git tag v1.0-pre-fixes)
- [ ] Create feature branch (git checkout -b documentation-fixes)
- [ ] Ensure local dev server running (npm run start)

### Phase 1 Execution (Critical - Sequential)
- [ ] Fix 1.1: Communosphere scale (45 min)
  - [ ] Update communospheres.md
  - [ ] Test all cross-references
  - [ ] Commit: "Fix communosphere scale contradictions"
- [ ] Fix 1.2: Spire function (30 min)
  - [ ] Update architecture.md
  - [ ] Update communospheres.md
  - [ ] Commit: "Clarify spire function (resonance not power)"
- [ ] Fix 1.3: Timeline alignment (20 min)
  - [ ] Update purpose-and-mission.md
  - [ ] Commit: "Align timeline with development stages"
- [ ] Fix 1.4: Financial model (30 min)
  - [ ] Update development-stages.md
  - [ ] Commit: "Add financial model clarifications"
- [ ] Fix 1.5: Governance framework (45 min)
  - [ ] Create governance.md
  - [ ] Update sidebars.ts
  - [ ] Add cross-references
  - [ ] Commit: "Add comprehensive governance framework"

### Phase 1 Testing
- [ ] Build site (npm run build)
- [ ] Check for broken links
- [ ] Review all changed pages
- [ ] Verify no contradictions remain

### Phase 2 Execution (Moderate - Can Batch)
- [ ] Fix 2.1: Delphin framing (30 min)
- [ ] Fix 2.2: Knowledge transfer (20 min)
- [ ] Fix 2.3: Update dates (10 min)
- [ ] Fix 2.4: Create glossary (30 min)
- [ ] Fix 2.5: Stakeholder entry points (30 min)
- [ ] Commit: "Moderate fixes: Delphin framing, dates, glossary, entry points"

### Phase 2 Testing
- [ ] Build site
- [ ] Check new pages render correctly
- [ ] Verify glossary links work

### Phase 3 Execution (Minor - Optional)
- [ ] Fix 3.1: Reduce duplication (20 min)
- [ ] Fix 3.2: Add cross-references (15 min)
- [ ] Fix 3.3: Image alt text (15 min)
- [ ] Fix 3.4: Create FAQ (30 min)
- [ ] Commit: "Minor improvements: deduplication, cross-refs, alt text, FAQ"

### Final Review
- [ ] Full site build (npm run build)
- [ ] Manual review of all changed pages
- [ ] Check consistency across documents
- [ ] Verify all quality gates passed
- [ ] Run linter (if available)

### Deployment
- [ ] Merge to main (git merge documentation-fixes)
- [ ] Push to GitHub (git push origin main)
- [ ] Verify GitHub Pages deployment
- [ ] Tag release (git tag v2.0-consistency-fixes)
- [ ] Update CHANGELOG.md or blog post

---

## 🎯 SUCCESS METRICS

### Quality Gates (Must Pass)
- ✅ Zero contradictory statements about scale/population
- ✅ Zero claims of consciousness generating electrical power
- ✅ All timeline references consistent
- ✅ Financial model internally consistent
- ✅ Governance framework complete and clear
- ✅ All cross-references work (no 404s)
- ✅ All dates current (Nov 14, 2025)
- ✅ Terminology consistent (per glossary)

### Stakeholder Readiness
- ✅ **Investors**: Can understand financial model, governance, timeline
- ✅ **Engineers**: Can see buildable specs, TRLs, proven technologies
- ✅ **Residents**: Can understand living experience, costs, governance
- ✅ **Researchers**: Can see measurement protocols, ethics framework

---

## 📞 SUPPORT & QUESTIONS

**If Issues Arise**:
1. Check git log for recent changes
2. Use git diff to compare versions
3. Rollback specific commit if needed (git revert)
4. Consult DOCUMENTATION-REVIEW-ANALYSIS.md for context

**Testing Strategy**:
- Build locally after each phase
- Check browser console for errors
- Verify links work (click through)
- Read changed pages as if you're a first-time visitor

---

## 📊 TIME ESTIMATES

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **Phase 1** | Critical fixes (5 tasks) | 2-3 hours | MUST DO |
| **Phase 2** | Moderate fixes (5 tasks) | 1-2 hours | SHOULD DO |
| **Phase 3** | Minor fixes (4 tasks) | 1 hour | NICE TO HAVE |
| **Testing** | Build, review, verify | 30 min | MUST DO |
| **TOTAL** | 14 tasks + testing | **4-6 hours** | |

**Recommended Approach**: 
- **Day 1**: Phase 1 (Critical) - 3 hours
- **Day 2**: Phase 2 (Moderate) - 2 hours  
- **Day 3**: Phase 3 (Minor) + Final review - 1.5 hours

---

## ✅ COMPLETION CRITERIA

**Phase 1 Complete When**:
- All critical issues resolved
- No contradictory statements remain
- Investor presentation-ready

**Phase 2 Complete When**:
- Delphin consistently framed
- All dates current
- Glossary and entry points created

**Phase 3 Complete When**:
- Content deduplicated
- All cross-references added
- FAQ created

**Project Complete When**:
- All quality gates passed
- Deployed to GitHub Pages
- Stakeholder review completed

---

**Status**: Ready for Execution  
**Next Action**: Review plan → Begin Phase 1 Fix 1.1  
**Estimated Completion**: 3 days (if 2-3 hours/day)

**Questions?** Review DOCUMENTATION-REVIEW-ANALYSIS.md for detailed context on each issue.

