import { useEffect } from 'react';

interface ResizeHandlersProps {
  isResizing: boolean;
  stopResizing: () => void;
  resize: (event: MouseEvent) => void;
  cursorStyle: 'col-resize' | 'row-resize';
}

export const useResizeHandlers = ({
  isResizing,
  stopResizing,
  resize,
  cursorStyle,
}: ResizeHandlersProps) => {
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResizing);
      document.body.style.cursor = cursorStyle;
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResizing);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, resize, stopResizing, cursorStyle]);
};