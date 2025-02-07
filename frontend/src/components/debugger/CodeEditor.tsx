import React from 'react';
import { Code2, Play } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import { Language } from '../../types/languages';
import LanguageSelector from './LanguageSelector';

interface CodeEditorProps {
  code: string;
  language?: Language;
  onChange: (code: string) => void;
  onSetBreakpoint?: (line: number) => void;
  onRun?: () => void;
  breakpoints?: Set<number>;
  currentLine?: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = 'python',
  onChange,
  onSetBreakpoint,
  onRun,
  breakpoints = new Set(),
  currentLine
}) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>(language);

  const getLanguageExtension = (lang: Language) => {
    switch (lang) {
      case 'python':
        return python();
      case 'javascript':
      case 'typescript':
        return javascript({ typescript: lang === 'typescript' });
      case 'cpp':
        return cpp();
      case 'java':
        return java();
      // Note: Go and Kotlin don't have official CodeMirror extensions,
      // so we'll fall back to a basic setup
      default:
        return javascript(); // Fallback for basic syntax highlighting
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Code Editor</h2>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
        <button
          onClick={onRun}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          aria-label="Run code"
        >
          <Play className="w-4 h-4" />
          Run Code
        </button>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          theme={oneDark}
          extensions={[getLanguageExtension(selectedLanguage)]}
          onChange={onChange}
          className="h-full"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;