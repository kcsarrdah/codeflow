import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import VisualizationPanel from '../components/debugger/VisualizationPanel';

const dataStructures = [
  {
    name: 'Stack',
    description: 'A linear data structure that follows the Last-In-First-Out (LIFO) principle.',
    syntax: 'stack.push(item), stack.pop()',
    timeComplexity: 'Push/Pop: O(1)',
    example: [1, 2, 3, 4, 5],
    type: 'stack',
  },
  {
    name: 'Queue',
    description: 'A linear data structure that follows the First-In-First-Out (FIFO) principle.',
    syntax: 'queue.enqueue(item), queue.dequeue()',
    timeComplexity: 'Enqueue/Dequeue: O(1)',
    example: [1, 2, 3, 4, 5],
    type: 'queue',
  },
  {
    name: 'Min Heap',
    description: 'A complete binary tree where each parent node is less than or equal to its children.',
    syntax: 'heap.insert(item), heap.extractMin()',
    timeComplexity: 'Insert/Extract: O(log n)',
    example: [
      { value: 1, isActive: false },
      { value: 3, isActive: false },
      { value: 2, isActive: false },
      { value: 5, isActive: false },
      { value: 4, isActive: false },
    ],
    type: 'heap',
    heapType: 'min',
  },
  {
    name: 'Max Heap',
    description: 'A complete binary tree where each parent node is greater than or equal to its children.',
    syntax: 'heap.insert(item), heap.extractMax()',
    timeComplexity: 'Insert/Extract: O(log n)',
    example: [
      { value: 5, isActive: false },
      { value: 4, isActive: false },
      { value: 3, isActive: false },
      { value: 1, isActive: false },
      { value: 2, isActive: false },
    ],
    type: 'heap',
    heapType: 'max',
  },
  {
    name: 'Trie',
    description: 'A tree-like data structure for efficient string operations and prefix matching.',
    syntax: 'trie.insert(word), trie.search(word)',
    timeComplexity: 'Insert/Search: O(m) where m is word length',
    example: {
      char: '',
      children: {
        c: {
          char: 'c',
          children: {
            a: {
              char: 'a',
              children: {
                t: { char: 't', children: {}, isWord: true }
              }
            }
          }
        },
        d: {
          char: 'd',
          children: {
            o: {
              char: 'o',
              children: {
                g: { char: 'g', children: {}, isWord: true }
              }
            }
          }
        }
      }
    },
    words: ['cat', 'dog'],
    type: 'trie',
  },
  {
    name: 'Binary Search Tree',
    description: 'A binary tree where the left subtree contains nodes with values less than the parent, and the right subtree contains nodes with values greater than the parent.',
    syntax: 'bst.insert(item), bst.search(item)',
    timeComplexity: 'Insert/Search/Delete: O(log n) average, O(n) worst',
    example: {
      value: 8,
      left: {
        value: 3,
        left: { value: 1 },
        right: { value: 6 }
      },
      right: {
        value: 10,
        right: { value: 14 }
      }
    },
    type: 'tree',
  },
  {
    name: 'Graph',
    description: 'A collection of nodes (vertices) connected by edges. Can be directed or undirected.',
    syntax: 'graph.addVertex(v), graph.addEdge(v1, v2)',
    timeComplexity: 'Add Vertex/Edge: O(1), DFS/BFS: O(V + E)',
    example: {
      nodes: [
        { id: '1', value: 'A' },
        { id: '2', value: 'B' },
        { id: '3', value: 'C' },
        { id: '4', value: 'D' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '1' }
      ]
    },
    type: 'graph',
  },
  {
    name: 'Linked List',
    description: 'A sequence of elements where each element points to the next element in the sequence. Can be singly or doubly linked.',
    syntax: 'list.append(item), list.delete(item)',
    timeComplexity: 'Insert/Delete at known position: O(1), Search: O(n)',
    example: {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5
            }
          }
        }
      }
    },
    type: 'linkedList',
    options: {
      isDoublyLinked: false
    }
  }
];

function DataStructures() {
  const [selectedDS, setSelectedDS] = useState<string | null>(null);
  const [dsOptions, setDsOptions] = useState<Record<string, any>>({});

  const toggleDoublyLinked = (dsName: string) => {
    setDsOptions(prev => ({
      ...prev,
      [dsName]: {
        ...prev[dsName],
        isDoublyLinked: !prev[dsName]?.isDoublyLinked
      }
    }));
  };

  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Data Structures
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dataStructures.map((ds) => (
            <div
              key={ds.name}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {ds.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {ds.description}
              </p>
              <div className="space-y-2 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Basic Operations
                  </h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded">
                    {ds.syntax}
                  </code>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time Complexity
                  </h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded">
                    {ds.timeComplexity}
                  </code>
                </div>
                {ds.type === 'linkedList' && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Doubly Linked:
                    </label>
                    <button
                      onClick={() => toggleDoublyLinked(ds.name)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        dsOptions[ds.name]?.isDoublyLinked
                          ? 'bg-indigo-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`${
                          dsOptions[ds.name]?.isDoublyLinked
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="h-[400px]">
                <VisualizationPanel
                  data={ds.example}
                  type={ds.type}
                  activeElements={selectedDS === ds.name ? 0 : undefined}
                  options={{
                    ...ds.options,
                    ...dsOptions[ds.name]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default DataStructures;