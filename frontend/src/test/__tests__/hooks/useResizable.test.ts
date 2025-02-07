import { renderHook, act } from '@testing-library/react';
import { useResizable } from '../../../hooks/useResizable';

describe('useResizable', () => {
  const mockInnerWidth = 1000;
  const mockInnerHeight = 800;

  beforeEach(() => {
    window.innerWidth = mockInnerWidth;
    window.innerHeight = mockInnerHeight;
  });

  it('initializes with provided size', () => {
    const { result } = renderHook(() => 
      useResizable(50, { direction: 'horizontal' })
    );
    
    expect(result.current.size).toBe(50);
    expect(result.current.isResizing).toBe(false);
  });

  it('handles horizontal resizing within bounds', () => {
    const { result } = renderHook(() => 
      useResizable(50, { 
        direction: 'horizontal',
        minSize: 20,
        maxSize: 80
      })
    );
    
    act(() => {
      result.current.startResizing();
    });
    expect(result.current.isResizing).toBe(true);

    // Resize to 30%
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.3
      }));
    });
    expect(result.current.size).toBe(30);

    // Test minimum bound
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.1
      }));
    });
    expect(result.current.size).toBe(20);

    // Test maximum bound
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientX: mockInnerWidth * 0.9
      }));
    });
    expect(result.current.size).toBe(80);
  });

  it('handles vertical resizing within bounds', () => {
    const { result } = renderHook(() => 
      useResizable(50, { 
        direction: 'vertical',
        minSize: 30,
        maxSize: 70
      })
    );
    
    act(() => {
      result.current.startResizing();
    });

    // Resize to 40%
    act(() => {
      result.current.resize(new MouseEvent('mousemove', {
        clientY: mockInnerHeight * 0.4
      }));
    });
    expect(result.current.size).toBe(40);
  });

  it('stops resizing correctly', () => {
    const { result } = renderHook(() => 
      useResizable(50, { direction: 'horizontal' })
    );
    
    act(() => {
      result.current.startResizing();
      result.current.stopResizing();
    });
    
    expect(result.current.isResizing).toBe(false);
  });
});