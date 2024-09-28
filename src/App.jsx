import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainSection from './MainSection';
import CountryDetail from './CountryDetail';
import Header from './Header';
import './App.css';

const App = () => {
  const [dark, setDark] = useState('light');

  const toggleDarkMode = () => {
    setDark(dark === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app_${dark}`}>
      <Router>
        <Header dark={dark} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path='/' element={<MainSection dark={dark} />} />
          <Route
            path='/country/:name'
            element={<CountryDetail dark={dark} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
