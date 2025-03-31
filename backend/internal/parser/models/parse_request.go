// backend/internal/parser/models/parse_request.go
package parsermodels

type ParseRequest struct {
	Code     string      `json:"code"`
	TestCase interface{} `json:"test_case,omitempty"`
	Language string      `json:"language"`
}

type ParseResponse struct {
	IsValid        bool            `json:"is_valid"`
	Errors         []ParseError    `json:"errors"`
	Functions      []Function      `json:"functions"`
	Variables      []Variable      `json:"variables"`
	DataStructures []DataStructure `json:"data_structures"`
	EntryPoint     string          `json:"entry_point,omitempty"`
	Complexity     ComplexityInfo  `json:"complexity"`
}

type Function struct {
	Name    string   `json:"name"`
	Line    int      `json:"line"`
	Args    []string `json:"args"`
	Returns string   `json:"returns"`
}

type Variable struct {
	Name string `json:"name"`
	Line int    `json:"line"`
	Type string `json:"type"`
}

type DataStructure struct {
	Type     string `json:"type"`
	Name     string `json:"name"`
	Line     int    `json:"line"`
	Elements int    `json:"elements,omitempty"`
}

type ComplexityInfo struct {
	Time  string `json:"time"`
	Space string `json:"space"`
}
