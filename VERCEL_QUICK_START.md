# Vercel Deployment - Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Prepare Your API Keys (2 minutes)

You'll need:

1. **OpenAI API Key**
   - Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)
   - Keep it handy!

2. **Hunter.io API Key**
   - Go to [hunter.io/api_keys](https://hunter.io/api_keys)
   - Copy your API key
   - Keep it handy!

### Step 2: Deploy to Vercel (3 minutes)

1. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Sign up" or "Login" with GitHub

2. **Import Repository**
   - Click "Import Git Repository"
   - Select `TAP_Outreach_Playbook`
   - Click "Import"

3. **Add Environment Variables**

   Click "Environment Variables" and add these TWO variables:

   ```
   VITE_OPENAI_API_KEY
   sk-your-actual-openai-key-here

   VITE_HUNTER_API_KEY
   your-actual-hunter-api-key-here
   ```

   Make sure to select **all environments** (Production, Preview, Development)

4. **Deploy!**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get your live URL! 🎉

### Step 3: Verify (1 minute)

Visit your new URL and check:

- ✅ App loads
- ✅ Click chat icon → send a message → get AI response
- ✅ Try Module 1 → content loads
- ✅ No errors in browser console (press F12)

---

## ✅ That's It!

Your TAP Outreach Playbook is now live on Vercel!

---

## 🔧 What Was Configured For You

This repository includes:

✅ **vercel.json** - Vercel configuration
✅ **vite.config.ts** - Optimized build settings
✅ **.vercelignore** - Files to exclude
✅ **Automatic builds** - Push to main = auto deploy

---

## 📚 Need More Help?

- **Detailed guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Full checklist**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Troubleshooting**: Check browser console, Vercel logs

---

## 🔄 Auto-Deployment

Now every time you push to GitHub:
- Main branch → Deploys to production automatically
- Pull requests → Creates preview deployment

---

## 💡 Pro Tips

1. **Test Locally First**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Verify both keys are there

3. **View Logs**
   - Vercel Dashboard → Deployments → Click deployment → View logs

4. **Rollback if Needed**
   - Deployments tab → Find working version → "Promote to Production"

---

## 🆘 Quick Troubleshooting

**Chat not working?**
→ Check OpenAI API key in Vercel environment variables

**Contact finder not working?**
→ Check Hunter.io API key in Vercel environment variables

**Modules not loading?**
→ Ensure all `.md` files in `public/data/modules/` are committed to Git

**Build failed?**
→ Check Vercel build logs for specific error

---

## 🎯 Your Deployment Checklist

- [ ] OpenAI API key added to Vercel
- [ ] Hunter.io API key added to Vercel
- [ ] Deployment successful (green checkmark)
- [ ] App loads at Vercel URL
- [ ] Chat assistant works
- [ ] Modules load correctly
- [ ] No console errors

---

**Need detailed help?** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

**Ready to go live!** 🚀
