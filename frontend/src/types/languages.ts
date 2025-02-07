export type Language = 'python' | 'java' | 'cpp' | 'go' | 'kotlin' | 'javascript' | 'typescript';

export interface LanguageConfig {
  name: string;
  extension: string;
  monacoIdentifier: string;
}

export const languageConfigs: Record<Language, LanguageConfig> = {
  python: {
    name: 'Python',
    extension: '.py',
    monacoIdentifier: 'python'
  },
  java: {
    name: 'Java',
    extension: '.java',
    monacoIdentifier: 'java'
  },
  cpp: {
    name: 'C++',
    extension: '.cpp',
    monacoIdentifier: 'cpp'
  },
  go: {
    name: 'Go',
    extension: '.go',
    monacoIdentifier: 'go'
  },
  kotlin: {
    name: 'Kotlin',
    extension: '.kt',
    monacoIdentifier: 'kotlin'
  },
  javascript: {
    name: 'JavaScript',
    extension: '.js',
    monacoIdentifier: 'javascript'
  },
  typescript: {
    name: 'TypeScript',
    extension: '.ts',
    monacoIdentifier: 'typescript'
  }
};