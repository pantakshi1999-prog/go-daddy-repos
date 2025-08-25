# Go Daddy Repos

A modern React-based web application for browsing and exploring GitHub repositories. This project provides a clean, intuitive interface to view repository information, statistics, and navigate to GitHub repositories directly.

## 🚀 Features

- **Repository Listing**: Browse through repositories with detailed information
- **Repository Details**: View comprehensive details including language, forks, watchers, and open issues
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Smooth loading indicators for better UX
- **Direct GitHub Integration**: One-click navigation to actual GitHub repositories

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 20.0)
- **npm** package manager
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pantakshi1999-prog/go-daddy-repos.git
   cd go-daddy-repos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Project

Navigate to the directory where the project is located

### Development Mode

```bash
npm run dev
```

The website will open at http://localhost:5173/

### Running Tests

```bash
npm test -- --run
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── PageLayout/      # Main layout wrapper
│   ├── RepositoryCard/  # Individual repository card
│   └── ...
├── pages/               # Page components
│   ├── Repositories/    # Repository listing page
│   ├── Repository/      # Single repository detail page
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useApi/         # API data fetching hook
│   └── ...
├── api/                 # API service functions
│   └── repositories/   # Repository-related API calls
└── __tests__/          # Test files
    └── *.test.js
```

## 🎨 Tech Stack & Libraries

### Core Technologies

- **React 18**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing for SPA navigation
- **SCSS Modules**: Scoped styling with CSS modules

### Development & Testing

- **Vitest**: Fast unit testing framework (chosen over Jest for better ES modules support and speed)
- **React Testing Library**: Component testing utilities (follows best practices for testing user behavior)
- **@testing-library/user-event**: Realistic user interaction simulation

### Why These Libraries?

#### **React 18**

- Latest stable version with improved performance
- Built-in Suspense and concurrent features
- Excellent TypeScript support

#### **React Router DOM**

- Industry standard for React routing
- Supports both hash and browser history routing
- Excellent performance with code splitting

#### **SCSS Modules**

- Scoped styling prevents CSS conflicts
- Better organization than plain CSS
- Sass features like variables and mixins

#### **Vitest over Jest**

- **Faster**: Native ES modules support, no transpilation needed
- **Modern**: Built specifically for Vite-based projects
- **Compatible**: Jest-compatible API, easy migration
- **Better DX**: Superior TypeScript support and error reporting

## 🧪 Testing Strategy

### Testing Approach

- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction with mocked dependencies
- **User Interaction Tests**: Testing user workflows with userEvent

### Test Coverage Areas

- Component rendering and state management
- API integration and error handling
- User interactions (clicks, navigation)
- Edge cases and error scenarios

### Mock Strategy

- **External Dependencies**: All API calls and third-party libraries are mocked
- **Child Components**: Strategic mocking for isolated unit testing
- **Browser APIs**: Window methods and navigation mocked for testing

### Code Style

- Use ESLint and Prettier configurations
- Write tests for new features
- Follow existing component patterns
- Use semantic commit messages

---
