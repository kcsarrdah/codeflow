import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Search, SortAsc, Network, TreePine, Hash, List, Binary, Grid } from 'lucide-react';
import { dataStructures } from '../data/dataStructures';

// Map icons to data structure types
const iconMap = {
  'arrays': Grid,
  'linked-lists': List,
  'binary-heap': TreePine,
  'hash-tables': Hash,
  'binary-search-tree': TreePine,
  'graphs': Network,
  'trie': TreePine
};

// Define algorithm categories
const algorithms = [
  {
    name: 'Searching Algorithms',
    icon: Search,
    description: 'Algorithms for finding elements in data structures.',
    path: '/algorithms/searching',
    types: [
      'Linear Search',
      'Binary Search',
      'Jump Search',
      'Interpolation Search'
    ]
  },
  {
    name: 'Sorting Algorithms',
    icon: SortAsc,
    description: 'Algorithms for arranging elements in a specific order.',
    path: '/algorithms/sorting',
    types: [
      'Bubble Sort',
      'Selection Sort',
      'Insertion Sort',
      'Merge Sort',
      'Quick Sort',
      'Heap Sort'
    ]
  },
  {
    name: 'Graph Algorithms',
    icon: Network,
    description: 'Algorithms for solving graph-related problems.',
    path: '/algorithms/graph',
    types: [
      'DFS',
      'BFS',
      'Dijkstra',
      "Kruskal's",
      "Prim's",
      'Topological Sort'
    ]
  },
  {
    name: 'Tree Algorithms',
    icon: TreePine,
    description: 'Algorithms for tree traversal and manipulation.',
    path: '/algorithms/tree',
    types: [
      'Inorder',
      'Preorder',
      'Postorder',
      'Level Order',
      'Binary Search',
      'AVL Rotations'
    ]
  }
];

function DataStructures() {
  return (
    <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-amber-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Code2 className="w-8 h-8 text-rose-500 dark:text-rose-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Data Structures & Algorithms
          </h1>
        </div>

        {/* Data Structures Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-rose-500 dark:text-rose-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Data Structures
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(dataStructures).map(([key, ds]) => {
              const Icon = iconMap[key as keyof typeof iconMap] || TreePine;
              return (
                <Link
                  key={key}
                  to={`/data-structures/${key}`}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-amber-500 rounded-lg blur opacity-5 group-hover:opacity-10 transition duration-1000" />
                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-rose-500/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {ds.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {ds.description}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Common Operations
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {ds.timeComplexity.slice(0, 3).map((tc) => (
                            <span
                              key={tc.operation}
                              className="px-2 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 rounded-md"
                            >
                              {tc.operation}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Algorithms Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Algorithms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {algorithms.map((algo) => (
              <Link
                key={algo.name}
                to={algo.path}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg blur opacity-5 group-hover:opacity-10 transition duration-1000" />
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-amber-500/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <algo.icon className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {algo.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {algo.description}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Types
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {algo.types.slice(0, 3).map((type) => (
                          <span
                            key={type}
                            className="px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-md"
                          >
                            {type}
                          </span>
                        ))}
                        {algo.types.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                            +{algo.types.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DataStructures;