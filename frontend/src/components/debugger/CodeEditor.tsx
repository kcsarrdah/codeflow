import React from 'react';
import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Code Editor</h2>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent resize-none focus:outline-none text-gray-900 dark:text-gray-100 font-mono"
          placeholder="Enter your code here..."
        />
      </div>
    </div>
  );
}

export default CodeEditor;