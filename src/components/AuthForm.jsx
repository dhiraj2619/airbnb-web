import React, { useState } from "react";
import "./css/input.css";

const AuthForm = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const validateInput = (e) => {
    e.preventDefault();

    if (isEmail) {
      const ok = /^\S+@\S+\.\S+$/.test(email);

      if(!email){
           setError("Please Enter Email Address");
           return;
      }
      else if(!ok) {
        setError("Please Enter Valid Email");
        return;
      }
    } else {
      const onlyDigits = phone.replace(/\D/g, "");

      if (onlyDigits.length !== 10) {
        setError("Phone Number Should be exactly 10 Digits");
        return;
      }
    }

    setError("");
    console.log("valid data");
  };

  const handlephoneInputChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");

    setPhone(input);

    if (error) {
      setError("");
    }
  };

  return (
    <div className="p-3">
      <h4>Welcome to Airbnb</h4>

      <div className="mt-3">
        <form onSubmit={validateInput}>
          <div className="form-floating mb-3">
            {isEmail ? (
              <>
                <input
                  type="email"
                  className="form-control authInput"
                  id="floatingInput"
                  placeholder="Enter Email"
                  value={email}
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                />
                <label for="floatingInput">Email</label>
              </>
            ) : (
              <>
                <input
                  type="tel"
                  className="form-control authInput"
                  id="floatingInput"
                  value={phone}
                  name="mobile"
                  onChange={handlephoneInputChange}
                  maxLength={10}
                  placeholder="Enter Phone"
                />
                <label for="floatingInput">Phone Number</label>
              </>
            )}
          </div>
          <div className="my-3">
            <p className="fs-small">
              We’ll call or text you to confirm your number. Standard message
              and data rates apply.
            </p>
          </div>

          {error && (
            <div className="card rounded-4 my-4">
              <div className="card-body d-flex flex-row gap-3 align-items-center">
                <span>
                  <svg
                    fill="#e07912"
                    width="23px"
                    height="23px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="M15.83,13.23l-7-11.76a1,1,0,0,0-1.66,0L.16,13.3c-.38.64-.07,1.7.68,1.7H15.2C15.94,15,16.21,13.87,15.83,13.23Zm-7,.37H7.14V11.89h1.7Zm0-3.57H7.16L7,4H9Z" />
                    </g>
                  </svg>
                </span>

                <span className="fs-lg">{error}</span>
              </div>
            </div>
          )}
          <button className="btn submitbtn w-100">Continue</button>

          <div className="text-center my-4">
            <h6 className="fs-small fw-semibold ortext">OR</h6>
          </div>

          <button className="btn btn-outline-dark w-100 googleauthbtn" type="button"> 
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="#4285F4"
                d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
              />
              <path
                fill="#34A853"
                d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
              />
              <path
                fill="#FBBC04"
                d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
              />
              <path
                fill="#EA4335"
                d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
              />
            </svg>
            <span>Continue With Google</span>
          </button>
          <button
            className="btn btn-outline-dark w-100 googleauthbtn" type="button"
            onClick={() => {
              setIsEmail(!isEmail);
              setError("");
            }}
          >
            {isEmail ? (
              <>
                <svg
                  fill="#000000"
                  width="22px"
                  height="22px"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M718 25H282q-36 0-61.5 25.5T195 112v786q0 36 25.5 61.5T282 985h436q36 0 61.5-25.5T805 898V112q0-36-25.5-61.5T718 25zm-27 786H309q-12 0-19.5-8t-7.5-20V191q0-11 7.5-19t19.5-8h382q11 0 19 8t8 19v592q0 12-8 20t-19 8z" />
                </svg>
                <span>Continue With Phone</span>
              </>
            ) : (
              <>
                <svg
                  width="22px"
                  height="22px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="style=stroke">
                    <g id="email">
                      <path
                        id="vector (Stroke)"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
                        fill="#000000"
                      />
                      <path
                        id="vector (Stroke)_2"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
                        fill="#000000"
                      />
                    </g>
                  </g>
                </svg>
                <span>Continue With Email</span>
              </>
            )}
          </button>
          <button className="btn btn-outline-dark w-100 googleauthbtn" type="button">
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="#1877F2"
                d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
              />
              <path
                fill="#ffffff"
                d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
              />
            </svg>
            <span>Continue With Facebook</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
