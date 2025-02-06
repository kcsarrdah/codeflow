import React, { useState } from 'react';

interface TrieNode {
  char: string;
  isWord?: boolean;
  children: { [key: string]: TrieNode };
  isActive?: boolean;
  isHighlighted?: boolean;
}

interface TrieVisualizationProps {
  root: TrieNode;
  words?: string[];
}

const TrieVisualization: React.FC<TrieVisualizationProps> = ({ root, words = [] }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodeRadius = 20;
  const levelHeight = 60;
  const svgWidth = 1000;
  const svgHeight = 400;

  const calculateNodePositions = (
    node: TrieNode,
    level: number = 0,
    position: number = 0,
    width: number = svgWidth,
    positions: Map<string, { x: number; y: number }> = new Map()
  ) => {
    const children = Object.values(node.children);
    const x = position + width / 2;
    const y = level * levelHeight + 40;
    const key = `${level}-${position}-${node.char}`;
    positions.set(key, { x, y });

    const childWidth = width / children.length;
    children.forEach((child, index) => {
      calculateNodePositions(
        child,
        level + 1,
        position + index * childWidth,
        childWidth,
        positions
      );
    });

    return positions;
  };

  const positions = calculateNodePositions(root);

  const isConnectedNode = (parentKey: string, childKey: string) => {
    return hoveredNode === parentKey || hoveredNode === childKey;
  };

  const renderEdges = (
    node: TrieNode,
    level: number = 0,
    position: number = 0,
    width: number = svgWidth
  ) => {
    const children = Object.values(node.children);
    const parentKey = `${level}-${position}-${node.char}`;
    const parentPos = positions.get(parentKey)!;

    return children.flatMap((child, index) => {
      const childWidth = width / children.length;
      const childKey = `${level + 1}-${position + index * childWidth}-${child.char}`;
      const childPos = positions.get(childKey)!;

      return [
        <line
          key={`${parentKey}-${childKey}`}
          x1={parentPos.x}
          y1={parentPos.y}
          x2={childPos.x}
          y2={childPos.y}
          className={`transition-all ease-in-out duration-500 ${
            isConnectedNode(parentKey, childKey)
              ? 'stroke-indigo-500 dark:stroke-indigo-400'
              : 'stroke-gray-300 dark:stroke-gray-600'
          }`}
          strokeWidth="2"
        />,
        ...renderEdges(child, level + 1, position + index * childWidth, childWidth),
      ];
    });
  };

  const renderNodes = (
    node: TrieNode,
    level: number = 0,
    position: number = 0,
    width: number = svgWidth
  ) => {
    const children = Object.values(node.children);
    const key = `${level}-${position}-${node.char}`;
    const pos = positions.get(key)!;
    const isHovered = hoveredNode === key;

    return [
      <g
        key={key}
        onMouseEnter={() => setHoveredNode(key)}
        onMouseLeave={() => setHoveredNode(null)}
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
              : node.isWord
              ? 'fill-emerald-500 dark:fill-emerald-400'
              : isHovered
              ? 'fill-gray-300 dark:fill-gray-500'
              : 'fill-gray-200 dark:fill-gray-600'
          } stroke-2 stroke-white dark:stroke-gray-800 transition-all ease-in-out duration-500 ${
            isHovered ? 'scale-110' : ''
          }`}
        />
        {/* Node character */}
        <text
          x={pos.x}
          y={pos.y}
          className={`font-mono text-sm font-semibold fill-gray-900 dark:fill-gray-100 transition-all duration-500 ${
            isHovered ? 'font-bold scale-110' : ''
          }`}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {node.char || '•'}
        </text>
      </g>,
      ...children.flatMap((child, index) =>
        renderNodes(child, level + 1, position + index * (width / children.length), width / children.length)
      ),
    ];
  };

  return (
    <div className="overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Trie Visualization
        </div>
        {words.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Words: {words.join(', ')}
          </div>
        )}
      </div>
      <svg width={svgWidth} height={svgHeight} className="mx-auto">
        {renderEdges(root)}
        {renderNodes(root)}
      </svg>
      
      {/* Empty state */}
      {Object.keys(root.children).length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8">
          Trie is empty
        </div>
      )}
    </div>
  );
}

export default TrieVisualization;