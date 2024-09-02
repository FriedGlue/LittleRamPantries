import RPi.GPIO as GPIO
import time
import cv2 as cv
import os
import logging
from PIL import Image
import boto3
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Constants
MAGNETPIN = 7
LEDPIN = 29
CAPTURE_DELAY = 0.25  # Delay after capture before processing (seconds)
RETRY_LIMIT = 3  # Number of retry attempts for S3 upload

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Initialize the thread pool executor
executor = ThreadPoolExecutor(max_workers=2)

def load_environment_variables():
    """Load environment variables from the .env file."""
    load_dotenv()
    return {
        'input_directory': os.getenv('INPUT_DIRECTORY'),
        'output_directory': os.getenv('OUTPUT_DIRECTORY'),
        'bucket_name': os.getenv('BUCKET_NAME'),
        'aws_access_key_id': os.getenv('AWS_ACCESS_KEY_ID'),
        'aws_secret_access_key': os.getenv('AWS_SECRET_ACCESS_KEY'),
        'image_filename': os.getenv('IMAGE_FILENAME'),
    }

def setup_gpio():
    """Setup GPIO pins for input and output."""
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    GPIO.setup(MAGNETPIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(LEDPIN, GPIO.OUT)

def optimize_image_for_web(file_path, output_path):
    """Optimize image size and quality for web use, saving in WebP format."""
    image = Image.open(file_path)
    standard_size = (1920, 1080)
    image.thumbnail(standard_size, Image.Resampling.LANCZOS)
    # Save as WebP for better compression
    image.save(output_path, format="WEBP", optimize=True, quality=85)
    return output_path

def upload_to_s3(bucket_name, s3_file_path, local_file_path, aws_access_key_id, aws_secret_access_key):
    """Upload a file to an S3 bucket with retry logic."""
    s3_client = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

    for attempt in range(RETRY_LIMIT):
        try:
            s3_client.upload_file(local_file_path, bucket_name, s3_file_path)
            logging.info(f"File uploaded to S3: {s3_file_path}")
            break
        except Exception as e:
            logging.error(f"Upload attempt {attempt + 1} failed: {e}")
            if attempt == RETRY_LIMIT - 1:
                logging.error("Max retry limit reached. Upload failed.")
            else:
                time.sleep(2 ** attempt)  # Exponential backoff

def capture_and_process_image(filename, env_vars, cap):
    """Capture, optimize, and upload an image asynchronously."""

    timestamp = int(time.time())
    filename = f"{filename}-{timestamp}.jpg"

    # Attempt to capture an image from the camera
    ret, frame = cap.read()

    if ret:
        for _ in range(5):  # Clear buffer by reading extra frames
            cap.read()
        ret, frame = cap.read()

        # Define the paths for saving the image
        local_dir = "local"
        optimized_dir = os.path.join(local_dir, "optimized")

        # Ensure the directories exist
        os.makedirs(local_dir, exist_ok=True)
        os.makedirs(optimized_dir, exist_ok=True)

        # Construct full paths
        local_path = os.path.join(local_dir, filename)
        optimized_path = os.path.join(optimized_dir, filename)

        # Try to save the captured frame
        if cv.imwrite(local_path, frame):
            logging.info(f"Image captured and written to {local_path}.")

            # Optimize the image for web use
            try:
                optimized_path = optimize_image_for_web(local_path, optimized_path)
            except Exception as e:
                logging.error(f"Image optimization failed: {e}")
                return

            # Upload the optimized image asynchronously
            try:
                future = executor.submit(
                    upload_to_s3,
                    env_vars['bucket_name'],
                    f"interior/{filename}",
                    optimized_path,
                    env_vars['aws_access_key_id'],
                    env_vars['aws_secret_access_key']
                )
                logging.info(f"Upload task submitted for {optimized_path}.")
            except Exception as e:
                logging.error(f"Failed to submit upload task: {e}")
        else:
            logging.error(f"Failed to write image to {local_path}.")
    else:
        logging.error("Failed to capture image.")


def main():
    """Main loop to monitor GPIO and handle image capture and upload."""
    env_vars = load_environment_variables()
    setup_gpio()
    last_sensor_reading = GPIO.input(MAGNETPIN)
    led_status = False
    print("program started")

    # Initialize the camera once at the beginning
    cap = cv.VideoCapture(0)
    cap.set(cv.CAP_PROP_FPS, 30)  # Set frames per second if necessary

    try:
        while True:
            time.sleep(1)
            led_status = not led_status
            GPIO.output(LEDPIN, GPIO.HIGH if led_status else GPIO.LOW)

            current_sensor_reading = GPIO.input(MAGNETPIN)
            if current_sensor_reading != last_sensor_reading:
                if current_sensor_reading == GPIO.HIGH:
                    logging.info("Door opening.")
                    print("Door opening.")
                else:
                    logging.info("Door closing.")
                    print("Door closing.")
                    capture_and_process_image(env_vars['image_filename'], env_vars, cap)
                last_sensor_reading = current_sensor_reading
    except KeyboardInterrupt:
        logging.info("Script terminated by user.")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
    finally:
        GPIO.cleanup()
        cap.release()  # Release the camera
        executor.shutdown(wait=True)  # Wait for all uploads to finish

if __name__ == "__main__":
    main()
