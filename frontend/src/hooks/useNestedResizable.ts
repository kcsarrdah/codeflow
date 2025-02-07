import { useState, useCallback } from 'react';

interface ResizeOptions {
  direction: 'horizontal' | 'vertical';
  minSize?: number;
  maxSize?: number;
}

export const useNestedResizable = (
  initialMainSize: number = 50,
  initialLeftSize: number = 70,
  initialRightSize: number = 70,
  options: ResizeOptions
) => {
  const [mainSize, setMainSize] = useState(initialMainSize);
  const [leftSize, setLeftSize] = useState(initialLeftSize);
  const [rightSize, setRightSize] = useState(initialRightSize);
  const [isMainResizing, setIsMainResizing] = useState(false);
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const [isRightResizing, setIsRightResizing] = useState(false);

  const startMainResizing = useCallback(() => {
    setIsMainResizing(true);
  }, []);

  const startLeftResizing = useCallback(() => {
    setIsLeftResizing(true);
  }, []);

  const startRightResizing = useCallback(() => {
    setIsRightResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsMainResizing(false);
    setIsLeftResizing(false);
    setIsRightResizing(false);
  }, []);

  const resize = useCallback((event: MouseEvent) => {
    if (!isMainResizing && !isLeftResizing && !isRightResizing) return;

    if (isMainResizing) {
      const newSize = (event.clientX / window.innerWidth) * 100;
      setMainSize(Math.min(Math.max(newSize, options.minSize ?? 20), options.maxSize ?? 80));
    } else if (isLeftResizing) {
      const container = (event.target as HTMLElement)?.closest('.left-container');
      if (container) {
        const containerHeight = container.clientHeight;
        const relativeY = event.clientY - container.getBoundingClientRect().top;
        const newSize = (relativeY / containerHeight) * 100;
        setLeftSize(Math.min(Math.max(newSize, options.minSize ?? 30), options.maxSize ?? 70));
      }
    } else if (isRightResizing) {
      const container = (event.target as HTMLElement)?.closest('.right-container');
      if (container) {
        const containerHeight = container.clientHeight;
        const relativeY = event.clientY - container.getBoundingClientRect().top;
        const newSize = (relativeY / containerHeight) * 100;
        setRightSize(Math.min(Math.max(newSize, options.minSize ?? 30), options.maxSize ?? 70));
      }
    }
  }, [isMainResizing, isLeftResizing, isRightResizing, options.minSize, options.maxSize]);

  return {
    mainSize,
    leftSize,
    rightSize,
    isMainResizing,
    isLeftResizing,
    isRightResizing,
    startMainResizing,
    startLeftResizing,
    startRightResizing,
    stopResizing,
    resize,
  };
};