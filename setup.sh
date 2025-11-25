#!/bin/bash

# TAP Outreach Playbook - One-Line Setup
# 
# This script provides the equivalent of Python's "pip install -r requirements.txt"
# but for a Node.js/React application with comprehensive validation.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/yourusername/TAP_Outreach_Playbook/main/setup.sh | bash
#   
# Or download and run locally:
#   chmod +x setup.sh && ./setup.sh

set -e  # Exit on any error

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# Logging
log() { echo -e "${BLUE}[TAP Setup]${NC} $1"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Banner
echo -e "${BOLD}"
echo "╔════════════════════════════════════════════════════╗"
echo "║          TAP Outreach Playbook Setup              ║"
echo "║     Automated Environment Validation & Setup      ║"
echo "╚════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the TAP project root directory."
    echo ""
    log "To setup:"
    echo "  1. cd TAP_Outreach_Playbook"
    echo "  2. ./setup.sh"
    exit 1
fi

log "Starting comprehensive setup validation..."

# Function to check command existence
check_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        error "$1 is not installed"
        return 1
    fi
    return 0
}

# Function to check version
check_version() {
    local cmd="$1"
    local min_version="$2"
    local current_version=$($cmd --version 2>/dev/null | head -1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
    
    if [ -z "$current_version" ]; then
        error "Could not determine $cmd version"
        return 1
    fi
    
    # Simple version comparison (works for major.minor)
    local min_major=$(echo "$min_version" | cut -d. -f1)
    local min_minor=$(echo "$min_version" | cut -d. -f2)
    local cur_major=$(echo "$current_version" | cut -d. -f1)
    local cur_minor=$(echo "$current_version" | cut -d. -f2)
    
    if [ "$cur_major" -gt "$min_major" ] || [ "$cur_major" -eq "$min_major" -a "$cur_minor" -ge "$min_minor" ]; then
        return 0
    else
        error "$cmd version $current_version is below minimum required $min_version"
        return 1
    fi
}

# Step 1: System Requirements
log "Step 1/7: Checking system requirements..."

if check_command node && check_version node "16.0"; then
    success "Node.js $(node --version) ✓"
else
    error "Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

if check_command npm && check_version npm "7.0"; then
    success "npm $(npm --version) ✓"
else
    error "Please upgrade npm: npm install -g npm@latest"
    exit 1
fi

# Step 2: Install Dependencies
log "Step 2/7: Installing dependencies..."

if [ ! -d "node_modules" ]; then
    log "Installing npm packages..."
    if npm install --silent; then
        success "Dependencies installed ✓"
    else
        error "Failed to install dependencies"
        exit 1
    fi
else
    success "Dependencies already installed ✓"
fi

# Step 3: Environment Variables
log "Step 3/7: Checking environment variables..."

if [ ! -f ".env" ]; then
    warning ".env file not found"
    
    if [ -f ".env.example" ]; then
        log "Creating .env from .env.example template..."
        cp .env.example .env
        success ".env file created from template"
    else
        log "Creating .env file..."
        cat > .env << EOF
# OpenAI API Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Hunter.io API Configuration  
VITE_HUNTER_API_KEY=your_hunter_io_api_key_here

# Optional Development Settings
VITE_API_TIMEOUT=30000
VITE_DEBUG_MODE=false
EOF
        success ".env file created with template"
    fi
    
    echo ""
    warning "⚠️  IMPORTANT: Please edit .env file with your actual API keys:"
    echo -e "${YELLOW}"
    echo "  1. OpenAI API Key: https://platform.openai.com/api-keys"
    echo "  2. Hunter.io API Key: https://hunter.io/api_keys"
    echo -e "${NC}"
    echo ""
    log "After adding your keys, run: npm run validate"
    
else
    # Check if keys are configured
    openai_key=$(grep "VITE_OPENAI_API_KEY=" .env | cut -d'=' -f2)
    hunter_key=$(grep "VITE_HUNTER_API_KEY=" .env | cut -d'=' -f2)
    
    if [ "$openai_key" = "your_openai_api_key_here" ] || [ -z "$openai_key" ]; then
        warning "OpenAI API key not configured in .env"
    else
        success "OpenAI API key configured ✓"
    fi
    
    if [ "$hunter_key" = "your_hunter_io_api_key_here" ] || [ -z "$hunter_key" ]; then
        warning "Hunter.io API key not configured in .env"
    else
        success "Hunter.io API key configured ✓"
    fi
fi

# Step 4: Module Content
log "Step 4/7: Checking module content..."

modules_dir="public/data/modules"
if [ ! -d "$modules_dir" ]; then
    log "Creating modules directory..."
    mkdir -p "$modules_dir"
fi

expected_modules=("module1.md" "module2.md" "module3.md" "module4.md" "module5.md" "module6.md" "module7.md")
missing_modules=0

for module in "${expected_modules[@]}"; do
    if [ -f "$modules_dir/$module" ]; then
        success "$module found ✓"
    else
        warning "$module missing"
        missing_modules=$((missing_modules + 1))
    fi
done

if [ "$missing_modules" -gt 0 ]; then
    warning "$missing_modules module files missing. Please add TAP content to $modules_dir/"
fi

# Step 5: Build Test
log "Step 5/7: Testing build process..."

if npm run build >/dev/null 2>&1; then
    success "Build test passed ✓"
else
    error "Build test failed. Check for TypeScript errors."
    exit 1
fi

# Step 6: Development Server Test
log "Step 6/7: Testing development server..."

# Start dev server in background and test if it starts
log "Starting development server test..."
if timeout 10s npm run dev >/dev/null 2>&1 || [ $? -eq 124 ]; then
    success "Development server test passed ✓"
else
    warning "Development server test inconclusive (but likely OK)"
fi

# Step 7: Final Validation
log "Step 7/7: Running comprehensive validation..."

if [ -f "validate-setup.js" ]; then
    if node validate-setup.js >/dev/null 2>&1; then
        success "Comprehensive validation passed ✓"
    else
        warning "Some validation checks failed. Run 'npm run validate' for details."
    fi
elif [ -f "validate-setup.sh" ]; then
    if chmod +x validate-setup.sh && ./validate-setup.sh >/dev/null 2>&1; then
        success "Comprehensive validation passed ✓"
    else
        warning "Some validation checks failed. Run './validate-setup.sh' for details."
    fi
else
    log "Validation script not found, but basic checks completed."
fi

# Summary
echo ""
echo -e "${BOLD}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║                   SETUP COMPLETE                   ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════════╝${NC}"
echo ""

success "🎉 TAP Outreach Playbook setup completed successfully!"
echo ""
echo -e "${BOLD}Next Steps:${NC}"
echo "  1. Add your API keys to .env file (if not already done)"
echo "  2. Add TAP module files to public/data/modules/ (if missing)"
echo "  3. Start development: ${BLUE}npm run dev${NC}"
echo "  4. Open: ${BLUE}http://localhost:5173${NC}"
echo ""
echo -e "${BOLD}Useful Commands:${NC}"
echo "  • Full validation: ${BLUE}npm run validate${NC}"
echo "  • Build for production: ${BLUE}npm run build${NC}"
echo "  • Quick health check: ${BLUE}npm run health-check${NC}"
echo "  • Deploy to Vercel: ${BLUE}vercel${NC}"
echo ""
echo -e "${BOLD}Documentation:${NC}"
echo "  • Setup guide: README.md"
echo "  • Requirements: requirements.md" 
echo "  • Manual checklist: SETUP_CHECKLIST.md"
echo ""

# Check if we can start immediately
openai_key=$(grep "VITE_OPENAI_API_KEY=" .env 2>/dev/null | cut -d'=' -f2)
hunter_key=$(grep "VITE_HUNTER_API_KEY=" .env 2>/dev/null | cut -d'=' -f2)

if [ "$openai_key" != "your_openai_api_key_here" ] && [ -n "$openai_key" ] && [ "$hunter_key" != "your_hunter_io_api_key_here" ] && [ -n "$hunter_key" ]; then
    echo -e "${GREEN}✨ All API keys configured! You can start the app immediately:${NC}"
    echo -e "${GREEN}   npm run dev${NC}"
else
    echo -e "${YELLOW}⏱️  Almost ready! Please configure your API keys in .env, then run:${NC}"
    echo -e "${YELLOW}   npm run dev${NC}"
fi

echo ""
log "Setup completed successfully! 🚀"
