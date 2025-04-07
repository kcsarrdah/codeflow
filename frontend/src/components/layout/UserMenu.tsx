import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary-light/10 dark:bg-primary-dark/20 flex items-center justify-center">
          <User className="w-5 h-5 text-primary-light dark:text-primary-dark" />
        </div>
        <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-light-primary dark:bg-background-dark-primary rounded-lg shadow-lg border border-border-light dark:border-border-dark py-1">
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-left text-sm text-text-light-primary dark:text-text-dark-primary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;