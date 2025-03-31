# backend/Dockerfile
FROM golang:1.21-alpine

# Set working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the service
CMD ["go", "run", "cmd/main.go"]