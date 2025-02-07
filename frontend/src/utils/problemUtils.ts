import { Difficulty, Problem, Category } from '../types/problem';

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-500 dark:bg-emerald-400';
    case 'Medium':
      return 'bg-amber-500 dark:bg-amber-400';
    case 'Hard':
      return 'bg-red-500 dark:bg-red-400';
  }
};

export const getDifficultyBgColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-50 dark:bg-emerald-900/20';
    case 'Medium':
      return 'bg-amber-50 dark:bg-amber-900/20';
    case 'Hard':
      return 'bg-red-50 dark:bg-red-900/20';
  }
};

export const filterProblems = (
  problems: Problem[],
  searchTerm: string,
  selectedTags: Set<string>
): Problem[] => {
  return problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.size === 0 || problem.tags.some(tag => selectedTags.has(tag));
    return matchesSearch && matchesTags;
  });
};

export const groupProblemsByCategory = (problems: Problem[]): Record<Category, Problem[]> => {
  const grouped = {} as Record<Category, Problem[]>;
  
  // Initialize all categories with empty arrays
  const categories: Category[] = [
    'Arrays',
    'Strings',
    'Linked Lists',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Binary Search',
    'Stack & Queue',
    'Heap',
    'Greedy',
    'Backtracking',
    'Math',
    'Bit Manipulation',
    'Design'
  ];
  
  categories.forEach(category => {
    grouped[category] = [];
  });

  // Group problems by category
  problems.forEach(problem => {
    grouped[problem.category].push(problem);
  });

  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key as Category].length === 0) {
      delete grouped[key as Category];
    }
  });

  return grouped;
};