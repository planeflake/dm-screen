const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.options('*', cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

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

// Spell data endpoints
app.get('/api/spells', (req, res) => {
    const spellsData = fs.readFileSync(path.join(__dirname, 'spells.json'));
    const spells = JSON.parse(spellsData);
    res.json(spells);
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
    // Logic to save the new character to the database
    // and send the response
    const charactersData = fs.readFileSync(path.join(__dirname, 'characters.json'));
    const characters = JSON.parse(charactersData);
    characters.push(character);
    fs.writeFileSync(path.join(__dirname, 'characters.json'), JSON.stringify(characters, null, 2));
    res.json(character);
});

app.get('/api/campaigns', (req, res) => {
    const campaignsData = fs.readFileSync(path.join(__dirname, 'campaigns.json'));
    const campaigns = JSON.parse(campaignsData);
    res.json(campaigns);
});

app.post('/api/campaigns', (req, res) => {
    const campaign = req.body;
    // Logic to save the new campaign to the database
    // and send the response
    const campaignsData = fs.readFileSync(path.join(__dirname, 'campaigns.json'));
    const campaigns = JSON.parse(campaignsData);
    campaigns.push(campaign);
    fs.writeFileSync(path.join(__dirname, 'campaigns.json'), JSON.stringify(campaigns, null, 2));
    res.json(campaign);
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});