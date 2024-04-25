import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import Campaigns from './campaigns';
import Characters from './characters';
import Effects from './effects';
import Monsters from './monsters';
import Settings from './settings';
import Spells from './spells';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Your navigation bar goes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/effects" element={<Effects />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/spells" element={<Spells />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;