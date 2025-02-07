import { renderHook, act } from '@testing-library/react';
import { useDebugger } from '../../../hooks/useDebugger';

describe('useDebugger', () => {
  const initialCode = `
    def example():
      x = 1
      y = 2
      return x + y
  `;

  it('initializes with default state', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    expect(result.current.state).toEqual({
      variables: [],
      currentLine: -1,
      output: [],
      error: null,
      isRunning: false,
      breakpoints: new Set(),
    });
  });

  it('handles breakpoint toggling', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    act(() => {
      result.current.setBreakpoint(2);
    });
    expect(result.current.state.breakpoints.has(2)).toBe(true);
    
    act(() => {
      result.current.setBreakpoint(2);
    });
    expect(result.current.state.breakpoints.has(2)).toBe(false);
  });

  it('updates test case array', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    const newTestCase = [1, 2, 3, 4];
    
    act(() => {
      result.current.updateTestCase(newTestCase);
    });
    
    expect(result.current.arrayToVisualize).toEqual(newTestCase);
  });

  it('handles stepping through code', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    act(() => {
      result.current.step();
    });
    
    expect(result.current.state.currentLine).toBe(0);
    expect(result.current.state.variables).toHaveLength(1);
  });

  it('handles run state', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    act(() => {
      result.current.run();
    });
    expect(result.current.state.isRunning).toBe(true);
    
    act(() => {
      result.current.run();
    });
    expect(result.current.state.isRunning).toBe(false);
  });

  it('resets state correctly', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    // Make some changes
    act(() => {
      result.current.setBreakpoint(2);
      result.current.step();
      result.current.run();
    });
    
    // Reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.state).toEqual({
      variables: [],
      currentLine: -1,
      output: [],
      error: null,
      isRunning: false,
      breakpoints: new Set(),
    });
  });
});