import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faDragon, faMagic, faBolt, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Search = () => {
    const [spells, setSpells] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        range: [],
        level: [],
        components: [],
        ritual: [],
        concentration: [],
        school: [],
        classes: [],
        source: []
    });

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3001/api/spells')
            .then(response => response.json())
            .then(data => {
                setSpells(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching spells:', error);
                setError('Failed to fetch spells.');
                setLoading(false);
            });
    }, []);

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

    const applyFilters = (spell) => {
        return Object.entries(filters).every(([key, values]) => {
            if (!values.length) return true;
            if (key === 'school' && spell.school) return values.includes(spell.school.name);
            if (key === 'classes' && spell.classes) return spell.classes.some(cls => values.includes(cls.name));
            if (Array.isArray(spell[key])) return spell[key].some(v => values.includes(v));
            return values.includes(spell[key]);
        });
    };

    useEffect(() => {
        const filteredResults = spells.filter(spell => applyFilters(spell) && spell.name.toLowerCase().includes(query.toLowerCase()));
        setResults(filteredResults);
    }, [spells, query, filters]);

    const validateSpellData = (spell) => {
        // Assume validateSpellData is implemented here as previously described
        return true; // placeholder for actual validation logic
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
        <div className="search-container">
            <div className="search-column">
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search spells..." />
                <div className="filters">
                    <div className="filter-group">
                        <h4>Range</h4>
                        {['90 feet', '60 feet', '30 feet'].map(range => (
                            <label key={range}>
                                <input
                                    type="checkbox"
                                    value={range}
                                    checked={filters.range.includes(range)}
                                    onChange={(e) => handleCheckboxChange(e, 'range')}
                                /> {range}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Level</h4>
                        {Array.from({ length: 10 }, (_, i) => i.toString()).map(level => (
                            <label key={level}>
                                <input
                                    type="checkbox"
                                    value={level}
                                    checked={filters.level.includes(level)}
                                    onChange={(e) => handleCheckboxChange(e, 'level')}
                                /> {level}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Components</h4>
                        {['V', 'S', 'M'].map(component => (
                            <label key={component}>
                                <input
                                    type="checkbox"
                                    value={component}
                                    checked={filters.components.includes(component)}
                                    onChange={(e) => handleCheckboxChange(e, 'components')}
                                /> {component}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Ritual</h4>
                        {['Yes', 'No'].map(ritual => (
                            <label key={ritual}>
                                <input
                                    type="checkbox"
                                    value={ritual}
                                    checked={filters.ritual.includes(ritual)}
                                    onChange={(e) => handleCheckboxChange(e, 'ritual')}
                                /> {ritual}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Concentration</h4>
                        {['Yes', 'No'].map(concentration => (
                            <label key={concentration}>
                                <input
                                    type="checkbox"
                                    value={concentration}
                                    checked={filters.concentration.includes(concentration)}
                                    onChange={(e) => handleCheckboxChange(e, 'concentration')}
                                /> {concentration}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>School</h4>
                        {['Evocation', 'Conjuration', 'Divination', 'Abjuration', 'Enchantment', 'Illusion', 'Necromancy', 'Transmutation'].map(school => (
                            <label key={school}>
                                <input
                                    type="checkbox"
                                    value={school}
                                    checked={filters.school.includes(school)}
                                    onChange={(e) => handleCheckboxChange(e, 'school')}
                                /> {school}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Classes</h4>
                        {['Wizard', 'Sorcerer', 'Paladin', 'Druid'].map(cls => (
                            <label key={cls}>
                                <input
                                    type="checkbox"
                                    value={cls}
                                    checked={filters.classes.includes(cls)}
                                    onChange={(e) => handleCheckboxChange(e, 'classes')}
                                /> {cls}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Source</h4>
                        {['PHB', 'OGA Creations', 'CRB Productions'].map(source => (
                            <label key={source}>
                                <input
                                    type="checkbox"
                                    value={source}
                                    checked={filters.source.includes(source)}
                                    onChange={(e) => handleCheckboxChange(e, 'source')}
                                /> {source}
                            </label>
                        ))}
                    </div>                    
                </div>
                <ul className="results">
                    {results.map(spell => (
                        <li key={spell.index} onClick={() => setSelectedSpell(spell)}>{spell.name}</li>
                    ))}
                </ul>
            </div>
            {selectedSpell && (
                <div className="spell-card">
    <div className="spell-header">
        <h2 className="spell-name">{selectedSpell.name}</h2>
        <p className="spell-level-school">Level {selectedSpell.level} {selectedSpell.school.name}</p>
    </div>
    <div className="spell-details-grid">
        <p className="spell-casting"><strong>Casting Time:</strong> {selectedSpell.casting_time}</p>
        <p className="spell-range"><strong>Range:</strong> {selectedSpell.range}</p>
        <p className="spell-components"><strong>Components:</strong> {selectedSpell.components.join(", ")}{selectedSpell.material ? ` (${selectedSpell.material})` : ''}</p>
        <p className="spell-duration"><strong>Duration:</strong> {selectedSpell.duration}{selectedSpell.concentration ? " (Concentration)" : ""}</p>
        <p className="spell-ritual"><strong>Ritual:</strong> {selectedSpell.ritual ? "Yes" : "No"}</p>
    <p className="spell-classes"><strong>Classes:</strong> {selectedSpell.classes.map(cls => cls.name).join(", ")}</p>
    <p className="spell-subclasses"><strong>Subclasses:</strong> {selectedSpell.subclasses.map(subclass => subclass.name).join(", ")}</p>
    <p className="spell-source"><strong>Source:</strong> {selectedSpell.source}</p>        
    {selectedSpell.damage &&
        <div className="spell-damage">
            <p><strong>Damage Type:</strong> {selectedSpell.damage.damage_type.name}</p>
            <p><strong>Damage at Slot Level:</strong></p>
            <ul>
                {Object.entries(selectedSpell.damage.damage_at_slot_level).map(([level, damage]) => (
                    <li key={level}>Level {level}: {damage}</li>
                ))}
            </ul>
        </div>
    }    
    </div>
    <p className="spell-description"><strong>Description:</strong> {selectedSpell.desc.join(" ")}</p>
</div>



            )}
        </div>
        </div>   
    );
};

export default Search;
