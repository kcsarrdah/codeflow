import React, { useState } from 'react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

interface TreeVisualizationProps {
  root: TreeNode;
  activeNode?: number;
}

const TreeVisualization: React.FC<TreeVisualizationProps> = ({ root, activeNode }) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const renderNode = (node: TreeNode, x: number, y: number, level: number) => {
    const radius = 24;
    const horizontalSpacing = 80 / level;
    const isHovered = hoveredNode === node.value;
    
    return (
      <g key={`${x}-${y}`}>
        {/* Node shadow */}
        <circle
          cx={x}
          cy={y + 2}
          r={radius}
          className={`fill-gray-400/20 dark:fill-black/20 transition-all duration-300 ${
            isHovered ? 'translate-y-0.5' : ''
          }`}
        />
        
        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r={radius}
          className={`${
            node.value === activeNode
              ? 'fill-indigo-500 dark:fill-indigo-400'
              : isHovered
              ? 'fill-gray-300 dark:fill-gray-500'
              : 'fill-gray-200 dark:fill-gray-600'
          } stroke-2 stroke-white dark:stroke-gray-800 transition-all duration-300 ${
            isHovered ? 'scale-110' : ''
          }`}
          onMouseEnter={() => setHoveredNode(node.value)}
          onMouseLeave={() => setHoveredNode(null)}
        />
        
        {/* Node value */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-mono text-sm font-semibold fill-gray-900 dark:fill-gray-100 transition-all duration-300 ${
            isHovered ? 'font-bold' : ''
          }`}
        >
          {node.value}
        </text>
        
        {/* Edges */}
        {(node.left || node.right) && (
          <g className="opacity-70">
            {node.left && (
              <>
                <line
                  x1={x}
                  y1={y + radius}
                  x2={x - horizontalSpacing}
                  y2={y + 60}
                  className={`stroke-gray-300 dark:stroke-gray-600 transition-colors duration-300 ${
                    isHovered ? 'stroke-indigo-500 dark:stroke-indigo-400' : ''
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {renderNode(node.left, x - horizontalSpacing, y + 60, level + 1)}
              </>
            )}
            {node.right && (
              <>
                <line
                  x1={x}
                  y1={y + radius}
                  x2={x + horizontalSpacing}
                  y2={y + 60}
                  className={`stroke-gray-300 dark:stroke-gray-600 transition-colors duration-300 ${
                    isHovered ? 'stroke-indigo-500 dark:stroke-indigo-400' : ''
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {renderNode(node.right, x + horizontalSpacing, y + 60, level + 1)}
              </>
            )}
          </g>
        )}
      </g>
    );
  };

  return (
    <svg width="100%" height="400" className="overflow-visible">
      <g transform="translate(50%, 40)">
        {renderNode(root, 0, 0, 1)}
      </g>
    </svg>
  );
}

export default TreeVisualization;