// backend/internal/parser/python_client.go
package parser

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
    "debugger/internal/parser/models" // Import parsermodels
)

type PythonParserClient struct {
    baseURL    string
    httpClient *http.Client
}

func NewPythonParserClient(baseURL string) *PythonParserClient {
    return &PythonParserClient{
        baseURL: baseURL,
        httpClient: &http.Client{
            Timeout: 10 * time.Second,
        },
    }
}

func (c *PythonParserClient) Parse(request parsermodels.ParseRequest) (*parsermodels.ParseResponse, error) {
    jsonData, err := json.Marshal(request)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal request: %v", err)
    }

    resp, err := c.httpClient.Post(
        fmt.Sprintf("%s/parse", c.baseURL),
        "application/json",
        bytes.NewBuffer(jsonData),
    )
    if err != nil {
        return nil, fmt.Errorf("failed to send request: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        var errorResp struct {
            Detail interface{} `json:"detail"`
        }
        if err := json.NewDecoder(resp.Body).Decode(&errorResp); err != nil {
            return nil, fmt.Errorf("failed to decode error response: %v", err)
        }
        return nil, fmt.Errorf("parser service error: %v", errorResp.Detail)
    }

    var parseResponse parsermodels.ParseResponse
    if err := json.NewDecoder(resp.Body).Decode(&parseResponse); err != nil {
        return nil, fmt.Errorf("failed to decode response: %v", err)
    }

    return &parseResponse, nil
}

func (c *PythonParserClient) HealthCheck() error {
    resp, err := c.httpClient.Get(fmt.Sprintf("%s/health", c.baseURL))
    if err != nil {
        return fmt.Errorf("health check failed: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("service unhealthy: status code %d", resp.StatusCode)
    }

    return nil
}