
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest'; 
import { useApi } from '../../hooks/useApi';

import Repository from './Repository';
import userEvent from '@testing-library/user-event';

vi.mock('../../api/repositories', () => ({
  getRepositoryData: vi.fn(),
}));

vi.mock('../../hooks/useApi', () => ({
  useApi: vi.fn(),
}));

const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

const mockRepositoryData = {
  name: 'react',
  description: 'A JavaScript library for building user interfaces',
  language: 'JavaScript',
  watchers: 1500,
  forks: 300,
  open_issues_count: 50,
  svn_url: 'https://github.com/facebook/react',
};

const renderWithRouter = (component, initialEntries = ['/repository/facebook/react']) => {
  return render(
    <BrowserRouter initialEntries={initialEntries}>
      {component}
    </BrowserRouter>
  );
};

describe('Repository Component', () => {
  const mockExecute = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockWindowOpen.mockClear();
  });

  describe('Loading State', () => {
    it('shows loading spinner when data is being fetched', () => {
      useApi.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
        execute: mockExecute,
      });

      renderWithRouter(<Repository />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByText('react')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when API call fails', () => {
      const mockError = new Error('Failed to fetch repository');
      useApi.mockReturnValue({
        data: null,
        isLoading: false,
        error: mockError,
        execute: mockExecute,
      });

      renderWithRouter(<Repository />);

      expect(screen.getByText('Sorry something went wrong !')).toBeInTheDocument();
      expect(screen.getByText('Please Try Again')).toBeInTheDocument();
    });

    it('calls execute when retry button is clicked', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Failed to fetch repository');
      useApi.mockReturnValue({
        data: null,
        isLoading: false,
        error: mockError,
        execute: mockExecute,
      });

      renderWithRouter(<Repository />);

      const retryButton = screen.getByText('Please Try Again');
      await user.click(retryButton);

      expect(mockExecute).toHaveBeenCalled();
    });
  });

  describe('Success State', () => {
    beforeEach(() => {
      useApi.mockReturnValue({
        data: mockRepositoryData,
        isLoading: false,
        error: null,
        execute: mockExecute,
      });
    });

    it('renders repository information correctly', () => {
      renderWithRouter(<Repository />);

      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('A JavaScript library for building user interfaces')).toBeInTheDocument();
      expect(screen.getByText('Language: JavaScript')).toBeInTheDocument();
    });

    it('displays repository statistics', () => {
      renderWithRouter(<Repository />);

      expect(screen.getByText('1500')).toBeInTheDocument();
      expect(screen.getByText('300')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('renders View Repository button', () => {
      renderWithRouter(<Repository />);
      const viewButton = screen.getByText('View Repository');
      expect(viewButton).toBeInTheDocument();
    });

    it('opens repository URL when View Repository button is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Repository />);

      const viewButton = screen.getByText('View Repository');
      await user.click(viewButton);

      expect(mockWindowOpen).toHaveBeenCalledWith('https://github.com/facebook/react');
    });

    it('does not shows the components for the fields that are not present', () => {
      const incompleteData = {
        name: 'incomplete-repo',
        watchers: 10,
        forks: 5,
        open_issues_count: 2,
        svn_url: 'https://github.com/test/incomplete',
      };

      useApi.mockReturnValue({
        data: incompleteData,
        isLoading: false,
        error: null,
        execute: mockExecute,
      });

      renderWithRouter(<Repository />);

      expect(screen.getByText('incomplete-repo')).toBeInTheDocument();
      expect(screen.queryByText('Language:')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing svn_url gracefully', async () => {
      const user = userEvent.setup();
      const dataWithoutUrl = {
        ...mockRepositoryData,
        svn_url: undefined,
      };

      useApi.mockReturnValue({
        data: dataWithoutUrl,
        isLoading: false,
        error: null,
        execute: mockExecute,
      });

      renderWithRouter(<Repository />);

      const viewButton = screen.getByText('View Repository');
      await user.click(viewButton);

      expect(mockWindowOpen).toHaveBeenCalledWith(undefined);
    });
  });
});