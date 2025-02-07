import { renderHook } from '@testing-library/react';
import { useResizeHandlers } from '../../../hooks/useResizeHandlers';
import { vi } from 'vitest';

describe('useResizeHandlers', () => {
  const mockStopResizing = vi.fn();
  const mockResize = vi.fn();

  beforeEach(() => {
    mockStopResizing.mockClear();
    mockResize.mockClear();
    
    // Clean up any event listeners
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

  it('adds event listeners when resizing', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    renderHook(() => 
      useResizeHandlers({
        isResizing: true,
        stopResizing: mockStopResizing,
        resize: mockResize,
        cursorStyle: 'col-resize'
      })
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', mockResize);
    expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', mockStopResizing);
    expect(document.body.style.cursor).toBe('col-resize');
    expect(document.body.style.userSelect).toBe('none');

    // Cleanup
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('removes event listeners when not resizing', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { rerender } = renderHook(
      ({ isResizing }) => 
        useResizeHandlers({
          isResizing,
          stopResizing: mockStopResizing,
          resize: mockResize,
          cursorStyle: 'col-resize'
        }),
      { initialProps: { isResizing: true } }
    );

    rerender({ isResizing: false });

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', mockResize);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', mockStopResizing);
    expect(document.body.style.cursor).toBe('');
    expect(document.body.style.userSelect).toBe('');

    removeEventListenerSpy.mockRestore();
  });

  it('cleans up on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => 
      useResizeHandlers({
        isResizing: true,
        stopResizing: mockStopResizing,
        resize: mockResize,
        cursorStyle: 'col-resize'
      })
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', mockResize);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', mockStopResizing);
    expect(document.body.style.cursor).toBe('');
    expect(document.body.style.userSelect).toBe('');

    removeEventListenerSpy.mockRestore();
  });
});