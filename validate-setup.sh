#!/bin/bash

# TAP Outreach Playbook - Setup Validation Script
# This script checks all requirements for running the TAP application
# Usage: chmod +x validate-setup.sh && ./validate-setup.sh

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Logging functions
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_header() { echo -e "\n${BOLD}🎯 $1${NC}"; }

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get version of a command
get_version() {
    local cmd="$1"
    local args="${2:---version}"
    if command_exists "$cmd"; then
        $cmd $args 2>/dev/null | head -n1
    else
        echo "Not found"
    fi
}

# Check Node.js version
check_node_version() {
    log_header "System Requirements Check"
    
    if ! command_exists node; then
        log_error "Node.js is not installed"
        log_info "Please install Node.js from: https://nodejs.org/"
        return 1
    fi

    local node_version=$(get_version node)
    log_success "Node.js: $node_version"
    
    # Extract major version number
    local major_version=$(echo "$node_version" | grep -oE 'v?[0-9]+' | head -1 | tr -d 'v')
    if [ "$major_version" -lt 16 ]; then
        log_error "Node.js version $major_version is too old. Please upgrade to Node.js 16 or higher."
        return 1
    fi
    
    return 0
}

# Check package manager
check_package_manager() {
    local has_npm=false
    local has_yarn=false
    
    if command_exists npm; then
        has_npm=true
        local npm_version=$(get_version npm)
        log_success "npm: $npm_version"
    fi
    
    if command_exists yarn; then
        has_yarn=true
        local yarn_version=$(get_version yarn)
        log_success "yarn: $yarn_version"
    fi
    
    if [ "$has_npm" = false ] && [ "$has_yarn" = false ]; then
        log_error "No package manager found. Please install npm or yarn."
        return 1
    fi
    
    return 0
}

# Check project structure and dependencies
check_dependencies() {
    log_header "Project Dependencies Check"
    
    if [ ! -f "package.json" ]; then
        log_error "package.json not found. Are you in the correct directory?"
        return 1
    fi
    
    log_success "package.json found"
    
    # Get project info
    local project_name=$(grep -o '"name": "[^"]*' package.json | cut -d'"' -f4)
    local project_version=$(grep -o '"version": "[^"]*' package.json | cut -d'"' -f4)
    log_info "Project: $project_name v$project_version"
    
    if [ ! -d "node_modules" ]; then
        log_warning "node_modules not found. Running npm install..."
        if npm install; then
            log_success "Dependencies installed successfully"
        else
            log_error "Failed to install dependencies"
            return 1
        fi
    else
        log_success "node_modules directory found"
    fi
    
    # Check critical dependencies
    local critical_deps=("react" "react-dom" "vite" "typescript")
    for dep in "${critical_deps[@]}"; do
        if [ -d "node_modules/$dep" ]; then
            log_success "$dep installed"
        else
            log_error "$dep not found in node_modules"
            return 1
        fi
    done
    
    return 0
}

# Check environment variables
check_environment_variables() {
    log_header "Environment Variables Check"
    
    if [ ! -f ".env" ]; then
        log_warning ".env file not found"
        if [ -f ".env.example" ]; then
            log_info "Found .env.example file. Please copy it to .env and add your API keys:"
            log_info "cp .env.example .env"
        else
            log_info "Please create a .env file with the following variables:"
        fi
        echo -e "\n${BLUE}Required environment variables:${NC}"
        echo -e "${YELLOW}VITE_OPENAI_API_KEY=your_openai_api_key_here${NC}"
        echo -e "${YELLOW}VITE_HUNTER_API_KEY=your_hunter_io_api_key_here${NC}"
        return 1
    fi
    
    log_success ".env file found"
    
    # Check required variables
    local openai_key=$(grep "VITE_OPENAI_API_KEY=" .env | cut -d'=' -f2)
    local hunter_key=$(grep "VITE_HUNTER_API_KEY=" .env | cut -d'=' -f2)
    
    if [ -n "$openai_key" ] && [ "$openai_key" != "your_openai_api_key_here" ]; then
        log_success "VITE_OPENAI_API_KEY is set"
    else
        log_error "VITE_OPENAI_API_KEY is missing or not configured"
        return 1
    fi
    
    if [ -n "$hunter_key" ] && [ "$hunter_key" != "your_hunter_io_api_key_here" ]; then
        log_success "VITE_HUNTER_API_KEY is set"
    else
        log_error "VITE_HUNTER_API_KEY is missing or not configured"
        return 1
    fi
    
    log_info "🔑 OpenAI API keys: https://platform.openai.com/api-keys"
    log_info "🔑 Hunter.io API keys: https://hunter.io/api_keys"
    
    return 0
}

# Check module content
check_module_content() {
    log_header "Module Content Check"
    
    local modules_dir="public/data/modules"
    
    if [ ! -d "$modules_dir" ]; then
        log_error "Module directory not found: $modules_dir/"
        log_info "Please create the directory and add TAP module markdown files"
        return 1
    fi
    
    log_success "Module directory found"
    
    local expected_modules=("module1.md" "module2.md" "module3.md" "module4.md" "module5.md" "module6.md" "module7.md")
    local all_modules_present=true
    
    for module in "${expected_modules[@]}"; do
        local module_path="$modules_dir/$module"
        if [ -f "$module_path" ]; then
            local size=$(du -h "$module_path" | cut -f1)
            log_success "$module ($size)"
        else
            log_error "$module not found"
            all_modules_present=false
        fi
    done
    
    if [ "$all_modules_present" = false ]; then
        log_info "Please add all TAP module markdown files to $modules_dir/"
        return 1
    fi
    
    return 0
}

# Test build process
check_build_process() {
    log_header "Build Process Check"
    
    log_info "Running build test..."
    
    if npm run build >/dev/null 2>&1; then
        log_success "Build completed successfully"
        
        if [ -d "dist" ]; then
            log_success "dist directory created"
            
            if [ -f "dist/index.html" ]; then
                log_success "index.html generated"
            else
                log_error "index.html not found in build output"
                return 1
            fi
        else
            log_error "dist directory not created"
            return 1
        fi
    else
        log_error "Build process failed"
        return 1
    fi
    
    return 0
}

# Check API key formats
check_api_keys() {
    log_header "API Key Format Check"
    
    if [ ! -f ".env" ]; then
        log_warning "Cannot validate API keys without .env file"
        return 0
    fi
    
    local openai_key=$(grep "VITE_OPENAI_API_KEY=" .env | cut -d'=' -f2)
    local hunter_key=$(grep "VITE_HUNTER_API_KEY=" .env | cut -d'=' -f2)
    
    if [[ "$openai_key" =~ ^sk- ]]; then
        log_success "OpenAI API key format looks correct"
    else
        log_warning "OpenAI API key format may be incorrect (should start with sk-)"
    fi
    
    if [ ${#hunter_key} -gt 10 ]; then
        log_success "Hunter.io API key format looks correct"
    else
        log_warning "Hunter.io API key format may be incorrect"
    fi
    
    log_info "Note: Full API connectivity will be tested when you run the application"
    return 0
}

# Main validation function
run_validation() {
    clear
    echo -e "${BOLD}🎯 TAP Outreach Playbook - Setup & Validation${NC}"
    echo -e "${BLUE}$(printf '=%.0s' {1..60})${NC}"
    
    local all_passed=true
    
    # Run all checks
    check_node_version || all_passed=false
    check_package_manager || all_passed=false
    check_dependencies || all_passed=false
    check_environment_variables || all_passed=false
    check_module_content || all_passed=false
    check_build_process || all_passed=false
    check_api_keys || all_passed=false
    
    echo -e "\n${BLUE}$(printf '=%.0s' {1..60})${NC}"
    
    if [ "$all_passed" = true ]; then
        log_success "🎉 All checks passed! Your TAP Outreach Playbook is ready to run."
        echo -e "\n${BOLD}Next steps:${NC}"
        log_info "1. Start development server: npm run dev"
        log_info "2. Open browser to: http://localhost:5173"
        log_info "3. Test the chat assistant and module navigation"
        echo -e "\n${BOLD}For deployment:${NC}"
        log_info "• Build for production: npm run build"
        log_info "• Deploy to Vercel: vercel"
        log_info "• Or deploy to your preferred platform"
    else
        log_error "❌ Some checks failed. Please address the issues above."
        echo -e "\n${BOLD}Common solutions:${NC}"
        log_info "• Install Node.js 16+: https://nodejs.org/"
        log_info "• Run: npm install"
        log_info "• Create .env file with your API keys"
        log_info "• Add TAP module files to public/data/modules/"
    fi
    
    echo -e "\n${BLUE}📚 For help, check README.md or requirements.md${NC}"
    
    return $([[ "$all_passed" == true ]] && echo 0 || echo 1)
}

# Run validation
run_validation
exit $?
