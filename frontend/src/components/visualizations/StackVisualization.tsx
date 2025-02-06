import React, { useState } from 'react';

interface StackVisualizationProps {
  data: any[];
  activeIndex?: number;
  highlightedIndex?: number;
}

const StackVisualization: React.FC<StackVisualizationProps> = ({
  data,
  activeIndex,
  highlightedIndex
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col-reverse items-center gap-2">
      {/* Stack base */}
      <div className="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg shadow-inner" />
      
      {/* Stack elements */}
      {data.map((value, index) => {
        const isHovered = hoveredIndex === index;
        return (
          <div
            key={index}
            className={`relative w-32 h-12 flex items-center justify-center rounded-lg shadow-lg transition-all ease-in-out duration-500 ${
              index === activeIndex
                ? 'bg-indigo-500 dark:bg-indigo-400 text-white'
                : index === highlightedIndex
                ? 'bg-blue-500 dark:bg-blue-400 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100'
            } ${isHovered ? 'scale-110 translate-x-4 shadow-xl' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className={`font-mono transition-all duration-500 ${
              isHovered ? 'font-bold scale-110' : 'font-semibold'
            }`}>
              {value}
            </span>
            {index === data.length - 1 && (
              <div className={`absolute -right-20 text-sm transition-all duration-500 ${
                isHovered ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-600 dark:text-gray-400'
              }`}>
                ← Top
              </div>
            )}
          </div>
        );
      })}
      
      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-sm mt-4">
          Stack is empty
        </div>
      )}
    </div>
  );
}

export default StackVisualization;