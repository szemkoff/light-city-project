---
id: github-docusaurus-setup
title: GitHub + Docusaurus Setup
sidebar_label: GitHub + Docusaurus Setup
---

# GitHub + Docusaurus Setup Guide

**Created**: October 10, 2025  
**Purpose**: Instructions for publishing Light City project on GitHub with Docusaurus documentation site  
**Status**: Ready to implement

## Why This Combination?

### GitHub Benefits
- ✅ Version control and backup
- ✅ Collaboration features (issues, pull requests)
- ✅ Free hosting for public repositories
- ✅ GitHub Pages for free website hosting
- ✅ Community discovery
- ✅ Professional presentation

### Docusaurus Benefits
- ✅ Beautiful, modern documentation website
- ✅ Built for technical documentation
- ✅ Markdown-based (your files work as-is!)
- ✅ Search functionality
- ✅ Versioning support
- ✅ Dark mode built-in
- ✅ Mobile responsive
- ✅ Easy to customize
- ✅ React-based (can add interactive features)

### Perfect for Light City
- Professional presentation of vision
- Easy for collaborators to navigate
- Beautiful way to share with world
- Can showcase images and diagrams
- Supports the spiritual + technical nature of project

## Step 1: Create GitHub Repository

### 1.1 Go to GitHub
1. Open https://github.com
2. Sign in (or create account if needed)
3. Click the "+" in top right
4. Select "New repository"

### 1.2 Repository Settings

**Repository name**: `light-city-project` (or `LightCity`)

**Description**: 
```
A comprehensive framework for manifesting Light City - a higher-consciousness civilization integrating spiritual principles, sacred architecture, and advanced energy systems. Inspired by the crystal city of Delphin.
```

**Visibility**: 
- **Public** (recommended - share the vision!)
- OR **Private** (if you want to develop privately first)

**Initialize**: 
- ⬜ DO NOT add README (you already have one)
- ⬜ DO NOT add .gitignore (you already have one)
- ⬜ DO NOT add license yet (decide later)

**Click**: "Create repository"

### 1.3 Connect Your Local Repository

GitHub will show you commands. Use these:

```bash
cd "/Users/stantheman/Light City Project"
git remote add origin https://github.com/YOUR-USERNAME/light-city-project.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 2: Set Up Docusaurus

### 2.1 Prerequisites

You need Node.js installed. Check if you have it:

```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org (use LTS version)

### 2.2 Create Docusaurus Site

From your project root:

```bash
cd "/Users/stantheman/Light City Project"
npx create-docusaurus@latest website classic --typescript
```

This creates a `website/` folder with Docusaurus.

### 2.3 Docusaurus Directory Structure

After setup, you'll have:

```
Light City Project/
├── docs/                    # Your existing docs (we'll link to these)
├── website/                 # NEW - Docusaurus site
│   ├── docs/               # Docusaurus docs (we'll configure)
│   ├── blog/               # Optional blog
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── static/             # Images, assets
│   ├── docusaurus.config.js
│   └── package.json
├── assets/
├── research/
└── planning/
```

### 2.4 Configure Docusaurus for Your Docs

**Option A: Symlink (Recommended)**

Link your existing `docs/` to Docusaurus:

```bash
cd "/Users/stantheman/Light City Project/website"
rm -rf docs  # Remove default docs
ln -s ../docs docs  # Link to your docs
```

**Option B: Copy Files**

```bash
cp -r docs/* website/docs/
```

(But you'll need to update both locations)

### 2.5 Configure docusaurus.config.js

Edit `website/docusaurus.config.js`:

```javascript
module.exports = {
  title: 'Light City Project',
  tagline: 'Manifesting Higher-Consciousness Civilization',
  favicon: 'img/favicon.ico',
  
  url: 'https://YOUR-USERNAME.github.io',
  baseUrl: '/light-city-project/',
  
  organizationName: 'YOUR-USERNAME',
  projectName: 'light-city-project',
  
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Light City Updates',
          blogDescription: 'Progress updates and insights',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  
  themeConfig: {
    image: 'img/light-city-social-card.jpg',
    navbar: {
      title: 'Light City',
      logo: {
        alt: 'Light City Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Updates', position: 'left'},
        {
          href: 'https://github.com/YOUR-USERNAME/light-city-project',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Start Here', to: '/docs/START-HERE'},
            {label: 'Core Concepts', to: '/docs/concepts/core-concepts'},
            {label: 'Architecture', to: '/docs/design/architecture'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Development Stages', to: '/docs/project/development-stages'},
            {label: 'Contributing', to: '/docs/project/contributing'},
            {label: 'Quick Start', to: '/docs/project/quick-start-guide'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Updates', to: '/blog'},
            {label: 'GitHub', href: 'https://github.com/YOUR-USERNAME/light-city-project'},
          ],
        },
      ],
      copyright: `Light City Project © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};
```

### 2.6 Configure Sidebar

Edit `website/sidebars.js` to match your documentation structure:

```javascript
module.exports = {
  docsSidebar: [
    'START-HERE',
    'README',
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'concepts/core-concepts',
        'concepts/philosophy',
        'concepts/purpose-and-mission',
        'concepts/sacred-geometry',
        'concepts/communospheres',
        'concepts/energy-systems',
      ],
    },
    {
      type: 'category',
      label: 'Design & Architecture',
      items: [
        'design/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Project Management',
      items: [
        'project/development-stages',
        'project/quick-start-guide',
        'project/project-structure',
        'project/tools-and-workflows',
        'project/contributing',
      ],
    },
    {
      type: 'category',
      label: 'Research',
      collapsed: true,
      items: [
        'research/README',
      ],
    },
  ],
};
```

### 2.7 Update .gitignore

Add to your `.gitignore`:

```
# Docusaurus
website/node_modules/
website/.docusaurus/
website/build/
website/.DS_Store
```

## Step 3: Customize Appearance

### 3.1 Custom Colors (Light City Theme)

Edit `website/src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #4a9eff;  /* Light blue */
  --ifm-color-primary-dark: #2b8aff;
  --ifm-color-primary-darker: #1a7ff5;
  --ifm-color-primary-darkest: #0969d9;
  --ifm-color-primary-light: #69afff;
  --ifm-color-primary-lighter: #7ab8ff;
  --ifm-color-primary-lightest: #a0cbff;
  
  /* Light City inspired */
  --ifm-background-color: #fafbfc;
  --ifm-heading-color: #2c5282;
}

[data-theme='dark'] {
  --ifm-color-primary: #7ab8ff;
  --ifm-background-color: #1a202c;
  --ifm-heading-color: #a0cbff;
}

/* Custom styling for sacred geometry feel */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

### 3.2 Custom Homepage

Create `website/src/pages/index.tsx` with Light City introduction.

### 3.3 Add Images

Copy your visual references:

```bash
cp assets/images/inspiration/*.png website/static/img/
cp assets/images/inspiration/*.jpg website/static/img/
```

## Step 4: Test Locally

### 4.1 Install Dependencies

```bash
cd "/Users/stantheman/Light City Project/website"
npm install
```

### 4.2 Start Development Server

```bash
npm start
```

This opens http://localhost:3000 with live preview!

### 4.3 Build for Production

```bash
npm run build
```

Creates optimized static site in `website/build/`

## Step 5: Deploy to GitHub Pages

### 5.1 Configure Deployment

Already configured in `docusaurus.config.js` (see Step 2.5)

### 5.2 Deploy

From `website/` directory:

```bash
GIT_USER=YOUR-USERNAME npm run deploy
```

Or set up GitHub Actions for automatic deployment:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
          cache-dependency-path: website/package-lock.json
      
      - name: Install dependencies
        run: cd website && npm ci
      
      - name: Build website
        run: cd website && npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/build
          user_name: github-actions[bot]
          user_email: 41898282+github-actions[bot]@users.noreply.github.com
```

### 5.3 Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings"
3. Scroll to "Pages" (left sidebar)
4. Source: Deploy from a branch
5. Branch: `gh-pages` / `root`
6. Save

Your site will be live at:
`https://YOUR-USERNAME.github.io/light-city-project/`

## Step 6: Maintain Both Repositories

### 6.1 Update Workflow

When you update documentation:

```bash
# Edit your markdown files in docs/
vim docs/concepts/core-concepts.md

# Commit to Git
git add docs/concepts/core-concepts.md
git commit -m "Update core concepts"
git push

# If using symlinks, Docusaurus auto-updates
# If not, copy to website:
cp -r docs/* website/docs/

# Rebuild and deploy
cd website
npm run build
npm run deploy
```

### 6.2 Automated Workflow

With GitHub Actions (Step 5.2), just:

```bash
git add .
git commit -m "Your update"
git push
```

And the site auto-deploys! 🚀

## Alternative: Simple GitHub Pages (Without Docusaurus)

If Docusaurus feels too complex initially:

### Option 1: GitHub Pages with Jekyll (Simpler)

1. Create `website/` folder
2. Add `_config.yml`:
```yaml
title: Light City Project
description: Manifesting Higher-Consciousness Civilization
theme: jekyll-theme-cayman
```
3. Push to GitHub
4. Enable Pages in settings

Your markdown renders automatically!

### Option 2: README-Only Approach

Just push to GitHub with your excellent README.md. GitHub renders it beautifully by default.

## Recommended Approach for Light City

### Phase 1 (Now): GitHub Only
- Push project to GitHub
- Use GitHub's built-in markdown rendering
- Share repository link
- **Benefit**: Quick, simple, no setup

### Phase 2 (Stage 2-3): Add Docusaurus
- Set up Docusaurus when you have more visual content
- Add custom homepage with images
- Professional documentation site
- **Benefit**: Beautiful presentation for public launch

### Phase 3 (Stage 4+): Full Features
- Blog for updates
- Search functionality
- Interactive features
- Community integration

## Quick Start Commands

### Minimal Setup (GitHub Only)

```bash
# Already done!
git init
git add .
git commit -m "Initial commit"

# On GitHub: Create repository

# Then:
git remote add origin https://github.com/YOUR-USERNAME/light-city-project.git
git push -u origin main
```

### Full Setup (GitHub + Docusaurus)

```bash
# 1. GitHub (above)

# 2. Docusaurus
cd "/Users/stantheman/Light City Project"
npx create-docusaurus@latest website classic
cd website
rm -rf docs
ln -s ../docs docs
npm install
npm start  # Test locally

# 3. Deploy
npm run build
GIT_USER=YOUR-USERNAME npm run deploy
```

## Benefits Summary

| Feature | GitHub Only | + Docusaurus |
|---------|-------------|--------------|
| Version control | ✅ | ✅ |
| Collaboration | ✅ | ✅ |
| Markdown rendering | ✅ | ✅✅ |
| Professional site | 🟡 | ✅✅ |
| Search | ❌ | ✅ |
| Custom styling | ❌ | ✅ |
| Blog/Updates | ❌ | ✅ |
| Setup time | 5 mins | 30 mins |
| Maintenance | Low | Medium |

## My Recommendation

**For Right Now:**

1. ✅ **Push to GitHub** (Already initialized!)
2. ⏳ **Use GitHub's rendering** (Simple, immediate)
3. ⏳ **Add Docusaurus in Stage 2** (When you have more visual content)

**Why?**

- Get your work backed up and visible NOW
- GitHub markdown rendering is actually quite good
- You can add Docusaurus later without changing your files
- Focus on content creation now, fancy website later
- Docusaurus makes more sense when you have diagrams, images, blog posts

## Next Steps

### Immediate (Next 5 Minutes)

1. Create GitHub repository
2. Run these commands:
```bash
cd "/Users/stantheman/Light City Project"
git remote add origin https://github.com/YOUR-USERNAME/light-city-project.git
git push -u origin main
```

3. Share the link! `https://github.com/YOUR-USERNAME/light-city-project`

### This Week (If You Want Docusaurus)

1. Install Node.js (if needed)
2. Run Docusaurus setup
3. Test locally
4. Deploy to GitHub Pages

### Need Help?

- GitHub Docs: https://docs.github.com
- Docusaurus Docs: https://docusaurus.io
- I can help with specific configuration!

---

**Status**: Git repository initialized ✅  
**Next**: Create GitHub repository and push  
**Optional**: Set up Docusaurus for beautiful site  
**Timeline**: GitHub now, Docusaurus in Stage 2-3

**Your project is ready to go public!** 🌟

