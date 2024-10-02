import React from "react";
import { useDrop } from "react-dnd";

const DragAndDropZone = ({ onDrop, children, isEditMode }) => {
  const [, drop] = useDrop({
    accept: "CHAMPION",
    drop: (item) => onDrop(item),
  });

  return (
    <div
      ref={isEditMode ? drop : null}
      className="drag-and-drop-zone"
      style={{
        border: isEditMode ? "2px dashed #ccc" : "none",
        padding: isEditMode ? "10px" : "0",
        minHeight: "50px", // Minimum height to see the drop area
      }}
    >
      {children}
    </div>
  );
};

export default DragAndDropZone;
