import React from "react";
import "./FormContainer.css";

export default function FormContainer() {
  return (
    <div className="login_formContainer">
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
        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Another label
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
          />
        </div>
        <p>¿Olvidaste tu contaseña?</p>
      </form>
    </div>
  );
}
