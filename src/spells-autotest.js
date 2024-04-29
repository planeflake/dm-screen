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
        school: [],
        classes: [] // Add classes filter
    });

    useEffect(() => {
        fetch('http://localhost:3001/api/spells')
            .then(response => response.json())
            .then(data => {
                setSpells(data);
                // Extract unique values for each filter category
                const filterValues = {
                    range: [...new Set(data.map(spell => spell.range))],
                    level: [...new Set(data.map(spell => spell.level))],
                    components: [...new Set(data.flatMap(spell => spell.components))],
                    ritual: [...new Set(data.map(spell => spell.ritual.toString()))],
                    concentration: [...new Set(data.map(spell => spell.concentration.toString()))],
                    school: [...new Set(data.map(spell => spell.school.name))],
                    classes: [...new Set(data.flatMap(spell => spell.classes.map(cls => cls.name)))] // Add classes filter
                };
                setFilters(filterValues);
            })
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
            if (key === 'classes') return spell.classes.some(cls => filters[key].includes(cls.name)); // Apply classes filter
            if (Array.isArray(spell[key])) return spell[key].some(v => filters[key].includes(v));
            return filters[key].includes(spell[key]);
        });
    };

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
                <div className="filters">
                    {Object.entries(filters).map(([category, values]) => (
                        <div className="filter-group" key={category}>
                            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            {values.map(value => (
                                <label key={value}>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        onChange={(e) => handleCheckboxChange(e, category)}
                                    /> {value}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <ul className="results">
                    {results.map(spell => (
                        <li key={spell.index} onClick={() => handleSpellClick(spell)}>{spell.name}</li>
                    ))}
                </ul>
            </div>
            <div className="detail-column">
                {selectedSpell && (
                    <div className="spell-details">
                        {/* Details of selected spell */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
