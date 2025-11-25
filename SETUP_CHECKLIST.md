# TAP Outreach Playbook - Setup Checklist

## 📋 Pre-Installation Requirements

### System Requirements
- [ ] **Node.js 16+** installed ([Download](https://nodejs.org/))
  ```bash
  node --version  # Should show v16.0.0 or higher
  ```
- [ ] **npm 7+** or **yarn 1.22+** installed
  ```bash
  npm --version   # Should show 7.0.0 or higher
  ```
- [ ] **Git** installed (for cloning repository)
  ```bash
  git --version
  ```

### Account Setup
- [ ] **GitHub account** (for repository access)
- [ ] **OpenAI account** with billing set up
- [ ] **Hunter.io account** (free tier available)

---

## 🔑 API Key Setup

### OpenAI API Key
- [ ] Go to [platform.openai.com](https://platform.openai.com/)
- [ ] Navigate to **API Keys** section
- [ ] Click **"Create new secret key"**
- [ ] Copy the key (starts with `sk-`)
- [ ] Add billing information (required even for free credits)

### Hunter.io API Key  
- [ ] Go to [hunter.io](https://hunter.io/)
- [ ] Sign up for free account
- [ ] Verify email address
- [ ] Navigate to **API** section
- [ ] Copy your API key

---

## 📁 Project Setup

### Repository Setup
- [ ] Clone or download the TAP Outreach Playbook repository
- [ ] Navigate to project directory
  ```bash
  cd TAP_Outreach_Playbook
  ```

### Install Dependencies
- [ ] Run dependency installation
  ```bash
  npm install
  # or
  yarn install
  ```
- [ ] Verify installation completed without errors
- [ ] Check that `node_modules/` directory was created

### Environment Configuration
- [ ] Create `.env` file in root directory
  ```bash
  touch .env
  ```
- [ ] Add your API keys to `.env`:
  ```env
  VITE_OPENAI_API_KEY=sk-your-actual-openai-key-here
  VITE_HUNTER_API_KEY=your-actual-hunter-key-here
  ```
- [ ] Verify `.env` file is **NOT** committed to git (should be in `.gitignore`)

---

## 📚 Module Content Setup

### TAP Module Files
- [ ] Create directory structure:
  ```bash
  mkdir -p public/data/modules
  ```
- [ ] Add all 7 module markdown files:
  - [ ] `module1.md` - Foundation & Preparation
  - [ ] `module2.md` - Identifying Target Sponsors
  - [ ] `module3.md` - Finding the Right Contacts
  - [ ] `module4.md` - Email Outreach Campaign
  - [ ] `module5.md` - Sponsorship Packages & Proposals
  - [ ] `module6.md` - Meeting & Negotiation
  - [ ] `module7.md` - Closing & Maintaining Partnerships
- [ ] Verify each file contains content (not empty)
- [ ] Check file sizes are reasonable (1KB - 20KB each)

---

## 🛠️ Build & Test

### Build Verification
- [ ] Test build process:
  ```bash
  npm run build
  ```
- [ ] Verify `dist/` directory is created
- [ ] Check `dist/index.html` exists
- [ ] Build completes without errors

### Development Server Test
- [ ] Start development server:
  ```bash
  npm run dev
  ```
- [ ] Open browser to `http://localhost:5173`
- [ ] Verify application loads without errors
- [ ] Check browser console for any error messages

---

## 🧪 Functionality Testing

### Basic Application Features
- [ ] **Dashboard loads** with all 7 modules visible
- [ ] **Module navigation** works (click on any module)
- [ ] **Module content** displays properly
- [ ] **Progress tracking** works (mark modules complete)
- [ ] **Back to dashboard** button works

### AI Chat Assistant
- [ ] **Chat button** appears (floating on right side)
- [ ] **Chat opens/closes** when clicked
- [ ] **Send a test message** (e.g., "Hello")
- [ ] **AI responds** without errors
- [ ] **Module recommendations** appear in responses
- [ ] **Clickable module links** work in chat
- [ ] **Chat history persists** across page refreshes

### Contact Finding Tools (Module 3)
- [ ] **LinkedIn CSR Contact Finder** loads
- [ ] **Search functionality** works
- [ ] **Hunter.io Email Finder** loads
- [ ] **Email verification** works (if you have credits)
- [ ] **No API errors** in browser console

---

## 🚨 Troubleshooting Checklist

### Common Issues
- [ ] **Node version too old**: Upgrade to Node.js 16+
- [ ] **npm install fails**: Try deleting `node_modules` and `package-lock.json`, then reinstall
- [ ] **Build fails**: Check for TypeScript errors, verify all imports
- [ ] **Chat not working**: Verify OpenAI API key is correct and has billing set up
- [ ] **Contact finder not working**: Verify Hunter.io API key and account is active
- [ ] **Module content missing**: Ensure all markdown files are in correct directory
- [ ] **Progress not saving**: Check if localStorage is enabled in browser

### Verification Commands
- [ ] Check Node version: `node --version`
- [ ] Check npm version: `npm --version` 
- [ ] Check project dependencies: `npm list --depth=0`
- [ ] Test build: `npm run build`
- [ ] Check environment variables: `cat .env` (be careful not to share keys)

---

## 🎯 Final Verification

### Manual Testing
- [ ] Complete flow: Dashboard → Module → Chat → Back to Dashboard
- [ ] Test at least 3 different modules
- [ ] Send 3-5 different questions to AI chat
- [ ] Test contact finder with real company names
- [ ] Mark modules as complete and verify progress saves

### Performance Check
- [ ] Application loads quickly (< 3 seconds)
- [ ] Navigation is smooth (< 500ms between pages)
- [ ] Chat responses arrive promptly (< 10 seconds)
- [ ] No memory leaks or performance warnings

### Browser Compatibility
- [ ] Test in Chrome (recommended)
- [ ] Test in Firefox (optional)
- [ ] Test on mobile device (optional)
- [ ] Verify responsive design works

---

## ✅ Ready for Production

### Pre-Deployment
- [ ] All tests pass ✅
- [ ] No console errors ✅
- [ ] API keys work correctly ✅
- [ ] Module content complete ✅
- [ ] Build process successful ✅

### Deployment Options
- [ ] **Vercel** (recommended): Follow deployment guide
- [ ] **Netlify** (alternative): Follow deployment guide
- [ ] **Manual hosting**: Upload `dist/` folder contents

---

## 🆘 Need Help?

### Resources
- [ ] Check `README.md` for detailed setup instructions
- [ ] Check `requirements.md` for technical specifications
- [ ] Review browser console for specific error messages
- [ ] Test API keys independently:
  - OpenAI: [platform.openai.com/playground](https://platform.openai.com/playground)
  - Hunter.io: [hunter.io/email-finder](https://hunter.io/email-finder)

### Contact
- [ ] Use the built-in AI chat for TAP-specific questions
- [ ] Check GitHub issues for known problems
- [ ] Contact development team if persistent issues

---

**🎉 Congratulations!** If all items are checked, your TAP Outreach Playbook is fully functional and ready to help users master corporate sponsorship outreach!
