LittleRamPantries/
│
├── src/            # Root directory for source code
│ ├── RaspberryPi/  # Raspberry Pi specific code
│ │ └── ...         # Raspberry Pi files and subdirectories
│ │
│ ├── client/       # Client-side application
│ │ └── ...         # Client application files and subdirectories
│ │
│ ├── PantryManagementService/  # Pantry Management Microservice
│ │ ├── PantryManagement.API/   # API layer
│ │ ├── PantryManagement.Core/  # Core logic
│ │ ├── PantryManagement.Data/  # Data access layer
│ │ └── ...                     # Other Pantry Management files
│ │
│ ├── UsageManagementService/   # Usage Management Microservice
│ │ ├── UsageManagement.API/    # API layer
│ │ ├── UsageManagement.Core/   # Core logic
│ │ ├── UsageManagement.Data/   # Data access layer
│ │ └── ...                     # Other Usage Management files
│ │
│ └── ImageOptimizationService/ # Image Optimization Service (JavaScript)
│ ├── src/                      # Source files
│ │ ├── index.js                # Entry point
│ │ └── ...                     # Other JavaScript source files
│ ├── package.json              # NPM package file
│ ├── package-lock.json         # NPM package lock file
│ └── ...                       # Other Image Optimization files
│
├── .gitignore          # Git ignore file
├── README.md           # Repository README
├── package-lock.json   # NPM package lock file (root level)
├── package.json        # NPM package file (root level)
├── package.json        # NPM package file (root level)
├── run.sh              # Build and deploy script for the entire application 
└── template.yaml       # AWS SAM Template for serverless deployment




│ ├── nginx/ # Nginx configuration
│ │ └── ... # Nginx files and subdirectories
│ │
│ ├── server/ # Server-side application
│ │ └── ... # Server application files and subdirectories