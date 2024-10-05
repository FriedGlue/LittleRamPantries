import boto3
import logging
import uuid
import os
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    filename='/home/pi/scripts/sqs_message.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)



def load_environment_variables():
    """Load environment variables from the .env file."""
    load_dotenv()
    env_vars = {
        'AWS_ACCESS_KEY_ID': os.getenv("AWS_ACCESS_KEY_ID"),
        'AWS_SECRET_ACCESS_KEY': os.getenv("AWS_SECRET_ACCESS_KEY"),
        'AWS_QUEUE_URL': os.getenv("AWS_QUEUE_URL"),
        'PI_SERIAL': os.getenv("PI_SERIAL")
    }
    return env_vars

def send_sqs_message():
    try:
        logging.info("Attempting to send message to SQS...")

        env_vars = load_environment_variables()

        # Initialize SQS client
        sqs_client = boto3.client(
            "sqs",
            aws_access_key_id=env_vars["AWS_ACCESS_KEY_ID"]
            aws_secret_access_key=env_vars["AWS_SECRET_ACCESS_KEY"],
            region_name=["AWS_REGION_NAME"],
        )

        # Message to send
        message_body = f"{PI_SERIAL} - Signing on"
        message_group_id = "my-message-group"
        message_deduplication_id = str(uuid.uuid4())

        # Send the message
        response = sqs_client.send_message(
            QueueUrl=env_vars["AWS_QUEUE_URL"],
            MessageBody=message_body,
            MessageGroupId=message_group_id,
            MessageDeduplicationId=message_deduplication_id
        )

        logging.info(f"Message sent successfully! Message ID: {response['MessageId']}")

    except NoCredentialsError:
        logging.error("AWS credentials not found. Please check your credentials.")

    except PartialCredentialsError:
        logging.error("Incomplete AWS credentials. Please check your credentials.")

    except Exception as e:
        logging.error(f"An error occurred: {e}")

        
def main():
    logging.info("Starting SQS message sender script.")
    send_sqs_message()
    logging.info("Script finished.")

if __name__ == "__main__":
    main()
