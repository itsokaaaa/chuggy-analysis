import React, { useState } from "react";
import "./ChampionTierList.css";
import ChampionCard from "./ChampionCard"; // Component for the card

const getChampionIconUrl = (championName) => {
  return `https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${championName}.png`;
};

const ChampionTierList = ({ champion, tierData }) => {
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [matchupType, setMatchupType] = useState(null); // State to track which matchup type

  if (!tierData) return null;

  // Handle the champion click and set the matchup type
  const handleChampionClick = (opponent, type) => {
    setSelectedOpponent(opponent);
    setMatchupType(type); // Set the type of matchup (positive, skill, bad)
  };

  return (
    <div className="tier-list">
      <h2>{champion}'s Tier List</h2>

      {/* Positive Matchups */}
      <div className="tier-category">
        <h3>Matchup positif</h3>
        <ul className="tier-category-icons">
          {tierData.positiveMatchups.map((matchup, index) => (
            <li
              key={index}
              onClick={() => handleChampionClick(matchup, "positive")}
            >
              <img
                src={getChampionIconUrl(matchup)}
                alt={matchup}
                className="champion-icon"
                title={matchup}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Skill Matchups */}
      <div className="tier-category">
        <h3>Skill matchup</h3>
        <ul className="tier-category-icons">
          {tierData.skillMatchups.map((matchup, index) => (
            <li
              key={index}
              onClick={() => handleChampionClick(matchup, "skill")}
            >
              <img
                src={getChampionIconUrl(matchup)}
                alt={matchup}
                className="champion-icon"
                title={matchup}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Bad Matchups */}
      <div className="tier-category">
        <h3>Bad Matchup</h3>
        <ul className="tier-category-icons">
          {tierData.badMatchups.map((matchup, index) => (
            <li key={index} onClick={() => handleChampionClick(matchup, "bad")}>
              <img
                src={getChampionIconUrl(matchup)}
                alt={matchup}
                className="champion-icon"
                title={matchup}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Render the card when a champion is selected */}
      {selectedOpponent && (
        <ChampionCard
          champion={selectedOpponent}
          matchupType={matchupType} // Pass the matchup type here
          onClose={() => setSelectedOpponent(null)}
        />
      )}
    </div>
  );
};

export default ChampionTierList;
