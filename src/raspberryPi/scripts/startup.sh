#!/bin/bash

# Enable automatic export of variables
set -a

# Source the .env file if it exists
if [ -f .env ]; then
  source ./.env
else
  echo ".env file not found!"
  exit 1
fi

# Disable automatic export
set +a

# Check if required variables are set
if [ -z "$BUCKET_NAME" ] || [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "One or more required environment variables are not set."
  exit 1
fi

echo "Bucket Name: $BUCKET_NAME" >> /home/pi/scripts/startup.log
echo "AWS Access Key: $AWS_ACCESS_KEY_ID"PI_SERIAL=$(cat /proc/cpuinfo | grep Serial | awk '{print $3}') >> /home/pi/scripts/startup.log

# Set ENV Variables
serial=$(cat /proc/cpuinfo | grep Serial | awk '{print $3}')

export BUCKET_NAME=$BUCKET_NAME
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_QUEUE_URL=$AWS_QUEUE_URL
export AWS_REGION=$AWS_REGION
export PI_SERIAL=$serial

v4l2-ctl -d /dev/video0 --set-ctrl=brightness=0
v4l2-ctl -d /dev/video0 --set-ctrl=contrast=32
v4l2-ctl -d /dev/video0 --set-ctrl=saturation=64
v4l2-ctl -d /dev/video0 --set-ctrl=white_balance_automatic=1
v4l2-ctl -d /dev/video0 --set-ctrl=auto_exposure=3  # Auto exposure
v4l2-ctl -d /dev/video0 --set-ctrl=gamma=100
v4l2-ctl -d /dev/video0 --set-ctrl=sharpness=10
v4l2-ctl -d /dev/video0 --set-ctrl=backlight_compensation=80
v4l2-ctl -d /dev/video0 --set-ctrl=gain=0

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

# Start application
# Run the first Docker container
docker run -d \
  --name servicebus_container \
  -e AWS_QUEUE_URL="$AWS_QUEUE_URL" \
  -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
  -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  -e AWS_REGION="$AWS_REGION" \
  -e PI_SERIAL="$PI_SERIAL" \
  friedglue/sqs_announcer:latest

echo "ServiceBus Docker container started with environment variables." >> /home/pi/scripts/startup.log

docker run -d --privileged -v /sys:/sys -v /dev:/dev \
  --name capture_container \
  -e BUCKET_URL="$AWS_QUEUE_URL" \
  -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
  -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  -e AWS_REGION="$AWS_REGION" \
  -e PI_SERIAL="$PI_SERIAL" \
  friedglue/capture_image:latest

# Log output for first container
echo "SQS Docker container started with environment variables." >> /home/pi/scripts/startup.log
