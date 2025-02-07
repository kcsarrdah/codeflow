import React from 'react';
import { LineChart, Play, SkipBack, SkipForward } from 'lucide-react';
import ArrayVisualization from '../visualizations/ArrayVisualization';
import TreeVisualization from '../visualizations/TreeVisualization';
import GraphVisualization from '../visualizations/GraphVisualization';
import LinkedListVisualization from '../visualizations/LinkedListVisualization';
import StackVisualization from '../visualizations/StackVisualization';
import QueueVisualization from '../visualizations/QueueVisualization';
import HeapVisualization from '../visualizations/HeapVisualization';
import TrieVisualization from '../visualizations/TrieVisualization';

interface VisualizationPanelProps {
  data: any;
  type?: 'array' | 'tree' | 'graph' | 'linkedList' | 'stack' | 'queue' | 'heap' | 'trie';
  activeElements?: any;
  highlightedElements?: any;
  options?: Record<string, any>;
  onStep?: () => void;
  onRun?: () => void;
  onReset?: () => void;
  isRunning?: boolean;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  data,
  type = 'array',
  activeElements,
  highlightedElements,
  options = {},
  onStep,
  onRun,
  onReset,
  isRunning = false
}) => {
  const renderVisualization = () => {
    switch (type) {
      case 'array':
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <ArrayVisualization
              data={data}
              activeIndices={activeElements}
              comparedIndices={highlightedElements}
            />
          </div>
        );
      case 'tree':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
            <TreeVisualization
              root={data}
              activeNode={activeElements}
            />
          </div>
        );
      case 'graph':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
            <GraphVisualization
              nodes={data.nodes}
              edges={data.edges}
              activeNode={activeElements}
              highlightedEdge={highlightedElements}
            />
          </div>
        );
      case 'linkedList':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-x-auto p-2">
            <LinkedListVisualization
              head={data}
              activeNode={activeElements}
              highlightedNodes={highlightedElements}
              isDoublyLinked={options.isDoublyLinked}
            />
          </div>
        );
      case 'stack':
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <StackVisualization
              data={data}
              activeIndex={activeElements}
              highlightedIndex={highlightedElements}
            />
          </div>
        );
      case 'queue':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-x-auto p-2">
            <QueueVisualization
              data={data}
              activeIndex={activeElements}
              highlightedIndex={highlightedElements}
            />
          </div>
        );
      case 'heap':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
            <HeapVisualization
              data={data}
              type={options.heapType || "min"}
            />
          </div>
        );
      case 'trie':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
            <TrieVisualization
              root={data}
              words={data.words}
            />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Select a visualization type
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Visualization</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={onRun}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title={isRunning ? "Pause" : "Play"}
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={onStep}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {renderVisualization()}
      </div>
    </div>
  );
};

export default VisualizationPanel;