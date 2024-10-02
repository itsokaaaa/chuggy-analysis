import React, { useState } from "react";
import ChampionTierList from "./components/ChampionTierList";
import MatchupTable from "./components/MatchupTable"; // Import MatchupTable
import "./App.css";

const initialChampions = [
  { label: "Jax", value: "Jax", icon: "Jax" },
  { label: "Camille", value: "Camille", icon: "Camille" },
  { label: "Darius", value: "Darius", icon: "Darius" },
  { label: "Gwen", value: "Gwen", icon: "Gwen" },
  { label: "Mordekaiser", value: "Mordekaiser", icon: "Mordekaiser" },
  { label: "Renekton", value: "Renekton", icon: "Renekton" },
];

const tierData = {
  Jax: {
    positiveMatchups: ["Garen", "Nasus", "Yorick"],
    skillMatchups: ["Camille", "Fiora", "Riven"],
    badMatchups: ["Renekton", "Sett", "Darius"],
  },
  Camille: {
    positiveMatchups: ["Garen", "Mordekaiser", "Aatrox"],
    skillMatchups: ["Fiora", "Riven", "Jax"],
    badMatchups: ["Darius", "Renekton", "Gwen"],
  },
};

function App() {
  const [myChampions] = useState(initialChampions);
  const [selectedMyChampion, setSelectedMyChampion] = useState(
    initialChampions[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPatch, setCurrentPatch] = useState("14.19.1");

  const handleChampionSelect = (champion) => {
    setSelectedMyChampion(champion);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePatchUpdate = () => {
    const newPatch = prompt("Enter the new patch version (e.g., 14.19.1):");
    if (newPatch) {
      setCurrentPatch(newPatch);
    }
  };

  return (
    <div className="App">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="champion-list">
          {myChampions.map((champion) => (
            <li
              key={champion.value}
              className={`champion-item ${
                selectedMyChampion.value === champion.value ? "active" : ""
              }`}
              onClick={() => handleChampionSelect(champion)}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${champion.icon}.png`}
                alt={champion.label}
                className="champion-icon"
              />
              <span>{champion.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content with centered search bar */}
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search champions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        {/* A shorter label "P" inside the button */}
        <button onClick={handlePatchUpdate} className="patch-button">
          P
        </button>

        <ChampionTierList
          champion={selectedMyChampion.label}
          tierData={tierData[selectedMyChampion.label]}
        />

        {/* Add MatchupTable for displaying item recommendations */}
        <MatchupTable
          champion={selectedMyChampion.label}
          currentPatch={currentPatch}
        />
      </div>
    </div>
  );
}

export default App;
