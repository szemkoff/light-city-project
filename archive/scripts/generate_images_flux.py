#!/usr/bin/env python3
"""
Light City Image Generation Script
Generates all homepage images using Flux.ai GraphQL API

Requirements:
    pip install requests pillow

Usage:
    1. Get API key from https://flux.ai
    2. Set environment variable: export FLUX_API_KEY="your-key-here"
    3. Run: python generate_images_flux.py
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
import base64

# Configuration
API_KEY = os.environ.get('FLUX_API_KEY')
API_URL = "https://api.flux.ai/graphql"
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
        print("❌ Error: FLUX_API_KEY environment variable not set")
        print("\nTo set it:")
        print("  export FLUX_API_KEY='your-api-key-here'")
        print("\nGet your API key from: https://flux.ai")
        print("Test it at: https://api.flux.ai/graphql")
        sys.exit(1)
    print(f"✅ API key found: {API_KEY[:20]}...")


def create_directories():
    """Create output directories if they don't exist"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✅ Output directory: {OUTPUT_DIR}")
    print(f"✅ Temp directory: {TEMP_DIR}")


def generate_image_flux(name: str, spec: Dict) -> Optional[str]:
    """
    Generate a single image using Flux.ai GraphQL API
    
    Returns path to downloaded image or None if failed
    """
    print(f"\n🎨 Generating: {name}")
    print(f"   Priority: {spec['priority']}")
    print(f"   Size: {spec['width']}x{spec['height']}")
    print(f"   Prompt: {spec['prompt'][:80]}...")
    
    # GraphQL mutation for image generation
    # Adjust based on actual Flux.ai API schema
    query = """
    mutation GenerateImage($input: GenerateImageInput!) {
      generateImage(input: $input) {
        id
        status
        url
        imageData
      }
    }
    """
    
    variables = {
        "input": {
            "prompt": spec['prompt'],
            "width": spec['width'],
            "height": spec['height'],
            "numImages": 1,  # Generate 1 image (adjust if API supports multiple)
            "model": "flux-1.1-pro"  # or "flux-dev", adjust based on available models
        }
    }
    
    try:
        # Make GraphQL request
        response = requests.post(
            API_URL,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "query": query,
                "variables": variables
            },
            timeout=120
        )
        
        if response.status_code != 200:
            print(f"   ❌ API Error: {response.status_code}")
            print(f"   Response: {response.text[:500]}")
            return None
        
        result = response.json()
        
        # Check for GraphQL errors
        if 'errors' in result:
            print(f"   ❌ GraphQL Error: {result['errors']}")
            return None
        
        # Extract image data
        if 'data' in result and 'generateImage' in result['data']:
            image_data = result['data']['generateImage']
            
            # Option 1: Image URL (if API returns URL)
            if 'url' in image_data and image_data['url']:
                print(f"   ⬇️  Downloading from URL...")
                img_response = requests.get(image_data['url'], timeout=30)
                
                if img_response.status_code == 200:
                    output_path = TEMP_DIR / f"{name}-original.jpg"
                    with open(output_path, 'wb') as f:
                        f.write(img_response.content)
                    print(f"   ✅ Downloaded: {output_path}")
                    return str(output_path)
            
            # Option 2: Base64 image data (if API returns base64)
            elif 'imageData' in image_data and image_data['imageData']:
                print(f"   💾 Decoding base64 image...")
                image_bytes = base64.b64decode(image_data['imageData'])
                output_path = TEMP_DIR / f"{name}-original.jpg"
                
                with open(output_path, 'wb') as f:
                    f.write(image_bytes)
                print(f"   ✅ Saved: {output_path}")
                return str(output_path)
            
            # Option 3: Async generation (need to poll for result)
            elif 'id' in image_data and 'status' in image_data:
                job_id = image_data['id']
                status = image_data['status']
                
                print(f"   ⏳ Job created: {job_id}")
                print(f"   Status: {status}")
                
                # Poll for completion
                return poll_for_image(job_id, name)
            
            else:
                print(f"   ❌ No image data in response")
                print(f"   Response: {json.dumps(result, indent=2)[:500]}")
                return None
        else:
            print(f"   ❌ Unexpected response structure")
            print(f"   Response: {json.dumps(result, indent=2)[:500]}")
            return None
            
    except requests.exceptions.Timeout:
        print(f"   ❌ Request timeout (>120s)")
        return None
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None


def poll_for_image(job_id: str, name: str, max_attempts: int = 60) -> Optional[str]:
    """
    Poll Flux.ai API for image generation completion
    
    Args:
        job_id: Generation job ID
        name: Image name
        max_attempts: Maximum polling attempts (60 = 5 minutes at 5s intervals)
    
    Returns:
        Path to downloaded image or None if failed
    """
    query = """
    query GetGenerationStatus($id: ID!) {
      generation(id: $id) {
        id
        status
        url
        imageData
      }
    }
    """
    
    for attempt in range(max_attempts):
        try:
            response = requests.post(
                API_URL,
                headers={
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "query": query,
                    "variables": {"id": job_id}
                },
                timeout=30
            )
            
            if response.status_code != 200:
                print(f"   ❌ Poll error: {response.status_code}")
                time.sleep(5)
                continue
            
            result = response.json()
            
            if 'errors' in result:
                print(f"   ❌ Poll GraphQL error: {result['errors']}")
                return None
            
            if 'data' in result and 'generation' in result['data']:
                gen_data = result['data']['generation']
                status = gen_data.get('status', 'unknown')
                
                print(f"   ⏳ Status: {status} (attempt {attempt + 1}/{max_attempts})")
                
                if status == 'completed' or status == 'success':
                    # Download image
                    if 'url' in gen_data and gen_data['url']:
                        img_response = requests.get(gen_data['url'], timeout=30)
                        if img_response.status_code == 200:
                            output_path = TEMP_DIR / f"{name}-original.jpg"
                            with open(output_path, 'wb') as f:
                                f.write(img_response.content)
                            print(f"   ✅ Downloaded: {output_path}")
                            return str(output_path)
                    
                    elif 'imageData' in gen_data and gen_data['imageData']:
                        image_bytes = base64.b64decode(gen_data['imageData'])
                        output_path = TEMP_DIR / f"{name}-original.jpg"
                        with open(output_path, 'wb') as f:
                            f.write(image_bytes)
                        print(f"   ✅ Saved: {output_path}")
                        return str(output_path)
                
                elif status == 'failed' or status == 'error':
                    print(f"   ❌ Generation failed")
                    return None
                
                # Still processing, wait and retry
                time.sleep(5)
            else:
                print(f"   ❌ Unexpected poll response")
                return None
                
        except Exception as e:
            print(f"   ❌ Poll error: {str(e)}")
            time.sleep(5)
    
    print(f"   ❌ Timeout: Image not ready after {max_attempts * 5}s")
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
        image_path = generate_image_flux(name, spec)
        
        if image_path:
            # Optimize
            optimize_image(image_path, name, spec['width'], spec['height'])
            results['success'].append(name)
        else:
            results['failed'].append(name)
        
        # Rate limiting (be nice to API)
        if name != list(images_to_generate.keys())[-1]:  # Not last image
            print("\n⏳ Waiting 10 seconds (rate limiting)...")
            time.sleep(10)
    
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
    print("   Using Flux.ai GraphQL API")
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
            print("  python3 generate_images_flux.py          # Generate Priority 1 only")
            print("  python3 generate_images_flux.py 1        # Generate Priority 1")
            print("  python3 generate_images_flux.py 2        # Generate Priority 2")
            print("  python3 generate_images_flux.py 3        # Generate Priority 3")
            print("  python3 generate_images_flux.py all      # Generate all images")
            sys.exit(1)
    else:
        # Default: Generate Priority 1 only
        generate_all_images(priority=1)
    
    print("\n✅ Done!")
    print("\nNext steps:")
    print("1. Check generated images in: website/static/img/homepage/")
    print("2. Integrate into homepage: website/src/pages/index.tsx")
    print("3. Deploy: cd website && npm run build && npm run deploy")


if __name__ == "__main__":
    main()

