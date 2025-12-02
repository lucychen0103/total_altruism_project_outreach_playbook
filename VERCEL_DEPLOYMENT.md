# Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:

1. ✅ A GitHub account with this repository
2. ✅ A Vercel account (sign up at [vercel.com](https://vercel.com))
3. ✅ Your OpenAI API key
4. ✅ Your Hunter.io API key
5. ✅ All module content files in `public/data/modules/`

## Quick Deploy

### Option 1: Deploy with Vercel Button (Easiest)

1. Click the "Deploy to Vercel" button (if available in README)
2. Connect your GitHub account
3. Configure environment variables (see below)
4. Click "Deploy"

### Option 2: Manual Deployment via Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import Git Repository**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Find and select `TAP_Outreach_Playbook`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**

   Click "Environment Variables" and add:

   ```
   Name: VITE_OPENAI_API_KEY
   Value: sk-your-actual-openai-key-here

   Name: VITE_HUNTER_API_KEY
   Value: your-actual-hunter-api-key-here
   ```

   **Important**: Add these for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-3 minutes for build to complete
   - You'll get a live URL like `https://your-project.vercel.app`

## Environment Variables Setup

### Required Variables

```env
VITE_OPENAI_API_KEY=sk-...your-openai-key
VITE_HUNTER_API_KEY=...your-hunter-key
```

### How to Add in Vercel Dashboard

1. Go to your project in Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add each variable:
   - **Name**: Variable name (e.g., `VITE_OPENAI_API_KEY`)
   - **Value**: Your actual API key
   - **Environments**: Select all (Production, Preview, Development)
5. Click "Save"

### Security Notes

- ⚠️ **NEVER** commit `.env` file to Git
- ✅ Environment variables in Vercel are encrypted and secure
- ✅ Each deployment environment can have different keys
- ✅ Variables are injected at build time (prefixed with `VITE_`)

## Vercel CLI Deployment (Advanced)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Set Environment Variables via CLI

```bash
# Add environment variable
vercel env add VITE_OPENAI_API_KEY

# List environment variables
vercel env ls

# Pull environment variables to local
vercel env pull
```

## Automatic Deployments

Once connected to GitHub, Vercel automatically:

1. **Production Deployments**
   - Deploys every push to `main` branch
   - Creates production URL
   - Runs all build checks

2. **Preview Deployments**
   - Deploys every pull request
   - Creates unique preview URL
   - Allows testing before merge

3. **Build Notifications**
   - Email on build success/failure
   - GitHub commit status checks
   - Slack/Discord integrations available

## Post-Deployment Verification

After deployment, verify your application:

### 1. Check Application Loads
- Visit your Vercel URL
- Verify homepage loads correctly
- Check all 7 modules are accessible

### 2. Test AI Chat Assistant
- Click the floating chat icon
- Send a test message
- Verify GPT-4 responses work

### 3. Test Contact Finder Tools
- Try the LinkedIn CSR Contact Finder
- Test Hunter.io email verification
- Verify search functionality works

### 4. Check Browser Console
- Open Developer Tools (F12)
- Look for any errors in Console
- Verify no API key errors

### 5. Test on Multiple Devices
- Desktop browser
- Mobile browser
- Different screen sizes

## Troubleshooting

### Build Failures

**Error: "Command failed: npm run build"**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run typecheck

# Verify all dependencies
npm install
```

**Error: "Module not found"**
- Check all imports use correct paths
- Verify all files are committed to Git
- Ensure `public/data/modules/` files exist

### Runtime Errors

**Chat Assistant Not Working**
- Verify `VITE_OPENAI_API_KEY` is set in Vercel
- Check OpenAI API key is valid
- Ensure billing is set up on OpenAI account
- Check browser console for specific errors

**Contact Finder Not Working**
- Verify `VITE_HUNTER_API_KEY` is set in Vercel
- Check Hunter.io API key is valid
- Verify free tier limits not exceeded
- Check network tab for API errors

**Module Content Missing**
- Ensure all `.md` files in `public/data/modules/` are committed
- Verify file names match exactly: `module1.md`, `module2.md`, etc.
- Check files have content (not empty)
- Redeploy after adding missing files

### Environment Variable Issues

**Variables Not Loading**
1. Check variable names are exactly correct (case-sensitive)
2. Ensure all variables have `VITE_` prefix
3. Verify variables set for correct environment
4. Redeploy after adding new variables

**API Keys Invalid**
1. Regenerate keys from provider dashboard
2. Update in Vercel environment variables
3. Ensure no extra spaces in keys
4. Verify keys have proper permissions

## Custom Domain Setup

### Add Custom Domain

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

### DNS Configuration

For most domain providers:

```
Type: CNAME
Name: www (or your subdomain)
Value: cname.vercel-dns.com
```

For root domain:

```
Type: A
Name: @ (or blank)
Value: 76.76.21.21
```

## Performance Optimization

### Built-in Optimizations

Vercel automatically provides:
- ✅ Global CDN distribution
- ✅ Automatic HTTPS/SSL
- ✅ HTTP/2 and HTTP/3
- ✅ Brotli and Gzip compression
- ✅ Image optimization
- ✅ Edge caching

### Monitor Performance

1. Go to Vercel Dashboard → Analytics
2. Check:
   - Page load times
   - Web Vitals scores
   - Real User Monitoring data
   - Geographic distribution

## Monitoring and Logs

### View Deployment Logs

1. Go to your Vercel project
2. Click "Deployments" tab
3. Click on any deployment
4. View build logs and runtime logs

### Real-time Logs

```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs
```

### Set Up Alerts

1. Go to Settings → Notifications
2. Enable:
   - Build failure alerts
   - Deployment success notifications
   - Error tracking

## Rollback Deployments

If something goes wrong:

1. Go to "Deployments" tab
2. Find a working previous deployment
3. Click "..." menu
4. Select "Promote to Production"

## Cost and Limits

### Vercel Free Tier (Hobby)

- ✅ 100 GB bandwidth per month
- ✅ Unlimited deployments
- ✅ Automatic SSL certificates
- ✅ Preview deployments
- ✅ Analytics included

### Upgrade if Needed

Consider upgrading to Pro ($20/month) if you need:
- More bandwidth (1 TB/month)
- Team collaboration
- Password protection
- Priority support

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains)

## Support

### Common Commands

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Run validation
npm run validate

# Type check
npm run typecheck
```

### Getting Help

1. Check Vercel deployment logs
2. Review browser console errors
3. Test API keys independently
4. Run `npm run validate` locally
5. Contact Vercel support (Pro plan)

---

## Quick Checklist

Before deploying, ensure:

- [ ] All code is committed to GitHub
- [ ] `.env` is in `.gitignore` (NOT committed)
- [ ] Build succeeds locally (`npm run build`)
- [ ] All module files exist in `public/data/modules/`
- [ ] OpenAI API key is ready
- [ ] Hunter.io API key is ready
- [ ] No console errors locally

After deploying, verify:

- [ ] Application loads on Vercel URL
- [ ] All 7 modules accessible
- [ ] Chat assistant works
- [ ] Contact finder tools work
- [ ] No errors in browser console
- [ ] Mobile responsiveness works

---

**Your TAP Outreach Playbook is ready for Vercel! 🚀**

For questions, refer to the main [README.md](./README.md) or Vercel documentation.
