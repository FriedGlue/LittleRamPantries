# Usage Management Microservice Overview

## Overview

The Usage Management Microservice is a critical component designed for tracking and analyzing the usage patterns of food pantries. Its primary focus is on logging interactions and providing valuable insights into pantry usage.

## Key Responsibilities

- **Usage Logging**: Records each interaction with the pantry, such as items taken or added, and timestamps.
- **Data Analysis**: Analyzes usage data to identify trends and patterns in pantry usage.
- **Report Generation**: Provides reports and analytics on pantry usage, aiding in decision-making and optimization of pantry resources.
- **Inventory Synchronization**: Communicates with the Pantry Management Service for consistent inventory tracking.

## Technical Aspects

- **Technologies Used**:
  - Utilizes AWS Lambda for processing usage data.
  - Employs a NoSQL database (e.g., Amazon DynamoDB) for storing usage logs.
  - API Gateway is used for exposing usage data to client applications or other services.

- **Data Management**:
  - Manages its database, specifically designed for logging and analyzing usage data.
  - Ensures efficient data retrieval for analytics and reporting purposes.

## Database Schema Representation

### `UsageLogs` Collection
- **Document Structure**:
  ```json
  {
    "LogID": "unique-log-id",                   // Unique identifier for the log entry
    "PantryID": "unique-pantry-id",             // Identifier of the pantry
    "SchoolID": "unique-school-id",             // Identifier of the school associated with the pantry
    "DateTimeOfUse": "2023-03-15T08:00:00Z",    // Date and time of pantry usage
    "NumberOfItemsTaken": 5,                    // Number of items taken during the interaction
    "ItemType": "Canned Food",                  // Type or category of the item taken
    "UserID": "unique-user-id"                  // (Optional) Identifier of the user
  }

- **Notes:**
    Each usage log entry is stored as a separate document in the UsageLogs collection. The structure allows for flexible addition of new fields as needed. Indexes should be created on commonly queried fields like PantryID, SchoolID, and DateTimeOfUse for efficient querying.

## Interactions and Integration

- Receives pantry updates from the Pantry Management Service.
- Provides usage data to client applications for visualization and analytics.

## Summary

The Usage Management Microservice is integral to understanding pantry operations, offering detailed insights into usage trends. It leverages NoSQL database technology for efficient handling of log data and is designed to be scalable, reliable, and capable of supporting in-depth data analysis.


