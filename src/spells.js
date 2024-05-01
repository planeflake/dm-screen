import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming your styles are saved in Search.css


const Search = () => {
    const [spells, setSpells] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);
        const [filters, setFilters] = useState({
        range: [],
        level: [],
        components: [],
        ritual: [],
        concentration: [],
        school: []
    });

    useEffect(() => {
        fetch('http://localhost:3001/api/spells')
            .then(response => response.json())
            .then(data => setSpells(data))
            .catch(error => console.error('Error fetching spells:', error));

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
        const filterKeys = Object.keys(filters);
        return filterKeys.every(key => {
            if (!filters[key].length) return true;
            if (key === 'school') return filters[key].includes(spell.school?.name);
            if (Array.isArray(spell[key])) return spell[key].some(v => filters[key].includes(v));
            return filters[key].includes(spell[key]);
        });
    };

    class ErrorBoundary extends React.Component {
        constructor(props) {
          super(props);
          this.state = { hasError: false };
        }
      
        static getDerivedStateFromError(error) {
          // Update state so the next render will show the fallback UI.
          return { hasError: true };
        }
      
        componentDidCatch(error, errorInfo) {
          // You can also log the error to an error reporting service
          console.error("Error caught in ErrorBoundary: ", error, errorInfo);
        }
      
        render() {
          if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
          }
      
          return this.props.children; 
        }
      }
      

    useEffect(() => {
        const filteredResults = spells.filter(spell => applyFilters(spell) && spell.name.toLowerCase().includes(query.toLowerCase()));
        setResults(filteredResults);
    }, [spells, query, filters]);

    useEffect(() => {
      if (selectedSpell) {
          console.log(selectedSpell);
      }
  }, [selectedSpell]);

    const handleSpellClick = (spell) => {
        fetch(`http://localhost:3001/api/spells/${spell.index}`)
            .then(response => response.json())
            .then(data => setSelectedSpell(data))
            .catch(error => console.error('Error fetching spell details:', error));
         
    };

    return (
        <div className="search-container">
            <div className="search-column">
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search spells..." />
                <div className="filters"></div>
                    <div className="filter-group">
                        <h4>Range</h4>
                        {['90 feet', '60 feet', '30 feet'].map(range => (
                            <label key={range}>
                                <input
                                    type="checkbox"
                                    value={range}
                                    onChange={(e) => handleCheckboxChange(e, 'range')}
                                /> {range}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Level</h4>
                        {Array.from({ length: 10 }, (_, i) => i).map(level => (
                            <label key={level}>
                                <input
                                    type="checkbox"
                                    value={level.toString()}
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
                                    onChange={(e) => handleCheckboxChange(e, 'components')}
                                /> {component}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Ritual</h4>
                        {['true', 'false'].map(ritual => (
                            <label key={ritual}>
                                <input
                                    type="checkbox"
                                    value={ritual}
                                    onChange={(e) => handleCheckboxChange(e, 'ritual')}
                                /> {ritual === 'true' ? 'Yes' : 'No'}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Concentration</h4>
                        {['true', 'false'].map(concentration => (
                            <label key={concentration}>
                                <input
                                    type="checkbox"
                                    value={concentration}
                                    onChange={(e) => handleCheckboxChange(e, 'concentration')}
                                /> {concentration === 'true' ? 'Yes' : 'No'}
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
                                    onChange={(e) => handleCheckboxChange(e, 'school')}
                                /> {school}
                            </label>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Classes</h4>
                        {['Wizard', 'Sorcere', 'Paladin', 'Druid'].map(school => (
                            <label key={school}>
                                <input
                                    type="checkbox"
                                    value={school}
                                    onChange={(e) => handleCheckboxChange(e, 'school')}
                                /> {school}
                            </label>
                        ))}
                    </div>                    
                <ul className="results">
                {results.map(spell => (
                    <li key={spell.index} onClick={() => handleSpellClick(spell)}>{spell.name}</li>
                ))}
            </ul>
        </div>
        <ErrorBoundary>
        <div className="detail-column">
            {selectedSpell && (
              <div className="spell-details">
    <h2>{selectedSpell.name}</h2>
    <p><strong>Index:</strong> {selectedSpell.index}</p>
    <p><strong>Description:</strong> {selectedSpell.desc}</p>
    <p><strong>Range:</strong> {selectedSpell.range}</p>
    <p><strong>Type:</strong> {selectedSpell.attack_type}</p>
    <p><strong>Cast Time:</strong> {selectedSpell.casting_time}</p>
    <p><strong>Concentration:</strong> {selectedSpell.concentration ? "Yes" : "No"}</p>
    <p><strong>Duration:</strong> {selectedSpell.duration}</p>
    <p><strong>Components:</strong> {selectedSpell.components.join(", ")}</p>
    {selectedSpell.material && <p><strong>Material:</strong> {selectedSpell.material}</p>}
    <p><strong>Level:</strong> {selectedSpell.level}</p>
    <p><strong>Damage Type:</strong> {selectedSpell.damage.damage_type.name}</p>
    <p><strong>Damage at Slot Level:</strong></p>
    <ul>
        {Object.entries(selectedSpell.damage.damage_at_slot_level).map(([level, damage]) => (
            <li key={level}>Level {level}: {damage}</li>
        ))}
    </ul>
    <p><strong>School:</strong> {selectedSpell.school.name}</p>
    <p><strong>Ritual:</strong> {selectedSpell.ritual ? "Yes" : "No"}</p>
    <p><strong>Classes:</strong> {selectedSpell.classes.map(cls => cls.name).join(", ")}</p>
    <p><strong>Subclasses:</strong> {selectedSpell.subclasses.map(subclass => subclass.name).join(", ")}</p>
</div>

            )}
        </div>
        </ErrorBoundary>        
    </div>

);
};

export default Search;