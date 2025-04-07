import React from 'react';
import LayoutSection from './sections/LayoutSection';
import InputSection from './sections/InputSection';
import ControlSection from './sections/ControlSection';
import VisualizationSection from './sections/VisualizationSection';
import IconSection from './sections/IconSection';

const ComponentLibrary: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-text-light-primary dark:text-text-dark-primary">
        Component Library
      </h1>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Icons & Logo Section */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Icons & Logo
          </h2>
          <div className="space-y-4">
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Collection of icons and logos used throughout the application.
            </p>
            <IconSection />
          </div>
        </div>

        {/* Layout Components Section */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Layout Components
          </h2>
          <div className="space-y-4">
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Core layout components for building consistent page structures.
            </p>
            <LayoutSection />
          </div>
        </div>

        {/* Input Components Section */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Input Components
          </h2>
          <div className="space-y-4">
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Form controls and input elements for user interaction.
            </p>
            <InputSection />
          </div>
        </div>

        {/* Control Components Section */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Control Components
          </h2>
          <div className="space-y-4">
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Interactive controls and buttons for application functionality.
            </p>
            <ControlSection />
          </div>
        </div>

        {/* Visualization Components Section */}
        <div className="p-6 rounded-lg bg-background-light-primary dark:bg-background-dark-primary border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">
            Visualization Components
          </h2>
          <div className="space-y-4">
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Data structure and algorithm visualization components.
            </p>
            <VisualizationSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary; 