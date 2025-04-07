import React from 'react';
import { Code2, Moon, Sun, BookOpen, Play, ListTodo, LogOut, User, Search, SortAsc, Network, TreePine, Hash, List, Binary, Grid, AlertCircle, Mail, Lock } from 'lucide-react';

const IconSection: React.FC = () => {
  const icons = [
    { name: 'Code2 (Logo)', component: Code2, description: 'Used as the main logo' },
    { name: 'Moon', component: Moon, description: 'Dark mode toggle' },
    { name: 'Sun', component: Sun, description: 'Light mode toggle' },
    { name: 'BookOpen', component: BookOpen, description: 'Concepts/Documentation' },
    { name: 'Play', component: Play, description: 'Visual Debugger' },
    { name: 'ListTodo', component: ListTodo, description: 'Problems section' },
    { name: 'LogOut', component: LogOut, description: 'Sign out action' },
    { name: 'User', component: User, description: 'User profile' },
    { name: 'Search', component: Search, description: 'Search functionality' },
    { name: 'SortAsc', component: SortAsc, description: 'Sorting algorithms' },
    { name: 'Network', component: Network, description: 'Graph visualization' },
    { name: 'TreePine', component: TreePine, description: 'Tree visualization' },
    { name: 'Hash', component: Hash, description: 'Hash tables' },
    { name: 'List', component: List, description: 'List visualization' },
    { name: 'Grid', component: Grid, description: 'Array visualization' },
    { name: 'AlertCircle', component: AlertCircle, description: 'Error/Warning alerts' },
    { name: 'Mail', component: Mail, description: 'Email input' },
    { name: 'Lock', component: Lock, description: 'Password input' }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg bg-background-light-secondary dark:bg-background-dark-secondary">
        <h3 className="text-lg font-medium mb-4 text-text-light-primary dark:text-text-dark-primary">
          Icons & Logo
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {icons.map((icon) => (
            <div 
              key={icon.name}
              className="p-4 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark flex flex-col items-center gap-2"
            >
              <icon.component className="w-6 h-6 text-primary-light dark:text-primary-dark" />
              <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
                {icon.name}
              </span>
              <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary text-center">
                {icon.description}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
            Usage Example:
          </h4>
          <div className="bg-code-light-background dark:bg-code-dark-background rounded-lg p-4">
            <pre className="text-sm text-code-light-text dark:text-code-dark-text">
              {`import { Code2 } from 'lucide-react';

// In your component:
<Code2 className="w-6 h-6 text-primary-light dark:text-primary-dark" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSection; 