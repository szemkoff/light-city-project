#!/usr/bin/env python3
"""
Scrape real technology images from company websites
"""

import requests
from bs4 import BeautifulSoup
import os
import time
from urllib.parse import urljoin, urlparse

def download_image(url, filepath):
    """Download image from URL"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        # Check content type
        content_type = response.headers.get('content-type', '')
        if 'image' not in content_type.lower():
            print(f"  ❌ Not an image: {content_type}")
            return False
        
        # Write to file
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        size = os.path.getsize(filepath)
        if size < 5000:
            print(f"  ❌ Too small: {size} bytes")
            os.remove(filepath)
            return False
        
        print(f"  ✅ Downloaded: {size:,} bytes")
        return True
    
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def scrape_images_from_page(url, keywords=None):
    """Scrape images from a webpage"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
    
    try:
        print(f"  📄 Fetching: {url}")
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all img tags
        images = soup.find_all('img')
        print(f"  🖼️  Found {len(images)} images on page")
        
        # Look for large, relevant images
        candidates = []
        for img in images:
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if not src:
                continue
            
            # Make absolute URL
            img_url = urljoin(url, src)
            
            # Skip small images, icons, logos
            if any(skip in img_url.lower() for skip in ['logo', 'icon', 'thumb', 'avatar', 'social', 'sprite']):
                continue
            
            # Prefer images with keywords in URL or alt text
            alt = img.get('alt', '').lower()
            if keywords:
                if any(kw in img_url.lower() or kw in alt for kw in keywords):
                    candidates.insert(0, img_url)  # Priority
                else:
                    candidates.append(img_url)
            else:
                candidates.append(img_url)
        
        return candidates[:5]  # Return top 5 candidates
    
    except Exception as e:
        print(f"  ❌ Error scraping page: {e}")
        return []

def main():
    output_dir = "website/static/img/technology"
    os.makedirs(output_dir, exist_ok=True)
    
    # Company websites with search keywords
    technologies = [
        {
            'name': 'geodesic-dome.jpg',
            'url': 'https://www.pacificdomes.com/geodesic-domes/',
            'keywords': ['dome', 'geodesic', 'structure'],
        },
        {
            'name': 'clt-construction.jpg',
            'url': 'https://www.structurlam.com/projects/',
            'keywords': ['clt', 'timber', 'wood', 'construction'],
        },
        {
            'name': 'vertical-farm.jpg',
            'url': 'https://www.aerofarms.com/',
            'keywords': ['farm', 'vertical', 'growing', 'plants'],
        },
        {
            'name': 'bipv-solar-facade.jpg',
            'url': 'https://www.onyxsolar.com/photovoltaic-glass',
            'keywords': ['solar', 'glass', 'facade', 'photovoltaic'],
        },
        {
            'name': 'aquaponics-system.jpg',
            'url': 'https://www.aquaponics.com/',
            'keywords': ['aquaponics', 'fish', 'system', 'tank'],
        },
        {
            'name': 'cargo-bike.jpg',
            'url': 'https://www.urbanarrow.com/en',
            'keywords': ['cargo', 'bike', 'bicycle', 'box'],
        },
        {
            'name': 'ev-charging.jpg',
            'url': 'https://www.chargepoint.com/',
            'keywords': ['charging', 'station', 'charger', 'electric'],
        },
    ]
    
    print("=" * 70)
    print("SCRAPING REAL TECHNOLOGY IMAGES FROM COMPANY WEBSITES")
    print("=" * 70)
    
    success_count = 0
    
    for tech in technologies:
        print(f"\n🔍 {tech['name']}:")
        filepath = os.path.join(output_dir, tech['name'])
        
        # Scrape images from page
        image_urls = scrape_images_from_page(tech['url'], tech['keywords'])
        
        if not image_urls:
            print("  ❌ No images found")
            continue
        
        # Try downloading the first few candidates
        for img_url in image_urls[:3]:
            print(f"  📥 Trying: {img_url[:80]}...")
            if download_image(img_url, filepath):
                success_count += 1
                break
            time.sleep(0.5)
        
        time.sleep(1)  # Be nice to servers
    
    print("\n" + "=" * 70)
    print(f"📊 RESULTS: {success_count}/{len(technologies)} images downloaded")
    print("=" * 70)
    
    # Show what we got
    print("\n✅ Downloaded files:")
    for tech in technologies:
        filepath = os.path.join(output_dir, tech['name'])
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"  • {tech['name']}: {size:,} bytes")

if __name__ == '__main__':
    main()

