# Visual Debugger Backend Manual

## Overview
This document provides instructions for setting up, running, and testing the Visual Debugger backend services, which consist of a Go backend API and a Python code parser service.

## System Requirements
- Go 1.18+
- Python 3.9+
- Docker and Docker Compose (for containerized deployment)
- Postman (for testing)

## Directory Structure
```
backend/
├── cmd/
│   └── main.go           # Entry point for Go backend
├── internal/
│   ├── handlers/         # API request handlers
│   ├── models/           # Data models
│   ├── parser/           # Code parser integration
│   │   └── python/       # Python AST parser service
│   ├── services/         # Business logic
│   └── utils/            # Utilities
├── Dockerfile            # Go backend Docker configuration
├── docker-compose.yml    # Container orchestration
└── go.mod                # Go dependencies
```

## Setup Options

### Local Development Setup
1. Install Go dependencies:
   ```bash
   cd backend
   go mod download
   ```

2. Install Python parser service dependencies:
   ```bash
   cd internal/parser/python
   pip install -r requirements.txt
   ```

3. Start the Python parser service:
   ```bash
   cd internal/parser/python
   python ast_server.py
   # or
   uvicorn ast_server:app --host 0.0.0.0 --port 8000 --reload
   ```

4. Start the Go backend service:
   ```bash
   cd backend
   go run cmd/main.go
   ```

### Docker Setup
From the backend directory:

```bash
# Build and start both services
docker-compose up --build

# Start in detached mode (background)
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers without removing
docker-compose stop

# Start stopped containers
docker-compose start

# Stop and remove containers
docker-compose down
```

## API Endpoints

### Health Checks
- **Backend Service**: `GET /health`
  - Response: `{"status": "ok", "message": "Server is healthy"}`
- **Parser Service**: `GET http://localhost:8000/health`
  - Response: `{"status": "healthy", "service": "python-parser"}`

### Code Analysis
- **Endpoint**: `POST /code/analyze`
- **Description**: Analyzes code structure, functions, variables, and complexity
- **Body**:
  ```json
  {
    "code": "def example(): pass",
    "language": "python",
    "test_case": [optional test data]
  }
  ```
- **Response**:
  ```json
  {
    "is_valid": true,
    "errors": [],
    "functions": [{"name": "example", "line": 1, "args": [], "returns": "unknown"}],
    "variables": [],
    "data_structures": [],
    "entry_point": "example",
    "complexity": {"time": "O(1)", "space": "O(1)"}
  }
  ```

### Debug Session
- **Create Session**: `POST /debug/start`
  - Body: `{"code": "your code with test case"}`
  - Response: Debug session object with ID

- **Step Through Code**: `POST /debug/step/:id`
  - Response: Updated debug session state

- **Reset Session**: `POST /debug/reset/:id`
  - Response: Reset debug session state

- **Get State**: `GET /debug/state/:id`
  - Response: Current debug session state

## Testing with Postman

### Test Parser Service
```
POST http://localhost:8000/parse
Content-Type: application/json

{
  "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr",
  "language": "python",
  "test_case": [64, 34, 25, 12, 22, 11, 90]
}
```

### Test Backend Code Analysis
```
POST http://localhost:8080/code/analyze
Content-Type: application/json

{
  "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr",
  "language": "python",
  "test_case": [64, 34, 25, 12, 22, 11, 90]
}
```

### Test Debug Session
```
POST http://localhost:8080/debug/start
Content-Type: application/json

{
  "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# Test case\nnumbers = [64, 34, 25, 12, 22, 11, 90]\nsorted_numbers = bubble_sort(numbers)\nprint(f\"Sorted array: {sorted_numbers}\")"
}
```

## Environment Variables
- `PARSER_SERVICE_URL`: URL for parser service
  - Default (local): http://localhost:8000
  - Default (Docker): http://parser:8000

## Troubleshooting

1. **Connection Issues**
   - Ensure parser service is running and accessible
   - Check that the PARSER_SERVICE_URL is set correctly

2. **Port Conflicts**
   - Verify ports 8000 and 8080 are available
   - Change ports in docker-compose.yml if needed

3. **Missing Dependencies**
   - Run `go mod download` for Go dependencies
   - Run `pip install -r requirements.txt` for Python dependencies

4. **Docker Networking**
   - Services in Docker use service names for networking
   - The backend service should connect to "parser:8000" inside Docker

5. **Python Parser Errors**
   - Check parser service logs: `docker-compose logs parser`
   - Ensure Python code is syntactically valid

6. **Backend API Errors**
   - Check backend logs: `docker-compose logs backend`
   - Verify request format matches API expectations

## Future Enhancements
- Support for additional programming languages
- Improved algorithm detection
- Enhanced visualization hints
- Performance optimizations



Backend System Flow
When you hit the Run/Compile button, here's what happens step by step:

Frontend Request:

The React frontend sends a request to the Go backend with the code and test case
This goes to the /debug/start endpoint


Code Parsing & Analysis (What we just built):

Go backend sends the code to the Python parser service
Python service analyzes the code structure using AST
It identifies functions, variables, complexity, etc.
Returns analysis results to Go backend


Debug Session Creation:

Go creates a new debug session with a unique ID
Stores the code, test case, and analysis results
Initializes variables for tracking execution state


Code Preparation:

The parser prepares the code by adding debug statements
These statements capture variable states, output, etc.


Initial Execution:

The executor runs the code up to the first line or breakpoint
Captures the initial state of variables
Prepares visualization data based on the code structure


Response to Frontend:

Backend sends the debug session ID and initial state
Includes visualization data for the first step
Frontend displays this in the visualization panel


Step-by-Step Execution:

When you click "Step" in the frontend:

Request goes to /debug/step/{id}
Backend runs the next line of code
Captures new variable states
Identifies visual elements to highlight (array elements being compared, etc.)
Returns updated state




Visualization Updates:

Based on the algorithm type detected in step 2
For sorting: shows array elements being compared/swapped
For graph algorithms: shows nodes/edges being visited
For tree operations: shows traversal paths