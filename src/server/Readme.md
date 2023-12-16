# Server Folder  
  
## Description  
This directory specifies all the types of HTTP(s) requests that can be made by useres on the front-end, as well as handling communication with and updates from the Little RamPantries' Raspberry Pis.  
  
## How to Use  
The node_modules dependency folder is included in .gitignore, and so fresh clones of the git repo will install those dependencies at runtime. Assuming node is installed, simply run "node js/server.js" from the /server directory to start up the server (on localhost for now), and use SIGINT (Ctrl-C) to close it; server.js must be run from within the /server directory, not /js. See Documentation/Server.pdf for more information.  
  
## TODO  
Add "build from nothing" script to handle all dependencies from any clone.  