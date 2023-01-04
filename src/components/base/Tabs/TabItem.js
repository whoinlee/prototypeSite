import React from "react";

function TabItem({ item, isSelected, handleSetSelectedTab, width }) {
  return (
    <div
      className={`tab-item ${isSelected ? "active" : ""}`}
      style={{ width: width }}
      onClick={() => handleSetSelectedTab(item.id)}
    >
      {item.label}
    </div>
  );
}

export default TabItem;
