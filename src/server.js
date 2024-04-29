const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const spells = require('./Spells.json'); 
const conditions = require('./conditions.json'); 

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.options('*', cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(express.json()); // Middleware to parse JSON bodies

// Load spells from the JSON file
function loadSpells() {
    const spellsData = fs.readFileSync(path.join(__dirname, 'spells.json'), 'utf8');
    return JSON.parse(spellsData);
}

// Monster data endpoints
app.get('/api/monsters', (req, res) => {
    const monstersData = fs.readFileSync(path.join(__dirname, 'monsters.json'));
    const monsters = JSON.parse(monstersData);
    res.json(monsters);
    console.log('!Success!');
   })

app.post('/api/monsters', (req, res) => {
    const monster = req.body;
    // Logic to save the new monster to the database
    // and send the response
    const monstersData = fs.readFileSync(path.join(__dirname, 'monsters.json'));
    const monsters = JSON.parse(monstersData);
    monsters.push(monster);
    fs.writeFileSync(path.join(__dirname, 'monsters.json'), JSON.stringify(monsters, null, 2));
    res.json(monster);
});

// GET endpoint to retrieve all spells
app.get('/api/spells', (req, res) => {
    const spells = loadSpells();
    res.send(spells);
    console.log('Spells Requested')
});

app.get('/api/spells/:name', (req, res) => {
    const spellName = req.params.name;
  const spell = spells.find(spell => spell.index.toLowerCase() === spellName.toLowerCase());
console.log(spell)
  if (!spell) {
    return res.status(404).send('Spell not found');
  }

  res.send(spell);
});

app.post('/api/spells', (req, res) => {
    const spell = req.body;
    // Logic to save the new spell to the database
    // and send the response
    const spellsData = fs.readFileSync(path.join(__dirname, 'spells.json'));
    const spells = JSON.parse(spellsData);
    spells.push(spell);
    fs.writeFileSync(path.join(__dirname, 'spells.json'), JSON.stringify(spells, null, 2));
    res.json(spell);
});

// Characters and Campaigns endpoints
app.get('/api/characters', (req, res) => {
    const charactersData = fs.readFileSync(path.join(__dirname, 'characters.json'));
    const characters = JSON.parse(charactersData);
    res.json(characters);
});

app.post('/api/characters', (req, res) => {
    const character = req.body;
    const charactersData = fs.readFileSync(path.join(__dirname, 'characters.json'));
    const characters = JSON.parse(charactersData);
    characters.push(character);
    fs.writeFileSync(path.join(__dirname, 'characters.json'), JSON.stringify(characters, null, 2));
    res.json(character);
});

app.get('/api/conditions', (req, res) => {
    const conditionsData = fs.readFileSync(path.join(__dirname, 'conditions.json'));
    const conditions = JSON.parse(conditionsData);
    res.json(conditions);
});

app.get('/api/campaigns', (req, res) => {
    const campaignsData = fs.readFileSync(path.join(__dirname, 'campaigns.json'));
    const campaigns = JSON.parse(campaignsData);
    res.json(campaigns);
});

app.post('/api/campaigns', (req, res) => {
    const campaign = req.body;
    const campaignsData = fs.readFileSync(path.join(__dirname, 'campaigns.json'));
    const campaigns = JSON.parse(campaignsData);
    campaigns.push(campaign);
    fs.writeFileSync(path.join(__dirname, 'campaigns.json'), JSON.stringify(campaigns, null, 2));
    res.json(campaign);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});