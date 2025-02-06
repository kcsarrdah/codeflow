import React, { useState } from 'react';

interface GraphNode {
  id: string;
  value: string | number;
}

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

interface GraphVisualizationProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  activeNode?: string;
  visitedNodes?: string[];
  highlightedEdge?: [string, string];
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  nodes,
  edges,
  activeNode,
  visitedNodes = [],
  highlightedEdge
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const radius = 28;
  const width = 600;
  const height = 400;

  // Position nodes in a circle
  const centerX = width / 2;
  const centerY = height / 2;
  const nodePositions = new Map(
    nodes.map((node, i) => {
      const angle = (i * 2 * Math.PI) / nodes.length;
      const x = centerX + Math.cos(angle) * 150;
      const y = centerY + Math.sin(angle) * 150;
      return [node.id, { x, y }];
    })
  );

  return (
    <svg width="100%" height="400" viewBox={`0 0 ${width} ${height}`}>
      {/* Edges */}
      {edges.map((edge, i) => {
        const from = nodePositions.get(edge.from)!;
        const to = nodePositions.get(edge.to)!;
        const isHighlighted = highlightedEdge && 
          highlightedEdge[0] === edge.from && 
          highlightedEdge[1] === edge.to;
        const isConnectedToHovered = hoveredNode && 
          (edge.from === hoveredNode || edge.to === hoveredNode);

        return (
          <g key={`edge-${i}`}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={`${
                isHighlighted
                  ? 'stroke-indigo-500 dark:stroke-indigo-400'
                  : isConnectedToHovered
                  ? 'stroke-blue-500 dark:stroke-blue-400'
                  : 'stroke-gray-300 dark:stroke-gray-600'
              } stroke-2 transition-all duration-300`}
              strokeLinecap="round"
            />
            {edge.weight !== undefined && (
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2}
                className="text-sm font-medium fill-gray-600 dark:fill-gray-400"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {edge.weight}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = nodePositions.get(node.id)!;
        const isHovered = hoveredNode === node.id;
        return (
          <g key={node.id}>
            {/* Node shadow */}
            <circle
              cx={pos.x}
              cy={pos.y + 2}
              r={radius}
              className={`fill-gray-400/20 dark:fill-black/20 transition-all duration-300 ${
                isHovered ? 'translate-y-0.5' : ''
              }`}
            />
            {/* Node circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={radius}
              className={`${
                node.id === activeNode
                  ? 'fill-indigo-500 dark:fill-indigo-400'
                  : visitedNodes.includes(node.id)
                  ? 'fill-emerald-500 dark:fill-emerald-400'
                  : isHovered
                  ? 'fill-gray-300 dark:fill-gray-500'
                  : 'fill-gray-200 dark:fill-gray-600'
              } stroke-2 stroke-white dark:stroke-gray-800 transition-all duration-300 ${
                isHovered ? 'scale-110' : ''
              }`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`font-mono text-sm font-semibold fill-gray-900 dark:fill-gray-100 transition-all duration-300 ${
                isHovered ? 'font-bold' : ''
              }`}
            >
              {node.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default GraphVisualization;