# TAP Outreach Playbook

**Corporate Sponsorship Coaching Platform for The Total Altruism Project**

An interactive web application that provides AI-powered coaching and guidance for securing corporate sponsorships for environmental initiatives. Features a comprehensive 7-module curriculum with real-time RAG-powered chat assistance.

![TAP Outreach Playbook Screenshot](https://via.placeholder.com/800x400/10b981/ffffff?text=TAP+Outreach+Playbook)

## Features

### Interactive Learning Platform
- **7 Comprehensive Modules**: From foundation to closing partnerships
- **Progress Tracking**: Automatic progress saving with localStorage
- **Interactive Exercises**: Text areas, checklists, and hands-on activities
- **Template Library**: Ready-to-use email templates and resources

### AI-Powered Coaching Assistant
- **RAG-Enhanced Chatbot**: Trained on TAP-specific methodologies
- **Contextual Guidance**: Smart module recommendations based on questions
- **Persistent Conversations**: Chat history maintained across sessions
- **Module Navigation**: Clickable links to relevant modules in chat responses

### Built-in Tools
- **LinkedIn CSR Contact Finder**: Search for decision-makers by company and role
- **Hunter.io Email Verification**: Find and verify corporate email addresses
- **Contact Management**: Track prospects and outreach progress

### Modern User Experience
- **Responsive Design**: Works perfectly on desktop and mobile
- **Floating Chat Interface**: Always accessible AI assistant
- **Smooth Animations**: Professional UI with hover effects and transitions
- **Back-to-Top Navigation**: Easy navigation on long module pages

---

## Quick Start

### Prerequisites

Before setting up the TAP Outreach Playbook, ensure you have:

- **Node.js** (version 16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **OpenAI API Account** (for AI chat functionality)
- **Hunter.io Account** (for email finding features)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/TAP_Outreach_Playbook.git
   cd TAP_Outreach_Playbook
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

   Add your API keys (see API Setup section below):
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_HUNTER_API_KEY=your_hunter_io_api_key_here
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open Your Browser**
   
   Navigate to `http://localhost:5173` to see the application.

---

## API Key Setup

### OpenAI API Key

The AI chat assistant requires an OpenAI API key for GPT-4 responses.

#### Step 1: Create OpenAI Account
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Click "Sign Up" or "Log In" if you have an account
3. Complete the registration process

#### Step 2: Add Payment Method
1. Navigate to **Billing** → **Payment Methods**
2. Add a credit/debit card (required even for free tier)
3. Set up billing alerts to monitor usage

#### Step 3: Generate API Key
1. Go to **API Keys** section ([direct link](https://platform.openai.com/api-keys))
2. Click **"Create new secret key"**
3. Give it a name (e.g., "TAP Outreach Playbook")
4. **Important**: Copy the key immediately - you won't see it again!
5. Add the key to your `.env` file:
   ```env
   VITE_OPENAI_API_KEY=sk-your-secret-key-here
   ```

#### Usage and Costs
- **Free Tier**: $5 in free credits for new accounts
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Estimated Usage**: $1-5 per month for typical coaching usage
- **Monitoring**: Check usage at [platform.openai.com/usage](https://platform.openai.com/usage)

---

### Hunter.io API Key

The contact finder tool uses Hunter.io for email discovery and verification.

#### Step 1: Create Hunter.io Account
1. Go to [hunter.io](https://hunter.io/)
2. Click **"Sign up for free"**
3. Complete registration with your email

#### Step 2: Verify Your Account
1. Check your email for verification link
2. Complete email verification
3. You may need to add a phone number for verification

#### Step 3: Get Your API Key
1. Go to **API** section ([direct link](https://hunter.io/api_keys))
2. Your API key will be displayed on this page
3. Copy the API key
4. Add it to your `.env` file:
   ```env
   VITE_HUNTER_API_KEY=your-hunter-api-key-here
   ```

#### Free Tier Limits
- **25 email searches per month** (Email Finder + Domain Search combined)
- **50 email verifications per month** (Email Verifier)
- **Rate limits**: 15 requests/second for searches, 10 requests/second for verification
- **API access**: Full API access included in free tier

#### Upgrading (Optional)
- **Starter Plan**: $49/month for 1,000 requests
- **Growth Plan**: $99/month for 5,000 requests
- **Business Plan**: $199/month for 20,000 requests

---

## Project Structure

```
TAP_Outreach_Playbook/
├── public/
│   └── data/
│       └── modules/           # TAP module markdown files
│           ├── module1.md
│           ├── module2.md
│           └── ...
├── src/
│   ├── components/
│   │   ├── FloatingChat.tsx   # AI chat assistant
│   │   ├── ModuleLayout.tsx   # Module page layout
│   │   ├── ModuleCard.tsx     # Dashboard module cards
│   │   ├── TemplateLibrary.tsx# Template collection
│   │   └── ...
│   ├── modules/
│   │   ├── Module1.tsx        # Foundation & Preparation
│   │   ├── Module2.tsx        # Identifying Target Sponsors
│   │   ├── Module3.tsx        # Finding the Right Contacts
│   │   └── ...
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables (create this)
├── package.json              # Dependencies and scripts
├── README.md                 # This file
├── requirements.md           # Detailed requirements
└── tsconfig.json            # TypeScript configuration
```

---

## Configuration

### Environment Variables

Create a `.env` file with these variables:

```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Hunter.io API Configuration  
VITE_HUNTER_API_KEY=your_hunter_io_api_key_here

# Optional: Development Settings
VITE_API_TIMEOUT=30000
VITE_DEBUG_MODE=false
```

### Module Content Setup

The RAG system requires TAP module markdown files. Ensure these files exist:

```bash
# Check if module files exist
ls -la public/data/modules/

# Should show:
# module1.md - Foundation & Preparation
# module2.md - Identifying Target Sponsors  
# module3.md - Finding the Right Contacts
# module4.md - Email Outreach Campaign
# module5.md - Sponsorship Packages & Proposals
# module6.md - Meeting & Negotiation
# module7.md - Closing & Maintaining Partnerships
```

---

## Usage Guide

### Getting Started

1. **Start with the Dashboard**: Overview of all 7 modules and progress tracking
2. **AI Chat Assistant**: Click the floating chat bubble for instant guidance
3. **Module Navigation**: Complete modules sequentially or jump to specific topics
4. **Template Library**: Access ready-made templates and resources

### AI Chat Features

- **Ask Questions**: "How do I handle budget objections?" 
- **Get Module Recommendations**: AI suggests relevant modules for your questions
- **Contextual Help**: Chat knows TAP-specific methodologies and frameworks
- **Conversation Persistence**: Chat history saves across sessions

### Contact Finding Workflow

1. **Research Companies** (Module 2): Identify target sponsors
2. **Find Contacts** (Module 3): Use LinkedIn CSR Contact Finder
3. **Verify Emails**: Use Hunter.io integration for email verification
4. **Track Progress**: Use built-in contact management features

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler

# Utilities
npm run clean        # Clean build artifacts
```

---

## Troubleshooting

### Common Issues

**Chat Assistant Not Working**
- ✅ Check OpenAI API key in `.env` file
- ✅ Verify API key has billing set up
- ✅ Check browser console for API errors
- ✅ Ensure module markdown files are in `public/data/modules/`

**Contact Finder Not Working**
- ✅ Check Hunter.io API key in `.env` file
- ✅ Verify you haven't exceeded free tier limits (25 requests/month)
- ✅ Check network connectivity
- ✅ Verify Hunter.io account is active

**Module Content Not Loading**
- ✅ Ensure markdown files are in correct directory: `public/data/modules/`
- ✅ Check file names match exactly: `module1.md`, `module2.md`, etc.
- ✅ Verify markdown files have proper content structure
- ✅ Clear browser cache and localStorage

**Progress Not Saving**
- ✅ Check if localStorage is enabled in your browser
- ✅ Ensure you're not in incognito/private browsing mode
- ✅ Try clearing localStorage: `localStorage.clear()` in browser console

### Browser Compatibility

**Supported Browsers:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Required Browser Features:**
- localStorage support
- ES2020 features
- CSS Grid and Flexbox
- Fetch API

---

## Production Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

**Netlify (Recommended)**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify settings

**Vercel**
1. Import GitHub repository  
2. Framework preset: Vite
3. Add environment variables in Vercel dashboard

**Manual Deployment**
1. Run `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server to serve `index.html` for all routes (SPA)

### Environment Variables for Production

Set these in your deployment platform:

```env
VITE_OPENAI_API_KEY=your_production_openai_key
VITE_HUNTER_API_KEY=your_production_hunter_key
```

---

## Support

### Getting Help

**For Technical Issues:**
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all API keys are properly configured

**For TAP-Specific Questions:**
- Use the built-in AI chat assistant
- Review the module content in Template Library
- Consult the TAP methodology documentation

**For Feature Requests:**
- Create an issue in the GitHub repository
- Provide detailed description of requested feature
- Include use case and benefit explanation

---

## Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Create a Pull Request

### Code Style

- Use TypeScript for all components
- Follow existing code structure and naming
- Add proper type definitions
- Include comments for complex logic
- Test on multiple browsers

---

## License

This project is proprietary software developed for The Total Altruism Project.

---

## Acknowledgments

- **OpenAI** for GPT-4 API powering the chat assistant
- **Hunter.io** for email finding and verification services
- **React + Vite** for the development framework
- **Tailwind CSS** for the styling system
- **Lucide React** for the icon library

---

**Built with ❤️ for The Total Altruism Project**

For questions or support, contact the development team or use the built-in AI chat assistant for guidance on TAP sponsorship methodologies.
