#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting ShopSmart (PetKit Now) Setup..."

# Function to setup directory
setup_dir() {
  local dir=$1
  echo "📦 Setting up $dir..."
  if [ -d "$dir" ]; then
    cd "$dir"
    npm install
    cd ..
  else
    echo "❌ Directory $dir not found!"
    exit 1
  fi
}

# Setup client and server
setup_dir "client"
setup_dir "server"

echo "✅ Setup is completed for PetKit Now!"
echo "💡 To start the development environment:"
echo "   - Backend: cd server && npm run dev"
echo "   - Frontend: cd client && npm run dev"
