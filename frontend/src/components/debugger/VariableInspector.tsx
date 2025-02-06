import React from 'react';
import { Variable } from 'lucide-react';
import type { DebuggerState } from '../../services/PyodideService';

interface VariableInspectorProps {
  variables: DebuggerState['variables'];
  output: string[];
  error: string | null;
}

const VariableInspector: React.FC<VariableInspectorProps> = ({ 
  variables,
  output,
  error
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Variable className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Debug Console</h2>
      </div>

      {/* Variables Section */}
      <div className="flex-1 overflow-auto">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Variables</h3>
        <div className="space-y-2">
          {variables.map((variable, index) => (
            <div
              key={index}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {variable.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {variable.type}
                </span>
              </div>
              <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                {Array.isArray(variable.value) 
                  ? `[${variable.value.join(', ')}]`
                  : JSON.stringify(variable.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Output Section */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</h3>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 font-mono text-sm">
          {output.map((line, index) => (
            <div key={index} className="text-gray-900 dark:text-gray-100">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Error Section */}
      {error && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Error</h3>
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-2 font-mono text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}

export default VariableInspector;