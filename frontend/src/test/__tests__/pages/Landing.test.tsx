import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Landing from '../../../pages/Landing';

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useNavigate: () => mockNavigate,
  };
});

// Mock tsparticles to avoid actual particle rendering
vi.mock('react-tsparticles', () => ({
  Particles: () => null,
}));

describe('Landing', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    
    expect(screen.getByText('CodeFlow')).toBeInTheDocument();
  });

  it('navigates to debugger when Start Debugging is clicked', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Start Debugging'));
    expect(mockNavigate).toHaveBeenCalledWith('/debugger');
  });

  it('navigates to data structures when Explore Data Structures is clicked', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Explore Data Structures'));
    expect(mockNavigate).toHaveBeenCalledWith('/data-structures');
  });

  it('displays all feature cards', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Visual Learning')).toBeInTheDocument();
    expect(screen.getByText('Interactive Debugging')).toBeInTheDocument();
    expect(screen.getByText('Multiple Data Structures')).toBeInTheDocument();
  });
});