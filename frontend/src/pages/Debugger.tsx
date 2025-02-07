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

  const [testCase, setTestCase] = useState('[64, 34, 25, 12, 22, 11, 90]');

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

  const {
    size: visualizationSize,
    isResizing: isVisualizationResizing,
    startResizing: startVisualizationResizing,
    stopResizing: stopVisualizationResizing,
    resize: resizeVisualization
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

  useResizeHandlers({
    isResizing: isVisualizationResizing,
    stopResizing: stopVisualizationResizing,
    resize: resizeVisualization,
    cursorStyle: 'row-resize',
  });

  const handleTestCaseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestCase(e.target.value);
    try {
      // Basic validation for array format
      const parsed = JSON.parse(e.target.value);
      if (Array.isArray(parsed)) {
        debugController.updateTestCase(parsed);
      }
    } catch (error) {
      // Invalid JSON format - ignore
    }
  };

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
              onRun={debugController.run}
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

        {/* Right Panel: Visualization and Test Case */}
        <div 
          className="flex flex-col gap-2"
          style={{ width: `${100 - horizontalSize}%` }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden"
            style={{ height: `${visualizationSize}%` }}
          >
            <VisualizationPanel 
              data={debugController.arrayToVisualize}
              type="array"
              activeElements={[debugController.state.currentLine]}
              highlightedElements={[]}
              onStep={debugController.step}
              onRun={debugController.run}
              onReset={debugController.reset}
              isRunning={debugController.state.isRunning}
            />
          </div>

          {/* Visualization Resizer */}
          <div
            className={`h-2 cursor-row-resize bg-transparent hover:bg-indigo-500/50 transition-colors ${
              isVisualizationResizing ? 'bg-indigo-500/50' : ''
            }`}
            onMouseDown={startVisualizationResizing}
          />

          {/* Test Case Panel */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
            style={{ height: `${100 - visualizationSize}%` }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Case</h2>
            <textarea
              value={testCase}
              onChange={handleTestCaseChange}
              className="w-full h-[calc(100%-4rem)] p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
              placeholder="Enter your test case here (e.g., [1, 2, 3, 4, 5])"
            />
          </div>
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