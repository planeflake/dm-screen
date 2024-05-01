import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faDragon, faMagic, faBolt, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFistRaised, faRunning, faHeart, faBrain, faEye, faSmile } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';

function Monsters() {
  const [monsters, setMonsters] = useState([]);
  const [spells, setSpells] = useState([]);
  const [thirdColumnContent, setThirdColumnContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/monsters')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to the console
        setMonsters(data);
      });
  }, []);

  const abilityIcons = {
    STR: { icon: "fa-fist-raised", color: "red" },  
    DEX: { icon: "fa-running", color: "green" },    
    CON: { icon: "fa-heart", color: "blue" },       
    INT: { icon: "fa-brain", color: "purple" },     
    WIS: { icon: "fa-eye", color: "yellow" },       
    CHA: { icon: "fa-smile", color: "orange" }      
};

  const handleSpellClick = (spell) => {
    // Fetch spell data from the API
    fetch(`http://localhost:3001/api/spells/${spell}`)
      .then(response => response.json())
      .then(data => {
        setThirdColumnContent(data);
        console.log(data)
      });
  };

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
    <Link to="/spellsauto">
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
    <div className="container flex-container">
      {monsters.map(monster => (
        <div key={monster.id}> {/* Move the key prop here */}
          <h1 align="left" className="monster-title">{monster.name}</h1>
          <div className="monster-container flex-container card">
            <img src={`/images/${monster.name.replace(' ', '_')}.jpg`} alt={monster.name} className="acolyte-image" />
            <div className="middle-column card">
              <p><strong>Size:</strong> {monster.size}</p>
              <p><strong>Type:</strong> {monster.type}</p>
              <p><strong>Alignment:</strong> {monster.alignment}</p>
              <p><strong>Armor Class:</strong> {monster.armorclassName}</p>
              <p><strong>Hit Points:</strong> ({monster.hitPoints.average}) {monster.hitPoints.roll}</p>
              <p><strong>Speed:</strong> {monster.speed}</p>
              <div className="stats grid-container">
                <div className="stat"><i className="fas fa-fist-raised"></i> {monster.abilityScores.STR.score}</div>
                <div className="stat"><i className="fas fa-running"></i> {monster.abilityScores.DEX.score}</div>
                <div className="stat"><i className="fas fa-heart"></i> {monster.abilityScores.CON.score}</div>
                <div className="stat"><i className="fas fa-brain"></i> {monster.abilityScores.INT.score}</div>
                <div className="stat"><i className="fas fa-eye"></i> {monster.abilityScores.WIS.score}</div>
                <div className="stat"><i className="fas fa-smile"></i> {monster.abilityScores.CHA.score}</div>
              </div>
              <p><strong>Challenge Rating:</strong> {monster.challengeRating}</p>
              <p><strong>Proficiency Bonus:</strong> {monster.proficiencyBonus}</p>
              <p><strong>Experience Points:</strong> {monster.experiencePoints}</p>
              <p><strong>Languages:</strong> {monster.languages}</p>
              <p><strong>Senses:</strong> {monster.senses}</p>
              <div>
                <Collapsible trigger="Proficiencies">
                  <p>Test</p>
                </Collapsible>
              </div>
              <div>
                <Collapsible trigger="Spells">
                  {monster.spells.map(spell => (
                    <button key={spell} onClick={() => handleSpellClick(spell)}>
                      {spell.replace(/ /g, '-')}
                    </button>
                  ))}
                </Collapsible>
              </div>
              <div>
                <Collapsible trigger="Abilities">
                  <p>Test3</p>
                </Collapsible>
              </div>
            </div>
            <div className="third-column card">
              {thirdColumnContent && (
                <div>
                  {thirdColumnContent && thirdColumnContent.name && (
                    <h1 align="center">{thirdColumnContent.name}</h1>
                  )}                  
                  <p><strong>Range:</strong> {thirdColumnContent.range}</p>
                  <p><strong>Material:</strong> {thirdColumnContent.material}</p>
                  <p><strong>Ritual:</strong> {thirdColumnContent.ritual ? 'Yes' : 'No'}</p>
                  <p><strong>Duration:</strong> {thirdColumnContent.duration}</p>
                  <p><strong>Concentration:</strong> {thirdColumnContent.concentration ? 'Yes' : 'No'}</p>
                  <p><strong>Casting Time:</strong> {thirdColumnContent.casting_time}</p>
                  <p><strong>Level:</strong> {thirdColumnContent.level}</p>
                  <p><strong>Attack Type:</strong>{thirdColumnContent.attack_type}</p>
                  <p><strong>Damage Type:</strong> {thirdColumnContent.damage && thirdColumnContent.damage.damage_type && thirdColumnContent.damage.damage_type.name}</p>
                  <p>
                    {thirdColumnContent && thirdColumnContent.damage && thirdColumnContent.damage.damage_at_slot_level && (
                      <table>
                        <thead>
                          <tr>
                            <th strong>Level</th>
                            <th strong>Damage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(thirdColumnContent.damage.damage_at_slot_level).map(([level, damage], index) => (
                            <tr key={index}>
                              <td><i className="fas fa-hat-wizard"></i> {level}</td>
                              <td><i className="fas fa-dice-d20"></i> {damage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </p>
                  <p><strong>School:</strong> {thirdColumnContent.school && thirdColumnContent.school.name}</p>
                  <p><strong>Classes:</strong> {thirdColumnContent.classes && thirdColumnContent.classes.map(c => c.name).join(', ')}</p>
                  <p><strong>Subclasses:</strong> {thirdColumnContent.subclasses && thirdColumnContent.subclasses.map(sc => sc.name).join(', ')}</p>
                  <p className='desc'><strong>Description:</strong>{thirdColumnContent.desc && thirdColumnContent.desc.join(' ')}</p>                  
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>    
  );
}

export default Monsters;