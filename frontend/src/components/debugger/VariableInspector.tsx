import React from 'react';
import { Variable } from 'lucide-react';

interface Variable {
  name: string;
  value: any;
  type: string;
}

interface VariableInspectorProps {
  variables: Variable[];
}

const VariableInspector: React.FC<VariableInspectorProps> = ({ variables }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Variable className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Variables</h2>
      </div>
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
              {JSON.stringify(variable.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VariableInspector;