import { DataStructureInfo } from '../types/dataStructure';

export const dataStructures: Record<string, DataStructureInfo> = {
  arrays: {
    name: 'Arrays',
    description: 'An array is a collection of elements stored at contiguous memory locations. The elements can be accessed directly by using an index. Arrays are among the oldest and most important data structures and are used by almost every program.',
    timeComplexity: [
      { operation: 'Access', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Insert', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Delete', best: 'O(1)', average: 'O(n)', worst: 'O(n)' }
    ],
    spaceComplexity: 'O(n)',
    advantages: [
      'Constant-time access to any element',
      'Space efficient (minimal memory overhead)',
      'Good cache locality',
      'Easy to iterate over'
    ],
    disadvantages: [
      'Fixed size (for static arrays)',
      'Insertion and deletion are expensive',
      'May waste memory if size is overestimated',
      'Resizing is expensive (for dynamic arrays)'
    ],
    commonOperations: [
      {
        name: 'Access Element',
        description: 'Access an element at a given index',
        code: 'element = array[index]'
      },
      {
        name: 'Insert Element',
        description: 'Insert an element at a given index',
        code: 'array.insert(index, element)'
      },
      {
        name: 'Delete Element',
        description: 'Delete an element at a given index',
        code: 'array.pop(index)'
      },
      {
        name: 'Search Element',
        description: 'Search for an element in the array',
        code: 'index = array.index(element)'
      }
    ],
    visualizationData: [1, 2, 3, 4, 5],
    visualizationType: 'array'
  },
  'linked-lists': {
    name: 'Linked Lists',
    description: 'A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, linked lists can grow or shrink in size during execution.',
    timeComplexity: [
      { operation: 'Access', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Insert', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Delete', best: 'O(1)', average: 'O(1)', worst: 'O(1)' }
    ],
    spaceComplexity: 'O(n)',
    advantages: [
      'Dynamic size',
      'Efficient insertion and deletion',
      'No memory wastage',
      'Can be easily implemented'
    ],
    disadvantages: [
      'No random access',
      'Extra memory for pointers',
      'Not cache friendly',
      'Reverse traversing is difficult (in singly linked lists)'
    ],
    commonOperations: [
      {
        name: 'Insert at Beginning',
        description: 'Insert a new node at the start of the list',
        code: `newNode.next = head
head = newNode`
      },
      {
        name: 'Delete Node',
        description: 'Delete a node from the list',
        code: `if (head == null) return
if (head.next == null) {
    head = null
    return
}
head.next = head.next.next`
      },
      {
        name: 'Search',
        description: 'Search for a value in the list',
        code: `current = head
while (current != null):
    if current.value == target:
        return current
    current = current.next
return null`
      }
    ],
    visualizationData: {
      head: {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 3,
            next: {
              value: 4,
              next: null
            }
          }
        }
      }
    },
    visualizationType: 'linkedList'
  },
  'binary-heap': {
    name: 'Binary Heap',
    description: 'A binary heap is a complete binary tree that satisfies the heap property. In a max heap, for any given node I, the value of I is greater than or equal to the values of its children. In a min heap, the value of I is less than or equal to the values of its children.',
    timeComplexity: [
      { operation: 'Insert', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      { operation: 'Delete Max/Min', best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
      { operation: 'Get Max/Min', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Heapify', best: 'O(n)', average: 'O(n)', worst: 'O(n)' }
    ],
    spaceComplexity: 'O(n)',
    advantages: [
      'Efficient access to max/min element',
      'Guaranteed log(n) time for insert and delete',
      'In-place implementation possible',
      'Perfect for priority queues'
    ],
    disadvantages: [
      'Not suitable for searching elements',
      'Not stable (equal elements may change order)',
      'Limited operations compared to BST',
      'Fixed structure requirements'
    ],
    commonOperations: [
      {
        name: 'Insert',
        description: 'Insert a new element into the heap',
        code: `def insert(heap, key):
    heap.append(key)
    i = len(heap) - 1
    while i > 0 and heap[parent(i)] > heap[i]:
        heap[i], heap[parent(i)] = heap[parent(i)], heap[i]
        i = parent(i)`
      },
      {
        name: 'Extract Min',
        description: 'Remove and return the minimum element',
        code: `def extract_min(heap):
    if len(heap) == 0:
        return None
    min_val = heap[0]
    heap[0] = heap[-1]
    heap.pop()
    heapify(heap, 0)
    return min_val`
      },
      {
        name: 'Heapify',
        description: 'Maintain heap property starting from given index',
        code: `def heapify(heap, i):
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < len(heap) and heap[left] < heap[smallest]:
        smallest = left
    if right < len(heap) and heap[right] < heap[smallest]:
        smallest = right
        
    if smallest != i:
        heap[i], heap[smallest] = heap[smallest], heap[i]
        heapify(heap, smallest)`
      }
    ],
    visualizationData: {
      value: 1,
      left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 }
      },
      right: {
        value: 3,
        left: { value: 6 },
        right: { value: 7 }
      }
    },
    visualizationType: 'heap'
  },
  'hash-tables': {
    name: 'Hash Tables',
    description: 'A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.',
    timeComplexity: [
      { operation: 'Insert', best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
      { operation: 'Delete', best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
      { operation: 'Search', best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
      { operation: 'Resize', best: 'O(n)', average: 'O(n)', worst: 'O(n)' }
    ],
    spaceComplexity: 'O(n)',
    advantages: [
      'Constant time operations on average',
      'Flexible keys (not just integers)',
      'Dynamic size',
      'Efficient for large datasets'
    ],
    disadvantages: [
      'Collisions can degrade performance',
      'No ordering of keys',
      'Extra space for hash table',
      'Need good hash function'
    ],
    commonOperations: [
      {
        name: 'Insert',
        description: 'Insert a key-value pair into the hash table',
        code: `def insert(key, value):
    index = hash(key) % table_size
    if table[index] is None:
        table[index] = [(key, value)]
    else:
        # Handle collision with chaining
        for i, (k, v) in enumerate(table[index]):
            if k == key:
                table[index][i] = (key, value)
                return
        table[index].append((key, value))`
      },
      {
        name: 'Search',
        description: 'Find a value by its key',
        code: `def search(key):
    index = hash(key) % table_size
    if table[index] is None:
        return None
    for k, v in table[index]:
        if k == key:
            return v
    return None`
      },
      {
        name: 'Delete',
        description: 'Remove a key-value pair',
        code: `def delete(key):
    index = hash(key) % table_size
    if table[index] is None:
        return False
    for i, (k, v) in enumerate(table[index]):
        if k == key:
            table[index].pop(i)
            return True
    return False`
      }
    ],
    visualizationData: {
      buckets: [
        [{ key: "apple", value: 5 }],
        [],
        [{ key: "banana", value: 8 }, { key: "orange", value: 3 }],
        [],
        [{ key: "grape", value: 2 }]
      ]
    },
    visualizationType: 'hashTable'
  },
  'binary-search-tree': {
    name: 'Binary Search Tree',
    description: 'A binary search tree is a binary tree data structure where each node has at most two children, and for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater than the node.',
    timeComplexity: [
      { operation: 'Insert', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      { operation: 'Delete', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      { operation: 'Search', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      { operation: 'Traverse', best: 'O(n)', average: 'O(n)', worst: 'O(n)' }
    ],
    spaceComplexity: 'O(n)',
    advantages: [
      'Maintains sorted data',
      'Efficient search operations',
      'Supports range queries',
      'Dynamic size'
    ],
    disadvantages: [
      'Performance depends on tree balance',
      'No constant-time operations',
      'Complex deletion process',
      'Extra space for pointers'
    ],
    commonOperations: [
      {
        name: 'Insert',
        description: 'Insert a new value into the BST',
        code: `def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root`
      },
      {
        name: 'Search',
        description: 'Search for a value in the BST',
        code: `def search(root, value):
    if root is None or root.value == value:
        return root
    if value < root.value:
        return search(root.left, value)
    return search(root.right, value)`
      },
      {
        name: 'Delete',
        description: 'Delete a value from the BST',
        code: `def delete(root, value):
    if root is None:
        return root
    if value < root.value:
        root.left = delete(root.left, value)
    elif value > root.value:
        root.right = delete(root.right, value)
    else:
        if root.left is None:
            return root.right
        elif root.right is None:
            return root.left
        temp = min_value_node(root.right)
        root.value = temp.value
        root.right = delete(root.right, temp.value)
    return root`
      }
    ],
    visualizationData: {
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
    visualizationType: 'tree'
  },
  'graphs': {
    name: 'Graphs',
    description: 'A graph is a non-linear data structure consisting of vertices (nodes) and edges that connect these vertices. Graphs can be directed or undirected, weighted or unweighted, and can represent many real-world relationships and networks.',
    timeComplexity: [
      { operation: 'Add Vertex', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Add Edge', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Remove Vertex', best: 'O(V)', average: 'O(V + E)', worst: 'O(V + E)' },
      { operation: 'Remove Edge', best: 'O(1)', average: 'O(E)', worst: 'O(E)' }
    ],
    spaceComplexity: 'O(V + E)',
    advantages: [
      'Can model real-world relationships',
      'Flexible structure',
      'Support for various algorithms',
      'Can represent both directed and undirected relationships'
    ],
    disadvantages: [
      'Can be complex to implement',
      'Memory intensive',
      'Traversal can be complicated',
      'May require complex algorithms'
    ],
    commonOperations: [
      {
        name: 'Add Vertex',
        description: 'Add a new vertex to the graph',
        code: `def add_vertex(vertex):
    if vertex not in graph:
        graph[vertex] = []`
      },
      {
        name: 'Add Edge',
        description: 'Add an edge between two vertices',
        code: `def add_edge(v1, v2, weight=1):
    if v1 in graph and v2 in graph:
        graph[v1].append((v2, weight))
        # For undirected graph
        graph[v2].append((v1, weight))`
      },
      {
        name: 'BFS Traversal',
        description: 'Breadth-first search traversal',
        code: `def bfs(start):
    visited = set()
    queue = [start]
    visited.add(start)
    
    while queue:
        vertex = queue.pop(0)
        print(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`
      }
    ],
    visualizationData: {
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
    visualizationType: 'graph'
  },
  'trie': {
    name: 'Trie',
    description: 'A trie, also called a prefix tree, is a tree-based data structure that efficiently stores and retrieves strings. Each node represents a character, and paths from the root to leaf nodes represent complete words or strings.',
    timeComplexity: [
      { operation: 'Insert', best: 'O(m)', average: 'O(m)', worst: 'O(m)' },
      { operation: 'Search', best: 'O(m)', average: 'O(m)', worst: 'O(m)' },
      { operation: 'Delete', best: 'O(m)', average: 'O(m)', worst: 'O(m)' },
      { operation: 'Prefix Search', best: 'O(p)', average: 'O(p)', worst: 'O(p)' }
    ],
    spaceComplexity: 'O(ALPHABET_SIZE * m * n)',
    advantages: [
      'Fast prefix searches',
      'Efficient string storage',
      'Supports autocomplete functionality',
      'Quick string validation'
    ],
    disadvantages: [
      'Higher memory usage',
      'Complex implementation',
      'Memory usage for sparse datasets',
      'Not suitable for non-string data'
    ],
    commonOperations: [
      {
        name: 'Insert',
        description: 'Insert a word into the trie',
        code: `def insert(word):
    node = root
    for char in word:
        if char not in node.children:
            node.children[char] = TrieNode()
        node = node.children[char]
    node.is_end = True`
      },
      {
        name: 'Search',
        description: 'Search for a word in the trie',
        code: `def search(word):
    node = root
    for char in word:
        if char not in node.children:
            return False
        node = node.children[char]
    return node.is_end`
      },
      {
        name: 'Starts With',
        description: 'Check if any word starts with given prefix',
        code: `def starts_with(prefix):
    node = root
    for char in prefix:
        if char not in node.children:
            return False
        node = node.children[char]
    return True`
      }
    ],
    visualizationData: {
      char: '',
      children: {
        'c': {
          char: 'c',
          children: {
            'a': {
              char: 'a',
              children: {
                't': { char: 't', isWord: true }
              }
            }
          }
        },
        'd': {
          char: 'd',
          children: {
            'o': {
              char: 'o',
              children: {
                'g': { char: 'g', isWord: true }
              }
            }
          }
        }
      },
      words: ['cat', 'dog']
    },
    visualizationType: 'trie'
  }
};