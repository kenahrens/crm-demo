#!/usr/bin/env bash
set -euo pipefail

# Resolve repo root even if script is invoked from a nested directory.
ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"

if [ ! -d "$FRONTEND_DIR" ]; then
  echo "Unable to locate frontend directory at $FRONTEND_DIR" >&2
  exit 1
fi

cd "$FRONTEND_DIR"

echo "Applying enforced versions via npm overrides..."
npm pkg set overrides."nth-check"="^2.1.1"
npm pkg set overrides."postcss"="^8.5.6"
npm pkg set overrides."webpack-dev-server"="^4.15.2"
npm pkg set overrides."brace-expansion"="^2.0.2"

echo "Regenerating package-lock with updated dependency graph..."
npm install --package-lock-only

echo "Verifying resolved versions..."
npm ls nth-check postcss webpack-dev-server brace-expansion

echo "Done. Review npm audit output separately if further action is required."
