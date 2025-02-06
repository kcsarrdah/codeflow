import React, { useState } from 'react';
import CodeEditor from '../components/debugger/CodeEditor';
import VisualizationPanel from '../components/debugger/VisualizationPanel';
import DebugControls from '../components/debugger/DebugControls';
import VariableInspector from '../components/debugger/VariableInspector';
import { useResizable } from '../hooks/useResizable';
import { useResizeHandlers } from '../hooks/useResizeHandlers';
import { useDebugger } from '../hooks/useDebugger';

function Debugger() {
  const [code, setCode] = useState(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Flag to optimize the algorithm
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap them if they are in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is already sorted
        if not swapped:
            break
    
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers.copy())
print(f"Original array: {numbers}")
print(f"Sorted array: {sorted_numbers}")
`);

  const { 
    size: horizontalSize, 
    isResizing: isHorizontalResizing, 
    startResizing: startHorizontalResizing, 
    stopResizing: stopHorizontalResizing, 
    resize: resizeHorizontal 
  } = useResizable(50, { direction: 'horizontal', minSize: 20, maxSize: 80 });

  const { 
    size: verticalSize, 
    isResizing: isVerticalResizing, 
    startResizing: startVerticalResizing, 
    stopResizing: stopVerticalResizing, 
    resize: resizeVertical 
  } = useResizable(70, { direction: 'vertical', minSize: 30, maxSize: 70 });

  const debugController = useDebugger(code);

  useResizeHandlers({
    isResizing: isHorizontalResizing,
    stopResizing: stopHorizontalResizing,
    resize: resizeHorizontal,
    cursorStyle: 'col-resize',
  });

  useResizeHandlers({
    isResizing: isVerticalResizing,
    stopResizing: stopVerticalResizing,
    resize: resizeVertical,
    cursorStyle: 'row-resize',
  });

  return (
    <main className="flex-1 p-4 overflow-hidden">
      <div className="flex h-full gap-2">
        {/* Left Panel: Code Editor and Variable Inspector */}
        <div 
          className="flex flex-col gap-2"
          style={{ width: `${horizontalSize}%` }}
        >
          <div 
            className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden"
            style={{ height: `${verticalSize}%` }}
          >
            <CodeEditor
              code={code}
              onChange={setCode}
              onSetBreakpoint={debugController.setBreakpoint}
              breakpoints={debugController.state.breakpoints}
              currentLine={debugController.state.currentLine}
            />
          </div>

          {/* Vertical Resizer */}
          <div
            className={`h-2 cursor-row-resize bg-transparent hover:bg-indigo-500/50 transition-colors ${
              isVerticalResizing ? 'bg-indigo-500/50' : ''
            }`}
            onMouseDown={startVerticalResizing}
          />

          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden"
            style={{ height: `${100 - verticalSize}%` }}
          >
            <VariableInspector 
              variables={debugController.state.variables}
              output={debugController.state.output}
              error={debugController.state.error}
            />
          </div>
        </div>

        {/* Horizontal Resizer */}
        <div
          className={`w-2 cursor-col-resize bg-transparent hover:bg-indigo-500/50 transition-colors ${
            isHorizontalResizing ? 'bg-indigo-500/50' : ''
          }`}
          onMouseDown={startHorizontalResizing}
        />

        {/* Right Panel: Visualization */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden"
          style={{ width: `${100 - horizontalSize}%` }}
        >
          <VisualizationPanel 
            data={debugController.arrayToVisualize}
            type="array"
            activeElements={[debugController.state.currentLine]}
            highlightedElements={[]}
          />
        </div>
      </div>

      <DebugControls
        onStep={debugController.step}
        onRun={debugController.run}
        onReset={debugController.reset}
        isRunning={debugController.state.isRunning}
        disabled={false}
      />
    </main>
  );
}

export default Debugger;