#!/usr/bin/env node

/**
 * TAP Outreach Playbook - Setup & Validation Script
 * 
 * This script checks all system requirements, validates configuration,
 * and ensures the application is ready to run successfully.
 * 
 * Usage: npm run validate
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Utility functions
const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logSuccess = (message) => log(`✅ ${message}`, 'green');
const logError = (message) => log(`❌ ${message}`, 'red');
const logWarning = (message) => log(`⚠️  ${message}`, 'yellow');
const logInfo = (message) => log(`ℹ️  ${message}`, 'blue');
const logHeader = (message) => log(`\n🎯 ${message}`, 'bold');

// Check if command exists
const commandExists = (command) => {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

// Get version of a command
const getVersion = (command, args = '--version') => {
  try {
    const output = execSync(`${command} ${args}`, { encoding: 'utf8' });
    return output.trim().split('\n')[0];
  } catch {
    return null;
  }
};

// Check if file exists
const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

// Read JSON file safely
const readJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
};

// Check Node.js version
const checkNodeVersion = () => {
  logHeader('System Requirements Check');
  
  if (!commandExists('node')) {
    logError('Node.js is not installed');
    logInfo('Please install Node.js from: https://nodejs.org/');
    return false;
  }

  const nodeVersion = getVersion('node');
  logSuccess(`Node.js: ${nodeVersion}`);
  
  // Extract major version number
  const majorVersion = parseInt(nodeVersion.match(/v(\d+)/)?.[1] || '0');
  if (majorVersion < 16) {
    logError(`Node.js version ${majorVersion} is too old. Please upgrade to Node.js 16 or higher.`);
    return false;
  }
  
  return true;
};

// Check npm/yarn
const checkPackageManager = () => {
  const hasNpm = commandExists('npm');
  const hasYarn = commandExists('yarn');
  
  if (!hasNpm && !hasYarn) {
    logError('No package manager found. Please install npm or yarn.');
    return false;
  }
  
  if (hasNpm) {
    const npmVersion = getVersion('npm');
    logSuccess(`npm: ${npmVersion}`);
  }
  
  if (hasYarn) {
    const yarnVersion = getVersion('yarn');
    logSuccess(`yarn: ${yarnVersion}`);
  }
  
  return true;
};

// Check package.json and dependencies
const checkDependencies = () => {
  logHeader('Project Dependencies Check');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fileExists(packageJsonPath)) {
    logError('package.json not found. Are you in the correct directory?');
    return false;
  }
  
  const packageJson = readJSON(packageJsonPath);
  if (!packageJson) {
    logError('package.json is invalid or corrupted');
    return false;
  }
  
  logSuccess('package.json found and valid');
  logInfo(`Project: ${packageJson.name} v${packageJson.version}`);
  
  // Check if node_modules exists
  if (!fileExists(path.join(process.cwd(), 'node_modules'))) {
    logWarning('node_modules not found. Running npm install...');
    try {
      execSync('npm install', { stdio: 'inherit' });
      logSuccess('Dependencies installed successfully');
    } catch (error) {
      logError('Failed to install dependencies');
      return false;
    }
  } else {
    logSuccess('node_modules directory found');
  }
  
  // Check critical dependencies
  const criticalDeps = ['react', 'react-dom', 'vite', 'typescript'];
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  
  for (const dep of criticalDeps) {
    const depPath = path.join(nodeModulesPath, dep);
    if (fileExists(depPath)) {
      logSuccess(`${dep} installed`);
    } else {
      logError(`${dep} not found in node_modules`);
      return false;
    }
  }
  
  return true;
};

// Check environment variables
const checkEnvironmentVariables = () => {
  logHeader('Environment Variables Check');
  
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  if (!fileExists(envPath)) {
    logWarning('.env file not found');
    if (fileExists(envExamplePath)) {
      logInfo('Found .env.example file. Please copy it to .env and add your API keys:');
      logInfo('cp .env.example .env');
    } else {
      logInfo('Please create a .env file with the following variables:');
    }
    log('\nRequired environment variables:', 'cyan');
    log('VITE_OPENAI_API_KEY=your_openai_api_key_here', 'yellow');
    log('VITE_HUNTER_API_KEY=your_hunter_io_api_key_here', 'yellow');
    return false;
  }
  
  logSuccess('.env file found');
  
  // Load environment variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
  
  // Check required variables
  const requiredVars = ['VITE_OPENAI_API_KEY', 'VITE_HUNTER_API_KEY'];
  let allVarsPresent = true;
  
  for (const varName of requiredVars) {
    if (envVars[varName] && envVars[varName] !== 'your_api_key_here') {
      logSuccess(`${varName} is set`);
    } else {
      logError(`${varName} is missing or not configured`);
      allVarsPresent = false;
    }
  }
  
  if (!allVarsPresent) {
    logInfo('\nTo get API keys:');
    logInfo('🔑 OpenAI: https://platform.openai.com/api-keys');
    logInfo('🔑 Hunter.io: https://hunter.io/api_keys');
  }
  
  return allVarsPresent;
};

// Check module content files
const checkModuleContent = () => {
  logHeader('Module Content Check');
  
  const modulesDir = path.join(process.cwd(), 'public', 'data', 'modules');
  
  if (!fileExists(modulesDir)) {
    logError('Module directory not found: public/data/modules/');
    logInfo('Please create the directory and add TAP module markdown files');
    return false;
  }
  
  logSuccess('Module directory found');
  
  const expectedModules = [
    'module1.md', 'module2.md', 'module3.md', 'module4.md',
    'module5.md', 'module6.md', 'module7.md'
  ];
  
  let allModulesPresent = true;
  
  for (const module of expectedModules) {
    const modulePath = path.join(modulesDir, module);
    if (fileExists(modulePath)) {
      const stats = fs.statSync(modulePath);
      logSuccess(`${module} (${Math.round(stats.size / 1024)}KB)`);
    } else {
      logError(`${module} not found`);
      allModulesPresent = false;
    }
  }
  
  if (!allModulesPresent) {
    logInfo('Please add all TAP module markdown files to public/data/modules/');
  }
  
  return allModulesPresent;
};

// Test build process
const checkBuildProcess = () => {
  logHeader('Build Process Check');
  
  try {
    logInfo('Running build test...');
    execSync('npm run build', { stdio: 'pipe' });
    logSuccess('Build completed successfully');
    
    // Check if dist directory was created
    const distPath = path.join(process.cwd(), 'dist');
    if (fileExists(distPath)) {
      logSuccess('dist directory created');
      
      // Check for index.html
      if (fileExists(path.join(distPath, 'index.html'))) {
        logSuccess('index.html generated');
      } else {
        logError('index.html not found in build output');
        return false;
      }
    } else {
      logError('dist directory not created');
      return false;
    }
    
    return true;
  } catch (error) {
    logError('Build process failed');
    logError(error.message);
    return false;
  }
};

// Test development server (optional)
const checkDevelopmentServer = () => {
  logHeader('Development Server Check');
  
  logInfo('Testing development server startup...');
  logWarning('This will start the dev server for 5 seconds to test functionality');
  
  return new Promise((resolve) => {
    try {
      const serverProcess = execSync('timeout 5s npm run dev || true', { 
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      if (serverProcess.includes('Local:') || serverProcess.includes('localhost')) {
        logSuccess('Development server can start successfully');
        resolve(true);
      } else {
        logWarning('Development server test inconclusive');
        resolve(true); // Don't fail for this
      }
    } catch (error) {
      logWarning('Could not test development server (this is OK)');
      resolve(true);
    }
  });
};

// Test API connectivity (basic)
const checkAPIConnectivity = async () => {
  logHeader('API Connectivity Check');
  
  // This would require implementing actual API tests
  // For now, we'll just check if the keys look valid
  
  const envPath = path.join(process.cwd(), '.env');
  if (!fileExists(envPath)) {
    logWarning('Cannot test API connectivity without .env file');
    return true;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const openaiKey = envContent.match(/VITE_OPENAI_API_KEY=(.+)/)?.[1];
  const hunterKey = envContent.match(/VITE_HUNTER_API_KEY=(.+)/)?.[1];
  
  if (openaiKey && openaiKey.startsWith('sk-')) {
    logSuccess('OpenAI API key format looks correct');
  } else {
    logWarning('OpenAI API key format may be incorrect (should start with sk-)');
  }
  
  if (hunterKey && hunterKey.length > 10) {
    logSuccess('Hunter.io API key format looks correct');
  } else {
    logWarning('Hunter.io API key format may be incorrect');
  }
  
  logInfo('Note: Full API connectivity will be tested when you run the application');
  return true;
};

// Main validation function
const runValidation = async () => {
  console.clear();
  log('🎯 TAP Outreach Playbook - Setup & Validation', 'bold');
  log('═'.repeat(60), 'cyan');
  
  const checks = [
    { name: 'System Requirements', fn: checkNodeVersion },
    { name: 'Package Manager', fn: checkPackageManager },
    { name: 'Dependencies', fn: checkDependencies },
    { name: 'Environment Variables', fn: checkEnvironmentVariables },
    { name: 'Module Content', fn: checkModuleContent },
    { name: 'Build Process', fn: checkBuildProcess },
    { name: 'API Keys', fn: checkAPIConnectivity }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    const result = await check.fn();
    if (!result) {
      allPassed = false;
    }
  }
  
  log('\n' + '═'.repeat(60), 'cyan');
  
  if (allPassed) {
    logSuccess('🎉 All checks passed! Your TAP Outreach Playbook is ready to run.');
    log('\nNext steps:', 'bold');
    logInfo('1. Start development server: npm run dev');
    logInfo('2. Open browser to: http://localhost:5173');
    logInfo('3. Test the chat assistant and module navigation');
    log('\nFor deployment:', 'bold');
    logInfo('• Build for production: npm run build');
    logInfo('• Deploy to Vercel: vercel');
    logInfo('• Or deploy to your preferred platform');
  } else {
    logError('❌ Some checks failed. Please address the issues above.');
    log('\nCommon solutions:', 'bold');
    logInfo('• Install Node.js 16+: https://nodejs.org/');
    logInfo('• Run: npm install');
    logInfo('• Create .env file with your API keys');
    logInfo('• Add TAP module files to public/data/modules/');
  }
  
  log('\n📚 For help, check README.md or requirements.md', 'cyan');
  
  return allPassed;
};

// Run if called directly
if (require.main === module) {
  runValidation().then((success) => {
    process.exit(success ? 0 : 1);
  }).catch((error) => {
    logError(`Validation script error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runValidation };
