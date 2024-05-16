#!/bin/bash

# ======================================================================
# THIS ASSUMES YOU HAVE LOGGED IN AND CONFIGURED AN AWS CLI ACCOUNT
# AND HAVE COMFIGURED YOUR SAM CLI UTILITY 
# FOR MORE INFORMATION ON THIS PROCESS, PLEASE SEE Documentation/blah
# ======================================================================

# ======================================================================
# This script is meant to be ran once, additional deployments can be 
# done with the command `sam deploy`
# ======================================================================

# Define variables
STACK_NAME="vcu-littlerampantries-fullstack"
DOMAIN_NAME="littlerampantries.com"
SUB_DOMAIN="www"

# Hosted Zone ID is a private value and varies from domain to domain
# For this reason, it is stored in a private environment file, see .env.example for more infromation
source .env

if [ -z "$HOSTED_ZONE_ID" ]; then
  echo "HOSTED_ZONE_ID is not set in the .env file."
  exit 1
fi

cd ./Templates

# Run AWS CloudFormation deploy command
sam deploy \
  --region us-east-1 \
  --stack-name $STACK_NAME \
  --template-file main.yaml \
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides DomainName=$DOMAIN_NAME SubDomain=$SUB_DOMAIN HostedZoneId=$HOSTED_ZONE_ID CreateApex=yes
