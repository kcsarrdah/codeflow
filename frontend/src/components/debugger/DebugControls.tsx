import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface DebugControlsProps {
  onStep: () => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  disabled?: boolean;
}

const DebugControls: React.FC<DebugControlsProps> = ({
  onStep,
  onRun,
  onReset,
  isRunning,
  disabled = false
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={onStep}
            disabled={disabled || isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Step through code"
          >
            <SkipForward className="w-4 h-4" />
            Step
          </button>
          <button
            onClick={onRun}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isRunning ? "Pause debugger" : "Run debugger"}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run
              </>
            )}
          </button>
          <button
            onClick={onReset}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Reset debugger"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default DebugControls;