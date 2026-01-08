# Customization Guide

This guide will walk you through customizing the Astro Restaurant Template for your specific restaurant or food business.

## 🎨 Brand Colors

### Primary Colors

Edit `tailwind.config.mjs` to change the primary color palette:

```javascript
colors: {
  primary: {
    50: '#f8fafc',   // Lightest shade
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',  // Main color - used for text
    600: '#475569',  // Used for buttons, CTAs
    700: '#334155',  // Used for hover states
    800: '#1e293b',
    900: '#0f172a',  // Darkest shade
  },
}
```

### Accent Colors

Change accent colors for highlights and special elements:

```javascript
accent: {
  50: '#f0f9ff',
  // ... adjust all shades
  500: '#0ea5e9',  // Main accent color
  600: '#0284c7',  // Used for hover
}
```

### Color Palette Tools

Generate color palettes easily:
- [Tailwind Color Generator](https://uicolors.app/create)
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

### Example Color Schemes

**Warm Restaurant:**
```javascript
primary: {
  // Orange/Amber tones
  600: '#d97706',
  700: '#b45309',
}
```

**Upscale/Fine Dining:**
```javascript
primary: {
  // Deep purple/gold
  600: '#7c3aed',
  700: '#6d28d9',
}
```

**Fresh/Healthy:**
```javascript
primary: {
  // Green tones
  600: '#059669',
  700: '#047857',
}
```

## 🔤 Typography

### Change Fonts

The template uses **Inter** font by default. To change:

1. **Choose a Google Font:**
   - Visit [Google Fonts](https://fonts.google.com/)
   - Select your font (e.g., "Poppins", "Montserrat", "Roboto")

2. **Update the font link** in all page files (`src/pages/*.astro`):

   Find:
   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
     rel="stylesheet"
   />
   ```

   Replace with your font:
   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap"
     rel="stylesheet"
   />
   ```

3. **Update the font-family** in the body tag:

   Find:
   ```html
   <body class="font-['Inter'] bg-slate-50">
   ```

   Replace with:
   ```html
   <body class="font-['Poppins'] bg-slate-50">
   ```

### Custom Fonts

To use custom fonts (not from Google):

1. Place font files in `public/fonts/`
2. Add `@font-face` rules in a global CSS file
3. Update the font-family classes

## 📝 Content & Copy

### Site Name

Replace "Restaurant Name" throughout the project:

**Global Find & Replace:**
```
Find: Restaurant Name
Replace: Your Restaurant Name
```

Files to update:
- `src/pages/index.astro`
- `src/pages/menu.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`

### Navigation Links

Edit navigation in all pages:

```html
<a href="/" class="...">Home</a>
<a href="/menu" class="...">Menu</a>
<a href="/about" class="...">About</a>
<a href="/contact" class="...">Contact</a>
```

Add custom pages:
```html
<a href="/reservations" class="...">Reservations</a>
<a href="/events" class="...">Events</a>
```

### Hero Section

Edit default hero text in `src/components/Hero.astro`:

```javascript
const heroTitle = heroData?.heroTitle || "Your Custom Tagline Here";
const heroSubtitle = heroData?.heroSubtitle || "Your custom description...";
```

### About Page Content

Update your story in `src/pages/about.astro`:

```html
<h2>Our Story</h2>
<p>Founded in [Year], [Your Restaurant] has been...</p>
```

### Footer Content

Update footer information in all pages:

```html
<div>
  <h4>Contact Us</h4>
  <p>Email: your-email@restaurant.com</p>
  <p>Phone: (555) 123-4567</p>
  <p>123 Your Street, Your City, ST 12345</p>
</div>
```

## 🖼️ Images & Media

### Logo

Add your logo:

1. Save logo as `public/logo.svg` or `public/logo.png`
2. Update navigation in all pages:

```html
<div class="flex items-center gap-3">
  <img src="/logo.svg" alt="Restaurant Logo" class="h-10" />
  <span class="text-2xl font-bold text-primary-700">Your Name</span>
</div>
```

### Favicon

Replace `public/favicon.svg` with your own favicon.

### Placeholder Images

Replace the SVG placeholders with your images:

- `public/placeholders/hero.svg` → Your hero image
- `public/placeholders/dish-1.svg` through `dish-4.svg` → Menu item photos
- `public/placeholders/about.svg` → About page image

**Image Recommendations:**
- Use high-quality photos (1920px width for hero)
- Optimize images before uploading (use [TinyPNG](https://tinypng.com/))
- Use consistent aspect ratios

### Background Images

To add background images to sections:

```html
<section class="py-20 bg-cover bg-center" style="background-image: url('/your-image.jpg');">
  <div class="bg-black bg-opacity-50">
    <!-- Your content with overlay -->
  </div>
</section>
```

## 📧 Contact Form Setup

### Formspree Integration

1. **Sign up at [Formspree.io](https://formspree.io/)**

2. **Create a new form** and get your Form ID

3. **Update `src/pages/contact.astro`:**

   Find:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

   Replace `YOUR_FORM_ID` with your actual ID:
   ```html
   <form action="https://formspree.io/f/xyzabc123" method="POST">
   ```

### Alternative Form Services

**EmailJS:**
```html
<form id="contact-form">
  <!-- Add EmailJS script and configuration -->
</form>
```

**Netlify Forms:**
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Your form fields -->
</form>
```

## 🗺️ Google Maps Integration

Add a real map to the contact page:

1. **Get Google Maps embed code:**
   - Visit [Google Maps](https://www.google.com/maps)
   - Search for your location
   - Click "Share" → "Embed a map"
   - Copy the iframe code

2. **Replace the map placeholder in `src/pages/contact.astro`:**

   ```html
   <div class="rounded-2xl overflow-hidden h-96">
     <iframe
       src="YOUR_GOOGLE_MAPS_EMBED_URL"
       width="100%"
       height="100%"
       style="border:0;"
       allowfullscreen=""
       loading="lazy"
       referrerpolicy="no-referrer-when-downgrade"
     ></iframe>
   </div>
   ```

## 📱 Social Media Links

Add social media icons to the footer:

```html
<div>
  <h4 class="text-xl font-semibold mb-4">Follow Us</h4>
  <div class="flex gap-4">
    <a href="https://facebook.com/yourpage" class="text-slate-200 hover:text-accent-400">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <!-- Facebook icon SVG path -->
      </svg>
    </a>
    <a href="https://instagram.com/yourpage" class="text-slate-200 hover:text-accent-400">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <!-- Instagram icon SVG path -->
      </svg>
    </a>
  </div>
</div>
```

Use icon libraries:
- [Heroicons](https://heroicons.com/)
- [Font Awesome](https://fontawesome.com/)
- [Simple Icons](https://simpleicons.org/)

## 🎯 SEO Optimization

### Update Meta Tags

In each page's `<head>` section:

```html
<meta name="description" content="Your specific page description" />
<title>Your Page Title - Restaurant Name</title>

<!-- Open Graph for social sharing -->
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:url" content="https://yourwebsite.com" />
```

### Add Schema Markup

Add structured data for restaurants:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Your Restaurant Name",
  "image": "https://yourwebsite.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "ST",
    "postalCode": "12345"
  },
  "telephone": "+1-555-123-4567",
  "servesCuisine": "Italian, American",
  "priceRange": "$$"
}
</script>
```

## ✅ Customization Checklist

Use this checklist when setting up a new restaurant site:

- [ ] Update brand colors in `tailwind.config.mjs`
- [ ] Change font in all page files
- [ ] Replace "Restaurant Name" with actual name
- [ ] Update hero section default text
- [ ] Customize About page story and values
- [ ] Update contact information (email, phone, address)
- [ ] Add logo to navigation
- [ ] Replace favicon
- [ ] Update placeholder images with real photos
- [ ] Set up Formspree for contact form
- [ ] Add Google Maps embed
- [ ] Add social media links
- [ ] Update meta tags and titles
- [ ] Configure Strapi content types
- [ ] Create initial menu items in Strapi
- [ ] Test build process
- [ ] Set up deployment

## 🛠️ Advanced Customization

### Add New Pages

1. Create `src/pages/your-page.astro`
2. Copy structure from existing pages
3. Add link to navigation
4. Update footer links

### Add New Components

1. Create `src/components/YourComponent.astro`
2. Import in pages: `import YourComponent from "../components/YourComponent.astro";`
3. Use in page: `<YourComponent />`

### Modify Menu Card Style

Edit `src/components/SimpleMenuCard.astro` to change:
- Card layout
- Badge styles
- Hover effects
- Price formatting

---

**Need more help?** Check the [README.md](README.md) for general setup or [STRAPI_SCHEMA.md](STRAPI_SCHEMA.md) for Strapi configuration.
