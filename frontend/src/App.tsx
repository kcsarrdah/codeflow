import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Debugger from './pages/Debugger';
import DataStructures from './pages/DataStructures';
import DataStructureDetail from './pages/DataStructureDetail';
import Problems from './pages/Problems';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResizeProvider } from './context/ResizeContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/debugger" element={
              <ProtectedRoute>
                <ResizeProvider>
                  <Debugger />
                </ResizeProvider>
              </ProtectedRoute>
            } />
            <Route path="/data-structures" element={
              <ProtectedRoute>
                <DataStructures />
              </ProtectedRoute>
            } />
            <Route path="/data-structures/:id" element={
              <ProtectedRoute>
                <DataStructureDetail />
              </ProtectedRoute>
            } />
            <Route path="/algorithms/:id" element={
              <ProtectedRoute>
                <DataStructureDetail />
              </ProtectedRoute>
            } />
            <Route path="/problems" element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;