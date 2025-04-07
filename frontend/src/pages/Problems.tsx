import React, { useState, useMemo } from 'react';
import { Code2, ChevronDown } from 'lucide-react';
import { problems } from '../data/problems';
import { Difficulty, Category, Problem } from '../types/problem';
import ProblemCard from '../components/problems/ProblemCard';
import TagFilter from '../components/problems/TagFilter';
import SearchBar from '../components/problems/SearchBar';
import { filterProblems, groupProblemsByCategory } from '../utils/problemUtils';

function Problems() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(new Set(['Arrays']));
  const [problemStates, setProblemStates] = useState<Record<number, { 
    isCompleted: boolean;
    isRevised: boolean;
    isFavorite: boolean;
  }>>({});

  // Get unique tags from all problems
  const allTags = useMemo(() => 
    Array.from(new Set(problems.flatMap(p => p.tags))).sort(),
    []
  );

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const toggleCategory = (category: Category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleProblemState = (id: number, state: 'isCompleted' | 'isRevised' | 'isFavorite') => {
    setProblemStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [state]: !prev[id]?.[state]
      }
    }));
  };

  const filteredProblems = useMemo(() => 
    filterProblems(problems, searchTerm, selectedTags).map(problem => ({
      ...problem,
      ...problemStates[problem.id]
    })),
    [searchTerm, selectedTags, problemStates]
  );

  const problemsByCategory = useMemo(() => 
    groupProblemsByCategory(filteredProblems),
    [filteredProblems]
  );

  return (
    <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Code2 className="w-8 h-8 text-sky-500 dark:text-sky-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Problems
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <TagFilter 
            tags={allTags}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />
        </div>

        {/* Category-based Kanban Board */}
        <div className="space-y-6">
          {Object.entries(problemsByCategory).map(([category, problems]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <button
                onClick={() => toggleCategory(category as Category)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h2>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400">
                    {problems.length}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedCategories.has(category as Category) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedCategories.has(category as Category) && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(['Easy', 'Medium', 'Hard'] as const).map(difficulty => {
                      const difficultyProblems = problems.filter(p => p.difficulty === difficulty);
                      return (
                        <div key={difficulty} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-700 dark:text-gray-300">
                              {difficulty}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                              difficulty === 'Easy' ? 'bg-difficulty-easy-light' :
                              difficulty === 'Medium' ? 'bg-difficulty-medium-light' :
                              'bg-difficulty-hard-light'
                            }`}>
                              {difficultyProblems.length}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {difficultyProblems.map(problem => (
                              <ProblemCard 
                                key={problem.id} 
                                problem={problem}
                                onToggleComplete={(id) => toggleProblemState(id, 'isCompleted')}
                                onToggleRevised={(id) => toggleProblemState(id, 'isRevised')}
                                onToggleFavorite={(id) => toggleProblemState(id, 'isFavorite')}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Problems;