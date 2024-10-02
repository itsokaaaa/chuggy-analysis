import React, { useEffect, useState } from "react";
import "./ChampionCard.css";

// Replace with your current patch variable
const currentPatch = "14.19.1";
const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/item.json`;

const ChampionCard = ({ champion, onClose, matchupType }) => {
  const [itemsData, setItemsData] = useState({});
  const [itemOrder, setItemOrder] = useState([]);

  useEffect(() => {
    // Fetch item data from the API
    fetch(itemUrl)
      .then((response) => response.json())
      .then((data) => {
        setItemsData(data.data);
      });
  }, []);

  // Define different item builds based on the matchup type
  useEffect(() => {
    if (matchupType === "positive") {
      setItemOrder(["1055", "3078", "3153"]); // Example: Doran's Blade > Trinity Force > Blade of the Ruined King
    } else if (matchupType === "skill") {
      setItemOrder(["1055", "6632", "3047"]); // Example: Doran's Blade > Divine Sunderer > Plated Steelcaps
    } else if (matchupType === "bad") {
      setItemOrder(["1055", "3075", "3065"]); // Example: Doran's Blade > Thornmail > Spirit Visage
    }
  }, [matchupType]);

  const getChampionIconUrl = (championName) => {
    return `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${championName}.png`;
  };

  // Determine dot color based on matchup type
  const getDotColor = (type) => {
    switch (type) {
      case "positive":
        return "green";
      case "skill":
        return "orange";
      case "bad":
        return "red";
      default:
        return "gray"; // Default if no type is passed
    }
  };

  return (
    <div className="champion-card-backdrop" onClick={onClose}>
      <div className="champion-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="champion-header">
          <img
            src={getChampionIconUrl(champion)}
            alt={champion}
            className="champion-card-icon"
          />
          <h3>{champion}</h3>
          <div
            className="difficulty-dot"
            style={{ backgroundColor: getDotColor(matchupType) }}
          ></div>
        </div>

        <div className="build-recommendations">
          <h4>Build Recommendations</h4>
          <div className="items-container">
            {itemOrder.map((itemId, index) => {
              const item = itemsData[itemId];
              if (!item) return null;

              return (
                <React.Fragment key={itemId}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/item/${item.image.full}`}
                    alt={item.name}
                    className="item-icon"
                  />
                  {index < itemOrder.length - 1 && (
                    <span className="item-arrow"> &gt; </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="tips-section">
          <h4>Tips Against {champion}</h4>
          <ul>
            {/* Replace with actual tips */}
            <li>Tip 1</li>
            <li>Tip 2</li>
            <li>Tip 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
