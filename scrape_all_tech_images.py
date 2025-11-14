#!/usr/bin/env python3
"""
Scrape ALL technology images from company websites
"""

import requests
from bs4 import BeautifulSoup
import os
import time
from urllib.parse import urljoin

def download_image(url, filepath):
    """Download image from URL"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*,*/*;q=0.8',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        content_type = response.headers.get('content-type', '')
        if 'image' not in content_type.lower():
            return False
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        size = os.path.getsize(filepath)
        if size < 5000:
            os.remove(filepath)
            return False
        
        print(f"  ✅ {size:,} bytes")
        return True
    
    except:
        return False

def scrape_images(url, keywords=None):
    """Scrape images from webpage"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        images = soup.find_all('img')
        candidates = []
        
        for img in images:
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if not src or src.startswith('data:'):
                continue
            
            img_url = urljoin(url, src)
            
            if any(skip in img_url.lower() for skip in ['logo', 'icon', 'thumb', 'avatar', 'sprite']):
                continue
            
            alt = img.get('alt', '').lower()
            if keywords and any(kw in img_url.lower() or kw in alt for kw in keywords):
                candidates.insert(0, img_url)
            else:
                candidates.append(img_url)
        
        return candidates[:5]
    except:
        return []

def main():
    output_dir = "website/static/img/technology"
    os.makedirs(output_dir, exist_ok=True)
    
    # ALL technologies that need images
    technologies = [
        # Structural
        {'name': 'tensile-fabric.jpg', 'url': 'https://www.birdair.com/projects/', 'keywords': ['tensile', 'fabric', 'canopy']},
        {'name': '3d-printed-concrete.jpg', 'url': 'https://www.iconbuild.com/', 'keywords': ['3d', 'print', 'concrete', 'house']},
        
        # Energy
        {'name': 'flow-battery.jpg', 'url': 'https://www.essinc.com/', 'keywords': ['battery', 'storage', 'flow']},
        {'name': 'micro-hydro.jpg', 'url': 'https://www.canyonhydro.com/', 'keywords': ['hydro', 'turbine', 'water']},
        {'name': 'solid-state-battery.jpg', 'url': 'https://www.quantumscape.com/', 'keywords': ['battery', 'solid', 'state']},
        
        # Water
        {'name': 'living-machine.jpg', 'url': 'https://www.worrellwater.com/', 'keywords': ['wastewater', 'treatment', 'plant']},
        {'name': 'atmospheric-water.jpg', 'url': 'https://www.source.co/', 'keywords': ['water', 'panel', 'hydropanel']},
        {'name': 'composting-toilet.jpg', 'url': 'https://www.clivusmultrum.com/', 'keywords': ['composting', 'toilet', 'system']},
        
        # Food
        {'name': 'agroforestry.jpg', 'url': 'https://www.savannainstitute.org/', 'keywords': ['agroforestry', 'trees', 'farm']},
        {'name': 'mycelium-cultivation.jpg', 'url': 'https://fungi.com/', 'keywords': ['mushroom', 'mycelium', 'growing']},
        
        # Building Systems
        {'name': 'bms.jpg', 'url': 'https://www.siemens.com/global/en/products/buildings.html', 'keywords': ['building', 'management', 'control']},
        {'name': 'environmental-sensors.jpg', 'url': 'https://www.butlr.io/', 'keywords': ['sensor', 'occupancy', 'thermal']},
        
        # Wellness
        {'name': 'acoustic-resonance.jpg', 'url': 'https://acousticgeometry.com/', 'keywords': ['acoustic', 'sound', 'treatment']},
        {'name': 'biofeedback.jpg', 'url': 'https://www.heartmath.com/', 'keywords': ['biofeedback', 'hrv', 'heart']},
        {'name': 'red-light-therapy.jpg', 'url': 'https://joovv.com/', 'keywords': ['red', 'light', 'therapy', 'panel']},
        
        # Transport
        {'name': 'autonomous-shuttle.jpg', 'url': 'https://www.maymobility.com/', 'keywords': ['autonomous', 'shuttle', 'vehicle']},
        
        # Materials
        {'name': 'hempcrete.jpg', 'url': 'https://www.americanlimecrete.com/', 'keywords': ['hempcrete', 'hemp', 'block']},
        {'name': 'mycelium-insulation.jpg', 'url': 'https://www.ecovativedesign.com/', 'keywords': ['mycelium', 'insulation', 'foam']},
        {'name': 'transparent-wood.jpg', 'url': 'https://www.wallac.com/', 'keywords': ['transparent', 'wood', 'material']},
        {'name': 'self-healing-concrete.jpg', 'url': 'https://www.basiliskconcrete.com/', 'keywords': ['concrete', 'self', 'healing']},
        
        # Connectivity
        {'name': 'mesh-network.jpg', 'url': 'https://www.helium.com/', 'keywords': ['helium', 'mesh', 'network', 'hotspot']},
        {'name': 'starlink.jpg', 'url': 'https://www.starlink.com/', 'keywords': ['starlink', 'satellite', 'dish']},
        
        # Research
        {'name': 'environmental-monitoring.jpg', 'url': 'https://www.onset.com/', 'keywords': ['environmental', 'monitoring', 'sensor']},
        {'name': 'consciousness-research.jpg', 'url': 'https://www.muse.com/', 'keywords': ['eeg', 'meditation', 'brain', 'headband']},
    ]
    
    print("=" * 70)
    print(f"SCRAPING {len(technologies)} TECHNOLOGY IMAGES")
    print("=" * 70)
    
    success_count = 0
    
    for tech in technologies:
        filepath = os.path.join(output_dir, tech['name'])
        
        # Skip if already exists and is good size
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            if size > 40000:
                print(f"\n✓ {tech['name']}: Already exists ({size:,} bytes)")
                success_count += 1
                continue
        
        print(f"\n🔍 {tech['name']}:")
        image_urls = scrape_images(tech['url'], tech['keywords'])
        
        if not image_urls:
            print("  ❌ No images found")
            continue
        
        for img_url in image_urls[:3]:
            print(f"  📥 {img_url[:70]}...")
            if download_image(img_url, filepath):
                success_count += 1
                break
            time.sleep(0.3)
        
        time.sleep(1)
    
    print("\n" + "=" * 70)
    print(f"📊 RESULTS: {success_count}/{len(technologies)} images")
    print("=" * 70)

if __name__ == '__main__':
    main()



