#!/bin/bash

# Quality check script - runs all checks to verify nothing is broken
# Usage: ./lint.sh

set -e  # Exit on first error

echo "Formatting code..."
npm run format

echo ""
echo "Running ESLint..."
npm run lint:check

echo ""
echo "Running security audit..."
npm audit --audit-level=high || echo "Audit warnings found (non-blocking)"

echo ""
echo "Running unit tests..."
npm run test:unit -- --run

echo ""
echo "Building for production..."
npm run build

echo ""
echo "Running E2E tests..."
npm run test:e2e

echo ""
echo "All checks passed! Ready to ship."
