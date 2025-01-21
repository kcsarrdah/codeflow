package models

type Variable struct {
    Name     string      `json:"name"`
    Value    string      `json:"value"`
    Type     string      `json:"type"`
    Line     int         `json:"line"`
}