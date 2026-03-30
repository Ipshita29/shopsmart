#!/bin/bash

echo "Starting setup..."

# for frontend setup 
echo "Installing client..."
cd client
npm install

# for backend setup
echo "Installing server..."
cd ../server
npm install

echo "setup is completed for PetKit now"
