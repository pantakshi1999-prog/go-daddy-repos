import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { useApi } from '@go-daddy-repo/hooks/useApi';

import Repositories from './Repositories';

vi.mock('../../api/repositories', () => ({
  getRepositories: vi.fn(),
}));

vi.mock('../../hooks/useApi', () => ({
  useApi: vi.fn(),
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockRepositoriesData = [
  {
    name: 'react',
    language: 'JavaScript',
    forks: 42000,
    watchers: 220000,
  },
  {
    name: 'vue',
    language: 'TypeScript',
    forks: 34000,
    watchers: 207000,
  },
  {
    name: 'angular',
    language: 'TypeScript',
    forks: 25000,
    watchers: 94000,
  },
];

describe('Repositories Component', () => {
  const mockExecute = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('shows loading spinner when data is being fetched', () => {
      useApi.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
        execute: mockExecute,
      });

      renderWithRouter(<Repositories />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when API call fails', () => {
      const mockError = new Error('Failed to fetch repositories');
      useApi.mockReturnValue({
        data: null,
        isLoading: false,
        error: mockError,
        execute: mockExecute,
      });

      renderWithRouter(<Repositories />);

      expect(screen.getByText('Sorry something went wrong !')).toBeInTheDocument();
      expect(screen.getByText('Please Try Again')).toBeInTheDocument();
    });

    it('calls execute when retry button is clicked', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Failed to fetch repositories');
      useApi.mockReturnValue({
        data: null,
        isLoading: false,
        error: mockError,
        execute: mockExecute,
      });

      renderWithRouter(<Repositories />);

      const retryButton = screen.getByText('Please Try Again');
      await user.click(retryButton);

      expect(mockExecute).toHaveBeenCalled();
    });
  });

  describe('Success State', () => {
    beforeEach(() => {
      useApi.mockReturnValue({
        data: mockRepositoriesData,
        isLoading: false,
        error: null,
        execute: mockExecute,
      });
    });

    it('renders banner with correct title and description', () => {
      renderWithRouter(<Repositories />);

      expect(screen.getByText('Repo - List')).toBeInTheDocument();
      expect(screen.getByText('All your repositories listed at a place !')).toBeInTheDocument();
    });

    it('renders table headers correctly', () => {
      renderWithRouter(<Repositories />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Language')).toBeInTheDocument();
      expect(screen.getByText('Forks')).toBeInTheDocument();
      expect(screen.getByText('Watchers')).toBeInTheDocument();
    });

    it('renders all repository cards', () => {
      renderWithRouter(<Repositories />);

      const repositoryCards = screen.getAllByTestId('repository-card');
      expect(repositoryCards).toHaveLength(3);
    });

    it('does not show repository cards when data is null', () => {
      useApi.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
        execute: mockExecute,
      });

      renderWithRouter(<Repositories />);

      expect(screen.getByText('Repo - List')).toBeInTheDocument();
      expect(screen.queryAllByTestId('repository-card')).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles repositories with missing properties gracefully', () => {
      const incompleteRepositories = [
        {
          name: 'incomplete-repo-1',
          language: 'JavaScript',
        },
        {
          name: 'incomplete-repo-2',
        },
      ];

      useApi.mockReturnValue({
        data: incompleteRepositories,
        isLoading: false,
        error: null,
        execute: mockExecute,
      });

      renderWithRouter(<Repositories />);

      const repositoryCards = screen.getAllByTestId('repository-card');
      expect(repositoryCards).toHaveLength(2);
    });
  });
});