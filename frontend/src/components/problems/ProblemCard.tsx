import React from 'react';
import { Star, CheckSquare, Square } from 'lucide-react';
import { Problem } from '../../types/problem';
import { getDifficultyBgColor } from '../../utils/problemUtils';

interface ProblemCardProps {
  problem: Problem;
  onToggleComplete?: (id: number) => void;
  onToggleRevised?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ 
  problem,
  onToggleComplete,
  onToggleRevised,
  onToggleFavorite
}) => {
  const handleClick = (e: React.MouseEvent, callback?: (id: number) => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback?.(problem.id);
  };

  return (
    <div className="group relative">
      <div className={`rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${getDifficultyBgColor(problem.difficulty)}`}>
        {/* Top Row: Title and Actions */}
        <div className="flex items-start justify-between mb-3">
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400">
              {problem.title}
            </h3>
          </a>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={(e) => handleClick(e, onToggleFavorite)}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
              title="Toggle favorite"
            >
              <Star
                className={`w-5 h-5 ${problem.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Middle Row: Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {problem.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Row: Stats and Checkboxes */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {problem.acceptance.toFixed(1)}%
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => handleClick(e, onToggleComplete)}
              className="text-gray-400 hover:text-emerald-500 transition-colors"
              title="Mark as completed"
            >
              {problem.isCompleted ? (
                <CheckSquare className="w-5 h-5 text-emerald-500" />
              ) : (
                <Square className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={(e) => handleClick(e, onToggleRevised)}
              className="text-gray-400 hover:text-sky-500 transition-colors"
              title="Mark as revised"
            >
              {problem.isRevised ? (
                <CheckSquare className="w-5 h-5 text-sky-500" />
              ) : (
                <Square className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;