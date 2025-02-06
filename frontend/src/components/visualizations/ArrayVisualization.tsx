import React, { useState } from 'react';

interface ArrayVisualizationProps {
  data: number[];
  activeIndices?: number[];
  comparedIndices?: [number, number];
  sortedIndices?: number[];
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({
  data,
  activeIndices = [],
  comparedIndices = [-1, -1],
  sortedIndices = []
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data);
  const scale = 200 / maxValue; // Scale to max height of 200px

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3 items-end h-[250px]">
        {data.map((value, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`w-16 rounded-t-lg transition-all ease-in-out duration-500 ${
                  activeIndices.includes(index)
                    ? 'bg-indigo-500 dark:bg-indigo-400 shadow-lg shadow-indigo-500/50'
                    : comparedIndices.includes(index)
                    ? 'bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-500/50'
                    : sortedIndices.includes(index)
                    ? 'bg-emerald-500 dark:bg-emerald-400 shadow-lg shadow-emerald-500/50'
                    : 'bg-gray-300 dark:bg-gray-600 shadow-lg shadow-gray-500/50'
                } ${isHovered ? 'scale-110 -translate-y-2' : ''}`}
                style={{ height: `${value * scale}px` }}
              />
              <div className={`mt-2 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 shadow-inner transition-all ease-in-out duration-500 ${
                isHovered ? 'scale-110 bg-indigo-100 dark:bg-indigo-900/30' : ''
              }`}>
                <span className={`text-sm font-mono transition-all duration-500 ${
                  isHovered ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArrayVisualization;