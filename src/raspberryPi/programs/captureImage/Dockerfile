# Use a lightweight Python image as the base
FROM python:3.11-slim

# Set environment variables to prevent Python from writing .pyc files and buffering stdout and stderr
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install gcc and other necessary build tools
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    && apt-get clean

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file to the container and install the dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire current directory (where the script is located) into the container
COPY . /app/

# Make the script executable (if necessary)
RUN chmod +x /app/main.py

# Set the entry point to run the script
ENTRYPOINT ["python", "/app/main.py"]