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
    // Placeholder for step functionality
    setState(prev => ({
      ...prev,
      currentLine: prev.currentLine + 1,
    }));
  }, []);

  const run = useCallback(() => {
    // Placeholder for run functionality
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

  // Mock data for visualization
  const arrayToVisualize = [64, 34, 25, 12, 22, 11, 90];

  return {
    state,
    setBreakpoint,
    step,
    run,
    reset,
    arrayToVisualize,
  };
};