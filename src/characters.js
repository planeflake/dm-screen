import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faDragon, faMagic, faBolt, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './App.css'; // Import the CSS for this component

function Characters() {
  return (
    <div className="home-page">
      <div className="button-container">
      <Link to="/campaigns">
        <button className="icon-large">
          <FontAwesomeIcon icon={faCoffee} /> Campaigns
        </button>
      </Link>
      <Link to="/characters">
        <button className="icon-large">
          <FontAwesomeIcon icon={faUsers} /> Characters
        </button>
      </Link>
      <Link to="/monsters">
        <button className="icon-large">
          <FontAwesomeIcon icon={faDragon} /> Monsters
        </button>
      </Link>
      <Link to="/spells">
        <button className="icon-large">
          <FontAwesomeIcon icon={faMagic} /> Spells
        </button>
      </Link>
      <Link to="/effects">
        <button className="icon-large">
          <FontAwesomeIcon icon={faBolt} /> Effects
        </button>
      </Link>
      <Link to="/settings">
        <button className="icon-large">
          <FontAwesomeIcon icon={faCog} /> Settings
        </button>
      </Link>
    </div>
    </div>
  );
}

export default Characters;