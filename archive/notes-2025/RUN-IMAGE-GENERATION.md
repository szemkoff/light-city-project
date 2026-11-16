# How to Generate Images for Light City Homepage

## 🎯 Quick Start

### 1. Get Flux.ai API Key
- Go to: https://flux.ai
- Sign up / Log in
- Navigate to API settings
- Copy your API key (format: `eyJhbGciOiJIUzI1NiJ9...`)

### 2. Test Your API Key (Optional)
- Go to: https://api.flux.ai/graphql
- Open GraphiQL playground
- In the bottom "Headers" pane, paste:
  ```json
  {"Authorization": "Bearer your-api-key-here"}
  ```
- Replace `your-api-key-here` with your actual key
- Test a simple query to verify it works

### 3. Set API Key (in Terminal)
```bash
export FLUX_API_KEY="your-api-key-here"
```

**Note**: Replace `your-api-key-here` with your full API key (including `eyJhbGci...` part)

### 4. Run the Script

#### Generate Priority 1 Images (4 critical images)
```bash
cd "/Users/stantheman/Light City Project"
python3 generate_images_flux.py
```

#### Generate Specific Priority
```bash
python3 generate_images_flux.py 1    # Priority 1 (critical)
python3 generate_images_flux.py 2    # Priority 2 (enhanced)
python3 generate_images_flux.py 3    # Priority 3 (polish)
```

#### Generate ALL Images
```bash
python3 generate_images_flux.py all
```

---

## 📊 What Gets Generated

### Priority 1 (Critical - 4 images)
1. **agroforestry-food-forest** - Food forest system (1600x900)
2. **community-circle-dome** - Community gathering (1600x900)
3. **financial-dashboard** - Investment metrics (1920x1080)
4. **communosphere-interior** - Living space interior (1600x900)

### Priority 2 (Enhanced Impact - 3 images)
5. **hero-crystal-city-aerial** - Epic aerial view (2560x1080)
6. **energy-system-dual-track** - Dual energy system (1600x900)
7. **construction-progress** - Building documentation (1600x900)

### Priority 3 (Polish - 3 images)
8. **sacred-geometry-blueprint** - Geometric patterns (1200x1200)
9. **resident-daily-life** - Lifestyle photography (1600x900)
10. **technology-showcase** - Tech catalog (1600x900)

---

## 📁 Output Structure

All images saved to:
```
website/static/img/homepage/
├── agroforestry-food-forest.webp
├── agroforestry-food-forest.jpg
├── agroforestry-food-forest-400w.webp
├── agroforestry-food-forest-400w.jpg
├── agroforestry-food-forest-800w.webp
├── agroforestry-food-forest-800w.jpg
├── agroforestry-food-forest-1200w.webp
├── agroforestry-food-forest-1200w.jpg
├── agroforestry-food-forest-1600w.webp
├── agroforestry-food-forest-1600w.jpg
└── ... (same for all images)
```

Each image generates:
- ✅ Full-size WebP (primary, ~200-400KB)
- ✅ Full-size JPG (fallback, ~300-600KB)
- ✅ 4 responsive sizes (400w, 800w, 1200w, 1600w)

---

## 🔧 Script Features

### Automatic Optimization
- Converts to WebP (85% quality, smaller file size)
- Creates JPG fallback (85% quality)
- Generates responsive sizes for all devices
- Optimizes for web performance (<500KB per image)

### Smart Generation
- Generates 4 variations per image (chooses best)
- Rate limiting (5s delay between images)
- Skips existing images (delete to regenerate)
- Error handling and retry logic

### Progress Tracking
- Shows generation progress
- Reports success/failure for each image
- Final summary with statistics

---

## 💰 Cost Estimate

Flux.ai pricing varies by plan. Check current pricing at https://flux.ai/pricing

Estimated:
- **Priority 1** (4 images): ~$0.20-1.00
- **Priority 2** (3 images): ~$0.15-0.75
- **Priority 3** (3 images): ~$0.15-0.75
- **All images** (10 total): ~$0.50-2.50

Still very affordable! 🎉

---

## ⏱️ Time Estimate

Flux.ai generation speed: ~10-30 seconds per image

- **Priority 1** (4 images): ~5-10 minutes (including optimization + rate limiting)
- **All images** (10 total): ~15-30 minutes

---

## 🐛 Troubleshooting

### "API key not set"
```bash
export FLUX_API_KEY="your-key-here"
```

### "API Error: 401"
- Check API key is correct (should start with `eyJhbGci...`)
- Verify you're using the full Bearer token
- Test at https://api.flux.ai/graphql

### "API Error: 429"
- Rate limit exceeded
- Wait a few minutes and try again
- Script has 10s delay between images to prevent this

### "Request timeout"
- FluxFast server might be slow
- Script will retry automatically

### Image already exists
```bash
# Delete existing image to regenerate
rm website/static/img/homepage/agroforestry-food-forest.webp
```

---

## 🎨 Customizing Prompts

Edit `generate_images_fluxfast.py` and modify the `IMAGES` dictionary:

```python
IMAGES = {
    "your-image-name": {
        "priority": 1,
        "width": 1600,
        "height": 900,
        "prompt": """Your custom prompt here..."""
    }
}
```

---

## 🔄 Alternative: Manual Generation

If you prefer to generate manually:

1. Open `image-generation-prompts.txt`
2. Copy a prompt
3. Go to https://fluxfast.ai
4. Paste prompt and generate
5. Download image
6. Run optimization manually:
   ```bash
   python3 -c "from generate_images_fluxfast import optimize_image; optimize_image('downloaded.jpg', 'image-name', 1600, 900)"
   ```

---

## ✅ After Generation

### 1. Check Output
```bash
ls -lh website/static/img/homepage/
```

### 2. Integrate into Homepage
Images are ready to use in `website/src/pages/index.tsx`:

```tsx
<img 
  src={require('@site/static/img/homepage/agroforestry-food-forest.webp').default}
  alt="Thriving agroforestry food forest"
  loading="lazy"
/>
```

### 3. Deploy
```bash
cd website
npm run build
npm run deploy
```

---

## 📞 Support

If you encounter issues:
1. Check FluxFast API documentation
2. Verify API key and credits
3. Check network connection
4. Review error messages in terminal

---

**Ready to generate stunning visuals for Light City!** 🎨✨

