import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CodeEditor from '../../../../components/debugger/CodeEditor';

// Mock CodeMirror
vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
      <textarea
        data-testid="code-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});

describe('CodeEditor', () => {
  const mockOnChange = vi.fn();
  const mockOnSetBreakpoint = vi.fn();
  const mockOnRun = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnSetBreakpoint.mockClear();
    mockOnRun.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <CodeEditor
        code="test code"
        onChange={mockOnChange}
        onSetBreakpoint={mockOnSetBreakpoint}
        onRun={mockOnRun}
        breakpoints={new Set()}
        currentLine={-1}
      />
    );
    
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('calls onChange when code is modified', () => {
    render(
      <CodeEditor
        code="test code"
        onChange={mockOnChange}
        onSetBreakpoint={mockOnSetBreakpoint}
        onRun={mockOnRun}
        breakpoints={new Set()}
        currentLine={-1}
      />
    );
    
    const editor = screen.getByTestId('code-editor');
    fireEvent.change(editor, { target: { value: 'new code' } });
    expect(mockOnChange).toHaveBeenCalledWith('new code');
  });

  it('calls onRun when run button is clicked', () => {
    render(
      <CodeEditor
        code="test code"
        onChange={mockOnChange}
        onSetBreakpoint={mockOnSetBreakpoint}
        onRun={mockOnRun}
        breakpoints={new Set()}
        currentLine={-1}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /run code/i }));
    expect(mockOnRun).toHaveBeenCalled();
  });
});