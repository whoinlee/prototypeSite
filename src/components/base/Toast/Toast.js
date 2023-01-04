import React, { useEffect } from "react";
import "./Toast.scss";

function Toast({ type, title, body, handleDismissToast, time }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".toast").classList.add("active");
    }, 50);
    setTimeout(() => {
      handleDismissToast();
    }, time);
  }, [handleDismissToast, time]);

  return (
    <div className={`toast ${body ? "" : "single"}`}>
      <img src={`/appAssets/${type}.svg`} alt={type} />
      <div className="content">
        {title && <div className="title">{title}</div>}
        {body && <div classNam="body">{body}</div>}
      </div>
      <img
        src={"/appAssets/close.svg"}
        className="close"
        alt="close"
        onClick={() => handleDismissToast()}
      />
    </div>
  );
}

export default Toast;
