# CodeFlow

A modern, interactive platform for learning and visualizing algorithms and data structures. Perfect for understanding complex code through visual representation.

![CodeFlow Screenshot](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3)

## Features

- 🎨 Beautiful, intuitive user interface with dark mode support
- 🔍 Step-by-step debugging with visual feedback
- 📊 Real-time visualization of data structures
- 🎯 Breakpoint support
- 🔄 Variable inspection and state tracking
- 📝 Integrated code editor with syntax highlighting
- 🌗 Dark mode support

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codeflow.git
cd codeflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Write or Paste Code**
   - Use the code editor on the left to write or paste your code
   - The editor supports syntax highlighting and auto-indentation

2. **Set Breakpoints**
   - Click on the line numbers to toggle breakpoints
   - Breakpoints are shown with a red dot

3. **Debug Controls**
   - Use the control panel at the bottom to:
     - Step through code line by line
     - Run until the next breakpoint
     - Reset the execution

4. **Visualization**
   - The right panel shows a real-time visualization of your data structures
   - Currently supports:
     - Arrays/Lists
     - Binary Trees
     - Graphs
     - Linked Lists

5. **Variable Inspector**
   - Monitor variables and their values in real-time
   - View program output and error messages

## Development

This project uses:
- React 18 with TypeScript for the frontend
- Tailwind CSS for styling
- CodeMirror for the code editor
- Lucide React for icons
- Vite as the build tool

### Project Structure

```
src/
├── components/
│   ├── debugger/        # Debugger-related components
│   ├── layout/          # Layout components
│   └── visualizations/  # Visualization components
├── hooks/               # Custom React hooks
└── tests/              # Test files
```

### Running Tests

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CodeMirror](https://codemirror.net/) for the excellent code editor
- [Tailwind CSS](https://tailwindcss.com/) for the styling system