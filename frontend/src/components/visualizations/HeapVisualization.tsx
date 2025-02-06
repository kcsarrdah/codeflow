import React, { useState } from 'react';

interface HeapNode {
  value: number;
  isActive?: boolean;
  isHighlighted?: boolean;
}

interface HeapVisualizationProps {
  data: HeapNode[];
  type?: 'min' | 'max';
}

const HeapVisualization: React.FC<HeapVisualizationProps> = ({
  data,
  type = 'min'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const nodeRadius = 24;
  const levelHeight = 60;
  const svgWidth = 800;
  const svgHeight = 400;

  const calculateNodePosition = (index: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelWidth = Math.pow(2, level);
    const position = index - (Math.pow(2, level) - 1);
    const spacing = svgWidth / (levelWidth + 1);
    const x = spacing * (position + 1);
    const y = level * levelHeight + 40;
    return { x, y };
  };

  const getParentIndex = (index: number) => Math.floor((index - 1) / 2);
  const getChildIndices = (index: number) => [2 * index + 1, 2 * index + 2];

  const isConnectedToHovered = (index: number) => {
    if (hoveredIndex === null) return false;
    const parent = getParentIndex(index);
    const [leftChild, rightChild] = getChildIndices(index);
    return index === hoveredIndex || 
           parent === hoveredIndex || 
           leftChild === hoveredIndex || 
           rightChild === hoveredIndex;
  };

  return (
    <div className="overflow-auto">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {type === 'min' ? 'Min Heap' : 'Max Heap'}
      </div>
      <svg width={svgWidth} height={svgHeight} className="mx-auto">
        {/* Render edges first */}
        {data.map((_, index) => {
          const [leftChild, rightChild] = getChildIndices(index);
          const parent = calculateNodePosition(index);
          const edges = [];

          if (leftChild < data.length) {
            const child = calculateNodePosition(leftChild);
            edges.push(
              <line
                key={`edge-${index}-${leftChild}`}
                x1={parent.x}
                y1={parent.y}
                x2={child.x}
                y2={child.y}
                className={`transition-all ease-in-out duration-500 ${
                  isConnectedToHovered(index) || isConnectedToHovered(leftChild)
                    ? 'stroke-indigo-500 dark:stroke-indigo-400'
                    : 'stroke-gray-300 dark:stroke-gray-600'
                }`}
                strokeWidth="2"
              />
            );
          }

          if (rightChild < data.length) {
            const child = calculateNodePosition(rightChild);
            edges.push(
              <line
                key={`edge-${index}-${rightChild}`}
                x1={parent.x}
                y1={parent.y}
                x2={child.x}
                y2={child.y}
                className={`transition-all ease-in-out duration-500 ${
                  isConnectedToHovered(index) || isConnectedToHovered(rightChild)
                    ? 'stroke-indigo-500 dark:stroke-indigo-400'
                    : 'stroke-gray-300 dark:stroke-gray-600'
                }`}
                strokeWidth="2"
              />
            );
          }

          return edges;
        })}
        
        {/* Render nodes */}
        {data.map((node, index) => {
          const pos = calculateNodePosition(index);
          const isHovered = hoveredIndex === index;
          
          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Node shadow */}
              <circle
                cx={pos.x}
                cy={pos.y + 2}
                r={nodeRadius}
                className={`fill-gray-400/20 dark:fill-black/20 transition-all ease-in-out duration-500 ${
                  isHovered ? 'translate-y-0.5' : ''
                }`}
              />
              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                className={`${
                  node.isActive
                    ? 'fill-indigo-500 dark:fill-indigo-400'
                    : node.isHighlighted
                    ? 'fill-blue-500 dark:fill-blue-400'
                    : isHovered
                    ? 'fill-gray-300 dark:fill-gray-500'
                    : 'fill-gray-200 dark:fill-gray-600'
                } stroke-2 stroke-white dark:stroke-gray-800 transition-all ease-in-out duration-500 ${
                  isHovered ? 'scale-110' : ''
                }`}
              />
              {/* Node value */}
              <text
                x={pos.x}
                y={pos.y}
                className={`font-mono text-sm font-semibold fill-gray-900 dark:fill-gray-100 transition-all duration-500 ${
                  isHovered ? 'font-bold scale-110' : ''
                }`}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8">
          Heap is empty
        </div>
      )}
    </div>
  );
}

export default HeapVisualization;