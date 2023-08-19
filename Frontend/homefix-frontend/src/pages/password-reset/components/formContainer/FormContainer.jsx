import React from "react";
import "./FormContainer.css";

export default function FormContainer() {
  return (
    <div className="passwordReset_formContainer">
      <form>
        <div className="mb-3">
          <label for="formGroupExampleInput" className="form-label">
            Example label
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
      </form>
    </div>
  );
}
