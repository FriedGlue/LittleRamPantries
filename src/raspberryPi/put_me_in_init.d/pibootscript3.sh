#! /bin/sh
# /etc/init.d/pibootscript3.sh
### BEGIN INIT INFO
# Provides:          python
# Required-Start:
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:
# Short-Description: runs raspberry pi python script for LRP
# Description: runs raspberry pi python script for LRP. does not restart it, or close out of it, ever.
### END INIT INFO



#. /lib/lsb/init-functions

case "$1" in
  start)
        cd /home/lrp/mystuff/RaspberryPi
        sudo /usr/bin/python /home/lrp/mystuff/RaspberryPi/update_image.py > update_image_logs.txt
        ;;
  stop)
        ;;
  restart|reload|force-reload)
        ;;
  *)
        # echo "Usage: $0 start|stop" >&2
        # exit 3
        ;;
esac
