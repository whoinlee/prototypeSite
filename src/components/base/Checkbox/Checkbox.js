import React from "react";
import "./Checkbox.scss";

function Checkbox({ name, isSelected }) {
  const theme = localStorage.getItem("theme") || "dark";

  const getImage = () => {
    if (theme === "dark") {
      if (isSelected) return "/appAssets/checkbox-active.svg";
      return "/appAssets/checkbox.svg";
    }
    if (theme === "light") {
      if (isSelected) return "/appAssets/checkbox-active-light.svg";
      return "/appAssets/checkbox-light.svg";
    }
  };

  return (
    <img
      src={getImage()}
      className={`checkbox ${isSelected ? "active" : ""}`}
      alt={name}
    />
  );
}

export default Checkbox;
