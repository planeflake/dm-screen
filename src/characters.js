import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS for this component

function Characters() {
    const [data, setData] = useState({
        campaigns: [],
        players: [],
        backgrounds: [],
        classes: []
    });
    const [selected, setSelected] = useState({
        campaigns: '',
        players: '',
        backgrounds: '',
        classes: '',
        lastSelectedType: '' // This will store the type of the last selection
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectConfigs = [
        { name: 'Campaign', plural: 'campaigns' },
        { name: 'Player', plural: 'players' },
        { name: 'Background', plural: 'backgrounds' },
        { name: 'Class', plural: 'classes' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    selectConfigs.map(config =>
                        fetch(`http://localhost:3001/api/${config.plural}`)
                            .then(res => {
                                if (!res.ok) throw new Error(`Failed to fetch ${config.plural}`);
                                return res.json();
                            })
                    )
                );
                const newData = {};
                responses.forEach((response, index) => {
                    newData[selectConfigs[index].plural] = response;
                });
                setData(newData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (type) => (e) => {
        console.log(`Previous State: `, selected);
        console.log(`Changing ${type} to: ${e.target.value}`);
        setSelected(prev => ({
            ...prev,
            [type]: e.target.value,
            lastSelectedType: type // Update the lastSelectedType to the current type
        }));
    };

    const renderSelects = () => {
        return selectConfigs.map(config => (
            <div key={config.name}>
                <h1>Select a {config.name}</h1>
                <select value={selected[config.plural.slice(0, -1)]} onChange={handleChange(config.plural)}>
                    <option value="">Select a {config.name.toLowerCase()}</option>
                    {Array.isArray(data[config.plural]) ? data[config.plural].map((item, index) => (
                        <option key={item.id || index} value={item.id}>{item.name}</option>
                    )) : <option key="loading" disabled>Loading or Error...</option>}
                </select>
            </div>
        ));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const contentConfigs = {
      backgrounds: {
          fields: [
              { key: 'name', label: 'Name' },
              { key: 'desc', label: 'Description' },
              { key: 'skill_proficiencies', label: 'Skill Proficiencies' },
              { key: 'tool_proficiencies', label: 'Tool Proficiencies', render: (value) => value || 'None' },
              { key: 'languages', label: 'Languages', render: (value) => value || 'None' },
              { key: 'equipment', label: 'Equipment' },
              { key: 'feature', label: 'Feature' },
              { key: 'feature_desc', label: 'Feature Description', render: (value) => value || 'No description provided.' },
              { key: 'suggested_characteristics', label: 'Suggested Characteristics', render: (value) => <pre>{value}</pre> },
              { key: 'document__title', label: 'Document Title' },
              { key: 'document__url', label: 'Document URL', render: (value) => <a href={value} target="_blank" rel="noopener noreferrer">Link to Document</a> }
          ],
          cssClass: 'background-style'
      },
      classes: {
          fields: [
              { key: 'name', label: 'Class Name' },
              { key: 'hit_die', label: 'Hit Die' },
              {
                  key: 'proficiency_choices',
                  label: 'Proficiency Choices',
                  render: (choices) => choices.map((choice, index) => (
                      <div key={index}>
                          <strong>{choice.desc}</strong> (Choose {choice.choose}):
                          <ul>
                              {choice.from.options.map((option, idx) => (
                                  <li key={idx}>
                                      {option.item.name}
                                      {option.item.url && <a href={option.item.url} target="_blank" rel="noopener noreferrer">Link</a>}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))
              },
              {
                  key: 'proficiencies',
                  label: 'Proficiencies',
                  render: (profs) => (
                      <ul>
                          {profs.map((prof, idx) => (
                              <li key={idx}>
                                  {prof.name}
                                  {prof.url && <a href={prof.url} target="_blank" rel="noopener noreferrer">Link</a>}
                              </li>
                          ))}
                      </ul>
                  )
              },
              {
                  key: 'saving_throws',
                  label: 'Saving Throws',
                  render: (throws) => (
                      <ul>
                          {throws.map((t, idx) => (
                              <li key={idx}>
                                  {t.name}
                                  {t.url && <a href={t.url} target="_blank" rel="noopener noreferrer">Link</a>}
                              </li>
                          ))}
                      </ul>
                  )
              },
              {
                  key: 'starting_equipment',
                  label: 'Starting Equipment',
                  render: (equipments) => (
                      <ul>
                          {equipments.map((equipment, idx) => (
                              <li key={idx}>
                                  {equipment.equipment.name} x {equipment.quantity}
                                  {equipment.equipment.url && <a href={equipment.equipment.url} target="_blank" rel="noopener noreferrer">Link</a>}
                              </li>
                          ))}
                      </ul>
                  )
              },
              {
                  key: 'starting_equipment_options',
                  label: 'Starting Equipment Options',
                  render: (options) => options.map((option, index) => (
                      <div key={index}>
                          {option.desc}
                          <ul>
                              {option.from.options.map((opt, idx) => (
                                  <li key={idx}>
                                      {opt.of ? `${opt.of.name} x ${opt.count}` : opt.choice.desc}
                                      {opt.of && opt.of.url && <a href={opt.of.url} target="_blank" rel="noopener noreferrer">Link</a>}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))
              },
              { key: 'class_levels', label: 'Class Levels URL', render: value => <a href={value} target="_blank" rel="noopener noreferrer">Class Levels</a> },
              {
                  key: 'multi_classing',
                  label: 'Multi-Classing Prerequisites',
                  render: (multiClassing) => (
                      <ul>
                          {multiClassing.prerequisites.map((prereq, idx) => (
                              <li key={idx}>
                                  {prereq.ability_score.name} minimum score: {prereq.minimum_score}
                              </li>
                          ))}
                          {multiClassing.proficiencies.map((prof, idx) => (
                              <li key={idx}>
                                  {prof.name}
                                  {prof.url && <a href={prof.url} target="_blank" rel="noopener noreferrer">Link</a>}
                              </li>
                          ))}
                      </ul>
                  )
              },
              {
                  key: 'subclasses',
                  label: 'Subclasses',
                  render: (subclasses) => (
                      <ul>
                          {subclasses.map((subclass, idx) => (
                              <li key={idx}>
                                  {subclass.name}
                                  {subclass.url && <a href={subclass.url} target="_blank" rel="noopener noreferrer">Link</a>}
                              </li>
                          ))}
                      </ul>
                  )
              },
              {
                  key: 'url', label: 'More Information', render: value =>
                      <a href={value} target="_blank" rel="noopener noreferrer">Details</a>
              }
          ],
          cssClass: 'class-style' // A CSS class for custom styling of this section
      }
  }
  return (
    <div className="characters-container">
        <div className="dropdown-column">
            {renderSelects()}
        </div>
        {/* Render ThirdColumnDisplay based on the last selected type */}
        <div className="information-column">
            {selected.lastSelectedType && (
                <ThirdColumnDisplay
                    key={selected[selected.lastSelectedType]}
                    type={selected.lastSelectedType}
                    choice={selected[selected.lastSelectedType]}
                />
            )}
        </div>
    </div>
);

function ThirdColumnDisplay({ type, choice }) {
    const [content, setContent] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/api/${type}/${choice}`)
            .then(response => response.json())
            .then(data => setContent(data))
            .catch(error => console.error(`Fetching error for ${type}:`, error));
    }, [type, choice]);

    if (!content) return <div>Loading...</div>;

    const config = contentConfigs[type] || { fields: [], cssClass: '' };
    return (
        <div className={`third-column ${config.cssClass}`}>
            {config.fields.map(field => {
                const value = content[field.key];
                if (value === undefined) return null; // Handling undefined data gracefully
                return (
                    <div key={field.key} className="content-block">
                        <strong>{field.label}:</strong> {field.render ? field.render(value) : value}
                    </div>
                );
            })}
        </div>
    );
}
}

export default Characters;