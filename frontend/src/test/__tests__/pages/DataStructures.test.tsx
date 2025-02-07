import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DataStructures from '../../../pages/DataStructures';

describe('DataStructures', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DataStructures />
      </BrowserRouter>
    );
    expect(screen.getByText('Data Structures & Algorithms')).toBeInTheDocument();
  });

  it('displays all data structure cards', () => {
    render(
      <BrowserRouter>
        <DataStructures />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Arrays')).toBeInTheDocument();
    expect(screen.getByText('Linked Lists')).toBeInTheDocument();
    expect(screen.getByText('Binary Search Tree')).toBeInTheDocument();
    expect(screen.getByText('Graphs')).toBeInTheDocument();
  });

  it('displays algorithm section', () => {
    render(
      <BrowserRouter>
        <DataStructures />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Algorithms')).toBeInTheDocument();
    expect(screen.getByText('Searching Algorithms')).toBeInTheDocument();
    expect(screen.getByText('Sorting Algorithms')).toBeInTheDocument();
  });
});