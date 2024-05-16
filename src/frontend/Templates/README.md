## For more information on SAM Templates, see documentation

# Template Summaries 

## Main Stack Template

This file is an AWS CloudFormation template used to orchestrate the deployment of the client service.

### Template Structure

The template includes:

- **Parameters**: Several parameters are required, including `SubDomain`, `DomainName`, `CreateApex`, and `HostedZoneId`. 

- **Resources**: The template creates three child stacks:
    - `CustomResourceStack`: This stack uses the `custom-resource.yaml` template and is tagged with the key "Solution" and the value "ACFS3".
    - `AcmCertificateStack`: This stack uses the `acm-certificate.yaml` template and creates an ACM (AWS Certificate Manager) certificate.
    - `CloudFrontStack`: This stack uses the `cloudfront-site.yaml` template and creates a CloudFront distribution for a static website hosted on S3.

To use this template, you need to provide the required parameters and run it through AWS CloudFormation. The output will be a fullstack application with a CloudFront distribution for a static website hosted on S3, an ACM certificate for HTTPS connections, and a custom resource stack.

Run the deploy_client_resources.sh script in /src to deploy this stack to an associated AWS account.

## AWS CloudFormation ACM Certificate Template

This repository contains a YAML file for an AWS CloudFormation template. This template is used to create an AWS Certificate Manager (ACM) certificate.

### Template Structure

The template includes:

- **Parameters**: Four parameters are required: `DomainName`, `SubDomain`, `CreateApex`, and `HostedZoneId`. These are all strings passed by the parent stack.

- **Conditions**: There's a condition `CreateApexConfig` that checks if the `CreateApex` parameter is set to 'yes'.

- **Resources**: The template creates a single resource, an ACM certificate. The `DomainName` for the certificate is constructed by combining the `SubDomain` and `DomainName` parameters. If `CreateApexConfig` is true, the `DomainName` is also added to the `SubjectAlternativeNames` of the certificate.

## AWS CloudFormation CloudFront Distribution Template

This repository contains a YAML file for an AWS CloudFormation template. This template is used to create a CloudFront distribution for a static website hosted on S3.

### Template Structure

The template includes:

- **Parameters**: Several parameters are required, including `CertificateArn`, `DomainName`, `SubDomain`, `CreateApex`, `S3BucketRoot`, `S3BucketRootName`, `S3BucketRootArn`, `S3BucketLogs`, and `S3BucketLogsName`. These are all strings passed by the parent stack.

- **Resources**: The template creates several resources, including a CloudFront distribution, an S3 bucket policy for the root bucket, and an S3 bucket policy for the logs bucket. The CloudFront distribution uses the ACM certificate from the `CertificateArn` parameter and points to the S3 bucket specified by the `S3BucketRoot` parameter.

## Custom Resource Stack Template

This repository also contains a `custom-resource.yaml` file, which is an AWS CloudFormation template used to create a custom resource stack.

### Template Structure:

- **Parameters**: None.

- **Resources**: This templates creates the necessary S3 buckets for hosting the static website, `S3BucketRoot` and the logs, `S3BucketLogs`.