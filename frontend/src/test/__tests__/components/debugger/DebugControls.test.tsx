import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DebugControls from '../../../../components/debugger/DebugControls';

describe('DebugControls', () => {
  const mockOnStep = vi.fn();
  const mockOnRun = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    mockOnStep.mockClear();
    mockOnRun.mockClear();
    mockOnReset.mockClear();
  });

  it('renders all control buttons', () => {
    render(
      <DebugControls
        onStep={mockOnStep}
        onRun={mockOnRun}
        onReset={mockOnReset}
        isRunning={false}
        disabled={false}
      />
    );
    
    expect(screen.getByText('Step')).toBeInTheDocument();
    expect(screen.getByText('Run')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('calls appropriate functions when buttons are clicked', () => {
    render(
      <DebugControls
        onStep={mockOnStep}
        onRun={mockOnRun}
        onReset={mockOnReset}
        isRunning={false}
        disabled={false}
      />
    );
    
    fireEvent.click(screen.getByText('Step'));
    expect(mockOnStep).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Run'));
    expect(mockOnRun).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Reset'));
    expect(mockOnReset).toHaveBeenCalled();
  });

  it('disables buttons when disabled prop is true', () => {
    render(
      <DebugControls
        onStep={mockOnStep}
        onRun={mockOnRun}
        onReset={mockOnReset}
        isRunning={false}
        disabled={true}
      />
    );
    
    expect(screen.getByText('Step')).toBeDisabled();
    expect(screen.getByText('Run')).toBeDisabled();
    expect(screen.getByText('Reset')).toBeDisabled();
  });

  it('shows Pause instead of Run when isRunning is true', () => {
    render(
      <DebugControls
        onStep={mockOnStep}
        onRun={mockOnRun}
        onReset={mockOnReset}
        isRunning={true}
        disabled={false}
      />
    );
    
    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Run')).not.toBeInTheDocument();
  });
});