import RPi.GPIO as GPIO
import time
#0 for low, 1 for high
global currentout
currentout = 0
GPIO.setmode(GPIO.BOARD)
GPIO.setup(29, GPIO.OUT)
print("led on")
GPIO.output(29,GPIO.HIGH)
currentout = 1
print("currentout: " + str(currentout))
time.sleep(2)
print("led off")
GPIO.output(29,GPIO.LOW)
currentout = 0
print("currentout: " + str(currentout))
