import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useResizable } from '../useResizable';

describe('useResizable', () => {
  const mockInnerWidth = 1000;
  const mockInnerHeight = 800;

  beforeEach(() => {
    // Mock window dimensions
    window.innerWidth = mockInnerWidth;
    window.innerHeight = mockInnerHeight;
  });

  describe('horizontal resizing', () => {
    const horizontalOptions = {
      direction: 'horizontal' as const,
      minSize: 20,
      maxSize: 80,
    };

    it('should initialize with the provided initial size', () => {
      const { result } = renderHook(() => useResizable(50, horizontalOptions));
      
      expect(result.current.size).toBe(50);
      expect(result.current.isResizing).toBe(false);
    });

    it('should start and stop resizing', () => {
      const { result } = renderHook(() => useResizable(50, horizontalOptions));
      
      act(() => {
        result.current.startResizing();
      });
      expect(result.current.isResizing).toBe(true);
      
      act(() => {
        result.current.stopResizing();
      });
      expect(result.current.isResizing).toBe(false);
    });

    it('should resize horizontally within bounds', () => {
      const { result } = renderHook(() => useResizable(50, horizontalOptions));
      
      // Start resizing
      act(() => {
        result.current.startResizing();
      });

      // Simulate mouse move to 30% of window width
      act(() => {
        result.current.resize(new MouseEvent('mousemove', {
          clientX: mockInnerWidth * 0.3,
        }));
      });
      expect(result.current.size).toBe(30);

      // Test minimum bound
      act(() => {
        result.current.resize(new MouseEvent('mousemove', {
          clientX: mockInnerWidth * 0.1, // Try to resize to 10%
        }));
      });
      expect(result.current.size).toBe(20); // Should stop at minSize

      // Test maximum bound
      act(() => {
        result.current.resize(new MouseEvent('mousemove', {
          clientX: mockInnerWidth * 0.9, // Try to resize to 90%
        }));
      });
      expect(result.current.size).toBe(80); // Should stop at maxSize
    });

    it('should not resize when not in resizing state', () => {
      const { result } = renderHook(() => useResizable(50, horizontalOptions));
      
      act(() => {
        result.current.resize(new MouseEvent('mousemove', {
          clientX: mockInnerWidth * 0.3,
        }));
      });
      expect(result.current.size).toBe(50); // Should remain unchanged
    });
  });

  describe('vertical resizing', () => {
    const verticalOptions = {
      direction: 'vertical' as const,
      minSize: 30,
      maxSize: 70,
    };

    it('should handle vertical resizing', () => {
      const { result } = renderHook(() => useResizable(50, verticalOptions));
      
      // Mock container element
      const mockContainer = document.createElement('div');
      mockContainer.className = 'resizable-container';
      Object.defineProperty(mockContainer, 'clientHeight', { value: 800 });
      
      const mockTarget = document.createElement('div');
      mockTarget.className = 'resizer';
      mockContainer.appendChild(mockTarget);
      
      document.body.appendChild(mockContainer);

      // Start resizing
      act(() => {
        result.current.startResizing();
      });

      // Simulate vertical resize
      act(() => {
        const mockEvent = new MouseEvent('mousemove', {
          clientY: 400, // 50% of container height
        });
        Object.defineProperty(mockEvent, 'target', { value: mockTarget });
        result.current.resize(mockEvent);
      });

      expect(result.current.size).toBe(50);

      // Clean up
      document.body.removeChild(mockContainer);
    });

    it('should respect vertical bounds', () => {
      const { result } = renderHook(() => useResizable(50, verticalOptions));
      
      // Mock container
      const mockContainer = document.createElement('div');
      mockContainer.className = 'resizable-container';
      Object.defineProperty(mockContainer, 'clientHeight', { value: 800 });
      
      const mockTarget = document.createElement('div');
      mockTarget.className = 'resizer';
      mockContainer.appendChild(mockTarget);
      
      document.body.appendChild(mockContainer);

      // Start resizing
      act(() => {
        result.current.startResizing();
      });

      // Test minimum bound
      act(() => {
        const mockEvent = new MouseEvent('mousemove', {
          clientY: 200, // Try to resize to 25%
        });
        Object.defineProperty(mockEvent, 'target', { value: mockTarget });
        result.current.resize(mockEvent);
      });
      expect(result.current.size).toBe(30); // Should stop at minSize

      // Test maximum bound
      act(() => {
        const mockEvent = new MouseEvent('mousemove', {
          clientY: 640, // Try to resize to 80%
        });
        Object.defineProperty(mockEvent, 'target', { value: mockTarget });
        result.current.resize(mockEvent);
      });
      expect(result.current.size).toBe(70); // Should stop at maxSize

      // Clean up
      document.body.removeChild(mockContainer);
    });
  });
});