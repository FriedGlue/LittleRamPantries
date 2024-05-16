#!/bin/bash

# Get user input for stack name
#read -p "Enter the name of the CloudFormation stack: " stack_name

# Hardcoded stack name
stack_name="vcu-littlerampantries-fullstack"

# Get the nested stack names or IDs from the parent stack
nested_stack_names=$(aws cloudformation list-stack-resources --stack-name "$stack_name" --query "StackResourceSummaries[?ResourceType=='AWS::CloudFormation::Stack'].PhysicalResourceId" --output text)

# Check if the command was successful
if [ $? -ne 0 ]; then
    echo "Error getting nested stack names from parent stack. Exiting."
    exit 1
fi

# Filter the nested stack names to find the one that contains "CustomResourceStack"
for name in $nested_stack_names; do
    if [[ $name == *"CustomResourceStack"* ]]; then
        nested_stack_name=$name
        break
    fi
done

# Check if a nested stack name was found
if [ -z "$nested_stack_name" ]; then
    echo "No nested stack name containing 'CustomResourceStack' found. Exiting."
    exit 1
fi

# Get the S3 Bucket Name from the nested stack
s3_bucket_name=$(aws cloudformation describe-stacks --stack-name "$nested_stack_name" --query "Stacks[0].Outputs[?OutputKey=='S3BucketRoot'].OutputValue" --output text)

# Get the S3 Asset Bucket Name from the nested stack
s3_asset_bucket_name=$(aws cloudformation describe-stacks --stack-name "$nested_stack_name" --query "Stacks[0].Outputs[?OutputKey=='S3AssetBucketName'].OutputValue" --output text)

# Construct the S3 bucket endpoint
s3_asset_bucket_endpoint="https://${s3_asset_bucket_name}"

# Output the results
echo "CloudFront Domain Name: $cloudfront_domain_name"
echo "S3 Bucket Name: $s3_bucket_name"
echo "S3 Asset Bucket Name: $s3_asset_bucket_name"

# Move to frontend and install
cd client/ && npm install

# Create .env file if it does not exist
if [ ! -f ".env.production" ]; then
    touch ".env.production"
fi

if ! grep -q "^VITE_API_URL=" ".env.production"; then
    echo "VITE_API_URL=$s3_asset_bucket_endpoint" >> ".env.production"
fi

# Confirm that the endpoint has been added to the .env file
echo "The S3 Asset Bucket endpoint has been added to the .env.production file:"
cat .env.production

# Create distribution for deployment
npm run build && cd dist/

# Sync distribution with S3
aws s3 sync . s3://$s3_bucket_name