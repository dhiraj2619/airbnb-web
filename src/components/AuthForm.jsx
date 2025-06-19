import React from "react";

const AuthForm = () => {
  return (
    <div className="p-3">
      <h4>Welcome to Airbnb</h4>

      <div className="mt-3">
        <div class="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Phone"
          />
          <label for="floatingInput">Phone Number</label>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
