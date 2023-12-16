# Little Ram Pantries RaspberryPi Client Documentation
Last modified: 10/30/2023 by Jack Gurdin  
  
The RaspberryPi's constitute a privileged category of client with special permissions to update details associated with its pantry on the server via various HTTP POST methods.  
The /src/RaspberryPi directory specifies the template filesystem for all Raspberry Pi's being deployed as part of a pantry. This directory can therefore be directly cloned and implemented on a freshly-booted Pi, with all setup scripts, dependencies, etc. included.  
Everything other than the contents of the /RaspberryPi/local directory will be shared in common identically across all Pi's in the network; the contents of /local will specify all attributes unique to the individual Pi's.  
  
## /RaspberryPi/local
  
* current_contents.png - Most recent photo of pantry interior taken by its attached camera; updated and overwritten intermittently.  
* domain.txt - URL pointing to the domain of the website of the network this Pi is to be a part of  
* pantry_name.txt - Should correspond one-to-one with pantry names specified in pantries_info.json on the backend.  
* private_key.txt - In hexadecimal format, the private key associated with this particular Pi, used for validating the identity of an client claiming to be this Pi.  
  
## /c, /include, /lib, and /out directories + Makefile
  
These specify source code that is static across all the Raspberry Pi's within a network. Upon cloning the /RaspberryPi directory to an individual Pi, run 'make' to build these utilities. Before trying to run contents_update.sh.  
  
## contents_update.sh
  
Configures full POST request to URL &lt;domain.com&gt;/contents_update. Run this from the /RaspberryPi directory to update the image for the contents of this Pi's pantry on the backend.  
  
To use from /RaspberryPi directory:  
./contents_update.sh OR source contents_update.sh  