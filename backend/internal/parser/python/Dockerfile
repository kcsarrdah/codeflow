# Use Python 3.11 slim image as base
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of the code
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run the service
CMD ["uvicorn", "ast_server:app", "--host", "0.0.0.0", "--port", "8000"]