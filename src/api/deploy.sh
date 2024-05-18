#!/bin/bash

# The GOOS and GOARCH are set for AWS Lambda's Linux environment.
# Adjust if your target environment is different (e.g., for ARM64 use GOARCH=arm64)
GOOS="linux"
GOARCH="arm64"

# Array of source directories where your main.go files are located.
# Add the path to each of your Go application's entry points.
SRC_DIRS=("./src/helloWorld" "./src/pantryManager" "./src/imageLogger" "./src/adminDashboard")

# Loop through each source directory
for SRC_DIR in "${SRC_DIRS[@]}"; do
    # The name of the binary output; typically "bootstrap" for AWS Lambda.
    OUTPUT_NAME="bootstrap"

    # The output directory where the compiled binary will be placed.
    # This is usually the same as the SRC_DIR for Lambda deployments.
    OUT_DIR="$SRC_DIR"

    # Extract the last directory name for creating a unique ZIP file name
    DIR_NAME=$(basename "$SRC_DIR")

    # Navigate to the source directory
    cd "$SRC_DIR" || exit

    # Compile the Go application
    echo "Compiling the Go application in $SRC_DIR..."
    GOOS=$GOOS GOARCH=$GOARCH CGO_ENABLED=0 go build -o $OUTPUT_NAME -tags lambda.norp 

    # Ensure the binary is executable
    chmod 755 "./$OUTPUT_NAME"

    # Navigate back to the original directory
    cd ../..
done

# Deploy using AWS SAM
echo "Deploying all functions..."
sam deploy
