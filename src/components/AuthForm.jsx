import React from "react";
import "./css/input.css";

const AuthForm = () => {
  return (
    <div className="p-3">
      <h4>Welcome to Airbnb</h4>

      <div className="mt-3">
        <form action="">
          <div class="form-floating mb-3">
            <input
              type="tel"
              className="form-control authInput"
              id="floatingInput"
              placeholder="Enter Phone"
            />
            <label for="floatingInput">Phone Number</label>
          </div>
          <button className="btn submitbtn w-100">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
