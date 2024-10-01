// components/MatchupTable.js
import React, { useState, useEffect } from "react";
import "./MatchupTable.css"; // Your existing CSS

// The URLs to fetch the updated data
const runesUrl =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/runesReforged.json";
const itemUrl =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/item.json"; // Item JSON URL
const runeBasePath = "https://ddragon.canisback.com/img/"; // Base URL for runes
const itemImageBasePath =
  "https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/"; // Base URL for item images

// Function to determine dot color based on difficulty
const getDotColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "green";
    case "medium":
      return "orange";
    case "hard":
      return "red";
    default:
      return "gray"; // Fallback color
  }
};

const MatchupTable = ({ championData }) => {
  const [editableData, setEditableData] = useState({ ...championData });
  const [runesData, setRunesData] = useState({});
  const [itemsData, setItemsData] = useState({});

  useEffect(() => {
    console.log("Fetching runes data...");

    // Fetch rune data
    fetch(runesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const runesMap = {};
        data.forEach((tree) => {
          tree.slots.forEach((slot) => {
            slot.runes.forEach((rune) => {
              const fullIconUrl = `${runeBasePath}${rune.icon}`;
              runesMap[rune.name] = {
                icon: fullIconUrl,
                description: rune.shortDesc,
              };
            });
          });
        });
        setRunesData(runesMap);
        console.log("Runes data processed successfully:", runesMap);
      })
      .catch((error) => console.error("Failed to load rune data:", error));

    console.log("Fetching item data...");

    // Fetch item data
    fetch(itemUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setItemsData(data.data); // Save items data for lookup
        console.log("Items data fetched successfully:", data.data);
      })
      .catch((error) => console.error("Failed to load item data:", error));
  }, []);

  const handleEdit = (e, key) => {
    setEditableData({ ...editableData, [key]: e.target.value });
  };

  const selectedRunes = editableData.runes
    .split(",")
    .map((rune) => rune.trim());
  const itemPathArray = editableData.itemPath
    .split(",")
    .map((item) => item.trim());

  // Function to normalize item names for comparison
  const normalizeString = (str) =>
    str
      .toLowerCase()
      .replace(/’/g, "'") // Replace curly apostrophes with straight apostrophes
      .trim();

  return (
    <div className="matchup-card">
      <div className="matchup-header">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${editableData.label}.png`}
          alt={editableData.label}
          className="champion-icon"
        />
        <h2>{editableData.label}</h2>
      </div>
      <div className="matchup-content">
        <div className="matchup-section">
          <h3>Difficulty</h3>
          <div className="difficulty-container">
            <span
              className="difficulty-dot"
              style={{ backgroundColor: getDotColor(editableData.difficulty) }}
            ></span>
            <span>{editableData.difficulty}</span>
          </div>
        </div>
        <div className="matchup-section">
          <h3>Recommended Runes</h3>
          <div className="runes-container">
            {selectedRunes.map((rune, index) => (
              <div
                key={index}
                className="rune-icon"
                title={runesData[rune]?.description || rune}
              >
                <img
                  src={
                    runesData[rune]?.icon || "https://via.placeholder.com/32"
                  }
                  alt={rune}
                  style={{ width: "32px", height: "32px" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="matchup-section">
          <h3>Item Path</h3>
          <div className="items-container">
            {itemPathArray.map((itemName, index) => {
              // Normalize item names for comparison
              const normalizedItemName = normalizeString(itemName);

              const item = Object.values(itemsData).find(
                (i) => normalizeString(i.name) === normalizedItemName
              );

              if (!item) {
                console.warn(
                  `Item not found: ${itemName} (Normalized: ${normalizedItemName})`
                );
              } else {
                const itemImagePath = `${itemImageBasePath}${item.image.full}`;
                console.log(
                  `Found item: ${itemName} - Image path: ${itemImagePath}`,
                  item
                );
              }

              return (
                <React.Fragment key={index}>
                  {item && (
                    <img
                      src={`${itemImageBasePath}${item.image.full}`}
                      alt={item.name}
                      className="item-icon"
                      style={{ width: "32px", height: "32px" }}
                    />
                  )}
                  {index < itemPathArray.length - 1 && <span> &gt; </span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="matchup-section">
          <h3>Playstyle Notes</h3>
          <div>{editableData.playstyle}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchupTable;
