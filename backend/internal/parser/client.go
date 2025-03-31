package parser

import (
	parsermodels "debugger/internal/parser/models" // Import parsermodels
)

type ParserClient interface {
	Parse(request parsermodels.ParseRequest) (*parsermodels.ParseResponse, error)
	HealthCheck() error
}
