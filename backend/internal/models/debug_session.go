package models

import (
	"time"
)

type DebugSession struct {
	ID                 string              `json:"id"`
	Code               string              `json:"code"`
	CurrentLine        int                 `json:"current_line"`
	Variables          []Variable          `json:"variables"`
	Output             string              `json:"output"`
	Error              string              `json:"error,omitempty"`
	Status             string              `json:"status"`              // "running", "paused", "completed", "error"
	VisualizerType     string              `json:"visualizer_type"`     // "array", "tree", "graph", etc.
	VisualizationHints []VisualizationHint `json:"visualization_hints"` // Hints for visualization
	AlgorithmState     AlgorithmState      `json:"algorithm_state"`     // Algorithm-specific state
	CreatedAt          time.Time           `json:"created_at"`
	UpdatedAt          time.Time           `json:"updated_at"`
}
