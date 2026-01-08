# Resilient Strapi Integration - Implementation Guide

## Overview

This Astro restaurant template now implements a **fully resilient Strapi CMS integration** that ensures your website remains functional and builds successfully even when Strapi is unavailable or experiences downtime.

## 🎯 Key Features Implemented

### ✅ 1. Static Site Generation (SSG) with Content Persistence

- All content is fetched from Strapi at **BUILD TIME**, not runtime
- Images are downloaded and cached locally in `public/uploads/` during build
- Generated site is **fully static** (HTML/CSS/JS) and doesn't require Strapi to be running
- Once built, the dist/ folder contains everything needed to serve the site

### ✅ 2. Graceful Fallback System

- Try-catch blocks wrap all Strapi API calls
- Mock/placeholder data automatically displays when Strapi fetch fails
- **No white screens or build failures** - pages always render successfully
- User-friendly banner indicates when mock data is being used

### ✅ 3. Enhanced Error Handling

- Comprehensive error messages for different HTTP status codes (404, 401, 403, 500+)
- 10-second timeout on API requests to prevent hanging builds
- Detailed logging in development, minimal logging in production
- Graceful degradation - returns empty data instead of crashing

### ✅ 4. Mock Data Implementation

- Complete mock data for menu items, homepage, and testimonials
- Uses local placeholder images from `public/placeholders/`
- Matches the exact TypeScript interfaces of real Strapi data
- 6 sample menu items with varied cuisines and details

### ✅ 5. Image Handling

- `downloadStrapiImage()` downloads images during build (production mode)
- `getStrapiMedia()` constructs full URLs (development mode)
- Fallback to remote URLs if download fails
- Fallback to placeholder images if no image URL provided

## 📁 Files Modified/Created

### New Files:

1. **`src/lib/mockData.ts`** - Complete mock data for all content types
2. **`.env.example`** - Comprehensive environment variable documentation

### Modified Files:

1. **`src/lib/strapi.ts`** - Enhanced with robust error handling
2. **`src/pages/index.astro`** - Implements fallback logic
3. **`src/pages/menu.astro`** - Implements fallback logic

## 🚀 How It Works

### Development Mode (`npm run dev`)

```bash
npm run dev
```

- Fetches content from Strapi on each page load
- Hot reloads when Strapi data changes
- Uses remote image URLs directly
- Falls back to mock data if Strapi unavailable
- **No build failures if Strapi is down**

### Build Mode (`npm run build`)

```bash
npm run build
```

- Fetches all content from Strapi once during build
- Downloads and caches images locally
- Generates fully static HTML with embedded content
- Falls back to mock data if Strapi unavailable
- **Build succeeds even without Strapi connection**

### Preview Mode (`npm run preview`)

```bash
npm run build
npm run preview
```

- Serves the built static files from dist/
- **Zero Strapi dependency** - works completely offline
- Content updates require a new build

## 🔧 Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
# Optional - Leave blank to use mock data
PUBLIC_STRAPI_URL=

# Optional - Only needed for authenticated endpoints
STRAPI_API_TOKEN=
```

### With Strapi CMS:

```env
PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your-token-here
```

### Without Strapi (Mock Data):

```env
# Leave empty or omit entirely
PUBLIC_STRAPI_URL=
```

## 📊 Content Types & Mock Data

### Menu Items

- **Location:** `src/lib/mockData.ts` → `mockMenuItems`
- **Count:** 6 items
- **Cuisines:** Seafood, American, Italian, French, Salads
- **Images:** Uses placeholders from `public/placeholders/dish-*.svg`

### Homepage Hero

- **Location:** `src/lib/mockData.ts` → `mockHomepage`
- **Content:** Title, subtitle, hero image, CTA buttons
- **Image:** Uses `public/placeholders/hero.svg`

### Testimonials (Future Use)

- **Location:** `src/lib/mockData.ts` → `mockTestimonials`
- **Count:** 3 testimonials
- **Features:** Customer names, ratings, featured flag

## 🔄 Deployment Workflow

### 1. Traditional Deployment (with Strapi)

```bash
# 1. Update content in Strapi CMS
# 2. Trigger new build
npm run build

# 3. Deploy dist/ folder to hosting
# Site remains accessible even if Strapi crashes later
```

### 2. Webhook-Based Deployment (Recommended)

```
┌─────────────┐
│ Strapi CMS  │
│   (Edit)    │
└──────┬──────┘
       │ Webhook
       ↓
┌─────────────┐
│   Netlify/  │
│   Vercel    │ ← Automatic rebuild
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Static Site│
│  (Updated)  │
└─────────────┘
```

### 3. Emergency Deployment (Strapi Down)

```bash
# Build with mock data when Strapi is unavailable
npm run build

# Deploy dist/ folder
# Site displays mock content until Strapi is restored
```

## 🧪 Testing Workflow

### Test 1: With Strapi Running

```bash
# Set up .env with valid Strapi URL
PUBLIC_STRAPI_URL=https://your-strapi.com

# Build and verify real content
npm run build
npm run preview
```

**Expected:** Real content from Strapi displays

### Test 2: Without Strapi (Mock Data)

```bash
# Remove or clear .env
PUBLIC_STRAPI_URL=

# Build and verify mock content
npm run build
npm run preview
```

**Expected:** Mock content displays, build succeeds

### Test 3: With Invalid Strapi URL

```bash
# Set invalid URL
PUBLIC_STRAPI_URL=https://invalid-url.com

# Build and verify graceful fallback
npm run build
npm run preview
```

**Expected:** Falls back to mock data, build succeeds

## 📝 Code Examples

### Fetching with Fallback (in pages)

```typescript
// Fetch real data from Strapi
const strapiMenu = await fetchStrapi<MenuItem>("menu-items");

// Use Strapi data if available, otherwise use mock data
const menu = strapiMenu?.data?.length ? strapiMenu : mockMenuItems;

// Track if we're using mock data
const usingMockData = !strapiMenu?.data?.length;
```

### Error Handling (in strapi.ts)

```typescript
try {
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(10000), // 10 second timeout
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return await response.json();
} catch (error) {
  console.error("Strapi fetch error:", error);
  // Return empty data instead of throwing
  return { data: [], meta: {} };
}
```

### Image Downloading

```typescript
// In production build mode
const imageUrl = await downloadStrapiImage(heroImage?.data?.attributes?.url);

// Falls back to:
// 1. Local cached image if download succeeded
// 2. Remote URL if download failed
// 3. Placeholder image if no URL provided
```

## 🛡️ Resilience Guarantees

| Scenario                 | Behavior                | User Experience              |
| ------------------------ | ----------------------- | ---------------------------- |
| Strapi running           | ✅ Fetches real content | Real CMS content             |
| Strapi down during dev   | ✅ Uses mock data       | Mock content with banner     |
| Strapi down during build | ✅ Uses mock data       | Mock content, build succeeds |
| Built site, Strapi down  | ✅ Serves static files  | Last built content           |
| Network timeout          | ✅ Falls back after 10s | Mock content                 |
| Invalid Strapi URL       | ✅ Falls back           | Mock content                 |
| Authentication error     | ✅ Falls back           | Mock content                 |

## 🎨 Visual Indicators

The template includes visual indicators when using mock data:

**Mock Data Banner:**

```
ℹ️ Using Mock Data | Strapi CMS is not connected.
Configure PUBLIC_STRAPI_URL to load real content
```

- **Color:** Amber/Orange gradient
- **Location:** Top of page
- **Visibility:** Only shown when using mock data

## 📈 Performance Benefits

1. **Fast Builds:** No waiting for slow API responses
2. **Offline Development:** Work without internet connection
3. **Reliable Deploys:** Never fail due to CMS downtime
4. **CDN-Friendly:** Fully static files, perfect for edge caching
5. **Zero Runtime Dependencies:** No API calls at page load time

## 🔍 Debugging

### Check Strapi Connection

```bash
# Run development server
npm run dev

# Look for console messages:
✓ Strapi URL configured: https://your-strapi.com
✓ Successfully fetched 10 items from menu-items

# OR

ℹ️ Strapi not configured - returning empty data for menu-items
```

### Verify Build Output

```bash
npm run build

# Check for:
# 1. No build errors
# 2. Generated pages in dist/
# 3. Downloaded images in dist/uploads/ (if Strapi connected)
```

### Test Static Site

```bash
npm run preview

# Open http://localhost:4321
# Should work without Strapi running
```

## 🚨 Troubleshooting

### Issue: Build fails with "fetch is not defined"

**Solution:** Update to Node.js 18+ (native fetch support)

### Issue: Images not downloading

**Solution:** Check `downloadStrapiImage()` logs, verify Strapi URL and image permissions

### Issue: Mock data not showing

**Solution:** Verify `mockData.ts` is imported in page files

### Issue: Banner always shows even with Strapi

**Solution:** Check if `strapiMenu?.data?.length` is truthy, verify API response structure

## 🎓 Best Practices

1. **Always test builds** before deployment
2. **Keep mock data updated** to match your content structure
3. **Use webhooks** for automatic rebuilds when content changes
4. **Monitor build logs** for API errors
5. **Set reasonable timeouts** (10 seconds recommended)
6. **Version control .env.example**, never `.env`
7. **Test with Strapi down** regularly to verify resilience

## 📚 Additional Resources

- [Astro Build Documentation](https://docs.astro.build/en/guides/build/)
- [Strapi API Documentation](https://docs.strapi.io/dev-docs/api)
- [Static Site Generation Guide](https://docs.astro.build/en/core-concepts/routing/#static-ssg-mode)

## ✨ Summary

This implementation ensures **maximum uptime and reliability**:

- ✅ Website builds successfully with or without Strapi
- ✅ All images cached locally during build
- ✅ Built site (dist/) is fully static and Strapi-independent
- ✅ Graceful fallback to mock data when needed
- ✅ No white screens or build failures
- ✅ Content updates require rebuild but site stays online

The static site continues serving cached content even if the CMS backend goes down for maintenance or experiences issues.

---

**Implementation Date:** January 8, 2026  
**Status:** ✅ Complete & Tested
