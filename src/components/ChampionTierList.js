import React, { useState } from "react";
import "./ChampionTierList.css";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableChampion = ({
  champion,
  index,
  tierType,
  moveChampion,
  isEditMode,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CHAMPION",
    item: { index, tierType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      className={`champion-icon ${isDragging ? "dragging" : ""}`}
      ref={isEditMode ? drag : null}
      title={champion}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${champion}.png`}
        alt={champion}
        className="champion-icon-image"
        style={{ cursor: isEditMode ? "move" : "default" }}
      />
    </li>
  );
};

const DropZone = ({ children, onDrop, isEditMode }) => {
  const [, drop] = useDrop({
    accept: "CHAMPION",
    drop: (item) => onDrop(item),
  });

  return (
    <ul className="tier-category-icons" ref={isEditMode ? drop : null}>
      {children}
    </ul>
  );
};

const ChampionTierList = ({ champion, tierData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTierData, setEditedTierData] = useState(tierData);

  const moveChampion = (fromIndex, fromTier, toTier) => {
    const newTierData = { ...editedTierData };

    // Remove champion from the original tier
    const [movedChampion] = newTierData[fromTier].splice(fromIndex, 1);

    // Add the champion to the new tier
    newTierData[toTier].push(movedChampion);

    setEditedTierData(newTierData);
  };

  const handleDrop = (item, toTier) => {
    moveChampion(item.index, item.tierType, toTier);
  };

  return (
    <div className="tier-list">
      <h2>
        {champion}'s Tier List
        <button onClick={() => setIsEditMode(!isEditMode)} className="edit-btn">
          {isEditMode ? "Cancel" : "Edit"}
        </button>
      </h2>

      <DndProvider backend={HTML5Backend}>
        {/* Positive Matchups */}
        <div className="tier-category">
          <h3>
            Matchup positif{" "}
            {isEditMode && <span className="edit-preview">Drag here</span>}
          </h3>
          <DropZone
            onDrop={(item) => handleDrop(item, "positiveMatchups")}
            isEditMode={isEditMode}
          >
            {editedTierData.positiveMatchups.map((matchup, index) => (
              <DraggableChampion
                key={index}
                index={index}
                champion={matchup}
                tierType="positiveMatchups"
                moveChampion={moveChampion}
                isEditMode={isEditMode}
              />
            ))}
          </DropZone>
        </div>

        {/* Skill Matchups */}
        <div className="tier-category">
          <h3>
            Skill matchup{" "}
            {isEditMode && <span className="edit-preview">Drag here</span>}
          </h3>
          <DropZone
            onDrop={(item) => handleDrop(item, "skillMatchups")}
            isEditMode={isEditMode}
          >
            {editedTierData.skillMatchups.map((matchup, index) => (
              <DraggableChampion
                key={index}
                index={index}
                champion={matchup}
                tierType="skillMatchups"
                moveChampion={moveChampion}
                isEditMode={isEditMode}
              />
            ))}
          </DropZone>
        </div>

        {/* Bad Matchups */}
        <div className="tier-category">
          <h3>
            Bad Matchup{" "}
            {isEditMode && <span className="edit-preview">Drag here</span>}
          </h3>
          <DropZone
            onDrop={(item) => handleDrop(item, "badMatchups")}
            isEditMode={isEditMode}
          >
            {editedTierData.badMatchups.map((matchup, index) => (
              <DraggableChampion
                key={index}
                index={index}
                champion={matchup}
                tierType="badMatchups"
                moveChampion={moveChampion}
                isEditMode={isEditMode}
              />
            ))}
          </DropZone>
        </div>

        {isEditMode && (
          <div className="save-button-container">
            <button
              onClick={() => setIsEditMode(false)}
              className="save-button"
            >
              Save
            </button>
          </div>
        )}
      </DndProvider>
    </div>
  );
};

export default ChampionTierList;
