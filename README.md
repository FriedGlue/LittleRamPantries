# Little Ram Pantries Web App

## Overview

This repository contains the source code and documentation for the development of a web application aimed at enhancing the effectiveness of the Little Ram Pantries (LRP) program on college campuses. The LRPs serve as distribution points for essential food items and personal hygiene products, catering to students facing food insecurity.

## Problem Statement

While the LRPs have made a significant impact, there are limitations to the current system:

1. **Lack of Real-Time Visualization:** The existing LRPs lack the capability for real-time visualization of their stock, requiring students to be physically present to see what is inside.

2. **Limited Information Accessibility:** Information about the LRP program, including directions to individual pantries, is scattered, making it challenging for students to access relevant details.

3. **No stock analysis:** Researchers and volunteers have no way to analyze the current stock levels of the pantries around campus, making it difficult to know when to restock the pantries. 

## Solution

The students of MULTI 24-620 are developing a web application dashboard to address these issues. Key features of the solution include:

- **Mobile-Focused Application:** Built using React, the web app is designed to be user-friendly and accessible on the go, maximizing convenience for busy students.

- **Real-Time Inventory Visualization:** The web app will display a photo of each pantry's current stock, addressing the lack of real-time information. This will be achieved through webcam integration with RaspberryPI and door sensors, ensuring the dashboard reflects the latest snapshot.

- **AI Image Analysis:** Each image will be passed through a AI model capable of analyzing images and assigning labels based on the details of the images it recognizes. The returned labels will then be queried against a database containing past use information. If the image is unique, it will be marked as such in interaction database. Only images of unique interaction will be archived. 

## Impact

The positive impact of the web app includes:

- **Increased Access:** Streamlining pantry access will reach more students in need, alleviating food insecurity on campus.

- **Nationwide Replication:** Upon successful implementation, the LRPs model will be shared with universities nationwide. Four universities, including Chatham University and The University of Alabama at Birmingham, have already expressed interest.

- **Estimated Reach:** Extrapolating from current metrics, the project could potentially feed over 28,000 students across different universities.

| Folder | High level Description |
|---|---|
| Documentation |  How to configure the project from scratch; high-level and low-level documentation available. |
| src | Holds all the source code for the project. |
| src/api | Holds all the backend code. |
| src/api/helloWorld | Example code to test functionality and current status of the deployed project. |
| src/api/imageLogger | Service used to log interactions with pantries, uses AI to analyze the contents. |
| src/api/pantryManager | Service that performs CRUD operations the pantry database. |
| src/raspberryPi | Holds all the code needed for a RaspberryPi to be deployed in the field. |
| src/frontend| Holds all the frontend code for the application. |
| src/frontend/client | The React user interface code. |
| src/frontend/Templates | The YAML template files used to deploy the AWS infrastructure needed to host the code. |

# To deploy this project, see `Documenation`

## Continued Project Team, Summer 2024
- *Daniel Cranston* - *CS Department* - Mentor/Faculty Advisor (CS)
- *Jose Rosario* - *ECE* - Student Team Member - Hardware and Electronics
- *Josh Hayes* - *CS* - Student Team Member - Fullstack developer 
- *Nicholas Gacek* - *CS* - Student Team Member - IoT developer

## Original Project Team, Spring 2024, 

### Received Sternhiemer Award in Fall of 2023 and 3rd place for MULT department at Spring 2024 Capstone Expo

- *Daniel Cranston* - *CS Department* - Mentor/Faculty Advisor (CS)
- *Supriyo Bandyopadhyay* - *ECE Department* - Mentor/Faculty Advisor (ECE)
- *David Hightower* - *ECE* - Student Team Member
- *Jack Gurdin* - *CS* - Student Team Member
- *Jose Rosario* - *ECE* - Student Team Member
- *Josh Hayes* - *CS* - Student Team Member
- *Nicholas Gacek* - *CS* - Student Team Member
