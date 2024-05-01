import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS for this component

function Characters() {
    const [players, setPlayers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);    
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [loadingCampaigns, setLoadingCampaigns] = useState(true);
    const [error, setError] = useState(null);

    // Fetching campaigns data from API
    useEffect(() => {
      fetch('http://localhost:3001/api/campaigns')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not OK');
              }
              return response.json();
          })
          .then(data => {
              setCampaigns(data.campaigns || []); // Assuming data.campaigns is the array
              setLoadingCampaigns(false); // Set loading to false once the data is loaded
          })
          .catch(error => {
              console.error('Fetch error:', error);
              setError(error.message);
              setLoadingCampaigns(false);
          });
    }, []);

    // Fetching players data from API
    useEffect(() => {
        fetch('http://localhost:3001/api/players')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then(data => {
                setPlayers(data.players || []); // Assuming data.players is the array
                setLoadingPlayers(false); // Set loading to false once the data is loaded
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError(error.message);
                setLoadingPlayers(false);
            });
    }, []);

    const handlePlayerChange = (e) => {
        setSelectedPlayer(e.target.value);
    };

    const handleCampaignChange = (e) => {
        setSelectedCampaign(e.target.value);
    };

    // Combined loading state
    const isLoading = loadingPlayers || loadingCampaigns;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
          <div>
            <h1>Select a Campaign</h1>
            <select value={selectedCampaign} onChange={handleCampaignChange}>
                <option value="">Select a campaign</option>
                {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                    </option>
                ))}
            </select>
          </div>
          <div>
            <h1>Select a Player</h1>
            <select value={selectedPlayer} onChange={handlePlayerChange}>
                <option value="">Select a player</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                        {player.name}
                    </option>
                ))}
            </select>
          </div>
        </div>
    );
}

export default Characters;
