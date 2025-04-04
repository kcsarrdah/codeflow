//debugger related endpoints
import api from './api';

export interface CreateSessionParams {
  code: string;
  language: string;
  testCase?: string;
}

export interface DebuggerResponse {
  id?: string;
  sessionId?: string;
  code?: string;
  current_line?: number;
  currentLine?: number;
  variables?: Array<{ name: string; value: any; type: string }>;
  output?: string | string[];
  error?: string | null;
  breakpoints?: number[];
  status?: string;
  visualizer_type?: string;
  visualization_hints?: any;
  algorithm_state?: {
    current_indices?: number[] | null;
    visited_nodes?: string[] | null;
    custom_state?: any | null;
  };
  created_at?: string;
  updated_at?: string;
}

const debuggerService = {
  // Create a new debug session with initial code
  createSession: (params: CreateSessionParams) => 
    api.post<DebuggerResponse>('/debug/start', { 
      code: params.code, 
      language: params.language, 
      test_case: params.testCase
    }),

  // Get a specific session by ID
  getSession: (sessionId: string) => 
    api.get<DebuggerResponse>(`/debug/state/${sessionId}`),
  
  // Execute code (run to completion)
  executeCode: (sessionId: string) => 
    api.post<DebuggerResponse>(`/debug/run/${sessionId}`),
  
  // Step through code execution
  stepForward: (sessionId: string) => 
    api.post<DebuggerResponse>(`/debug/step/${sessionId}`),
  
  // Reset debug session to initial state
  resetSession: (sessionId: string) => 
    api.post<DebuggerResponse>(`/debug/reset/${sessionId}`),
  
  // Set/toggle breakpoint at specific line
  toggleBreakpoint: (sessionId: string, line: number) => 
    api.post<DebuggerResponse>(`/debug/breakpoint/${sessionId}`, { line }),
  
  // Update test case for the session
  updateTestCase: (sessionId: string, testCase: string) => 
    api.put<DebuggerResponse>(`/debug/test-case/${sessionId}`, { test_case: testCase }),
    
  // Update code for the session (creates a new session)
  updateCode: (sessionId: string, code: string, language: string) =>
    api.put<DebuggerResponse>(`/debug/code/${sessionId}`, { code, language }),
};

export default debuggerService;