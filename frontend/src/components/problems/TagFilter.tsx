import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: Set<string>;
  onToggleTag: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onToggleTag }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onToggleTag(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedTags.has(tag)
              ? 'bg-sky-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;