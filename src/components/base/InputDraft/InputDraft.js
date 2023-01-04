import React, { useState } from "react";
import "./InputDraft.scss";

function InputDraft({
  placeholder,
  value,
  inputObject,
  type,
  disabled,
  id,
  handleEditData,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [disabledState, setDisabledState] = useState(disabled);

  const handleSetInputValue = (targetValue) => {
    setInputValue(targetValue);
    inputObject.value = targetValue;
    handleEditData(inputObject, id);
  };

  return (
    <div className="input-draft">
      <input
        disabled={disabledState}
        placeholder={placeholder}
        value={inputValue}
        type={type}
        onChange={(e) => handleSetInputValue(e.target.value)}
      />
    </div>
  );
}

export default InputDraft;
