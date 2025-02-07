import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from '../../../../components/layout/Navbar';

// Mock useLocation to control the current path
const mockLocation = { pathname: '/debugger' };
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useLocation: () => mockLocation
  };
});

describe('Navbar', () => {
  const mockToggleDarkMode = vi.fn();

  beforeEach(() => {
    mockToggleDarkMode.mockClear();
  });

  it('renders correctly in light mode', () => {
    render(
      <BrowserRouter>
        <Navbar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Visual Debugger')).toBeInTheDocument();
  });

  it('renders correctly in dark mode', () => {
    render(
      <BrowserRouter>
        <Navbar isDarkMode={true} toggleDarkMode={mockToggleDarkMode} />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
  });

  it('calls toggleDarkMode when dark mode button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByLabelText('Toggle dark mode'));
    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it('shows correct navigation links when not on landing page', () => {
    render(
      <BrowserRouter>
        <Navbar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
      </BrowserRouter>
    );
    
    // Use more specific queries to find navigation links
    const debuggerLink = screen.getByRole('link', { name: /visual debugger/i });
    const dataStructuresLink = screen.getByRole('link', { name: /data structures/i });
    
    expect(debuggerLink).toBeInTheDocument();
    expect(dataStructuresLink).toBeInTheDocument();
  });

  it('shows minimal navigation on landing page', () => {
    // Update mock location to landing page
    mockLocation.pathname = '/';
    
    render(
      <BrowserRouter>
        <Navbar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
      </BrowserRouter>
    );
    
    // Should only show logo and dark mode toggle
    expect(screen.getByText('CodeFlow')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /debugger/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /data structures/i })).not.toBeInTheDocument();
  });
});