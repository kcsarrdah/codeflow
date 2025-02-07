import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Debugger from '../../../pages/Debugger';

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

describe('Debugger', () => {
  it('renders without crashing', () => {
    render(<Debugger />);
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('updates test case when input changes', () => {
    render(<Debugger />);
    const testCaseInput = screen.getByPlaceholderText(/Enter your test case here/i);
    
    fireEvent.change(testCaseInput, { target: { value: '[1, 2, 3]' } });
    expect(testCaseInput).toHaveValue('[1, 2, 3]');
  });

  it('handles debug controls', () => {
    render(<Debugger />);
    
    const stepButton = screen.getByRole('button', { name: /step through code/i });
    const runButton = screen.getByRole('button', { name: /run debugger/i });
    const resetButton = screen.getByRole('button', { name: /reset debugger/i });
    
    expect(stepButton).toBeInTheDocument();
    expect(runButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    
    fireEvent.click(stepButton);
    fireEvent.click(runButton);
    fireEvent.click(resetButton);
  });

  it('has resizable panels', () => {
    render(<Debugger />);
    const resizer = screen.getByRole('separator', { name: /resize panels/i });
    expect(resizer).toBeInTheDocument();
  });
});