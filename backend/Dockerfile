# Start with a Go image that includes Python
FROM golang:1.21-bullseye

# Install Python 3
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Command to run
CMD ["go", "run", "cmd/main.go"]