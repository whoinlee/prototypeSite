import React from "react";
import { Link } from "react-router-dom";
import "./Buttons.scss";

function Button({ label, name, link, icon, callback, type, disabled }) {
  if (disabled)
    return (
      <div className={`disabled button ${type ? type : ""}`}>
        {icon && <img src={icon} className="icon" alt={label} />}
        {label && label}
      </div>
    );
  if (link) {
    return (
      <div className={`button ${type ? type : ""}`}>
        <Link to={link}>
          {icon && <img src={icon} className="icon" alt={label} />}
          {label && label}
        </Link>
      </div>
    );
  }
  if (callback) {
    return (
      <div
        className={`button ${type ? type : ""}`}
        onClick={() => callback(name)}
      >
        {icon && <img src={icon} className="icon" alt={name} />}
        {label && label}
      </div>
    );
  }
  return (
    <div className={`button ${type ? type : ""}`}>
      {icon && <img src={icon} className="icon" alt={label} />}
      {label && label}
    </div>
  );
}

export default Button;
