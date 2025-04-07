import React from 'react';

const ColorExample: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-text-light-primary dark:text-text-dark-primary">
        Color System Example
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Primary Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Primary Colors
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Primary Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Primary Dark</span>
            </div>
          </div>
        </div>
        
        {/* Background Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Background Colors
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background-light-primary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background-light-secondary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background-light-tertiary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Tertiary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background-dark-primary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background-dark-secondary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-background-dark-tertiary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Tertiary</span>
            </div>
          </div>
        </div>
        
        {/* Text Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Text Colors
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-text-light-primary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-text-light-secondary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-text-light-tertiary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Tertiary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-text-dark-primary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-text-dark-secondary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-text-dark-tertiary"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Tertiary</span>
            </div>
          </div>
        </div>
        
        {/* Accent Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Accent Colors
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-success-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Success Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-success-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Success Dark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-error-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Error Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-error-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Error Dark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-warning-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Warning Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-warning-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Warning Dark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-info-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Info Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent-info-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Info Dark</span>
            </div>
          </div>
        </div>
        
        {/* Difficulty Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Difficulty Colors
          </h2>
          <div className="flex flex-col gap-2">
            {/* Easy */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-easy-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Easy Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-easy-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Easy Dark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-easy-bg-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Easy Background Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-easy-bg-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Easy Background Dark</span>
            </div>
            
            {/* Medium */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-medium-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Medium Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-medium-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Medium Dark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-medium-bg-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Medium Background Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-medium-bg-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Medium Background Dark</span>
            </div>
            
            {/* Hard */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-hard-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Hard Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-hard-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Hard Dark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-hard-bg-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Hard Background Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-difficulty-hard-bg-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Hard Background Dark</span>
            </div>
          </div>
        </div>
        
        {/* Border Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Border Colors
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border-2 border-border-light"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Border Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border-2 border-border-dark"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Border Dark</span>
            </div>
          </div>
        </div>
        
        {/* Code Editor Colors */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Code Editor Colors
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-light-background"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-light-text"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Text</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-light-selection"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Selection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-light-lineNumber"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Light Line Number</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-dark-background"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-dark-text"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Text</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-dark-selection"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Selection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-code-dark-lineNumber"></div>
              <span className="text-text-light-primary dark:text-text-dark-primary">Dark Line Number</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Example Usage Section */}
      <div className="mt-8 p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
          Example Usage
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Difficulty Badges</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded-full text-white bg-difficulty-easy-light">Easy</span>
              <span className="px-2 py-1 rounded-full text-white bg-difficulty-medium-light">Medium</span>
              <span className="px-2 py-1 rounded-full text-white bg-difficulty-hard-light">Hard</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Dark Mode</h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              The application supports dark mode through Tailwind's dark mode feature. Toggle using the button in the navbar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorExample; 