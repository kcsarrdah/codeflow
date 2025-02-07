import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNestedResizable } from '../useNestedResizable';

describe('useNestedResizable', () => {
  const mockInnerWidth = 1000;
  const mockInnerHeight = 800;

  beforeEach(() => {
    window.innerWidth = mockInnerWidth;
    window.innerHeight = mockInnerHeight;
  });

  const options = {
    direction: 'horizontal' as const,
    minSize: 20,
    maxSize: 80,
  };

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useNestedResizable(50, 70, 70, options));

    expect(result.current.mainSize).toBe(50);
    expect(result.current.leftSize).toBe(70);
    expect(result.current.rightSize).toBe(70);
    expect(result.current.isMainResizing).toBe(false);
    expect(result.current.isLeftResizing).toBe(false);
    expect(result.current.isRightResizing).toBe(false);
  });

  it('should handle main container resizing', () => {
    const { result } = renderHook(() => useNestedResizable(50, 70, 70, options));

    act(() => {
      result.current.startMainResizing();
    });
    expect(result.current.isMainResizing).toBe(true);

    // Simulate resize to 30%
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.3,
      }));
    });
    expect(result.current.mainSize).toBe(30);

    // Test minimum bound
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.1,
      }));
    });
    expect(result.current.mainSize).toBe(20);

    // Test maximum bound
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.9,
      }));
    });
    expect(result.current.mainSize).toBe(80);

    act(() => {
      result.current.stopResizing();
    });
    expect(result.current.isMainResizing).toBe(false);
  });

  it('should handle left container resizing', () => {
    const { result } = renderHook(() => useNestedResizable(50, 70, 70, options));

    // Mock container element
    const mockContainer = document.createElement('div');
    mockContainer.className = 'left-container';
    Object.defineProperty(mockContainer, 'clientHeight', { value: 800 });
    Object.defineProperty(mockContainer, 'getBoundingClientRect', {
      value: () => ({ top: 0 }),
    });

    document.body.appendChild(mockContainer);

    act(() => {
      result.current.startLeftResizing();
    });
    expect(result.current.isLeftResizing).toBe(true);

    // Simulate resize to 50%
    const mockEvent = new MouseEvent('mousemove', {
      clientY: 400,
    });
    Object.defineProperty(mockEvent, 'target', { 
      value: mockContainer.appendChild(document.createElement('div')) 
    });

    act(() => {
      result.current.resize(mockEvent);
    });
    expect(result.current.leftSize).toBe(50);

    document.body.removeChild(mockContainer);
  });

  it('should handle right container resizing', () => {
    const { result } = renderHook(() => useNestedResizable(50, 70, 70, options));

    // Mock container element
    const mockContainer = document.createElement('div');
    mockContainer.className = 'right-container';
    Object.defineProperty(mockContainer, 'clientHeight', { value: 800 });
    Object.defineProperty(mockContainer, 'getBoundingClientRect', {
      value: () => ({ top: 0 }),
    });

    document.body.appendChild(mockContainer);

    act(() => {
      result.current.startRightResizing();
    });
    expect(result.current.isRightResizing).toBe(true);

    // Simulate resize to 50%
    const mockEvent = new MouseEvent('mousemove', {
      clientY: 400,
    });
    Object.defineProperty(mockEvent, 'target', { 
      value: mockContainer.appendChild(document.createElement('div')) 
    });

    act(() => {
      result.current.resize(mockEvent);
    });
    expect(result.current.rightSize).toBe(50);

    document.body.removeChild(mockContainer);
  });

  it('should not resize when not in resizing state', () => {
    const { result } = renderHook(() => useNestedResizable(50, 70, 70, options));

    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.3,
      }));
    });

    expect(result.current.mainSize).toBe(50);
    expect(result.current.leftSize).toBe(70);
    expect(result.current.rightSize).toBe(70);
  });
});