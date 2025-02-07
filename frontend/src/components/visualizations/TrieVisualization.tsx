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

  // Convert trie structure to a flat array of nodes with positions
  const calculateNodePositions = (
    node: TrieNode,
    level: number = 0,
    position: number = 0,
    width: number = svgWidth,
    positions: Map<string, { x: number; y: number }> = new Map(),
    path: string = ''
  ): Map<string, { x: number; y: number }> => {
    if (!node || !node.children) return positions;

    const childKeys = Object.keys(node.children);
    const x = position + width / 2;
    const y = level * levelHeight + 40;
    positions.set(path, { x, y });

    const childWidth = width / Math.max(childKeys.length, 1);
    childKeys.forEach((key, index) => {
      calculateNodePositions(
        node.children[key],
        level + 1,
        position + index * childWidth,
        childWidth,
        positions,
        path + key
      );
    });

    return positions;
  };

  const positions = calculateNodePositions(root);

  const isConnectedNode = (parentPath: string, childPath: string) => {
    return hoveredNode === parentPath || hoveredNode === childPath;
  };

  const renderEdges = (
    node: TrieNode,
    level: number = 0,
    position: number = 0,
    width: number = svgWidth,
    path: string = ''
  ): JSX.Element[] => {
    if (!node || !node.children) return [];

    const childKeys = Object.keys(node.children);
    const parentPos = positions.get(path);
    if (!parentPos) return [];

    return childKeys.flatMap((key, index) => {
      const childPath = path + key;
      const childPos = positions.get(childPath);
      if (!childPos) return [];

      return [
        <line
          key={`${path}-${childPath}`}
          x1={parentPos.x}
          y1={parentPos.y}
          x2={childPos.x}
          y2={childPos.y}
          className={`transition-all ease-in-out duration-500 ${
            isConnectedNode(path, childPath)
              ? 'stroke-indigo-500 dark:stroke-indigo-400'
              : 'stroke-gray-300 dark:stroke-gray-600'
          }`}
          strokeWidth="2"
        />,
        ...renderEdges(
          node.children[key],
          level + 1,
          position + index * (width / childKeys.length),
          width / childKeys.length,
          childPath
        ),
      ];
    });
  };

  const renderNodes = (
    node: TrieNode,
    level: number = 0,
    position: number = 0,
    width: number = svgWidth,
    path: string = ''
  ): JSX.Element[] => {
    if (!node || !node.children) return [];

    const childKeys = Object.keys(node.children);
    const pos = positions.get(path);
    if (!pos) return [];

    const isHovered = hoveredNode === path;
    const currentChar = path.slice(-1) || '•';

    return [
      <g
        key={path}
        onMouseEnter={() => setHoveredNode(path)}
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
          {currentChar}
        </text>
      </g>,
      ...childKeys.flatMap((key, index) =>
        renderNodes(
          node.children[key],
          level + 1,
          position + index * (width / childKeys.length),
          width / childKeys.length,
          path + key
        )
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
      {!root || Object.keys(root.children || {}).length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8">
          Trie is empty
        </div>
      )}
    </div>
  );
};

export default TrieVisualization;