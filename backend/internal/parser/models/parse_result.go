package parsermodels

// CodeStructure represents the analyzed structure of the code
type CodeStructure struct {
    // Core information
    Language string   `json:"language"`
    HasMain  bool     `json:"has_main"`
    Imports  []string `json:"imports"`

    // Analysis results
    Structure  StructureType    `json:"structure"` // What kind of code structure (array manipulation, tree traversal, etc)
    Approach   AlgorithmType    `json:"approach"`  // What algorithmic approach (sorting, searching, etc)
    Complexity ComplexityResult `json:"complexity"`

    // Visualization hints
    VisualizerType string       `json:"visualizer_type"` // What kind of visualizer to use
    TrackPoints    []TrackPoint `json:"track_points"`    // Points in code to track for visualization
}

// StructureType identifies what kind of data structure the code primarily works with
type StructureType string

const (
    StructureArray      StructureType = "array"
    StructureLinkedList StructureType = "linked_list"
    StructureTree       StructureType = "tree"
    StructureGraph      StructureType = "graph"
    StructureStack      StructureType = "stack"
    StructureQueue      StructureType = "queue"
    StructureHeap       StructureType = "heap"
    StructureHash       StructureType = "hash"
)

// AlgorithmType identifies the type of algorithm being used
type AlgorithmType string

const (
    AlgorithmSorting     AlgorithmType = "sorting"
    AlgorithmSearching   AlgorithmType = "searching"
    AlgorithmTraversal   AlgorithmType = "traversal"
    AlgorithmPathfinding AlgorithmType = "pathfinding"
)

// ComplexityResult contains the complexity analysis
type ComplexityResult struct {
    TimeComplexity  string `json:"time_complexity"`
    SpaceComplexity string `json:"space_complexity"`
    Explanation     string `json:"explanation,omitempty"`
}

// TrackPoint represents a point in the code that should be tracked for visualization
type TrackPoint struct {
    Line      int      `json:"line"`
    Variables []string `json:"variables"` // Variables to track at this point
    Operation string   `json:"operation"` // What operation is happening (compare, swap, etc)
    Elements  []int    `json:"elements"`  // Indices or identifiers of elements involved
}

// ValidationResult represents the result of code validation
type ValidationResult struct {
    IsValid  bool           `json:"is_valid"`
    Errors   []ParseError   `json:"errors"`
    Warnings []ParseWarning `json:"warnings"`
}

// ParseError represents an error found during parsing
type ParseError struct {
    Line     int    `json:"line"`
    Column   int    `json:"column"`
    Message  string `json:"message"`
    Type     string `json:"type"`     // syntax, runtime, etc.
    Severity string `json:"severity"` // error, warning, info
}

// ParseWarning represents a warning found during parsing
type ParseWarning struct {
    Line    int    `json:"line"`
    Message string `json:"message"`
    Type    string `json:"type"`
}