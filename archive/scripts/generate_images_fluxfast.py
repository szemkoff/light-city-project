#!/usr/bin/env python3
"""
Light City Image Generation Script
Generates all homepage images using FluxFast 1.1 API

Requirements:
    pip install requests pillow

Usage:
    1. Get API key from https://fluxfast.ai
    2. Set environment variable: export FLUXFAST_API_KEY="your-key-here"
    3. Run: python generate_images_fluxfast.py
"""

import os
import sys
import json
import time
import requests
from pathlib import Path
from typing import Dict, List, Optional
from PIL import Image
from io import BytesIO

# Configuration
API_KEY = os.environ.get('FLUXFAST_API_KEY')
API_BASE_URL = "https://api.fluxfast.ai/v1"  # Update with actual FluxFast API endpoint
OUTPUT_DIR = Path(__file__).parent / "website" / "static" / "img" / "homepage"
TEMP_DIR = Path(__file__).parent / "temp_images"

# Image specifications
IMAGES = {
    "agroforestry-food-forest": {
        "priority": 1,
        "width": 1600,
        "height": 900,
        "prompt": """A thriving agroforestry food forest system with multiple layers of edible plants, 
fruit trees, berry bushes, and vegetable gardens integrated in a natural woodland setting. 
Sunlight filtering through tree canopy, diverse plant species, permaculture design with 
winding paths, people harvesting food in harmony with nature. Photorealistic, vibrant colors, 
golden hour lighting, aerial perspective showing the layered ecosystem. Style: National 
Geographic photography, professional landscape photography, 8K quality."""
    },
    "community-circle-dome": {
        "priority": 1,
        "width": 1600,
        "height": 900,
        "prompt": """Aerial view of a community gathering circle inside a stunning geodesic dome 
communosphere. 30 people arranged in concentric circles on a floor with sacred geometry 
patterns (Flower of Life inlaid in polished wood and crystal). Natural light streaming 
through triangular glass panels. Cross-laminated timber (CLT) structure visible. Hanging 
gardens and bioluminescent plants around the perimeter. People of all ages in comfortable, 
flowing clothing. Warm, inviting atmosphere. Photorealistic architectural photography, 
golden hour lighting, 8K quality."""
    },
    "financial-dashboard": {
        "priority": 1,
        "width": 1920,
        "height": 1080,
        "prompt": """Modern financial dashboard interface showing Light City project metrics. 
Clean, dark theme UI with purple and gold accents. Multiple data visualizations: line graph 
showing 8-12% IRR projection over 10 years, bar chart comparing Stage 1-6 budgets 
($22M-$95M), circular progress indicator at 85% for Stage 1, pie chart showing revenue 
breakdown (resident fees 60%, retreats 25%, partnerships 15%). Futuristic holographic style 
with subtle glow effects. Professional fintech aesthetic. High contrast, readable typography. 
Style: Modern UI/UX design, Figma mockup quality, 4K resolution."""
    },
    "communosphere-interior": {
        "priority": 1,
        "width": 1600,
        "height": 900,
        "prompt": """Interior of a stunning geodesic dome home with floor-to-ceiling triangular 
windows showing lush forest outside. Open-plan living space with natural materials: 
cross-laminated timber (CLT) beams, polished concrete floors with radiant heating, living 
plant walls covering one curved wall. Modern minimalist furniture in earth tones. Sunlight 
streaming through the geometric glass panels creating beautiful light patterns. Hanging 
plants, a small indoor water feature, and subtle sacred geometry art on walls. Cozy reading 
nook with floor cushions. Warm, inviting atmosphere. Photorealistic architectural interior 
photography, golden hour lighting, 8K quality."""
    },
    "hero-crystal-city-aerial": {
        "priority": 2,
        "width": 2560,
        "height": 1080,
        "prompt": """Stunning aerial photograph of an eco-village prototype at sunset. 6 geodesic 
dome structures (30-60m diameter) arranged in a hexagonal pattern around a central gathering 
plaza with a tall observation tower (60m). Cross-laminated timber and glass construction. 
Surrounded by regenerative agriculture - food forests, permaculture gardens, solar arrays. 
Mountain backdrop. Golden hour lighting with long shadows. Drone photography, photorealistic, 
National Geographic quality, 8K resolution, ultra-wide aspect ratio."""
    },
    "energy-system-dual-track": {
        "priority": 2,
        "width": 1600,
        "height": 900,
        "prompt": """Split-screen technical illustration showing Light City's dual energy system. 
Left side: Physical microgrid with solar panels, battery storage, smart grid connections, 
labeled with technical specs (TRL 8-9). Right side: Subtle energy layer with acoustic 
resonance visualization (sound waves), crystal spire emitting geometric light patterns, 
consciousness field represented as interconnected nodes of light (TRL 1-3). Center: geodesic 
dome structure bridging both systems. Dark background with purple and gold accents. 
Professional infographic style, clean lines, modern technical illustration. Style: Scientific 
journal illustration meets sacred geometry art, 4K quality."""
    },
    "construction-progress": {
        "priority": 2,
        "width": 1600,
        "height": 900,
        "prompt": """Construction site photograph showing a geodesic dome being built. 
Cross-laminated timber (CLT) panels being installed by workers. Partially completed dome 
structure (30m diameter) with triangular glass panels being fitted. Construction crane in 
background. Workers in safety gear collaborating. Solar panels stacked nearby ready for 
installation. Blue sky, professional construction photography. Photorealistic, documentary 
style, showing real building process. Style: Architectural construction documentation, 
professional photography, 8K quality."""
    },
    "sacred-geometry-blueprint": {
        "priority": 3,
        "width": 1200,
        "height": 1200,
        "prompt": """Architectural blueprint overlay showing sacred geometry patterns integrated 
into Light City design. Flower of Life pattern as the foundation, with geodesic dome 
structures positioned at key intersection points. Golden ratio spiral overlaying the city 
layout. Metatron's Cube connecting the central spire to outer domes. Platonic solids floating 
around the composition. Dark blueprint background with glowing golden lines. Technical 
precision meets mystical symbolism. Style: Architectural technical drawing meets sacred 
geometry art, high contrast, 4K quality, square format."""
    },
    "resident-daily-life": {
        "priority": 3,
        "width": 1600,
        "height": 900,
        "prompt": """Lifestyle photography showing a day in Light City. Composite image with 
multiple vignettes: morning meditation in a geodesic dome with sunlight streaming in, people 
harvesting vegetables in a food forest, community meal in a shared dining space, children 
playing in a natural playground, evening gathering around a fire pit under the stars. Warm, 
natural lighting. Diverse people of all ages. Modern bohemian aesthetic. Photorealistic, 
documentary lifestyle photography, 8K quality."""
    },
    "technology-showcase": {
        "priority": 3,
        "width": 1600,
        "height": 900,
        "prompt": """Technology showcase collage for sustainable city building. Grid layout 
showing: CLT construction panels, geodesic dome framework, solar panel arrays, vertical 
hydroponic gardens, smart home control interface, battery storage systems, water filtration 
technology, biophilic interior design elements. Each element labeled with TRL rating. 
Professional product photography style. Clean white background with subtle purple accents. 
Modern tech catalog aesthetic. Style: High-end product photography, catalog quality, 4K 
resolution."""
    }
}


def check_api_key():
    """Check if API key is set"""
    if not API_KEY:
        print("❌ Error: FLUXFAST_API_KEY environment variable not set")
        print("\nTo set it:")
        print("  export FLUXFAST_API_KEY='your-api-key-here'")
        print("\nGet your API key from: https://fluxfast.ai")
        sys.exit(1)
    print(f"✅ API key found: {API_KEY[:8]}...")


def create_directories():
    """Create output directories if they don't exist"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✅ Output directory: {OUTPUT_DIR}")
    print(f"✅ Temp directory: {TEMP_DIR}")


def generate_image(name: str, spec: Dict) -> Optional[str]:
    """
    Generate a single image using FluxFast API
    
    Returns path to downloaded image or None if failed
    """
    print(f"\n🎨 Generating: {name}")
    print(f"   Priority: {spec['priority']}")
    print(f"   Size: {spec['width']}x{spec['height']}")
    print(f"   Prompt: {spec['prompt'][:80]}...")
    
    try:
        # API request
        response = requests.post(
            f"{API_BASE_URL}/generate",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "prompt": spec['prompt'],
                "model": "flux-fast-1.1",
                "width": spec['width'],
                "height": spec['height'],
                "steps": 25,
                "guidance_scale": 7.5,
                "num_images": 4  # Generate 4 variations
            },
            timeout=120
        )
        
        if response.status_code != 200:
            print(f"   ❌ API Error: {response.status_code}")
            print(f"   Response: {response.text[:200]}")
            return None
        
        result = response.json()
        
        # FluxFast returns URLs or base64 images (adjust based on actual API)
        if 'images' in result:
            # Download first image (or let user choose from 4)
            image_url = result['images'][0]
            
            print(f"   ⬇️  Downloading image...")
            img_response = requests.get(image_url, timeout=30)
            
            if img_response.status_code == 200:
                # Save original
                output_path = TEMP_DIR / f"{name}-original.jpg"
                with open(output_path, 'wb') as f:
                    f.write(img_response.content)
                
                print(f"   ✅ Downloaded: {output_path}")
                return str(output_path)
            else:
                print(f"   ❌ Download failed: {img_response.status_code}")
                return None
        else:
            print(f"   ❌ No images in response")
            return None
            
    except requests.exceptions.Timeout:
        print(f"   ❌ Request timeout (>120s)")
        return None
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return None


def optimize_image(input_path: str, name: str, width: int, height: int):
    """
    Optimize image for web:
    - Convert to WebP
    - Create responsive sizes (400w, 800w, 1200w, 1600w)
    - Save JPG fallback
    """
    print(f"\n🔧 Optimizing: {name}")
    
    try:
        img = Image.open(input_path)
        
        # Ensure correct size
        if img.size != (width, height):
            print(f"   📐 Resizing from {img.size} to {width}x{height}")
            img = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Save full-size JPG (fallback)
        jpg_path = OUTPUT_DIR / f"{name}.jpg"
        img.save(jpg_path, "JPEG", quality=85, optimize=True)
        print(f"   ✅ Saved JPG: {jpg_path.name} ({jpg_path.stat().st_size // 1024}KB)")
        
        # Save full-size WebP
        webp_path = OUTPUT_DIR / f"{name}.webp"
        img.save(webp_path, "WEBP", quality=85, method=6)
        print(f"   ✅ Saved WebP: {webp_path.name} ({webp_path.stat().st_size // 1024}KB)")
        
        # Create responsive sizes
        responsive_widths = [400, 800, 1200, 1600]
        for w in responsive_widths:
            if w <= width:  # Don't upscale
                aspect_ratio = height / width
                h = int(w * aspect_ratio)
                
                resized = img.resize((w, h), Image.Resampling.LANCZOS)
                
                # WebP
                webp_responsive = OUTPUT_DIR / f"{name}-{w}w.webp"
                resized.save(webp_responsive, "WEBP", quality=85, method=6)
                
                # JPG
                jpg_responsive = OUTPUT_DIR / f"{name}-{w}w.jpg"
                resized.save(jpg_responsive, "JPEG", quality=85, optimize=True)
                
                print(f"   ✅ Created {w}w versions")
        
        print(f"   ✅ Optimization complete!")
        
    except Exception as e:
        print(f"   ❌ Optimization error: {str(e)}")


def generate_all_images(priority: Optional[int] = None):
    """
    Generate all images (or just specific priority)
    
    Args:
        priority: If set, only generate images with this priority (1, 2, or 3)
    """
    # Filter by priority if specified
    if priority:
        images_to_generate = {k: v for k, v in IMAGES.items() if v['priority'] == priority}
        print(f"\n🎯 Generating Priority {priority} images ({len(images_to_generate)} total)")
    else:
        images_to_generate = IMAGES
        print(f"\n🎯 Generating ALL images ({len(images_to_generate)} total)")
    
    results = {
        'success': [],
        'failed': []
    }
    
    for name, spec in images_to_generate.items():
        # Check if already exists
        existing = OUTPUT_DIR / f"{name}.webp"
        if existing.exists():
            print(f"\n⏭️  Skipping {name} (already exists)")
            print(f"   Delete {existing} to regenerate")
            results['success'].append(name)
            continue
        
        # Generate
        image_path = generate_image(name, spec)
        
        if image_path:
            # Optimize
            optimize_image(image_path, name, spec['width'], spec['height'])
            results['success'].append(name)
        else:
            results['failed'].append(name)
        
        # Rate limiting (adjust based on FluxFast limits)
        if name != list(images_to_generate.keys())[-1]:  # Not last image
            print("\n⏳ Waiting 5 seconds (rate limiting)...")
            time.sleep(5)
    
    # Summary
    print("\n" + "="*60)
    print("📊 GENERATION SUMMARY")
    print("="*60)
    print(f"✅ Success: {len(results['success'])}")
    print(f"❌ Failed: {len(results['failed'])}")
    
    if results['success']:
        print("\n✅ Successfully generated:")
        for name in results['success']:
            print(f"   - {name}")
    
    if results['failed']:
        print("\n❌ Failed to generate:")
        for name in results['failed']:
            print(f"   - {name}")
    
    print(f"\n📁 Output directory: {OUTPUT_DIR}")
    print("="*60)


def main():
    """Main entry point"""
    print("="*60)
    print("🎨 Light City Image Generation")
    print("   Using FluxFast 1.1 API")
    print("="*60)
    
    # Check prerequisites
    check_api_key()
    create_directories()
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        if sys.argv[1] in ['1', '2', '3']:
            priority = int(sys.argv[1])
            generate_all_images(priority=priority)
        elif sys.argv[1] == 'all':
            generate_all_images()
        else:
            print(f"\n❌ Invalid argument: {sys.argv[1]}")
            print("\nUsage:")
            print("  python generate_images_fluxfast.py          # Generate Priority 1 only")
            print("  python generate_images_fluxfast.py 1        # Generate Priority 1")
            print("  python generate_images_fluxfast.py 2        # Generate Priority 2")
            print("  python generate_images_fluxfast.py 3        # Generate Priority 3")
            print("  python generate_images_fluxfast.py all      # Generate all images")
            sys.exit(1)
    else:
        # Default: Generate Priority 1 only
        generate_all_images(priority=1)
    
    print("\n✅ Done!")


if __name__ == "__main__":
    main()

