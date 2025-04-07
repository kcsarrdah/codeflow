import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Moon, Sun, BookOpen, Play, ListTodo } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage && !user) {
    return (
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-text-light-primary dark:text-text-dark-primary" />
              <span className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary">
                CodeFlow
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary-light text-text-dark-primary hover:bg-primary-dark transition-colors"
              >
                Sign in
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-text-light-primary hover:bg-background-light-secondary/50 dark:text-text-dark-primary dark:hover:bg-background-dark-secondary/10"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-background-light-primary dark:bg-background-dark-primary border-b border-border-light dark:border-border-dark">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-text-light-primary dark:text-text-dark-primary" />
              <span className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary">
                CodeFlow
              </span>
            </Link>

            {user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/debugger"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/debugger'
                      ? 'text-accent-error-light dark:text-accent-error-dark'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-error-light dark:hover:text-accent-error-dark'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Visual Debugger</span>
                </Link>
                <Link
                  to="/data-structures"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/data-structures'
                      ? 'text-accent-warning-light dark:text-accent-warning-dark'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-warning-light dark:hover:text-accent-warning-dark'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Concepts</span>
                </Link>
                <Link
                  to="/problems"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/problems'
                      ? 'text-accent-success-light dark:text-accent-success-dark'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-success-light dark:hover:text-accent-success-dark'
                  }`}
                >
                  <ListTodo className="w-4 h-4" />
                  <span>Problems</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <UserMenu />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-text-light-primary dark:text-text-dark-primary" />
              ) : (
                <Moon className="w-5 h-5 text-text-light-primary dark:text-text-dark-primary" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;