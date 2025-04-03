import React, { useState } from 'react';
import CodeEditor from '../components/debugger/CodeEditor';
import VisualizationPanel from '../components/debugger/VisualizationPanel';
import DebugControls from '../components/debugger/DebugControls';
import VariableInspector from '../components/debugger/VariableInspector';
import { useResizeHandlers } from '../hooks/useResizeHandlers';
import { useDebugger } from '../hooks/useDebugger';
import { useResize } from '../context/ResizeContext';

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
  const debugController = useDebugger(code);
  
  const {
    state: {
      mainSize,
      leftSize,
      rightSize,
      isMainResizing,
      isLeftResizing,
      isRightResizing
    },
    startMainResizing,
    startLeftResizing,
    startRightResizing,
    stopResizing,
    resize,
    leftContainerRef,
    rightContainerRef
  } = useResize();

  useResizeHandlers({
    isResizing: isMainResizing || isLeftResizing || isRightResizing,
    stopResizing,
    resize,
    cursorStyle: isMainResizing ? 'col-resize' : 'row-resize',
  });

  const handleTestCaseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestCase(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      if (Array.isArray(parsed)) {
        debugController.updateTestCase(parsed);
      }
    } catch (error) {
      // Invalid JSON format - ignore
    }
  };

  return (
    <main className="flex flex-col flex-1 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 p-4 overflow-hidden">
      <div className="flex h-full gap-2">
        {/* Left Panel: Code Editor and Variable Inspector */}
        <div 
          ref={leftContainerRef}
          className="flex flex-col gap-2 left-container"
          style={{ width: `${mainSize}%` }}
        >
          <div 
            className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl"
            style={{ height: `${leftSize}%` }}
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

          <div
            className={`h-2 cursor-row-resize bg-transparent hover:bg-gray-500/50 transition-colors ${
              isLeftResizing ? 'bg-gray-500/50' : ''
            }`}
            onMouseDown={startLeftResizing}
          />

          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl"
            style={{ height: `${100 - leftSize}%` }}
          >
            <VariableInspector 
              variables={debugController.state.variables}
              output={debugController.state.output}
              error={debugController.state.error}
            />
          </div>
        </div>

        <div
          className={`w-2 cursor-col-resize bg-transparent hover:bg-gray-500/50 transition-colors ${
            isMainResizing ? 'bg-gray-500/50' : ''
          }`}
          onMouseDown={startMainResizing}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panels"
        />

        {/* Right Panel */}
        <div 
          ref={rightContainerRef}
          className="flex flex-col gap-2 right-container"
          style={{ width: `${100 - mainSize}%` }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl"
            style={{ height: `${rightSize}%` }}
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

          <div
            className={`h-2 cursor-row-resize bg-transparent hover:bg-gray-500/50 transition-colors ${
              isRightResizing ? 'bg-gray-500/50' : ''
            }`}
            onMouseDown={startRightResizing}
          />

          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl"
            style={{ height: `${100 - rightSize}%` }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Case</h2>
            <textarea
              value={testCase}
              onChange={handleTestCaseChange}
              className="w-full h-[calc(100%-4rem)] p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 rounded-lg font-mono text-sm text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-gray-400 dark:focus:border-gray-400"
              placeholder="Enter your test case here (e.g., [1, 2, 3, 4, 5])"
            />
          </div>
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