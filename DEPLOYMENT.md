# Deployment Guide

This guide covers deploying your Astro Restaurant Template to various hosting platforms.

## 🏗️ Build Process Overview

The Astro Restaurant Template uses **Static Site Generation (SSG)**:

1. Run `npm run build`
2. Strapi content is fetched at build time
3. Images are downloaded to `public/uploads/`
4. Static HTML files are generated in `dist/`
5. Deploy the `dist/` folder to any static host

**Important:** After deployment, your site is completely static and doesn't need Strapi to be online.

## 📋 Pre-Deployment Checklist

Before deploying:

- [ ] Set up Strapi content types ([STRAPI_SCHEMA.md](STRAPI_SCHEMA.md))
- [ ] Add content to Strapi (homepage, menu items)
- [ ] Publish all content in Strapi (not draft)
- [ ] Configure environment variables
- [ ] Test build locally (`npm run build`)
- [ ] Test preview locally (`npm run preview`)
- [ ] Update contact form with Formspree ID
- [ ] Verify all images are accessible
- [ ] Update meta tags and titles

## ☁️ Deployment Platforms

### Vercel (Recommended)

**Why Vercel?**

- Zero configuration for Astro
- Automatic deployments from Git
- Fast global CDN
- Free SSL certificates
- Great performance

**Steps:**

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Visit [vercel.com](https://vercel.com)** and sign in

3. **Import your repository:**

   - Click "Add New Project"
   - Select your repository
   - Vercel auto-detects Astro

4. **Configure environment variables:**

   - Add `PUBLIC_STRAPI_URL`
   - Add `STRAPI_API_TOKEN` (if needed)

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live!

**Custom Domain:**

- Go to Project Settings → Domains
- Add your domain and follow DNS instructions

### Netlify

**Steps:**

1. **Push code to GitHub**

2. **Visit [netlify.com](https://netlify.com)** and sign in

3. **New site from Git:**

   - Click "Add new site" → "Import an existing project"
   - Connect to your Git provider
   - Select your repository

4. **Build settings:**

   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Environment variables:**

   - Go to Site settings → Environment variables
   - Add `PUBLIC_STRAPI_URL`
   - Add `STRAPI_API_TOKEN` (if needed)

6. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

**Netlify Forms:**

If using Netlify forms instead of Formspree, update `contact.astro`:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Your form fields -->
</form>
```

### GitHub Pages

**Steps:**

1. **Install GitHub Pages adapter:**

   ```bash
   npm install @astrojs/github-pages
   ```

2. **Update `astro.config.mjs`:**

   ```javascript
   export default defineConfig({
     output: "static",
     site: "https://yourusername.github.io",
     base: "/your-repo-name",
     // ... rest of config
   });
   ```

3. **Create GitHub Actions workflow:**

   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3

         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install dependencies
           run: npm ci

         - name: Build
           env:
             PUBLIC_STRAPI_URL: ${{ secrets.PUBLIC_STRAPI_URL }}
             STRAPI_API_TOKEN: ${{ secrets.STRAPI_API_TOKEN }}
           run: npm run build

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v1
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v1
   ```

4. **Configure GitHub repository:**

   - Settings → Secrets → Actions
   - Add `PUBLIC_STRAPI_URL`
   - Add `STRAPI_API_TOKEN`

5. **Enable GitHub Pages:**

   - Settings → Pages
   - Source: GitHub Actions

6. **Push to main branch** - Automatic deployment!

### Cloudflare Pages

**Steps:**

1. **Push code to GitHub**

2. **Visit [pages.cloudflare.com](https://pages.cloudflare.com)**

3. **Create a new project:**

   - Connect to Git
   - Select your repository

4. **Build settings:**

   - Build command: `npm run build`
   - Build output directory: `dist`

5. **Environment variables:**

   - Add `PUBLIC_STRAPI_URL`
   - Add `STRAPI_API_TOKEN`

6. **Save and Deploy**

### DigitalOcean App Platform

**Steps:**

1. **Push code to GitHub**

2. **Create new app** on DigitalOcean

3. **Connect repository**

4. **Configure:**

   - Build command: `npm run build`
   - Output directory: `dist`

5. **Add environment variables**

6. **Deploy**

### AWS S3 + CloudFront

**For advanced users:**

1. **Build locally:**

   ```bash
   npm run build
   ```

2. **Create S3 bucket:**

   - Enable static website hosting
   - Set bucket policy for public read

3. **Upload `dist/` folder to S3**

4. **Create CloudFront distribution:**

   - Origin: Your S3 bucket
   - Configure caching
   - Add SSL certificate

5. **Update DNS** to point to CloudFront

## 🔄 Continuous Deployment

### Automatic Rebuilds

**Option 1: Webhook from Strapi**

1. **Create webhook in Strapi:**

   - Settings → Webhooks
   - URL: Your deployment platform's webhook URL
   - Events: `entry.create`, `entry.update`, `entry.delete`

2. **Configure platform webhooks:**
   - **Vercel:** Deploy Hooks in Project Settings
   - **Netlify:** Build Hooks in Site Settings

**Option 2: Scheduled Builds**

Use GitHub Actions cron:

```yaml
on:
  schedule:
    - cron: "0 */6 * * *" # Every 6 hours
```

## 🌐 Custom Domain Setup

### DNS Configuration

For most platforms:

1. **Add A record:**

   ```
   Type: A
   Name: @
   Value: [platform's IP]
   ```

2. **Add CNAME record:**
   ```
   Type: CNAME
   Name: www
   Value: [your-site.platform.com]
   ```

### SSL Certificates

All recommended platforms provide free SSL certificates automatically.

## 📊 Performance Optimization

### Image Optimization

Already handled at build time! Images are:

- Downloaded locally
- Served from your static host
- Cached by CDN

### Additional Optimizations

1. **Minification:**
   Astro automatically minifies HTML, CSS, and JS in production.

2. **Compression:**
   Enable gzip/brotli on your host:

   - Vercel/Netlify: Automatic
   - Cloudflare: Enable in settings

3. **Caching Headers:**
   Add `public/_headers` (Netlify) or `vercel.json` (Vercel):

   ```
   /*
     Cache-Control: public, max-age=31536000, immutable

   /*.html
     Cache-Control: public, max-age=0, must-revalidate
   ```

## 🔍 Monitoring & Analytics

### Google Analytics

Add to all pages in `<head>`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Vercel Analytics

Already built-in with Vercel!

### Sentry Error Tracking

For production error monitoring:

1. Install: `npm install @sentry/astro`
2. Configure in `astro.config.mjs`
3. Add Sentry DSN to environment variables

## 🐛 Troubleshooting

### Build Fails

**Error: "PUBLIC_STRAPI_URL is required"**

- Add environment variable to your hosting platform

**Error: "Failed to fetch from Strapi"**

- Verify Strapi is accessible from build server
- Check API permissions in Strapi
- Test Strapi URL in browser

**Error: "Image download failed"**

- Check Strapi media library permissions
- Verify images are published
- Test image URLs directly

### Site Not Updating

**Content changes not visible:**

- Trigger a new build (content is fetched at build time)
- Clear CDN cache if available
- Check Strapi content is published

**CSS not applying:**

- Clear browser cache
- Verify Tailwind classes are correct
- Check build completed successfully

## 📈 Post-Deployment

After deploying:

1. **Test all pages** on mobile and desktop
2. **Verify contact form** sends emails
3. **Check image loading** and quality
4. **Test navigation** and links
5. **Verify Strapi integration** with fresh content
6. **Set up monitoring** and analytics
7. **Configure automatic rebuilds** when content changes
8. **Add to Google Search Console**
9. **Submit sitemap** to search engines
10. **Monitor performance** with Lighthouse

## 🚀 Quick Deploy Comparison

| Platform     | Setup Time | Free Tier | Auto Deploy | Custom Domain | Best For      |
| ------------ | ---------- | --------- | ----------- | ------------- | ------------- |
| Vercel       | 5 min      | Yes       | Yes         | Yes           | Fast & easy   |
| Netlify      | 5 min      | Yes       | Yes         | Yes           | Feature-rich  |
| GitHub Pages | 10 min     | Yes       | Yes         | Yes           | GitHub users  |
| Cloudflare   | 5 min      | Yes       | Yes         | Yes           | Speed focused |
| DigitalOcean | 10 min     | No        | Yes         | Yes           | Full control  |

---

**Ready to deploy?** Start with Vercel or Netlify for the easiest setup!
