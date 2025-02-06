import React, { useState } from 'react';

interface ListNode {
  value: number;
  next?: ListNode;
  prev?: ListNode;
}

interface LinkedListVisualizationProps {
  head: ListNode;
  activeNode?: number;
  highlightedNodes?: number[];
  isDoublyLinked?: boolean;
}

const LinkedListVisualization: React.FC<LinkedListVisualizationProps> = ({
  head,
  activeNode,
  highlightedNodes = [],
  isDoublyLinked = false
}) => {
  const [spacing, setSpacing] = useState(120);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const renderNode = (node: ListNode, index: number, total: number) => {
    const isActive = node.value === activeNode;
    const isHighlighted = highlightedNodes.includes(node.value);
    const isHovered = hoveredNode === node.value;

    return (
      <g key={index}>
        {/* Node shadow */}
        <rect
          x={index * spacing}
          y={2}
          width={90}
          height={44}
          rx={6}
          className={`fill-gray-400/20 dark:fill-black/20 transition-all duration-300 ${
            isHovered ? 'translate-y-0.5' : ''
          }`}
        />
        
        {/* Node */}
        <rect
          x={index * spacing}
          y={0}
          width={90}
          height={44}
          rx={6}
          className={`${
            isActive
              ? 'fill-indigo-500 dark:fill-indigo-400'
              : isHighlighted
              ? 'fill-blue-500 dark:fill-blue-400'
              : isHovered
              ? 'fill-gray-300 dark:fill-gray-500'
              : 'fill-gray-200 dark:fill-gray-600'
          } stroke-2 stroke-white dark:stroke-gray-800 transition-all duration-300 ${
            isHovered ? 'shadow-lg scale-105' : ''
          }`}
          onMouseEnter={() => setHoveredNode(node.value)}
          onMouseLeave={() => setHoveredNode(null)}
        />
        
        {/* Value */}
        <text
          x={index * spacing + 45}
          y={22}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-mono text-sm font-semibold fill-gray-900 dark:fill-gray-100 transition-all duration-300 ${
            isHovered ? 'font-bold' : ''
          }`}
        >
          {node.value}
        </text>
        
        {/* Forward Arrow */}
        {node.next && (
          <g>
            <line
              x1={index * spacing + 90}
              y1={22}
              x2={index * spacing + spacing}
              y2={22}
              className={`stroke-gray-300 dark:stroke-gray-600 transition-all duration-300 ${
                isHovered ? 'stroke-indigo-500 dark:stroke-indigo-400' : ''
              }`}
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
            />
          </g>
        )}

        {/* Backward Arrow (for doubly linked list) */}
        {isDoublyLinked && index > 0 && (
          <g>
            <line
              x1={index * spacing}
              y1={32}
              x2={index * spacing - spacing + 90}
              y2={32}
              className={`stroke-gray-300 dark:stroke-gray-600 transition-all duration-300 ${
                isHovered ? 'stroke-indigo-500 dark:stroke-indigo-400' : ''
              }`}
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-back)"
            />
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Spacing Control */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Node Spacing:
        </label>
        <input
          type="range"
          min="100"
          max="200"
          value={spacing}
          onChange={(e) => setSpacing(Number(e.target.value))}
          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <svg width="100%" height="100" className="overflow-visible">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-gray-300 dark:fill-gray-600"
            />
          </marker>
          <marker
            id="arrowhead-back"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto-start-reverse"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-gray-300 dark:fill-gray-600"
            />
          </marker>
        </defs>
        <g transform="translate(10, 10)">
          {(() => {
            const nodes = [];
            let node: ListNode | undefined = head;
            let i = 0;
            while (node) {
              nodes.push(renderNode(node, i, nodes.length));
              node = node.next;
              i++;
            }
            return nodes;
          })()}
        </g>
      </svg>
    </div>
  );
};

export default LinkedListVisualization;