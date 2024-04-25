import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul className="nav-list">
            <li><i className="fas fa-dice-d20"></i> Campaigns</li>
            <li><i className="fas fa-users"></i> Characters</li>
            <li><i className="fas fa-dragon"></i> Monsters</li>
            <li><i className="fas fa-magic"></i> Spells</li>
            <li><i className="fas fa-skull"></i> Effects</li>
            <li><i className="fas fa-cogs"></i> Settings</li>
          </ul>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;