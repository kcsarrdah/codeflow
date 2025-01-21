import React from 'react';
import { LineChart } from 'lucide-react';

interface VisualizationPanelProps {
  data: any; // We'll type this properly when we implement specific visualizations
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Visualization</h2>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        {/* Visualization content will be implemented here */}
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          Visualization content will appear here
        </div>
      </div>
    </div>
  );
}

export default VisualizationPanel;