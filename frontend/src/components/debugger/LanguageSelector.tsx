import React from 'react';
import { Language, languageConfigs } from '../../types/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400"
    >
      {Object.entries(languageConfigs).map(([key, config]) => (
        <option key={key} value={key}>
          {config.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;