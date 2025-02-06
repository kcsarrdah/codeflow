import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Debugger from './pages/Debugger';
import DataStructures from './pages/DataStructures';

function App() {
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
            <Route path="/" element={<Debugger />} />
            <Route path="/data-structures" element={<DataStructures />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;