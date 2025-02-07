import { useState, useCallback, useRef } from 'react';

interface ResizeOptions {
  direction: 'horizontal' | 'vertical';
  minSize?: number;
  maxSize?: number;
}

export const useResizable = (initialSize: number = 50, options: ResizeOptions) => {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((event: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    if (options.direction === 'horizontal') {
      const newSize = ((event.clientX - containerRect.left) / containerRect.width) * 100;
      setSize(Math.min(Math.max(newSize, options.minSize ?? 20), options.maxSize ?? 80));
    } else {
      const newSize = ((event.clientY - containerRect.top) / containerRect.height) * 100;
      setSize(Math.min(Math.max(newSize, options.minSize ?? 30), options.maxSize ?? 70));
    }
  }, [isResizing, options.direction, options.minSize, options.maxSize]);

  return {
    size,
    isResizing,
    startResizing,
    stopResizing,
    resize,
    containerRef,
  };
};