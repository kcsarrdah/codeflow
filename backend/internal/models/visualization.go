// internal/models/visualization.go
package models

// VisualizationHint provides information for the frontend about what to visualize
type VisualizationHint struct {
	Type      string `json:"type"`              // Type of hint: "comparison", "swap", "visit", etc.
	Elements  []int  `json:"elements"`          // Array indices or node IDs to highlight
	Operation string `json:"operation"`         // What operation is happening: "compare", "swap", "insert"
	Details   string `json:"details,omitempty"` // Additional information about the operation
}

// AlgorithmState tracks algorithm-specific state during execution
type AlgorithmState struct {
	CurrentIndices []int                  `json:"current_indices"` // Current array indices
	VisitedNodes   []string               `json:"visited_nodes"`   // Visited nodes in a graph/tree
	CustomState    map[string]interface{} `json:"custom_state"`    // Algorithm-specific state
}
