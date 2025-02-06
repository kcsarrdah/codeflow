import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useDebugger } from '../useDebugger';

describe('useDebugger', () => {
  const initialCode = `
    def example():
      x = 1
      y = 2
      return x + y
  `;

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    expect(result.current.state).toEqual({
      variables: [],
      currentLine: -1,
      isRunning: false,
      breakpoints: new Set(),
    });
  });

  it('should handle breakpoint toggling', () => {
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

  it('should handle stepping through code', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    act(() => {
      result.current.step();
    });
    
    expect(result.current.state.currentLine).toBe(0);
    expect(result.current.state.variables.length).toBeGreaterThan(0);
  });

  it('should handle run state toggle', () => {
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

  it('should reset state correctly', () => {
    const { result } = renderHook(() => useDebugger(initialCode));
    
    // Make some changes to state
    act(() => {
      result.current.setBreakpoint(2);
      result.current.step();
      result.current.run();
    });
    
    // Reset
    act(() => {
      result.current.reset();
    });
    
    // Verify reset state
    expect(result.current.state).toEqual({
      variables: [],
      currentLine: -1,
      isRunning: false,
      breakpoints: new Set(),
    });
  });
});