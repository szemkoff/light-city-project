#!/usr/bin/env python3
"""
Test Flux.ai Image Generation
Generates a single test image to verify API connection

Usage:
    export FLUX_API_KEY="your-key-here"
    python3 test_flux_generation.py
"""

import os
import sys
import json
import time
import requests
from pathlib import Path

# Configuration
API_KEY = os.environ.get('FLUX_API_KEY')
API_URL = "https://api.flux.ai/graphql"
OUTPUT_DIR = Path(__file__).parent / "website" / "static" / "img" / "homepage"
TEMP_DIR = Path(__file__).parent / "temp_images"

# Test image specification
TEST_IMAGE = {
    "name": "test-agroforestry",
    "width": 1024,  # Smaller for faster testing
    "height": 768,
    "prompt": """A thriving agroforestry food forest system with multiple layers of edible plants, 
fruit trees, berry bushes, and vegetable gardens integrated in a natural woodland setting. 
Sunlight filtering through tree canopy, diverse plant species, permaculture design with 
winding paths, people harvesting food in harmony with nature. Photorealistic, vibrant colors, 
golden hour lighting, aerial perspective. Style: National Geographic photography, 8K quality."""
}


def check_api_key():
    """Check if API key is set"""
    if not API_KEY:
        print("❌ Error: FLUX_API_KEY environment variable not set")
        print("\nTo set it:")
        print("  export FLUX_API_KEY='your-api-key-here'")
        print("\nYour API key should look like: eyJhbGciOiJIUzI1NiJ9...")
        print("\nGet it from: https://flux.ai")
        print("Test it at: https://api.flux.ai/graphql")
        sys.exit(1)
    
    print(f"✅ API key found")
    print(f"   First 30 chars: {API_KEY[:30]}...")
    print(f"   Length: {len(API_KEY)} characters")


def create_directories():
    """Create output directories"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✅ Output directory: {OUTPUT_DIR}")
    print(f"✅ Temp directory: {TEMP_DIR}")


def test_api_connection():
    """Test basic API connection with a simple query"""
    print("\n🔍 Testing API connection...")
    
    # Simple introspection query
    query = """
    query {
      __schema {
        queryType {
          name
        }
      }
    }
    """
    
    try:
        response = requests.post(
            API_URL,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json={"query": query},
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            if 'errors' in result:
                print(f"   ❌ GraphQL Errors: {json.dumps(result['errors'], indent=2)}")
                return False
            else:
                print(f"   ✅ API connection successful!")
                return True
        else:
            print(f"   ❌ HTTP Error: {response.status_code}")
            print(f"   Response: {response.text[:500]}")
            return False
            
    except Exception as e:
        print(f"   ❌ Connection error: {str(e)}")
        return False


def generate_test_image():
    """Generate a test image using Flux.ai API"""
    print(f"\n🎨 Generating test image: {TEST_IMAGE['name']}")
    print(f"   Size: {TEST_IMAGE['width']}x{TEST_IMAGE['height']}")
    print(f"   Prompt: {TEST_IMAGE['prompt'][:100]}...")
    
    # Try different possible GraphQL mutations
    # We'll try multiple variations to find what works
    
    mutations = [
        # Variation 1: Standard mutation
        {
            "name": "Standard generateImage",
            "query": """
            mutation GenerateImage($prompt: String!, $width: Int!, $height: Int!) {
              generateImage(prompt: $prompt, width: $width, height: $height) {
                id
                status
                url
                imageUrl
                result
              }
            }
            """,
            "variables": {
                "prompt": TEST_IMAGE['prompt'],
                "width": TEST_IMAGE['width'],
                "height": TEST_IMAGE['height']
            }
        },
        # Variation 2: With input object
        {
            "name": "Input object",
            "query": """
            mutation GenerateImage($input: GenerateImageInput!) {
              generateImage(input: $input) {
                id
                status
                url
                imageUrl
                result
              }
            }
            """,
            "variables": {
                "input": {
                    "prompt": TEST_IMAGE['prompt'],
                    "width": TEST_IMAGE['width'],
                    "height": TEST_IMAGE['height']
                }
            }
        },
        # Variation 3: Simple create
        {
            "name": "Simple create",
            "query": """
            mutation CreateImage($prompt: String!) {
              createImage(prompt: $prompt) {
                id
                url
                status
              }
            }
            """,
            "variables": {
                "prompt": TEST_IMAGE['prompt']
            }
        }
    ]
    
    for mutation in mutations:
        print(f"\n   Trying: {mutation['name']}")
        
        try:
            response = requests.post(
                API_URL,
                headers={
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "query": mutation['query'],
                    "variables": mutation['variables']
                },
                timeout=60
            )
            
            print(f"   Status: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                
                # Pretty print the response
                print(f"   Response:")
                print(json.dumps(result, indent=2)[:1000])
                
                if 'errors' in result:
                    print(f"   ❌ GraphQL Error: {result['errors'][0].get('message', 'Unknown error')}")
                    continue
                
                if 'data' in result:
                    print(f"   ✅ Success! Got response data")
                    
                    # Try to extract image info
                    data = result['data']
                    
                    # Find the mutation result (could be under different keys)
                    image_data = None
                    for key in ['generateImage', 'createImage', 'image']:
                        if key in data:
                            image_data = data[key]
                            break
                    
                    if image_data:
                        print(f"\n   📊 Image Data:")
                        print(f"      ID: {image_data.get('id', 'N/A')}")
                        print(f"      Status: {image_data.get('status', 'N/A')}")
                        print(f"      URL: {image_data.get('url', image_data.get('imageUrl', 'N/A'))}")
                        
                        # Save the successful query for future use
                        save_working_query(mutation)
                        
                        return image_data
                    else:
                        print(f"   ⚠️  Got data but couldn't find image info")
                        print(f"   Data keys: {list(data.keys())}")
            else:
                print(f"   ❌ HTTP Error: {response.status_code}")
                print(f"   Response: {response.text[:500]}")
                
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
            continue
    
    print(f"\n❌ All mutation attempts failed")
    print(f"\n💡 Next steps:")
    print(f"   1. Go to https://api.flux.ai/graphql")
    print(f"   2. Click 'Docs' to see available mutations")
    print(f"   3. Look for image generation mutations")
    print(f"   4. Share the mutation name/structure with me")
    return None


def save_working_query(mutation):
    """Save the working query for future reference"""
    output_file = Path(__file__).parent / "flux_working_query.json"
    with open(output_file, 'w') as f:
        json.dump(mutation, f, indent=2)
    print(f"\n   💾 Saved working query to: {output_file}")


def main():
    """Main test function"""
    print("="*60)
    print("🧪 Flux.ai API Test")
    print("   Testing image generation with 1 image")
    print("="*60)
    
    # Step 1: Check API key
    check_api_key()
    
    # Step 2: Create directories
    create_directories()
    
    # Step 3: Test API connection
    print("\n" + "="*60)
    print("STEP 1: Testing API Connection")
    print("="*60)
    
    if not test_api_connection():
        print("\n❌ API connection test failed")
        print("\n💡 Troubleshooting:")
        print("   1. Check your API key is correct")
        print("   2. Verify it starts with 'eyJhbGci...'")
        print("   3. Test manually at https://api.flux.ai/graphql")
        print("   4. Check Flux.ai documentation for API changes")
        sys.exit(1)
    
    # Step 4: Generate test image
    print("\n" + "="*60)
    print("STEP 2: Generating Test Image")
    print("="*60)
    
    image_data = generate_test_image()
    
    if image_data:
        print("\n" + "="*60)
        print("✅ TEST SUCCESSFUL!")
        print("="*60)
        print("\nNext steps:")
        print("1. Check flux_working_query.json for the working mutation")
        print("2. Run the full script: python3 generate_images_flux.py")
        print("3. Generate all 10 images for the homepage")
    else:
        print("\n" + "="*60)
        print("❌ TEST FAILED")
        print("="*60)
        print("\nPlease:")
        print("1. Go to https://api.flux.ai/graphql")
        print("2. Open the 'Docs' panel (top right)")
        print("3. Look for image generation mutations")
        print("4. Share the mutation structure with me")
        print("5. I'll update the script accordingly")


if __name__ == "__main__":
    main()

