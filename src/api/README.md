# Serverless Application for Image Processing and Data Management

This project utilizes AWS Serverless Application Model (SAM) to deploy a scalable and efficient backend suitable for image processing and data management. The application features multiple Lambda functions written in Go, orchestrated by SAM and integrated with other AWS services like Amazon S3, Amazon DynamoDB, and Amazon API Gateway.

## Description

The SAM template deploys the following resources:
- **Amazon API Gateway** to handle incoming HTTP requests.
- **Amazon S3 Bucket** for image uploads which trigger Lambda functions.
- **Amazon DynamoDB Table** to store and retrieve image analysis results.
- **Lambda Functions** for various backend processes including image processing and data handling.

## Resources Deployed

### Amazon API Gateway

- **Resource Name:** `MyApi`
- **Stage Name:** `prod`
- **Description:** Serves as the entry point for the backend APIs.

### Amazon S3 Bucket

- **Resource Name:** `ImageBucket`
- **Bucket Name:** `lrp-go-asset-bucket`
- **Description:** Stores uploaded images which trigger the `ImageProcessorFunction`.

### Amazon DynamoDB Table

- **Resource Name:** `ImageAnalysisResultsTable`
- **Table Attributes:**
  - `Location` (String, Hash Key)
  - `Timestamp` (Number, Range Key)
  - `Unique` (String, Secondary Hash Key)
- **Description:** Stores results from the image analysis process.

### Lambda Functions

1. **HelloWorldFunction**
   - **Runtime:** Custom runtime (provided.al2023)
   - **API Endpoint:** `/hello`
   - **Method:** GET
   - **Description:** A simple hello world API to demonstrate connectivity.

2. **PantryManagerFunction**
   - **Runtime:** Custom runtime (provided.al2023)
   - **Description:** Manages data related to pantries for universities.
   - **Endpoints:**
     - `GET /pantries/{university}`: Retrieve pantry data for a specific university.
     - `GET /pantries/{university}/{sortKey}`: Retrieve specific pantry entry.
     - `POST /pantries/{university}/{sortKey}`: Create a new pantry entry.
     - `PUT /pantries/{university}/{sortKey}`: Update an existing pantry entry.
     - `DELETE /pantries/{university}/{sortKey}`: Delete a specific pantry entry.

3. **ImageProcessorFunction**
   - **Runtime:** Custom runtime (provided.al2023)
   - **Description:** This function automates the process of image analysis using AWS Rekognition when images are uploaded to the specified S3 bucket. It processes each image to detect labels, compares these labels with the latest results stored in DynamoDB to determine uniqueness, and logs every analysis outcome whether unique or not.
   - **Core Operations** 
        - **Rekognition Label Detection:** Detects up to 10 labels in an image with a minimum confidence of 75%
        - **DynamoDB Interaction:** Checks the latest image analysis result and stores the new result. Uses attributes `Location` and `Timestamp` for item retrieval and storage. 
        - **Uniqueness Check:** Determines if the current image's labels are different form the last stored image's labels based on a custom comparison logic, taggin the entry as unique or not.
   - **Trigger:** S3 bucket upload event.
   - **Optimization:** Uses batch processing for DyanmoDB interactions and optimizes label comparisons to minimize database transactions

## Setup Instructions

### Prerequisites

- AWS CLI installed and configured
- SAM CLI installed
- Docker installed (for local testing)

### Deployment Steps

1. Clone the repository:
   ```bash
   git clone github.com/joshuahayesVCU/lrpBackend 
   ```
2. Navigate into the directory 
   ```bash
   cd lrpBackend
   ```
3. Give execution rights to the deploy script
   ```bash
   chmod +x ./deploy.sh
   ```
4. Execute the deploy script
   ```bash
   ./deploy.sh
   ```
