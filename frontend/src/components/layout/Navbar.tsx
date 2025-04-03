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
              <Code2 className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                CodeFlow
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
              >
                Sign in
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-900 hover:bg-gray-100/50 dark:text-white dark:hover:bg-white/10"
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
    <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                CodeFlow
              </span>
            </Link>

            {user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/debugger"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/debugger'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Visual Debugger</span>
                </Link>
                <Link
                  to="/data-structures"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/data-structures'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Concepts</span>
                </Link>
                <Link
                  to="/problems"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/problems'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-900 dark:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;