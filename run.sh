#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts

# Move to the LittleRamPantries/src directory
cd ./LittleRamPantries/src

# Copy nginx.conf to /etc/nginx/nginx.conf
sudo cp ./nginx/nginx.conf /etc/nginx/nginx.conf

# Move to the client directory
cd ./client

# Install npm dependencies
npm install

# Build the project
npm run build

# Move back to the src directory
cd ..

# Copy the build output to /usr/share/nginx/
sudo cp -r ./client/dist /usr/share/nginx/

# Move to /usr/share/nginx/
cd /usr/share/nginx/

# Remove existing html directory
sudo rm -rf html/

# Rename dist directory to html
sudo mv dist/ html/

# Ensure nginx is running 
sudo systemctl stop nginx
sudo systemctl start nginx
