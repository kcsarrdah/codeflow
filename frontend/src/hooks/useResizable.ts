import { useState, useCallback } from 'react';

interface ResizeOptions {
  direction: 'horizontal' | 'vertical';
  minSize?: number;
  maxSize?: number;
}

export const useResizable = (initialSize: number = 50, options: ResizeOptions) => {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((event: MouseEvent) => {
    if (!isResizing) return;

    if (options.direction === 'horizontal') {
      const newSize = (event.clientX / window.innerWidth) * 100;
      setSize(Math.min(Math.max(newSize, options.minSize ?? 20), options.maxSize ?? 80));
    } else {
      const newSize = (event.clientY / window.innerHeight) * 100;
      setSize(Math.min(Math.max(newSize, options.minSize ?? 30), options.maxSize ?? 70));
    }
  }, [isResizing, options]);

  return {
    size,
    isResizing,
    startResizing,
    stopResizing,
    resize,
  };
};