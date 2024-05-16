import RPi.GPIO as GPIO
import time
from time import sleep
import cv2 as cv
import os
import logging
from PIL import Image
import boto3
from dotenv import load_dotenv

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Load environment variables from .env file
load_dotenv()

# Retrieve values from environment variables
input_directory = os.getenv('INPUT_DIRECTORY')
output_directory = os.getenv('OUTPUT_DIRECTORY')
bucket_name = os.getenv('BUCKET_NAME')
aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
image_filename=os.getenv('IMAGE_FILENAME')

# For debugging purposes
# print("aws_access_key_id:")
# print(aws_access_key_id)
# aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
# print("aws_secret_access_key:")
# print(aws_secret_access_key)

def setup_gpio():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    global MAGNETPIN
    MAGNETPIN = 7
    global LEDPIN
    LEDPIN = 29
    GPIO.setup(MAGNETPIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(LEDPIN, GPIO.OUT)

def optimize_image(file_path, output_path, size):
    """Optimize image size and quality."""
    image = Image.open(file_path)
    image = image.resize((round(image.size[0] * size), round(image.size[1] * size)), Image.Resampling.LANCZOS)
    image.save(output_path, optimize=True, quality=100)
    return output_path  # Return the path of the optimized image

def upload_to_s3(bucket_name, s3_file_path, local_file_path):
    """Upload a file to an S3 bucket."""
    print("local file path:")
    print(local_file_path)
    print("s3 file path:")
    print(s3_file_path)
    s3_client = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    s3_client.upload_file(local_file_path, bucket_name, s3_file_path)

def capture_and_process_image(filename):
    cap = cv.VideoCapture(0)

    ret, frame = cap.read()

    sleep(.25)
    if ret:
        cv.imwrite("local/" + filename, frame)
        logging.info("Image written to file.")
        
        # Optimize the captured image
        optimize_image("local/" + filename, "local/high-res/" + filename, 1.0) # Normal version, gets uploaded to /interior/high-res/
        optimize_image("local/" + filename, "local/low-res/" + filename, 0.5) # Website version, gets uploaded directly to /interior/
        
        # Upload the optimized image to S3
        upload_to_s3(bucket_name, "interior/high-res/" + filename, "local/high-res/" + filename)
        upload_to_s3(bucket_name,          "interior/" + filename, "local/low-res/" + filename)
        logging.info(f"Optimized image uploaded to S3 bucket: {bucket_name}")

    else:
        logging.error("Failed to capture image.")
    #ALWAYS release cap after its used (i.e after imwrite is called)
    cap.release()


def main():
    LEDPIN_STATUS = 0
    setup_gpio()
    lastSensorReading = GPIO.input(MAGNETPIN)
    
    while True:
        time.sleep(1)
        if LEDPIN_STATUS == 0:
            GPIO.output(LEDPIN, GPIO.HIGH)
            LEDPIN_STATUS = 1
        else:
            GPIO.output(LEDPIN, GPIO.LOW)
            LEDPIN_STATUS = 0
        currentSensorReading = GPIO.input(MAGNETPIN)
        if currentSensorReading != lastSensorReading:
            if currentSensorReading == 1:
                # print("Door Open!")
                logging.info("Door opening.")
            else:
                # print("Door Closed!")
                logging.info("Door closing.")
                capture_and_process_image(image_filename)
                # Image is now captured, optimized, and uploaded in one step
            lastSensorReading = currentSensorReading

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        GPIO.cleanup()
        logging.info("Script terminated by user.")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        GPIO.cleanup()
