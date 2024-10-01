// App.js
import React, { useState } from "react";
import MatchupTable from "./components/MatchupTable";
import Select from "react-select";
import "./App.css";

// Data for champions you play
const myChampions = [
  { label: "Jax", value: "Jax" },
  { label: "Camille", value: "Camille" },
  { label: "Darius", value: "Darius" },
  { label: "Gwen", value: "Gwen" },
  { label: "Mordekaiser", value: "Mordekaiser" },
  { label: "Renekton", value: "Renekton" },
];

// Data for matchups (add more champions as needed)
const championsData = {
  Jax: [
    {
      label: "Aatrox",
      value: "Aatrox",
      difficulty: "Medium",
      runes: "Conqueror, Triumph, Tenacity, Last Stand",
      itemPath: "Divine Sunderer, Sterak’s Gage, Guardian Angel",
      playstyle: "Block combos with Counter-Strike.",
    },
    {
      label: "Camille",
      value: "Camille",
      difficulty: "Medium",
      runes: "Conqueror, Triumph, Legend: Alacrity, Last Stand",
      itemPath: "Divine Sunderer, Blade of the Ruined King, Sterak’s Gage",
      playstyle: "Avoid hooks, trade when shield is down.",
    },
    // More matchups for Jax...
  ],
  Camille: [
    {
      label: "Darius",
      value: "Darius",
      difficulty: "Hard",
      runes: "Grasp of the Undying, Shield Bash",
      itemPath: "Divine Sunderer, Sterak’s Gage",
      playstyle: "Avoid his Q, trade when his abilities are on cooldown.",
    },
    // More matchups for Camille...
  ],
  // Add data for Darius, Gwen, Mordekaiser, Renekton, etc.
};

function App() {
  const [selectedMyChampion, setSelectedMyChampion] = useState(null);
  const [selectedEnemyChampion, setSelectedEnemyChampion] = useState(null);

  const handleMyChampionChange = (champion) => {
    setSelectedMyChampion(champion);
    setSelectedEnemyChampion(null); // Reset enemy selection when you choose a different main champion
  };

  const handleEnemyChampionChange = (selectedOption) => {
    setSelectedEnemyChampion(selectedOption);
  };

  const enemyOptions = selectedMyChampion
    ? championsData[selectedMyChampion.value]
    : [];

  return (
    <div className="App">
      <h1>League of Legends Chuggy Analysis</h1>
      <div className="champion-buttons">
        {myChampions.map((champ) => (
          <div key={champ.value} className="champion-button-container">
            <button
              onClick={() => handleMyChampionChange(champ)}
              className={`champion-button ${
                selectedMyChampion?.value === champ.value ? "active" : ""
              }`}
            >
              {champ.label}
            </button>
            {champ.label === "Jax" ||
            champ.label === "Camille" ||
            champ.label === "Renekton" ? (
              <div className="champion-subtitle">Blindpick</div> // Add the subtitle here
            ) : null}
          </div>
        ))}
      </div>

      {selectedMyChampion && (
        <div className="search-bar">
          <Select
            options={enemyOptions}
            onChange={handleEnemyChampionChange}
            placeholder="Select enemy champion..."
            className="search-input"
            isDisabled={!selectedMyChampion}
            styles={{
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#ffffff", // White background
                color: "#000000", // Black text
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#e0e0e0" : "#ffffff", // Light grey highlight
                color: "#000000", // Black text for options
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#000000", // Black text for the selected value
              }),
            }}
          />
        </div>
      )}

      {selectedEnemyChampion && (
        <MatchupTable
          key={`${selectedMyChampion.value}-${selectedEnemyChampion.value}`} // Force re-render
          championData={selectedEnemyChampion}
        />
      )}
    </div>
  );
}

export default App;
