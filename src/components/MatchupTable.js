import React, { useState, useEffect } from "react";

// Replace with your current patch variable
const currentPatch = "14.19.1";
const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/item.json`;

const MatchupTable = ({ champion }) => {
  const [itemsData, setItemsData] = useState({});

  useEffect(() => {
    fetch(itemUrl)
      .then((response) => response.json())
      .then((data) => {
        setItemsData(data.data);
      });
  }, [currentPatch]);

  const itemOrder = ["1055", "3142", "3156"]; // Example item ids for demonstration

  return (
    <div className="matchup-table">
      <h2>Recommended Items</h2>
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
  );
};

export default MatchupTable;
