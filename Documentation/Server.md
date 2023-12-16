# Little Ram Pantries Backend Documentation
Last modified: 10/30/2023 by Jack Gurdin  
  
This file concerns the contents of the /src/server directory. All relevant programs should be invoked from the /src/server directory specifically.  
  
## server_config.json
  
This specifies miscellaneous global attributes of the server, such as relative directories and pointers to other markdown files. Many server-programs access this document for shared information on frequent intervals, so it’s important that this stay in the root of the /src directory.  
  
## public/pantries_info.json
  
This JSON file defines an array of parallel pantry objects, including but not limited to the following attributes:  
  
* name - The intended display-name for this pantry on the front-end.  
* pantry_exterior_url and latest_contents_url - The relevant URLs from which to serve the respective image files.  
* date_last_opened - Recorded in 'YYYY-MM-DD' format  
* time_last_opened - Recorded in 'HH:MM:SS TMZ' format  
* public_key - 32-byte public key, recorded in hexadecimal format, for asymmetric key signature verification  
  
## server/js directory
  
This directory contains all relevant node.js code intended for execution from the backend.  
  
### server.js
  
Main entry point for hosting server; starts up simple server on host + port specified in server_config.json. Compiles a list of 'methods[]', each representing an endpoint, and the server checks which format (if any) all incoming requests correspond with.  
Use Ctrl+C (SIGINT) to terminate.  
  
To use from /server directory: node js/server.js  
  
### /js/methods directory
  
The module exported by each js file in this directory is the corresponding 'method' object representing an endpoint to implement on the server. Each one specifies a URL format and execution method to process a matching incoming request. Methods include:  
* pantry_info.js (GET) - @ domain.com/pantry_info.json, returns file  
* pantry_exterior.js (GET) - @ domain.com/exteriors/&lt;pantry_exterior_url&gt;.png, returns file  
* latest_contents.js (GET) - @ domain.com/latest/&lt;latest_contents_url&gt;.png, returns file  
* contents_update.js (POST) - @ domain.com/contents_update, intended for use by RaspberryPi's, which includes a new image and credentials with its request, which then replace the old image as the lastest contents image for that particular Pi's pantry.  