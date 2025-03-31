import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface ResizeState {
  mainSize: number;
  leftSize: number;
  rightSize: number;
  isMainResizing: boolean;
  isLeftResizing: boolean;
  isRightResizing: boolean;
}

interface ResizeContextType {
  state: ResizeState;
  startMainResizing: () => void;
  startLeftResizing: () => void;
  startRightResizing: () => void;
  stopResizing: () => void;
  resize: (event: MouseEvent) => void;
}

const ResizeContext = createContext<ResizeContextType | null>(null);

export const ResizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ResizeState>({
    mainSize: 50,
    leftSize: 70,
    rightSize: 70,
    isMainResizing: false,
    isLeftResizing: false,
    isRightResizing: false,
  });

  // Use refs to track containers
  const leftContainerRef = useRef<HTMLDivElement | null>(null);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  const startMainResizing = useCallback(() => {
    setState(prev => ({ ...prev, isMainResizing: true }));
  }, []);

  const startLeftResizing = useCallback(() => {
    setState(prev => ({ ...prev, isLeftResizing: true }));
  }, []);

  const startRightResizing = useCallback(() => {
    setState(prev => ({ ...prev, isRightResizing: true }));
  }, []);

  const stopResizing = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMainResizing: false,
      isLeftResizing: false,
      isRightResizing: false,
    }));
  }, []);

  const resize = useCallback((event: MouseEvent) => {
    setState(prev => {
      // Early return if not resizing
      if (!prev.isMainResizing && !prev.isLeftResizing && !prev.isRightResizing) {
        return prev;
      }

      const updates = { ...prev };

      if (prev.isMainResizing) {
        const newSize = (event.clientX / window.innerWidth) * 100;
        updates.mainSize = Math.min(Math.max(newSize, 20), 80);
      } else if (prev.isLeftResizing && leftContainerRef.current) {
        const container = leftContainerRef.current;
        const rect = container.getBoundingClientRect();
        const newSize = ((event.clientY - rect.top) / rect.height) * 100;
        updates.leftSize = Math.min(Math.max(newSize, 30), 70);
      } else if (prev.isRightResizing && rightContainerRef.current) {
        const container = rightContainerRef.current;
        const rect = container.getBoundingClientRect();
        const newSize = ((event.clientY - rect.top) / rect.height) * 100;
        updates.rightSize = Math.min(Math.max(newSize, 30), 70);
      }

      return updates;
    });
  }, []);

  const contextValue = {
    state,
    startMainResizing,
    startLeftResizing,
    startRightResizing,
    stopResizing,
    resize,
    leftContainerRef,
    rightContainerRef,
  };

  return (
    <ResizeContext.Provider value={contextValue}>
      {children}
    </ResizeContext.Provider>
  );
};

export const useResize = () => {
  const context = useContext(ResizeContext);
  if (!context) {
    throw new Error('useResize must be used within a ResizeProvider');
  }
  return context;
};