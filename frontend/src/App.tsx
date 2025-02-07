import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Debugger from './pages/Debugger';
import DataStructures from './pages/DataStructures';
import DataStructureDetail from './pages/DataStructureDetail';
import Problems from './pages/Problems';

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
            <Route path="/" element={<Landing />} />
            <Route path="/debugger" element={<Debugger />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/data-structures/:id" element={<DataStructureDetail />} />
            <Route path="/algorithms/:id" element={<DataStructureDetail />} />
            <Route path="/problems" element={<Problems />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App