import ast
from typing import Any, Dict, List, Optional, Union

class CodeAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.functions = []
        self.variables = []
        self.data_structures = []
        self.current_complexity = "O(1)"
        self.errors = []
        
    def visit_FunctionDef(self, node: ast.FunctionDef):
        """Analyze function definitions"""
        function_info = {
            "name": node.name,
            "line": node.lineno,
            "args": [arg.arg for arg in node.args.args],
            "returns": self._get_return_type(node),
        }
        self.functions.append(function_info)
        self.generic_visit(node)
    
    def visit_Assign(self, node: ast.Assign):
        """Analyze variable assignments"""
        for target in node.targets:
            if isinstance(target, ast.Name):
                var_info = {
                    "name": target.id,
                    "line": target.lineno,
                    "type": self._infer_type(node.value)
                }
                self.variables.append(var_info)
        self.generic_visit(node)
    
    def _infer_type(self, node: ast.AST) -> str:
        """Infer the type of a node"""
        if isinstance(node, ast.List):
            return "list"
        elif isinstance(node, ast.Dict):
            return "dict"
        elif isinstance(node, ast.Num):
            return "number"
        elif isinstance(node, ast.Str):
            return "string"
        return "unknown"
    
    def _get_return_type(self, node: ast.FunctionDef) -> str:
        """Get function return type if available"""
        returns = "unknown"
        for n in ast.walk(node):
            if isinstance(n, ast.Return):
                returns = self._infer_type(n.value)
                break
        return returns

def analyze_code(code: str, test_case: Any = None) -> Dict[str, Any]:
    """Main function to analyze code"""
    try:
        # Parse the code into an AST
        tree = ast.parse(code)
        
        # Analyze the code
        analyzer = CodeAnalyzer()
        analyzer.visit(tree)
        
        # Basic complexity analysis based on nested loops
        complexity = analyze_complexity(tree)
        
        return {
            "is_valid": True,
            "errors": analyzer.errors,
            "functions": analyzer.functions,
            "variables": analyzer.variables,
            "data_structures": analyzer.data_structures,
            "entry_point": get_entry_point(analyzer.functions),
            "complexity": complexity
        }
        
    except SyntaxError as e:
        raise e
    except Exception as e:
        raise Exception(f"Failed to analyze code: {str(e)}")

def analyze_complexity(tree: ast.AST) -> Dict[str, str]:
    """Analyze code complexity"""
    # Count nested loops for basic complexity analysis
    max_depth = 0
    current_depth = 0
    
    class ComplexityVisitor(ast.NodeVisitor):
        def visit_For(self, node):
            nonlocal current_depth, max_depth
            current_depth += 1
            max_depth = max(max_depth, current_depth)
            self.generic_visit(node)
            current_depth -= 1
            
        def visit_While(self, node):
            nonlocal current_depth, max_depth
            current_depth += 1
            max_depth = max(max_depth, current_depth)
            self.generic_visit(node)
            current_depth -= 1
    
    ComplexityVisitor().visit(tree)
    
    # Map depth to complexity
    complexity_map = {
        0: "O(1)",
        1: "O(n)",
        2: "O(n²)",
        3: "O(n³)",
    }
    
    return {
        "time": complexity_map.get(max_depth, "O(n^{})".format(max_depth)),
        "space": "O(n)"  # Basic estimate, can be enhanced
    }

def get_entry_point(functions: List[Dict[str, Any]]) -> Optional[str]:
    """Determine the main entry point of the code"""
    if not functions:
        return None
        
    # Look for common main function names
    main_candidates = ["main", "__main__"]
    for func in functions:
        if func["name"] in main_candidates:
            return func["name"]
    
    # If no main function, return the first function
    return functions[0]["name"]