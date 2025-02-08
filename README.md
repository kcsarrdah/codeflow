# CodeFlow

A modern, interactive platform for learning and visualizing algorithms and data structures. Perfect for understanding complex code through visual representation.

![CodeFlow Screenshot](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3)

## Features

### Visual Debugging
- 🔍 Step-by-step code execution with visual feedback
- 📊 Real-time visualization of data structures
- 🎯 Breakpoint support
- 🔄 Variable inspection and state tracking
- 📝 Integrated code editor with syntax highlighting
- 🌗 Dark mode support

### Data Structures
- Arrays and Lists
- Binary Trees and BST
- Graphs
- Linked Lists
- Hash Tables
- Heaps
- Tries
- Bitmasks

### Algorithms
- Searching Algorithms
  - Linear Search
  - Binary Search
  - Jump Search
  - Interpolation Search
- Sorting Algorithms
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
- Graph Algorithms
  - DFS
  - BFS
  - Dijkstra's Algorithm
  - Kruskal's Algorithm
  - Prim's Algorithm
  - Topological Sort
- Tree Algorithms
  - Inorder Traversal
  - Preorder Traversal
  - Postorder Traversal
  - Level Order Traversal

### Practice Problems
- Curated collection of coding problems
- Difficulty-based categorization
- Progress tracking
- Problem solutions with explanations

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codeflow.git
```

2. Navigate to the project directory:
```bash
cd codeflow
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Demo Credentials
- Email: krishnna@example.com
- Password: Waynerooney10!

## Project Structure

```
src/
├── components/           # React components
│   ├── debugger/        # Debugger-related components
│   ├── layout/          # Layout components
│   ├── problems/        # Problem-related components
│   └── visualizations/  # Visualization components
├── context/             # React context providers
├── data/               # Static data and configurations
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── test/               # Test files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run coverage

# Run linter
npm run lint
```

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: CodeMirror
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **State Management**: React Context
- **HTTP Client**: Axios

### Key Features Implementation

#### Visual Debugger
- Real-time code execution visualization
- Support for multiple programming languages
- Variable state tracking
- Breakpoint management
- Step-by-step execution

#### Data Structure Visualizations
- Interactive visualizations for common data structures
- Real-time updates during algorithm execution
- Customizable visualization parameters
- Support for large datasets

#### Problem Management
- Problem categorization by difficulty and type
- Progress tracking
- Solution submission
- Performance metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Write tests for new features
- Use functional components and hooks
- Follow the existing project structure
- Document new features and changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CodeMirror](https://codemirror.net/) for the excellent code editor
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the beautiful icons
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build system