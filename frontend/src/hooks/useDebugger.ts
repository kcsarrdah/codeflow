import { useState, useCallback } from 'react';

interface DebuggerState {
  variables: Array<{ name: string; value: any; type: string }>;
  currentLine: number;
  output: string[];
  error: string | null;
  isRunning: boolean;
  breakpoints: Set<number>;
}

export const useDebugger = (initialCode: string) => {
  const [code] = useState(initialCode);
  const [state, setState] = useState<DebuggerState>({
    variables: [],
    currentLine: -1,
    output: [],
    error: null,
    isRunning: false,
    breakpoints: new Set(),
  });
  const [arrayToVisualize, setArrayToVisualize] = useState([64, 34, 25, 12, 22, 11, 90]);

  const setBreakpoint = useCallback((line: number) => {
    setState(prev => {
      const newBreakpoints = new Set(prev.breakpoints);
      if (newBreakpoints.has(line)) {
        newBreakpoints.delete(line);
      } else {
        newBreakpoints.add(line);
      }
      return { ...prev, breakpoints: newBreakpoints };
    });
  }, []);

  const step = useCallback(() => {
    setState(prev => {
      const newLine = prev.currentLine + 1;
      const newVariables = [...prev.variables];
      
      // Simulate variable updates based on code execution
      if (newLine === 0) {
        newVariables.push({ name: 'x', value: 1, type: 'number' });
      } else if (newLine === 1) {
        newVariables.push({ name: 'y', value: 2, type: 'number' });
      }

      return {
        ...prev,
        currentLine: newLine,
        variables: newVariables,
      };
    });
  }, []);

  const run = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      variables: [],
      currentLine: -1,
      output: [],
      error: null,
      isRunning: false,
      breakpoints: new Set(),
    });
  }, []);

  const updateTestCase = useCallback((newTestCase: number[]) => {
    setArrayToVisualize(newTestCase);
  }, []);

  return {
    state,
    setBreakpoint,
    step,
    run,
    reset,
    arrayToVisualize,
    updateTestCase,
  };
};