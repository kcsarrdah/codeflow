import React, { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import CodeEditor from './components/debugger/CodeEditor';
import VisualizationPanel from './components/debugger/VisualizationPanel';
import DebugControls from './components/debugger/DebugControls';
import VariableInspector from './components/debugger/VariableInspector';
import { useResizable } from './hooks/useResizable';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
  const [isRunning, setIsRunning] = useState(false);
  const [variables, setVariables] = useState([
    { name: 'array', value: [1, 2, 3, 4, 5], type: 'Array<number>' },
    { name: 'index', value: 0, type: 'number' },
    { name: 'sum', value: 0, type: 'number' },
  ]);
  
  const { size, isResizing, startResizing, stopResizing, resize } = useResizable(50);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleStep = () => {
    // Implement stepping logic
    console.log('Stepping through code');
  };

  const handleRun = () => {
    setIsRunning(!isRunning);
    // Implement run/pause logic
    console.log(isRunning ? 'Pausing execution' : 'Running code');
  };

  const handleReset = () => {
    // Implement reset logic
    console.log('Resetting debugger');
    setIsRunning(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResizing);
      return () => {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResizing);
      };
    }
  }, [isResizing, resize, stopResizing]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 p-4">
          <div className="flex h-full gap-2">
            {/* Left Panel: Code Editor and Variable Inspector */}
            <div 
              className="flex flex-col gap-4"
              style={{ width: `${size}%` }}
            >
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <CodeEditor code={code} onChange={setCode} />
              </div>
              <VariableInspector variables={variables} />
            </div>

            {/* Resizer */}
            <div
              className="w-2 cursor-col-resize bg-transparent hover:bg-indigo-500/50 transition-colors"
              onMouseDown={startResizing}
            />

            {/* Right Panel: Visualization */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
              style={{ width: `${100 - size}%` }}
            >
              <VisualizationPanel data={variables} />
            </div>
          </div>
        </main>

        <DebugControls
          onStep={handleStep}
          onRun={handleReset}
          onReset={handleReset}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}

export default App;