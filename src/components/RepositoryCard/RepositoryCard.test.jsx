import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import RepositoryCard from "./RepositoryCard";

const mockRepo = {
  id: 1,
  name: "test-repo",
  description: "A test repository",
  language: "JavaScript",
  watchers: 42,
  forks: 10,
  html_url: "https://github.com/test/test-repo",
  updated_at: "2023-01-01T00:00:00Z",
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("RepositoryCard", () => {
  it("renders repository information correctly", () => {
    renderWithRouter(<RepositoryCard {...mockRepo} />);

    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.language)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.watchers)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.forks)).toBeInTheDocument();
  });

  it("handles missing description gracefully", () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    renderWithRouter(<RepositoryCard {...repoWithoutDescription} />);

    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
  });

  it("shows repository statistics", () => {
    renderWithRouter(<RepositoryCard {...mockRepo} />);

    expect(screen.getByText(mockRepo.forks)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.watchers)).toBeInTheDocument();
  });
});
