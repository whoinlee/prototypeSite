import React from "react";
import InputDraft from "../../components/InputDraft/InputDraft";
import "./Form.scss";

function Form({ data, mode, id, handleEditData }) {
  return (
    <div className="form">
      {data.map((d) => (
        <div className="input-group" key={d.id}>
          <label>{d.label}</label>
          <InputDraft
            inputObject={d}
            placeholder={d.placeholder}
            value={d.value}
            type={d.type}
            disabled={mode !== "edit"}
            id={id}
            handleEditData={handleEditData}
          />
        </div>
      ))}
    </div>
  );
}

export default Form;
