# Pantry Management "Pan Man" Microservice Overview

## Overview

The Pantry Management Microservice is a core component of the food pantry management system, focusing on the management and tracking of pantry inventories and details.

## Key Responsibilities

- **Inventory Management**: Manages stock levels, including tracking quantities and types of items in each pantry.
- **Pantry Details**: Maintains critical information about pantries, such as location, operating hours, and school associations.
- **Data Synchronization**: Ensures inventory data aligns with the physical stock, updating records based on input from the Image Optimization and AI Analysis service.
- **Reporting**: Generates inventory reports, usage trends, and forecasts to aid decision-making processes.

## Technical Aspects

- **Technologies Used**:
  - AWS Lambda for serverless computing.
  - RDS/DynamoDB for database services, handling inventory and pantry details.
  - API Gateway for managing and routing API requests.

- **Data Management**:
  - Owns and maintains a dedicated database for all pantry-related data.
  - Ensures data integrity and consistency, particularly in relation to inventory tracking.

- **Interactions**:
  - Receives processed data from the Image Optimization and AI Analysis service to update inventory records.
  - Provides data to client applications for display and interaction.

## Architecture Characteristics

- **Serverless Architecture**: Leverages AWS Lambda, enhancing scalability and reducing the need for server management.
- **Event-Driven Design**: Utilizes events, particularly for receiving updates from the Image Optimization and AI Analysis service.
- **Decoupled Database**: Operates with its own database, ensuring independence and service-specific data management.

## Summary

The Pantry Management Microservice plays a vital role in the broader system, managing and updating pantry information and inventory. It is designed for efficiency, scalability, and reliability, using a suite of AWS services to maintain a responsive and robust service architecture.

# Pantry Management Microservice Database Schema

## Tables Overview
## WORK IN PROGRESS, 1/24/24

### `Pantries`
- **PantryID** (GUID): Unique identifier for the pantry.
- **SchoolID** (GUID): Identifier for the associated school.
- **Name** (String): Name of the pantry.
- **Location** (String): Physical location of the pantry.
- **AccessibleHours** (String): Hours during which the pantry is accessible.

### `Items`
- **ItemID** (GUID): Unique identifier for an item.
- **PantryID** (GUID): Identifier for the pantry where the item is stored.
- **Name** (String): Name of the item.
- **Description** (String): Description of the item.
- **QuantityAvailable** (Integer): Number of available items.

### `Schools` 
- **SchoolID** (GUID): Unique identifier for the school.
- **Name** (String): Name of the school.
- **Address** (String): Address of the school.
- **ContactInformation** (String): Contact details for the school.

## Relationships

- Each `Item` is linked to a `Pantry` via `PantryID`.
- Each `Pantry` may be linked to a `School` via `SchoolID`.

