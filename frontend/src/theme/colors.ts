export const colors = {
  // Primary colors
  primary: {
    light: '#3B82F6', // Blue-500
    dark: '#60A5FA',  // Blue-400
  },
  
  // Background colors
  background: {
    light: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6', // Gray-100
      tertiary: '#E5E7EB',  // Gray-200
    },
    dark: {
      primary: '#1F2937',   // Gray-800
      secondary: '#111827', // Gray-900
      tertiary: '#374151',  // Gray-700
    },
  },
  
  // Text colors
  text: {
    light: {
      primary: '#111827',   // Gray-900
      secondary: '#4B5563', // Gray-600
      tertiary: '#6B7280',  // Gray-500
    },
    dark: {
      primary: '#F9FAFB',   // Gray-50
      secondary: '#E5E7EB', // Gray-200
      tertiary: '#D1D5DB',  // Gray-300
    },
  },
  
  // Accent colors
  accent: {
    success: {
      light: '#10B981', // Emerald-500
      dark: '#34D399',  // Emerald-400
    },
    error: {
      light: '#EF4444', // Red-500
      dark: '#F87171',  // Red-400
    },
    warning: {
      light: '#F59E0B', // Amber-500
      dark: '#FBBF24',  // Amber-400
    },
    info: {
      light: '#3B82F6', // Blue-500
      dark: '#60A5FA',  // Blue-400
    },
  },
  
  // Difficulty colors
  difficulty: {
    easy: {
      light: '#10B981', // Emerald-500
      dark: '#34D399',  // Emerald-400
      bg: {
        light: '#ECFDF5', // Emerald-50
        dark: '#064E3B',  // Emerald-900
      }
    },
    medium: {
      light: '#F59E0B', // Amber-500
      dark: '#FBBF24',  // Amber-400
      bg: {
        light: '#FFFBEB', // Amber-50
        dark: '#78350F',  // Amber-900
      }
    },
    hard: {
      light: '#EF4444', // Red-500
      dark: '#F87171',  // Red-400
      bg: {
        light: '#FEF2F2', // Red-50
        dark: '#7F1D1D',  // Red-900
      }
    },
  },
  
  // Border colors
  border: {
    light: '#E5E7EB', // Gray-200
    dark: '#374151',  // Gray-700
  },
  
  // Code editor specific colors
  code: {
    light: {
      background: '#FFFFFF',
      text: '#1F2937',
      selection: '#E5E7EB',
      lineNumber: '#6B7280',
    },
    dark: {
      background: '#1E1E1E',
      text: '#D1D5DB',
      selection: '#374151',
      lineNumber: '#6B7280',
    },
  },
} as const;

// Type for our color system
export type ColorSystem = typeof colors;

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}; 