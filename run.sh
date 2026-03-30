#!/bin/bash

echo "Starting setup..."

# for frontend
echo "Installing client..."
cd client
npm install

# for backend
echo "Installing server..."
cd ../server
npm install

echo "setup is completed for PetKit now"
