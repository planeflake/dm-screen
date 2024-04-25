import { Link } from 'react-router-dom';
import './App.css'; // Import the CSS for this component
import React, { useState, useEffect } from 'react'; // Import the missing useEffect hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faDragon, faMagic, faBolt, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';


  function Monsters() {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/api/monsters')
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the data to the console
          setMonsters(data);
        });      
    }, []);

    return (
      <div className="monsters">
        {monsters.map(monster => (
          <div key={monster.id} className="monster">
            <h2>{monster.name}</h2>
            <p>Type: {monster.type}</p>
            <p>Alignment: {monster.alignment}</p>
            <p>Armor Class: {monster.armorClass}</p>
            <p>Challenge Rating: {monster.challengeRating}</p>
            <p>Hit Points: {monster.hitPoints.average} ({monster.hitPoints.roll})</p>
            <p>Speed: {monster.speed}</p>
            <p>Senses: {monster.senses}</p>
            <p>Source: {monster.source}</p>
            <p>Languages: {monster.languages.join(', ')}</p>
            <p>Skills: {monster.skills.join(', ')}</p>
            <p>Saving Throws: {monster.savingThrows.join(', ')}</p>
            <h3>Abilities</h3>
            {monster.abilities.map((ability, index) => (
              <div key={index}>
                <h4>{ability.name}</h4>
                <p>{ability.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
}

export default Monsters;