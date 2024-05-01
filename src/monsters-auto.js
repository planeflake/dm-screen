import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faDragon, faMagic, faBolt, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFistRaised, faRunning, faHeart, faBrain, faEye, faSmile } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Collapsible from 'react-collapsible';

function MonstersAuto() {
    const [monsters, setMonsters] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [query, setQuery] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState([]);
    const [thirdColumnContent, setThirdColumnContent] = useState('');
    const [selectedSpellDetails, setSelectedSpellDetails] = useState(null);
    const [filters, setFilters] = useState({
        type: [],
        size: [],
        alignment: [],
        challengeRating: [],
        speed: [],
        type: [],
        source: [],
        xp: []
    });
    const [filterOptions, setFilterOptions] = useState({
        type: new Set(),
        size: new Set(),
        alignment: new Set(),
        challengeRating: new Set(),
        speed: new Set(),
        race: new Set(),
        source: new Set(),
        xp: new Set()
    });

    const handleSpellClick = (spell) => {
        console.log("Fetching: !" & spell & "!")
        fetch(`http://localhost:3001/api/spells/${spell}`)
            .then(response => response.json())
            .then(data => {
                setThirdColumnContent(data);
                console.log(data)
            });
    };

    function formatAndCapitalize(str) {
        return str
            .toLowerCase()
            .replace(/-/g, ' ') // Replace all dashes with spaces
            .replace(/_/g, ' ') // Replace all dashes with spaces            
            .replace(/\b\w/g, s => s.toUpperCase()); // Capitalize the first letter of each word
    }

    function convertToTitleCase(str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/monsters')
            .then(response => response.json())
            .then(data => {
                setMonsters(data);
                setFilteredMonsters(data);
                initializeFilterOptions(data);
            });
    }, []);

    const initializeFilterOptions = (data) => {
        const options = {
            type: new Set(),
            size: new Set(),
            alignment: new Set(),
            challengeRating: new Set(),
            speed: new Set(),
            type: new Set(),
            source: new Set(),
            xp: new Set()
        };
        data.forEach(monster => {
            options.type.add(monster.type);
            options.size.add(monster.size);
            options.alignment.add(formatAndCapitalize(monster.alignment));
            const crArray = monster.challengeRating.split(' (');
            if (crArray.length > 0) {
                options.challengeRating.add(crArray[0]);
            }
            options.xp.add(crArray[1].slice(0, -1));
            options.speed.add(monster.speed);
            options.type.add(monster.type);
            options.source.add(formatAndCapitalize(monster.source));
        });
        setFilterOptions(options);
    };

    const handleCheckboxChange = (event, category) => {
        const { checked, value } = event.target;
        setFilters(prev => {
            const currentValues = prev[category] || [];
            if (checked) {
                return { ...prev, [category]: [...currentValues, value] };
            } else {
                return { ...prev, [category]: currentValues.filter(v => v !== value) };
            }
        });
    };

    const applyFilters = (monster) => {
        return Object.entries(filters).every(([key, values]) => {
            if (!values.length) return true;
            return values.includes(monster[key]);
        });
    };

    useEffect(() => {
        fetch('http://localhost:3001/api/monsters')
            .then(response => response.json())
            .then(data => setMonsters(data));
    }, []);

    const abilityIcons = {
        STR: { icon: "fas fa-fist-raised", color: "red" },
        DEX: { icon: "fas fa-running", color: "green" },
        CON: { icon: "fas fa-heart", color: "blue" },
        INT: { icon: "fas fa-brain", color: "purple" },
        WIS: { icon: "fas fa-eye", color: "yellow" },
        CHA: { icon: "fas fa-smile", color: "orange" }
    };

    const handleMonsterClick = (monster) => {
        console.log(monster)
        setSelectedMonster(monster);
        console.log("Selected Monster is :" & monster)
        console.log("Image file is :" & monster & ".jpg");
    };


    useEffect(() => {
        const filteredData = monsters.filter(monster =>
            monster.name.toLowerCase().includes(query.toLowerCase()) && applyFilters(monster)
        );
        setFilteredMonsters(filteredData);
    }, [monsters, query, filters]);

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
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search monsters..."
                className="search-input"
            />
            <div className="search-container">
                <div className="filters">
                    {Object.keys(filterOptions).map(filterCategory => (
                        <div key={filterCategory} className="filter-group">
                            <h4>{filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}</h4>
                            {[...filterOptions[filterCategory]].map(option => (
                                <label key={option}>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={filters[filterCategory].includes(option)}
                                        onChange={(e) => handleCheckboxChange(e, filterCategory)}
                                    /> {convertToTitleCase(option)}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="monster-list">
                    {filteredMonsters.map(monster => (
                        <div key={monster.id} className="monster-card" onClick={() => handleMonsterClick(monster)}>
                            <h3>{monster.name}</h3>
                        </div>
                    ))}
                </div>
                {selectedMonster && (
                    <div className="middle-column card">
                        <div className="monster-details">

                        <h2><strong>{selectedMonster.name}</strong> </h2>
                        <p><strong>Size:</strong> {selectedMonster.size}</p>
                        <p><strong>Type:</strong> {selectedMonster.type}</p>
                        <p><strong>Alignment:</strong> {selectedMonster.alignment}</p>
                        <p><strong>Armor Class:</strong> {selectedMonster.armorClass}</p>
                        <p><strong>Hit Points:</strong> ({selectedMonster.hitPoints.average}) {selectedMonster.hitPoints.roll}</p>
                        <p><strong>Speed:</strong> {selectedMonster.speed}</p>
                        <div className="stats grid-container">
                            {Object.entries(selectedMonster.abilityScores).map(([key, value]) => {
                                const { icon, color } = abilityIcons[key];
                                return (
                                    <div className="stat" key={key} style={{ color: color }}>
                                        <i className={icon}></i>  {value.score} ({value.mod >= 0 ? `+${value.mod}` : value.mod})
                                    </div>
                                );
                            })}
                        </div>
                        <p><strong>Challenge Rating:</strong> {selectedMonster.challengeRating}</p>
                        <p><strong>Proficiency Bonus:</strong> {selectedMonster.proficiencyBonus}</p>
                        <p><strong>Experience Points:</strong> {selectedMonster.experiencePoints}</p>
                        <p><strong>Languages:</strong> {selectedMonster.languages.join(', ')}</p>
                        <p><strong>Senses:</strong> {selectedMonster.senses}</p>
                        <div>
                            <Collapsible trigger="Proficiencies">
                                <p>Test</p>
                            </Collapsible>
                        </div>
                        <div>
                            <Collapsible trigger="Spells">
                                {selectedMonster.spells.map(spell => (
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
                        <div className="container">
                            {console.log(selectedMonster.name)}
                        <img src={`/images/${selectedMonster.name.replace(' ', '_')}.jpg`} alt={selectedMonster.name} className="image" />
                        </div>
                        <div className="spell-details-footer">
                            {thirdColumnContent && (
                                <div>
                                    <h3>{thirdColumnContent.name}</h3>
                                    <p><strong>Level:</strong> {thirdColumnContent.level}</p>
                                    <p><strong>Casting Time:</strong> {thirdColumnContent.casting_time}</p>
                                    <p><strong>Range:</strong> {thirdColumnContent.range}</p>
                                    <p><strong>Duration:</strong> {thirdColumnContent.duration}</p>
                                    <p><strong>Description:</strong> {thirdColumnContent.desc}</p>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default MonstersAuto;
