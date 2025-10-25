#!/usr/bin/env python3
import os
import re

docs_dir = "/Users/stantheman/Light City Project/docs"

# Map of file paths to their IDs and titles
files_to_update = {
    "concepts/communospheres.md": ("communospheres", "Communospheres"),
    "concepts/energy-systems.md": ("energy-systems", "Energy Systems"),
    "concepts/philosophy.md": ("philosophy", "Philosophy"),
    "concepts/purpose-and-mission.md": ("purpose-and-mission", "Purpose and Mission"),
    "concepts/sacred-geometry.md": ("sacred-geometry", "Sacred Geometry"),
    "design/architecture.md": ("architecture", "Architecture"),
    "design/color-and-light.md": ("color-and-light", "Color and Light"),
    "design/visual-language.md": ("visual-language", "Visual Language"),
    "design/layout-diagrams.md": ("layout-diagrams", "Layout Diagrams"),
    "project/contributing.md": ("contributing", "Contributing"),
    "project/development-stages.md": ("development-stages", "Development Stages"),
    "project/project-structure.md": ("project-structure", "Project Structure"),
    "project/quick-start-guide.md": ("quick-start-guide", "Quick Start Guide"),
    "project/tools-and-workflows.md": ("tools-and-workflows", "Tools and Workflows"),
    "research/bibliography.md": ("bibliography", "Bibliography"),
    "research/open-questions.md": ("open-questions", "Open Questions"),
    "technical/github-docusaurus-setup.md": ("github-docusaurus-setup", "GitHub + Docusaurus Setup"),
}

for file_path, (doc_id, title) in files_to_update.items():
    full_path = os.path.join(docs_dir, file_path)
    
    if not os.path.exists(full_path):
        print(f"Skipping {file_path} - file not found")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if frontmatter already exists
    if content.startswith('---'):
        print(f"Skipping {file_path} - already has frontmatter")
        continue
    
    # Add frontmatter
    frontmatter = f"""---
id: {doc_id}
title: {title}
sidebar_label: {title}
---

"""
    
    new_content = frontmatter + content
    
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Added frontmatter to {file_path}")

print("\nDone!")

