export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Category = 
  | 'Arrays'
  | 'Strings'
  | 'Linked Lists'
  | 'Trees'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Binary Search'
  | 'Stack & Queue'
  | 'Heap'
  | 'Greedy'
  | 'Backtracking'
  | 'Math'
  | 'Bit Manipulation'
  | 'Design';

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  acceptance: number;
  tags: string[];
  url: string;
  category: Category;
  isCompleted?: boolean;
  isRevised?: boolean;
  isFavorite?: boolean;
}