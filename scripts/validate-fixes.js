#!/usr/bin/env node
/**
 * Somerset Window Cleaning Website - Fix Validation Script
 * 
 * This script validates that all critical fixes have been properly implemented
 * Run with: node scripts/validate-fixes.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const checks = [
  // PHASE 1: Critical Blockers
  {
    phase: 'Phase 1',
    name: 'Tailwind Config - Somerset Blue Color',
    file: 'tailwind.config.js',
    test: (content) => content.includes("'somerset-blue': '#3b82f6'"),
    critical: true,
    description: 'Defines somerset-blue color to prevent CSS errors'
  },
  
  {
    phase: 'Phase 1',
    name: 'Navigation - History Page Exists',
    file: 'app/history/page.tsx',
    test: () => fs.existsSync('app/history/page.tsx'),
    critical: true,
    description: 'History page exists to prevent 404 errors'
  },
  
  {
    phase: 'Phase 1',
    name: 'Navigation - Settings Page Exists',
    file: 'app/settings/page.tsx',
    test: () => fs.existsSync('app/settings/page.tsx'),
    critical: true,
    description: 'Settings page exists to prevent 404 errors'
  },
  
  {
    phase: 'Phase 1',
    name: 'Environment Validation - Health Check API',
    file: 'app/api/health/route.ts',
    test: () => fs.existsSync('app/api/health/route.ts'),
    critical: true,
    description: 'Health check endpoint for environment validation'
  },
  
  {
    phase: 'Phase 1',
    name: 'Accessibility - Skip Link in Layout',
    file: 'app/layout.tsx',
    test: (content) => content.includes('Skip to main content'),
    critical: true,
    description: 'Skip navigation link for accessibility compliance'
  },
  
  {
    phase: 'Phase 1',
    name: 'Accessibility - Main Content ID',
    file: 'app/layout.tsx',
    test: (content) => content.includes('id="main-content"'),
    critical: true,
    description: 'Main content landmark for skip navigation'
  },
  
  {
    phase: 'Phase 1',
    name: 'Accessibility - Focus Styles in CSS',
    file: 'app/globals.css',
    test: (content) => content.includes('focus-visible:ring-2'),
    critical: true,
    description: 'Proper focus indicators for keyboard navigation'
  },
  
  // PHASE 2: Mobile & Responsive
  {
    phase: 'Phase 2',
    name: 'Mobile Navigation Component',
    file: 'app/components/MobileNav.tsx',
    test: () => fs.existsSync('app/components/MobileNav.tsx'),
    critical: true,
    description: 'Mobile navigation component for responsive design'
  },
  
  {
    phase: 'Phase 2',
    name: 'Navigation - Mobile Integration',
    file: 'app/components/Navigation.tsx',
    test: (content) => content.includes('MobileNav'),
    critical: true,
    description: 'Desktop navigation includes mobile component'
  },
  
  {
    phase: 'Phase 2',
    name: 'Responsive Design - Breakpoints',
    file: 'app/page.tsx',
    test: (content) => content.includes('lg:grid-cols-2') && content.includes('lg:p-8'),
    critical: false,
    description: 'Responsive breakpoints implemented'
  },
  
  // PHASE 3: Error Handling
  {
    phase: 'Phase 3',
    name: 'Error Page - Runtime Errors',
    file: 'app/error.tsx',
    test: () => fs.existsSync('app/error.tsx'),
    critical: true,
    description: 'Custom error page for runtime errors'
  },
  
  {
    phase: 'Phase 3',
    name: '404 Page - Not Found',
    file: 'app/not-found.tsx',
    test: () => fs.existsSync('app/not-found.tsx'),
    critical: true,
    description: 'Custom 404 page for missing routes'
  },
  
  {
    phase: 'Phase 3',
    name: 'Environment Error Boundary',
    file: 'app/components/EnvErrorBoundary.tsx',
    test: () => fs.existsSync('app/components/EnvErrorBoundary.tsx'),
    critical: true,
    description: 'Error boundary for environment configuration issues'
  },
  
  // PHASE 4: Form Validation
  {
    phase: 'Phase 4',
    name: 'Form Validation - Character Limits',
    file: 'app/components/MessageInput.tsx',
    test: (content) => content.includes('MAX_MESSAGE_LENGTH') && content.includes('MAX_CONTEXT_LENGTH'),
    critical: true,
    description: 'Character limits defined for form inputs'
  },
  
  {
    phase: 'Phase 4',
    name: 'Form Validation - Error Display',
    file: 'app/components/MessageInput.tsx',
    test: (content) => content.includes('role="alert"') && content.includes('aria-invalid'),
    critical: true,
    description: 'Accessible error display for form validation'
  },
  
  {
    phase: 'Phase 4',
    name: 'Form Validation - Character Counters',
    file: 'app/components/MessageInput.tsx',
    test: (content) => content.includes('length}/{MAX_'),
    critical: false,
    description: 'Character counters for user feedback'
  },
  
  // PHASE 5: Performance & Polish
  {
    phase: 'Phase 5',
    name: 'Loading Skeletons Component',
    file: 'app/components/LoadingSkeleton.tsx',
    test: () => fs.existsSync('app/components/LoadingSkeleton.tsx'),
    critical: false,
    description: 'Loading skeleton components for better UX'
  },
  
  {
    phase: 'Phase 5',
    name: 'Response Display - Skeleton Integration',
    file: 'app/components/ResponseDisplay.tsx',
    test: (content) => content.includes('ResponseSkeleton'),
    critical: false,
    description: 'Loading skeletons integrated in response display'
  },
  
  // API & Configuration Files
  {
    phase: 'Config',
    name: 'Package.json - Valid Configuration',
    file: 'package.json',
    test: (content) => {
      try {
        const pkg = JSON.parse(content);
        return pkg.name === 'somerset-customer-response' && 
               pkg.dependencies && 
               pkg.dependencies.next;
      } catch {
        return false;
      }
    },
    critical: true,
    description: 'Valid package.json configuration'
  },
  
  {
    phase: 'Config',
    name: 'Environment Example - Proper Template',
    file: '.env.example',
    test: (content) => content.includes('ANTHROPIC_API_KEY') && content.includes('NEXTAUTH_SECRET'),
    critical: true,
    description: 'Environment variables template exists'
  }
];

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new ValidationError(`Cannot read file: ${filePath}`);
  }
}

function runValidation() {
  console.log(`${colors.bold}${colors.blue}🔍 Somerset Window Cleaning - Fix Validation${colors.reset}\n`);
  
  let passed = 0;
  let failed = 0;
  let criticalFailed = 0;
  const results = [];
  
  // Group checks by phase
  const phaseGroups = {};
  checks.forEach(check => {
    if (!phaseGroups[check.phase]) {
      phaseGroups[check.phase] = [];
    }
    phaseGroups[check.phase].push(check);
  });
  
  // Run validation for each phase
  Object.entries(phaseGroups).forEach(([phase, phaseChecks]) => {
    console.log(`${colors.bold}${colors.blue}📋 ${phase} Checks${colors.reset}`);
    
    phaseChecks.forEach((check) => {
      let status = 'UNKNOWN';
      let error = null;
      
      try {
        let result;
        
        if (check.test.length === 0) {
          // Test function doesn't need content (e.g., file existence)
          result = check.test();
        } else {
          // Test function needs file content
          const content = readFile(check.file);
          result = check.test(content);
        }
        
        if (result) {
          status = 'PASS';
          passed++;
          console.log(`  ${colors.green}✅ ${check.name}${colors.reset}`);
        } else {
          status = 'FAIL';
          failed++;
          if (check.critical) criticalFailed++;
          console.log(`  ${colors.red}❌ ${check.name}${colors.reset}`);
          console.log(`     ${colors.yellow}${check.description}${colors.reset}`);
        }
        
      } catch (err) {
        status = 'ERROR';
        error = err.message;
        failed++;
        if (check.critical) criticalFailed++;
        console.log(`  ${colors.red}❌ ${check.name}${colors.reset}`);
        console.log(`     ${colors.red}Error: ${err.message}${colors.reset}`);
      }
      
      results.push({
        ...check,
        status,
        error
      });
    });
    
    console.log('');
  });
  
  // Summary
  console.log(`${colors.bold}📊 VALIDATION SUMMARY${colors.reset}`);
  console.log(`Total Checks: ${passed + failed}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  
  if (criticalFailed > 0) {
    console.log(`${colors.red}${colors.bold}Critical Failures: ${criticalFailed}${colors.reset}`);
  }
  
  // Production readiness assessment
  console.log(`\n${colors.bold}🚀 PRODUCTION READINESS${colors.reset}`);
  
  if (criticalFailed === 0) {
    const successRate = (passed / (passed + failed)) * 100;
    
    if (successRate >= 95) {
      console.log(`${colors.green}${colors.bold}✅ READY FOR PRODUCTION${colors.reset}`);
      console.log(`${colors.green}Success Rate: ${successRate.toFixed(1)}%${colors.reset}`);
    } else if (successRate >= 85) {
      console.log(`${colors.yellow}${colors.bold}⚠️  READY WITH MINOR ISSUES${colors.reset}`);
      console.log(`${colors.yellow}Success Rate: ${successRate.toFixed(1)}%${colors.reset}`);
    } else {
      console.log(`${colors.red}${colors.bold}❌ NOT READY - TOO MANY FAILURES${colors.reset}`);
      console.log(`${colors.red}Success Rate: ${successRate.toFixed(1)}%${colors.reset}`);
    }
  } else {
    console.log(`${colors.red}${colors.bold}❌ NOT READY - CRITICAL ISSUES${colors.reset}`);
    console.log(`${colors.red}Must fix ${criticalFailed} critical issue(s) before production${colors.reset}`);
  }
  
  // Detailed failure report
  const failures = results.filter(r => r.status === 'FAIL' || r.status === 'ERROR');
  if (failures.length > 0) {
    console.log(`\n${colors.bold}🔧 ISSUES TO FIX${colors.reset}`);
    
    const criticalFailures = failures.filter(f => f.critical);
    const nonCriticalFailures = failures.filter(f => !f.critical);
    
    if (criticalFailures.length > 0) {
      console.log(`\n${colors.red}${colors.bold}Critical Issues:${colors.reset}`);
      criticalFailures.forEach(failure => {
        console.log(`  • ${failure.name}`);
        console.log(`    File: ${failure.file}`);
        console.log(`    Issue: ${failure.description}`);
        if (failure.error) {
          console.log(`    Error: ${failure.error}`);
        }
        console.log('');
      });
    }
    
    if (nonCriticalFailures.length > 0) {
      console.log(`${colors.yellow}${colors.bold}Non-Critical Issues:${colors.reset}`);
      nonCriticalFailures.forEach(failure => {
        console.log(`  • ${failure.name}: ${failure.description}`);
      });
    }
  }
  
  console.log(`\n${colors.bold}📋 Next Steps:${colors.reset}`);
  if (criticalFailed === 0) {
    console.log('• All critical fixes implemented ✅');
    console.log('• Test the application manually');
    console.log('• Deploy to staging environment');
    console.log('• Run end-to-end tests');
  } else {
    console.log('• Fix critical issues listed above');
    console.log('• Re-run validation script');
    console.log('• Manual testing after fixes');
  }
  
  // Exit with appropriate code
  process.exit(criticalFailed > 0 ? 1 : 0);
}

// Handle script execution
if (require.main === module) {
  try {
    runValidation();
  } catch (error) {
    console.error(`${colors.red}${colors.bold}Fatal Error:${colors.reset} ${error.message}`);
    process.exit(1);
  }
}

module.exports = { runValidation, ValidationError };