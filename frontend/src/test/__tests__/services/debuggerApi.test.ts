import { describe, test, expect } from 'vitest';
import debuggerService from '../../../services/debuggerService';

describe('Debugger Service Integration Tests', () => {
  // Simple Hello World code for testing
  const simpleCode = `print("Hello, World!")`;

  // Sample hello world function
  const helloWorldCode = `def say_hello(name):
    return f"Hello, {name}!"

# Test the function
message = say_hello("World")
print(message)`;

  // Session ID to store between tests
  let sessionId: string;

  test('should start a debug session with simple code', async () => {
    const response = await debuggerService.createSession({
      code: simpleCode,
      language: 'python'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    
    // Store session ID for subsequent tests
    sessionId = response.data.id as string;
    console.log(`Created debug session with ID: ${sessionId}`);
    
    // Basic validation of initial state
    expect(response.data).toHaveProperty('current_line');
    expect(response.data.current_line).toBe(1);
  });

  test('should step through simple code execution', async () => {
    // Make sure we have a session ID from the previous test
    expect(sessionId).toBeDefined();
    
    console.log('Attempting to step through with session ID:', sessionId);
    
    try {
      // Step through the code with a longer timeout
      const response = await debuggerService.stepForward(sessionId);
      
      console.log('Step response received:', response.status);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('current_line');
      expect(response.data.current_line).toBe(2); // Should move to line 2 after stepping
      
      // Check that we have state information
      expect(response.data).toHaveProperty('variables');
      
      console.log(`Stepped to line: ${response.data.current_line}`);
      console.log('Variables:', response.data.variables);
    } catch (error) {
      console.error('Error in step test:', error);
      throw error;
    }
  }, 10000); // Increase timeout for this test to 10 seconds

});