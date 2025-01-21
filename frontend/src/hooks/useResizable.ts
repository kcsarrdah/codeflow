import { useState, useCallback } from 'react';

export const useResizable = (initialSize: number = 50) => {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((event: MouseEvent) => {
    if (isResizing) {
      const containerWidth = window.innerWidth;
      const newSize = (event.clientX / containerWidth) * 100;
      setSize(Math.min(Math.max(newSize, 20), 80)); // Limit between 20% and 80%
    }
  }, [isResizing]);

  return {
    size,
    isResizing,
    startResizing,
    stopResizing,
    resize,
  };
};